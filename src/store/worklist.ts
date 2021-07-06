import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../interfaces/Task";

export const setWorklistInitial = createAsyncThunk(
    "worklist/setWorkListInitial",
    async (searchId, { getState, requestId }) => {
        //const response = await axios.get(process.env.REACT_APP_BASE_URL);
        const response = await axios.get("https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Alex");
        console.log(response?.data?.message?.tasks)
        return response?.data?.message?.tasks;
    }
);

interface IWorklistState {
    list: Task[];
    isLoading: boolean;
    isError: boolean;
    currentPage: number;
    exceptionText: string;
    recordsOnPage: number;
}

const workListInitialState: IWorklistState = {
    list: [],
    isLoading: true,
    isError: false,
    currentPage: 1,
    exceptionText: "",
    recordsOnPage: 3
};

const workListSlice = createSlice({
    name: "workListSlice",
    initialState: workListInitialState,

    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(setWorklistInitial.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(
            setWorklistInitial.fulfilled,
            (state, action: PayloadAction<[]>) => {
                state.list = action.payload;
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
export const { setCurrentPage } = workListSlice.actions;