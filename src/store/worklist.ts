import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {IWorklistState} from "../interfaces/IWorklistState";
import {Imessage} from "../interfaces/Imessage";

export const setWorklistInitial = createAsyncThunk(
    "worklist/setWorkListInitial",
    async (searchId, { getState, requestId }) => {
        //const response = await axios.get(process.env.REACT_APP_BASE_URL);
        const response = await axios.get("https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Alex");
        console.log(response?.data?.message?.tasks)
        return response?.data?.message;
    }
);

export const changePageRequest = createAsyncThunk(
    "worklist/changePageRequest",
    async (currentPage) => {
        const response = await axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Alex&page=${currentPage}`);
        console.log(response?.data?.message?.tasks)
        return response?.data?.message;
    }
);


const workListInitialState: IWorklistState = {
    list: [],
    isLoading: true,
    isError: false,
    currentPage: 1,
    exceptionText: "",
    recordsOnPage: 3,
    authorized: false,
    totalPageCount: 50
};

const workListSlice = createSlice({
    name: "workListSlice",
    initialState: workListInitialState,

    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setAuthorized(state, action: PayloadAction<boolean>) {
            state.authorized = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(setWorklistInitial.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(
            setWorklistInitial.fulfilled,
            (state, action: PayloadAction<Imessage>) => {
                console.log("action.payload", action.payload)
                state.list = action.payload?.tasks;
                state.totalPageCount = Number(action.payload?.total_task_count);
                state.isLoading = false;
            }
        );
        builder.addCase(setWorklistInitial.rejected, (state, action) => {
            state.isError = true;
            state.exceptionText = action.error?.toString();
        });
    },
});

export default workListSlice.reducer;
export const { setCurrentPage, setAuthorized } = workListSlice.actions;