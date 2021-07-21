export interface IAddTaskResponse {
    status: string,
    message: {
        id: number,
        username: string,
        email: string,
        text: string,
        status: number
    }
}