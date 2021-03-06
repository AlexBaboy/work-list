import {RootState} from "./index";
import {createSelector} from "@reduxjs/toolkit";

export const getLoadingStatus = (state: RootState) => state.wl.isLoading
export const getErrorStatus = (state: RootState) => state.wl.isError

export const getCurrentTasks = (state: RootState) => state.wl.list
export const getTotalTaskCount = (state: RootState) => state.wl.totalTaskCount
export const getRecordsCountOnPage = (state: RootState) => state.wl.recordsOnPage
export const getCurrentPage = (state: RootState) => state.wl.currentPage
export const getCurrentUrl = (state: RootState) => state.wl.currentUrl

export const getTotalPageCount = createSelector(
    (state: RootState) => getTotalTaskCount(state),
    (state) => getRecordsCountOnPage(state),
    (totalTaskCount, taskPerPage) =>
        totalTaskCount / taskPerPage
)

export const getSortUserNameType = (state: RootState) => state.wl.sortUsernameType
export const getSortEmailType = (state: RootState) => state.wl.sortEmailType
export const getSortStatusType = (state: RootState) => state.wl.sortStatusType

export const getSortFieldName = (state: RootState) => state.wl.sortFieldName
export const getSortDirection = (state: RootState) => state.wl.sortDirection

export const getCurrentTaskInitialById = (id: number) => (state: RootState) => state.wl.list.find(task => task.id === id)