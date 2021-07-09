import {ITask} from "./ITask";

export interface IWorklistState {
    list: ITask[];
    isLoading: boolean;
    isError: boolean;
    currentPage: number;
    exceptionText: string;
    recordsOnPage: number;
    authorized: boolean;
    totalTaskCount: number;
    sortIdType: string | undefined;
    sortUsernameType: string | undefined;
    sortEmailType: string | undefined;
    sortStatusType: string | undefined;
}