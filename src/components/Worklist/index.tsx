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
import {getCurrentTasks} from "../Selectors";
import {RootState} from "../../store";
import {setWorklistInitial} from "../../store/worklist";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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


export const WorkList = () => {

    const classes = useStyles();
    const isLoading = useSelector((state: RootState) => state.wl.isLoading);
    const isError = useSelector((state: RootState) => state.wl.isError);
    const worklist = useSelector(getCurrentTasks);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setWorklistInitial());
    }, []);

    return (
        <Container className={classes.root}>
        <TableContainer>
            <Table className={classes.table} aria-label="contacts table">
                <TableHead>
                    <TableRow>
                        <TableCell>Имя пользователя</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Текст задачи</TableCell>
                        <TableCell>Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {worklist.map((todo) => (
                        <TableRow key={todo.id}>
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
        </Container>
    );
};
