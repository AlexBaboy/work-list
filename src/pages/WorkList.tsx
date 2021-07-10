import React from "react";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {RootState} from "../store";
import { Pagination } from "../components/Pagination";
import Container from "@material-ui/core/Container";
import {WorkListTable} from "../components/Worklist/WorkListTable";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {setWorklistInitial} from "../store/worklist";
import styles from "../components/ui/styles.module.css";
import {getErrorStatus, getLoadingStatus} from "../components/Selectors";

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
            zIndex: 3,
            content: '12345',
            textAlign: 'center',
            color: '#1a90ff',
            animationDuration: '550ms',
        }
    })
);

export const WorkList = () => {

    const classes = useStyles();

    const isLoading = useSelector(getLoadingStatus);
    const isError = useSelector(getErrorStatus);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setWorklistInitial());
    }, []);

    if (isError)
        return <div data-testid="contacts-error">Error...</div>;

    return (

        <Container className={classes.root}>
        {isLoading &&
            <div className={styles.loaderWrapper}>
                <CircularProgress className={classes.loader}
                                            variant="determinate"
                                            size={80}
                                            thickness={4}
                                            value={100}
                />
            </div>
        }

                <WorkListTable />
                <Pagination />
        </Container>

    );
};
