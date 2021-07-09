import { RootState } from "../../store";
import {createSelector} from "@reduxjs/toolkit";

export const getLoadingStatus = (state:RootState) => state.wl.isLoading
export const getErrorStatus = (state:RootState) => state.wl.isError

export const getCurrentTasks = (state:RootState) => state.wl.list
export const getTotalTaskCount = (state:RootState) => state.wl.totalTaskCount
export const getRecordsCountOnPage = (state:RootState) => state.wl.recordsOnPage
export const getCurrentPage = (state:RootState) => state.wl.currentPage



export const getSortIdType = (state:RootState) => state.wl.sortIdType
export const getSortUserNameType = (state:RootState) => state.wl.sortUsernameType
export const getSortEmailType = (state:RootState) => state.wl.sortEmailType
export const getSortStatusType = (state:RootState) => state.wl.sortStatusType

export const getCurrentUrlStr = createSelector(
    (state: RootState) => getSortIdType(state),
    (state: RootState) => getSortUserNameType(state),
    (state: RootState) => getSortEmailType(state),
    (state: RootState) => getSortStatusType(state),
    (state: RootState) => getCurrentPage(state),
    (sortIdType, sortUserNameType, sortEmailType, sortStatusType, currentPage) =>
    {
        let url = ''
        if( sortIdType ) url = `&sort_field=id&sort_direction=${sortIdType}`
        if( sortUserNameType ) url = `&sort_field=username&sort_direction=${sortUserNameType}`
        if( sortEmailType ) url = `&sort_field=email&sort_direction=${sortEmailType}`
        if( sortStatusType ) url = `&sort_field=status&sort_direction=${sortStatusType}`
        if( currentPage ) url += `&page=${currentPage}`

        return url
    }
)