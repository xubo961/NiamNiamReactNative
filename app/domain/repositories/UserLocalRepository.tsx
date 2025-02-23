import {UserLogin} from "../entities/User";

export interface UserLocalRepository {
    save (user: UserLogin): Promise<void>;
    getUser(): Promise<UserLogin>;
    deleteItem(): Promise<void>;
}
