export interface ILoginResponse {
    status: string,
    message: {
        username: string,
        password: string,
        token: string
    }
}