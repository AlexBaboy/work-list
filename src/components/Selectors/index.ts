import { RootState } from "../../store";

export const getLoadingStatus = (state:RootState) => state.wl.isLoading
export const getErrorStatus = (state:RootState) => state.wl.isError

export const getCurrentTasks = (state:RootState) => state.wl.list
export const getTotalTaskCount = (state:RootState) => state.wl.totalTaskCount
export const getRecordsCountOnPage = (state:RootState) => state.wl.recordsOnPage
export const getCurrentPage = (state:RootState) => state.wl.currentPage

export const getSortFieldName = (state:RootState) => state.wl.sortFieldName
export const getSortDirection = (state:RootState) => state.wl.sortDirection

