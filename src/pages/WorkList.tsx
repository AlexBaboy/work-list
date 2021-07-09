import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {RootState} from "../store";
import { Pagination } from "../components/Pagination";
import Container from "@material-ui/core/Container";
import {WorkListTable} from "../components/Worklist/WorkListTable";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {getCurrentTasksPaginated} from "../components/Selectors";
import {setWorklistInitial} from "../store/worklist";

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
            <WorkListTable />
            <Pagination />
        </Container>
    );
};
