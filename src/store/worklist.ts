import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {IWorklistState} from "../interfaces/IWorklistState";
import {Imessage} from "../interfaces/Imessage";

export const setWorklistInitial = createAsyncThunk(
    "worklist/setWorkListInitial",
    async () => {
        const response = await axios.get(process.env.REACT_APP_BASE_URL!);
        console.log(response?.data?.message?.tasks)
        return response?.data?.message;
    }
);

export const changePageRequest = createAsyncThunk(
    "worklist/changePageRequest",
    async (currentPage: number) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL!}&page=${currentPage}`);
        return response?.data?.message;
    }
);

export const changeRequest = createAsyncThunk(
    "worklist/changeRequest",
    async (changedParamsRequest: IChangedParamsRequest) => {
        console.log("changedUrl", changedParamsRequest.url);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL!}${changedParamsRequest.url}`);
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
    totalTaskCount: 50,
    sortFieldName: undefined,
    sortDirection: undefined,
    sortIdType: undefined,
    sortUsernameType: undefined,
    sortEmailType: undefined,
    sortStatusType: undefined
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

        // initial
        builder.addCase(setWorklistInitial.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(
            setWorklistInitial.fulfilled,
            (state, action: PayloadAction<Imessage>) => {
                console.log("action.payload", action.payload)
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
            console.log("89 action", action);
            state.sortFieldName = action.meta.arg.sortFieldName
            state.sortDirection = action.meta.arg.sortDirection
        });
        builder.addCase(
            (changeRequest.fulfilled),
            (state, action: PayloadAction<Imessage>) => {
                console.log("96 action.payload", action.payload)
                state.list = action.payload?.tasks;
                state.totalTaskCount = Number(action.payload?.total_task_count);
                state.isLoading = false;
            }
        );
        builder.addCase(changeRequest.rejected, (state, action) => {
            state.isError = true;
            state.exceptionText = action.error?.toString();
        });
    },
});

export default workListSlice.reducer;
export const { setCurrentPage, setAuthorized  } = workListSlice.actions;