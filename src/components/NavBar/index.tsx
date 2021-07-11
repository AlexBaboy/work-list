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
import {getAuthorized, getCurrentUrl} from "../Selectors";

import {NavLink} from "react-router-dom";

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

    const authorizeStatus = useSelector(getAuthorized)
    const currentUrl = useSelector(getCurrentUrl)

    const linkToUrl = (currentUrl === '/') ? '/addTask' : '/'
    const linkToText = (currentUrl === '/') ? 'Добавить задачу' : 'Список задач'
    const title = (currentUrl === '/') ? 'Список задач' : 'Добавление новой задачи'

    const authorize = () => {
        console.log("authorize")
    }

    const classes = useStyles();

    return (
        <Container>

            <StyledNavWrapper>
                <nav>
                    <StyledNavButtons>
                        <StyledButtonSwitch>
                            <NavLink to={linkToUrl}>{linkToText}</NavLink>
                        </StyledButtonSwitch>
                        <span id='break'>|</span>
                        <StyledButtonSwitch onClick={authorize}> {authorizeStatus ? 'Выйти' : 'Войти' }</StyledButtonSwitch>
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