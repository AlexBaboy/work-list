import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {IWorklistState} from "../interfaces/IWorklistState";
import {Imessage} from "../interfaces/Imessage";
import {IChangedParamsRequest} from "../interfaces/IChangedParamsRequest";

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
    sortFieldName: 'id',
    sortDirection: 'asc',
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
    },
});

export default workListSlice.reducer;
export const { setAuthorized, setSortIdType, setSortUserNameType, setSortEmailType, setSortStatusType  } = workListSlice.actions;