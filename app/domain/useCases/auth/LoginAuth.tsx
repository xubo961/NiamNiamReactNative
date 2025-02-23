import {AuthRepositoryImpl} from "../../../data/repositories/AuthRepository";
import {UserInterface, UserLogininterface} from "../../entities/User";

const {login} = new AuthRepositoryImpl()

export const LoginAuhtUseCase = async (user: UserLogininterface) => {
    return await login(user)
}