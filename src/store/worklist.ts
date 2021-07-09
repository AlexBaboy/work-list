import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {IWorklistState} from "../interfaces/IWorklistState";
import {Imessage} from "../interfaces/Imessage";
import {useSelector} from "react-redux";
import {getCurrentUrlStr} from "../components/Selectors";

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
    async (changedUrl: string) => {
        console.log("changedUrl", changedUrl);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL!}${changedUrl}`);
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
            console.log("52 payload", action.payload)
        },
        setSortUserNameType(state, action: PayloadAction<string>) {
            state.sortUsernameType = action.payload
            console.log("56 payload", action.payload)
        },
        setSortEmailType(state, action: PayloadAction<string>) {
            state.sortEmailType = action.payload
            console.log("60 payload", action.payload)
        },
        setSortStatusType(state, action: PayloadAction<string>) {
            state.sortStatusType = action.payload
            console.log("64 payload", action.payload)
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
        builder.addCase(changePageRequest.pending, (state, action) => {
            state.isLoading = true;
            state.currentPage = action.meta.arg
        });
        builder.addCase(
            changePageRequest.fulfilled,
            (state, action: PayloadAction<Imessage>) => {
                console.log("action.payload", action.payload)
                state.list = action.payload?.tasks;
                state.totalTaskCount = Number(action.payload?.total_task_count);
                state.isLoading = false;

            }
        );
        builder.addCase(changePageRequest.rejected, (state, action) => {
            state.isError = true;
            state.exceptionText = action.error?.toString();
        });
    },
});

export default workListSlice.reducer;
export const { setCurrentPage, setAuthorized, setSortIdType, setSortUserNameType, setSortEmailType, setSortStatusType } = workListSlice.actions;