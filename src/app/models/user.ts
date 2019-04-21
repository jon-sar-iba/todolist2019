export interface User {
    firstName?: string;
    lastName?: string;
    secondLastName?: string;
    email?: string;
    username?: string;
    password?: string;
}
export interface AuthToken {
    token: string;
    expires: string;
}