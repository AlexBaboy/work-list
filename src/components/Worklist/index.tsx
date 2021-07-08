import {createStyles, makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTasksPaginated} from "../Selectors";
import CircularProgress from "@material-ui/core/CircularProgress";
import {RootState} from "../../store";
import {setWorklistInitial} from "../../store/worklist";
import { Pagination } from "../Pagination";
import Container from "@material-ui/core/Container";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        table: {
            minWidth: 650,
        }
    })
);

export const WorkList = () => {

    const classes = useStyles();
    const isLoading = useSelector((state: RootState) => state.wl.isLoading);
    const isError = useSelector((state: RootState) => state.wl.isError);
    const worklist = useSelector(getCurrentTasksPaginated);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setWorklistInitial());
    }, []);

    if (isLoading) {
        return (
            <CircularProgress variant="determinate"></CircularProgress>
        );
    }
    if (isError)
        return <div data-testid="contacts-error">Error...</div>;

    return (
        <Container className={classes.root}>
        <TableContainer>
            <Table className={classes.table} aria-label="contacts table">
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Имя пользователя</b></TableCell>
                        <TableCell><b>Email</b></TableCell>
                        <TableCell><b>Текст задачи</b></TableCell>
                        <TableCell><b>Статус</b></TableCell>
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
        <Pagination />
        </Container>
    );
};
