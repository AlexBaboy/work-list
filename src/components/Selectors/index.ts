import { RootState } from "../../store";
import {createSelector} from "@reduxjs/toolkit";

export const getCurrentTasks = (state:RootState) => state.wl.list
export const getTotalPageCount = (state:RootState) => state.wl.totalPageCount

export const getCurrentTasksPaginated = createSelector(
    (state: RootState) => getCurrentTasks(state),
    (state) => state.wl.currentPage * state.wl.recordsOnPage,
    (state) => state.wl.currentPage * state.wl.recordsOnPage - state.wl.recordsOnPage,
    (tasks, indexOfLastRecord, indexOfFirstRecord) =>
        tasks.slice(indexOfFirstRecord, indexOfLastRecord)
)