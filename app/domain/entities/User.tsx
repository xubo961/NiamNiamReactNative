
export interface UserInterface {
    id?: number;
    firstName: string;
    email: string;
    password: string;
    repeatPassword?: string;
}

export type UserLogininterface = Pick<UserInterface, "email" | "password">;

export interface UserLogin extends UserInterface{
    token: string;
}