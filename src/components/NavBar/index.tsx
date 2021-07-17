import React from 'react'
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from 'styled-components'
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles} from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import {StyledNavButtons} from "../ui/StyledNavButtons";
import {StyledButtonSwitch} from "../ui/StyledButtonSwitch";
import {StyledNavWrapper} from "../ui/StyledNavWrapper";
import {useSelector} from "react-redux";
import {getCurrentUrl} from "../Selectors";

import {NavLink} from "react-router-dom";
import {useHistory} from "react-router";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useAppDispatch} from "../../store";

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
    const isAdmin = localStorage.getItem('isAdmin')
    const token = localStorage.getItem('token')

    let linkToUrl = '/addTask'
    let linkToText = 'Добавить задачу'
    let title = 'Список задач'

    console.log("47 currentUrl = " + currentUrl)
    console.log("47 isAdmin = " + isAdmin)
    console.log("47 token = " + token)

    switch (currentUrl) {
        case '/':
            linkToUrl = '/addTask'
            linkToText = 'Добавить задачу'
            title = 'Список задач'
            break
        case '/addTask':
            linkToUrl = '/'
            linkToText = 'Список задач'
            title = 'Добавление новой задачи'
            break
        case '/login':
            linkToUrl = '/addTask'
            linkToText = 'Добавить задачу'
            title = 'Авторизация пользователя'
            break
        case '/edit/:id':
            linkToUrl = '/'
            linkToText = 'Список задач'
            title = 'Редактирование задачи'
            break
        break
    }

    const history = useHistory();
    const dispatch = useAppDispatch();

    const authorize = () => {
        console.log("authorize")

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
        </Container>
    )
}