import React from 'react'
import {createStyles, makeStyles} from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {IChangedParamsRequest} from "../../interfaces/IChangedParamsRequest";
import {changeRequest} from "../../store/worklist";
import {useDispatch} from "react-redux";

export const ArrowWrapper = (sortFieldName: string, sortDirection: string, currentPage: number) => {

    const dispatch = useDispatch();

    const useStyles = makeStyles((theme) =>
        createStyles({
            arrow : {
                cursor: 'pointer',
                width: '50px',
                height: '50px',
                margin: '-20px 0'
            }
        })
    );

    const classes = useStyles();

    const titleValue = (type: string = 'asc') => {
        return 'сортировать по ' +  (type === 'asc' ? ' убыванию' : 'возрастанию')
    }

    const changeParamsRequest = (name: string, type:string = 'asc') => {
        const changedParamsRequest: IChangedParamsRequest = {
            sortFieldName: name,
            sortDirection: type,
            currentPage: currentPage,
            url: `&sort_field=${name}&sort_direction=${type}&page=${currentPage}`
        }
        return dispatch(changeRequest( changedParamsRequest ))
    }

    return (
        <>
        {sortDirection === 'desc' ?
            <ArrowDropDownIcon titleAccess={titleValue(sortDirection)}  className={classes.arrow}  onClick={ () => changeParamsRequest(sortFieldName,sortDirection)} />
            :
            <ArrowDropUpIcon titleAccess={titleValue(sortDirection)} className={classes.arrow} onClick={ () => changeParamsRequest(sortFieldName,sortDirection)} />
        }
        </>
    )
}