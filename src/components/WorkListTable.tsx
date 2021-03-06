import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getCurrentTasks,
    getSortEmailType,
    getSortStatusType,
    getSortUserNameType
} from "../store/selectors";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {
    setSortUserNameType,
    setSortEmailType,
    setSortStatusType,
    changeRequest
} from "../store/worklist";

import {getChangedUrlParams, getStatusNameByCode} from "../utils";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        table: {
            minWidth: 650,
        },
        cellName: {
            width: '20%'
        },
        cellEmail: {
            width: '20%'
        },
        cellStatus: {
            width: '15%'
        },
        cellText: {
            width: '45%'
        },
        arrow: {
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            margin: '-20px 0'
        },
        userName: {
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
        },
        editRow: {
            cursor: 'pointer',
        }
    })
);

export const WorkListTable = () => {

    const classes = useStyles();
    const worklist = useSelector(getCurrentTasks);
    const currentPage = useSelector(getCurrentPage)
    const history = useHistory();

    const titleValue = (type: string = 'asc') => {
        return 'сортировать по ' + (type === 'asc' ? 'убыванию' : 'возрастанию')
    }

    const sortUserNameType = useSelector(getSortUserNameType)
    const sortEmailType = useSelector(getSortEmailType)
    const sortStatusType = useSelector(getSortStatusType)

    const isAdmin = localStorage.getItem('isAdmin')

    const dispatch = useDispatch();

    const sortField = (name: string, type: string = 'asc') => {
        switch (name) {
            case 'username':
                dispatch(setSortUserNameType(type))
                break;
            case 'email':
                dispatch(setSortEmailType(type))
                break;
            case 'status':
                dispatch(setSortStatusType(type))
                break;
        }
        changeParamsRequest(name, type)
        return false
    }

    const changeParamsRequest = (name: string, type: string = 'asc') => {
        return dispatch(changeRequest(getChangedUrlParams(name, type, currentPage)))
    }

    const editRecord = (id: number) => {

        if (!isAdmin) return false

        history.push({
            pathname: `/edit/${id}`,
            state: {detail: isAdmin}
        });
    }

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="contacts table">
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell className={classes.cellName}><b>Имя пользователя</b>
                            {sortUserNameType === 'desc' ?
                                <ArrowDropDownIcon titleAccess={titleValue(sortUserNameType)} className={classes.arrow}
                                                   onClick={() => sortField('username', 'asc')}/>
                                :
                                <ArrowDropUpIcon titleAccess={titleValue(sortUserNameType)} className={classes.arrow}
                                                 onClick={() => sortField('username', 'desc')}/>
                            }
                        </TableCell>
                        <TableCell className={classes.cellEmail}><b>Email</b>
                            {sortEmailType === 'desc' ?
                                <ArrowDropDownIcon titleAccess={titleValue(sortEmailType)} className={classes.arrow}
                                                   onClick={() => sortField('email', 'asc')}/>
                                :
                                <ArrowDropUpIcon titleAccess={titleValue(sortEmailType)} className={classes.arrow}
                                                 onClick={() => sortField('email', 'desc')}/>
                            }
                        </TableCell>
                        <TableCell className={classes.cellText}><b>Текст задачи</b></TableCell>
                        <TableCell className={classes.cellStatus}><b>Статус</b>
                            {sortStatusType === 'desc' ?
                                <ArrowDropDownIcon titleAccess={titleValue(sortStatusType)} className={classes.arrow}
                                                   onClick={() => sortField('status', 'asc')}/>
                                :
                                <ArrowDropUpIcon titleAccess={titleValue(sortStatusType)} className={classes.arrow}
                                                 onClick={() => sortField('status', 'desc')}/>
                            }
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {worklist.map((todo) => (
                        <TableRow key={todo.id}
                                  className={isAdmin ? classes.editRow : ''}
                                  title={isAdmin ? 'редактировать' : ''}
                                  onClick={() => editRecord(todo.id!)}
                        >
                            <TableCell component="th" scope="row">
                                <div className={classes.userName}>
                                    <div>
                                        <Avatar
                                            alt={todo.username}
                                            src={todo.image_path}
                                        />
                                    </div>
                                    <div>
                                        {todo.username}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                {todo.email}
                            </TableCell>
                            <TableCell>
                                {todo.text}
                            </TableCell>
                            <TableCell>
                                {getStatusNameByCode(todo.status)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
