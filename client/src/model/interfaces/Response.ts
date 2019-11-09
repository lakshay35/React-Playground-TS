export interface Response<T> {
    response: T;
    message: string;
    statusCode: string;
}