import {UserLogin} from "../../domain/entities/User";
import {LocalStorage} from "../sources/local/LocalStorage";
import {UserLocalRepository} from "../../domain/repositories/UserLocalRepository";

export class UserLocalRepositoryImpl implements UserLocalRepository{
    async save(user: UserLogin): Promise<void> {
        const {save} = LocalStorage();
        await save("niamniam_app_usuario", JSON.stringify(user));
    }

    async getUser(): Promise<UserLogin> {
        const {getItem} = LocalStorage();
        const data = await getItem("niamniam_app_usuario");
        return JSON.parse(data as any) as UserLogin;
    }

    async deleteItem(): Promise<void> {
        const {deleteItem} = LocalStorage();
        await deleteItem("niamniam_app_usuario");
    }
}

