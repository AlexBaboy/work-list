import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {IWorklistState} from "../interfaces/IWorklistState";
import {Imessage} from "../interfaces/Imessage";
import {IChangedParamsRequest} from "../interfaces/IChangedParamsRequest";
import {ITask} from "../interfaces/ITask";
import {fdatasync} from "fs";

export const setWorklistInitial = createAsyncThunk(
    "worklist/setWorkListInitial",
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL!}?developer=Alex`);
        console.log(response?.data?.message?.tasks)
        return response?.data?.message;
    }
);

export const changeRequest = createAsyncThunk(
    "worklist/changeRequest",
    async (changedParamsRequest: IChangedParamsRequest) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL!}?developer=Alex${changedParamsRequest.url}`);
        return response?.data?.message;
    }
);

export const addTaskRequest = createAsyncThunk(
    "worklist/addTaskRequest",
    async (newTask: FormData) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL!}create?developer=Alex`, newTask);
        return response?.data;
    }
);

export const loginRequest = createAsyncThunk(
    "worklist/loginRequest",
    async (loginData: FormData) => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL!}login/?developer=Alex`, loginData);
        return response?.data;
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
    totalTaskCount: 50,
    sortFieldName: 'id',
    sortDirection: 'asc',
    sortIdType: undefined,
    sortUsernameType: undefined,
    sortEmailType: undefined,
    sortStatusType: undefined,
    currentUrl: "/",
    token: undefined
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
        },
        setSortIdType(state, action: PayloadAction<string>) {
            state.sortIdType = action.payload
        },
        setSortUserNameType(state, action: PayloadAction<string>) {
            state.sortUsernameType = action.payload
        },
        setSortEmailType(state, action: PayloadAction<string>) {
            state.sortEmailType = action.payload
        },
        setSortStatusType(state, action: PayloadAction<string>) {
            state.sortStatusType = action.payload
        },
        setCurrentUrl(state, action: PayloadAction<string>) {
            state.currentUrl = action.payload
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        }
    },

    extraReducers: (builder) => {

        // initial
        builder.addCase(setWorklistInitial.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(
            setWorklistInitial.fulfilled,
            (state, action: PayloadAction<Imessage>) => {
                state.list = action.payload?.tasks;
                state.totalTaskCount = Number(action.payload?.total_task_count);
                state.isLoading = false;
            }
        );
        builder.addCase(setWorklistInitial.rejected, (state, action) => {
            state.isError = true;
            state.exceptionText = action.error?.toString();
        });

        //onchange
        builder.addCase(changeRequest.pending, (state, action) => {
            state.isLoading = true;
            state.sortFieldName = action.meta.arg.sortFieldName
            state.sortDirection = action.meta.arg.sortDirection
            state.currentPage = action.meta.arg.currentPage
        });
        builder.addCase(
            (changeRequest.fulfilled),
            (state, action: PayloadAction<Imessage>) => {
                state.list = action.payload?.tasks;
                state.totalTaskCount = Number(action.payload?.total_task_count);
                state.isLoading = false;
            }
        );
        builder.addCase(changeRequest.rejected, (state, action) => {
            state.isError = true;
            state.exceptionText = action.error?.toString();
        });

        //addTask
        builder.addCase(addTaskRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(
            (addTaskRequest.fulfilled),
            (state, action: PayloadAction<Imessage>) => {
                state.isLoading = false;
            }
        );
        builder.addCase(addTaskRequest.rejected, (state, action) => {
            state.isError = true;
            state.exceptionText = action.error?.toString();
        });

        // login
        builder.addCase(loginRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loginRequest.fulfilled,
            (state, action: PayloadAction<Imessage>) => {
                state.isLoading = false;
            }
        );
        builder.addCase(loginRequest.rejected, (state, action) => {
            state.isError = true;
            state.exceptionText = action.error?.toString();
        });
    },
});

export default workListSlice.reducer;
export const { setAuthorized, setSortIdType, setSortUserNameType, setSortEmailType, setSortStatusType, setCurrentUrl, setToken } = workListSlice.actions;