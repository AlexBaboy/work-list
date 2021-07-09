import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import {useSelector} from "react-redux";
import {
    getCurrentPage,
    getCurrentTasks, getSortDirection, getSortFieldName
} from "../../Selectors";

import {ArrowWrapper} from "../../ArrowWrapper";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        table: {
            minWidth: 650,
        },

    })
);

export const WorkListTable = () => {

    const classes = useStyles();
    const worklist = useSelector(getCurrentTasks);

    const sortDirection = useSelector(getSortDirection)
    const currentPage = useSelector(getCurrentPage)

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="contacts table">
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell><b>ID</b>
                            <ArrowWrapper sortFieldName='id' sortDirection={sortDirection} currentPage={currentPage}/>
                        </TableCell>
                        <TableCell><b>Имя пользователя</b>
                            <ArrowWrapper sortFieldName='username' sortDirection={sortDirection} currentPage={currentPage} />
                        </TableCell>
                        <TableCell><b>Email</b>
                            <ArrowWrapper sortFieldName='email' sortDirection={sortDirection} currentPage={currentPage} />
                        </TableCell>
                        <TableCell><b>Текст задачи</b></TableCell>
                        <TableCell><b>Статус</b>
                            <ArrowWrapper sortFieldName='status' sortDirection={sortDirection} currentPage={currentPage} />
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
