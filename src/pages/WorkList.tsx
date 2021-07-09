import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {RootState} from "../store";
import { Pagination } from "../components/Pagination";
import Container from "@material-ui/core/Container";
import {WorkListTable} from "../components/Worklist/WorkListTable";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {setWorklistInitial} from "../store/worklist";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4),
        },
        table: {
            minWidth: 650,
        },
        loader: {
            position: 'absolute',
            top: `50%`,
            left: `50%`,
            width: '100%',
            height: '100%',
            zIndex: 2,
            content: '12345',
            textAlign: 'center',
            backgroundColor: 'white',
            color: '#1a90ff',
            animationDuration: '550ms',
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

    if (isError)
        return <div data-testid="contacts-error">Error...</div>;

    return (
        <Container className={classes.root}>
        {isLoading && <CircularProgress className={classes.loader}
                                        variant="determinate"
                                        size={80}
                                        thickness={4}
                                        value={100}
        ></CircularProgress>}

                <WorkListTable />
                <Pagination />
        </Container>
    );
};
