import React, {useState} from 'react'
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components'
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import {StyledNavButtons} from "../ui/StyledNavButtons";
import {StyledButtonSwitch} from "../ui/StyledButtonSwitch";
import {StyledNavWrapper} from "../ui/StyledNavWrapper";
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useSelector} from "react-redux";
import {getCurrentUrl} from "../Selectors";
import {toast, ToastContainer} from "react-toastify";

const NavWrapper = styled.div`
  display: flex;
  padding-top: 2rem;
  justify-content: center;  
`

export const NavBar: React.FC = () => {

    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                marginTop: theme.spacing(4),
            },
            headContainer: {
                marginBottom: theme.spacing(3),
            },
            navWrapper: {
                justifyContent: 'flex-end'
            }
        })
    );

    const currentUrl = useSelector(getCurrentUrl)
    const [isAdmin, setAdmin] = useState(localStorage.getItem('isAdmin') || null)
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    let [linkToUrl, setLinkToUrl] = useState('/addTask')
    let [linkToText, setLinkToText] = useState('Добавить задачу')
    let [title, setTitle] = useState('Список задач')

    console.log("47 currentUrl = " + currentUrl)
    console.log("47 isAdmin = " + isAdmin)
    console.log("47 token = " + token)

    React.useEffect( () => {

        setAdmin(localStorage.getItem('isAdmin') || null)
        setToken(localStorage.getItem('token') || null)

        const typeAction = currentUrl.split('/')[1];
        console.log("typeAction", typeAction)

        switch (typeAction) {
            case '':
                setLinkToUrl('/addTask')
                setLinkToText('Добавить задачу')
                setTitle('Список задач')
                break
            case 'addTask':
                setLinkToUrl('/')
                setLinkToText('Список задач')
                setTitle('Добавление новой задачи')
                break
            case 'login':
                setLinkToUrl('/addTask')
                setLinkToText('Добавить задачу')
                setTitle('Авторизация пользователя')
                break
            case 'edit':
                setLinkToUrl('/')
                setLinkToText('Список задач')
                setTitle('Редактирование задачи')
                break
        }
        console.log("77")
    }, [currentUrl])

    const history = useHistory();

    const authorize = () => {

        if(!isAdmin)
            history.push({
                pathname: '/login',
                state: { detail: isAdmin }
            });
        else {
            confirmAlert({
                title: 'Выход',
                message: 'Выйти из режима администратора?',
                buttons: [
                    {
                        label: 'да',
                        onClick: () => logout()
                    },
                    {
                        label: 'нет',
                        onClick: () => console.log("close!")
                    }
                ]
            });
        }
    }

    const logout = () => {
        localStorage.clear()
        console.log('104 isAdmin', isAdmin)
        console.log("105 token = " + token)

        setAdmin(null)
        setToken(null)

        toast.info("Деавторизация прошла успешно!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })

        setTimeout(() => {
            history.push('/')
        }, 3000);
    }

    const classes = useStyles();

    return (
        <Container>

            <StyledNavWrapper>
                <nav>
                    <StyledNavButtons>
                        <StyledButtonSwitch>
                            {linkToUrl &&
                            <NavLink to={linkToUrl}>{linkToText}</NavLink>}
                        </StyledButtonSwitch>
                        <span id='break'>|</span>
                        <StyledButtonSwitch onClick={authorize}> {isAdmin ? 'Выйти' : 'Войти' }</StyledButtonSwitch>
                    </StyledNavButtons>
                </nav>
            </StyledNavWrapper>

            <NavWrapper>
                <nav>
                    <Grid item xs={12} className={classes.headContainer}>
                        <Box display="flex" justifyContent="space-between" gridGap="2rem">
                            <Typography variant="h4" component="h1">
                                {title}
                            </Typography>
                        </Box>
                    </Grid>
                </nav>
            </NavWrapper>

            <ToastContainer />

        </Container>
    )
}