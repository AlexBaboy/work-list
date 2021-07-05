import { combineReducers, configureStore } from "@reduxjs/toolkit";
import worklistStore from "./worklist";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  wl: worklistStore,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
