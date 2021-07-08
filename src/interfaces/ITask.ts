export interface ITask {
    id?: number;
    username: string;
    email: string;
    text: string;
    status: boolean;
    image_path?: string;
}