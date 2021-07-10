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
    getSortDirection,
    getSortEmailType,
    getSortFieldName,
    getSortIdType,
    getSortStatusType,
    getSortUserNameType
} from "../../Selectors";

import {ArrowWrapper} from "../../ArrowWrapper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {
    setSortIdType,
    setSortUserNameType,
    setSortEmailType,
    setSortStatusType,
    changeRequest
} from "../../../store/worklist";

import {getChangedUrlParams} from "../../../functions";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        table: {
            minWidth: 650,
        },
        arrow : {
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            margin: '-20px 0'
        }
    })
);

export const WorkListTable = () => {

    const classes = useStyles();
    const worklist = useSelector(getCurrentTasks);

    const currentPage = useSelector(getCurrentPage)

    const titleValue = (type: string = 'asc') => {
        return 'сортировать по ' +  (type === 'asc' ? ' убыванию' : 'возрастанию')
    }

    const sortIdType = useSelector(getSortIdType)
    const sortUserNameType = useSelector(getSortUserNameType)
    const sortEmailType = useSelector(getSortEmailType)
    const sortStatusType = useSelector(getSortStatusType)

    const dispatch = useDispatch();

    const sortField = (name: string, type:string = 'asc') => {
        switch(name) {
            case 'id':
                dispatch(setSortIdType(type))
                break;
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

    const changeParamsRequest = (name: string, type:string = 'asc') => {
        return dispatch(changeRequest( getChangedUrlParams(name, type, currentPage) ))
    }

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="contacts table">
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell><b>ID</b>
                            {sortIdType === 'desc' ?
                                <ArrowDropDownIcon titleAccess={titleValue(sortIdType)}  className={classes.arrow}  onClick={ () => sortField('id','asc')} />
                                :
                                <ArrowDropUpIcon titleAccess={titleValue(sortIdType)} className={classes.arrow} onClick={ () => sortField('id', 'desc')} />
                            }
                        </TableCell>
                        <TableCell><b>Имя пользователя</b>
                            {sortUserNameType === 'desc' ?
                                <ArrowDropDownIcon titleAccess={titleValue(sortUserNameType)} className={classes.arrow}  onClick={ () => sortField('username','asc')} />
                                :
                                <ArrowDropUpIcon titleAccess={titleValue(sortUserNameType)} className={classes.arrow}  onClick={ () => sortField('username', 'desc')} />
                            }
                        </TableCell>
                        <TableCell><b>Email</b>
                            {sortEmailType === 'desc' ?
                                <ArrowDropDownIcon titleAccess={titleValue(sortEmailType)} className={classes.arrow}  onClick={ () => sortField('email','asc')} />
                                :
                                <ArrowDropUpIcon titleAccess={titleValue(sortEmailType)} className={classes.arrow}  onClick={ () => sortField('email', 'desc')} />
                            }
                        </TableCell>
                        <TableCell><b>Текст задачи</b></TableCell>
                        <TableCell><b>Статус</b>
                            {sortStatusType === 'desc' ?
                                <ArrowDropDownIcon titleAccess={titleValue(sortStatusType)} className={classes.arrow}  onClick={ () => sortField('status','asc')} />
                                :
                                <ArrowDropUpIcon titleAccess={titleValue(sortStatusType)} className={classes.arrow}  onClick={ () => sortField('status', 'desc')} />
                            }
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {worklist.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell>
                                {todo.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Avatar
                                    alt={todo.username}
                                    src={todo.image_path}
                                />
                                {todo.username}
                            </TableCell>
                            <TableCell>
                                {todo.email}
                            </TableCell>
                            <TableCell>
                                {todo.text}
                            </TableCell>
                            <TableCell>
                                {todo.status}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
