import {ITask} from "./ITask";

export interface IWorklistState {
    list: ITask[];
    isLoading: boolean;
    isError: boolean;
    currentPage: number;
    currentUrl: string;
    exceptionText: string;
    recordsOnPage: number;
    totalTaskCount: number;
    sortFieldName: string | undefined;
    sortDirection: string | undefined;
    sortUsernameType: string | undefined;
    sortEmailType: string | undefined;
    sortStatusType: string | undefined;
}