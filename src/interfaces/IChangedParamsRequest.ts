export interface IChangedParamsRequest {
    sortFieldName: string | undefined,
    sortDirection: string | undefined,
    currentPage: number,
    url?: string
}