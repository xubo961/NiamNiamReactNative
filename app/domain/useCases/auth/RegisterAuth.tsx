import {AuthRepositoryImpl} from "../../../data/repositories/AuthRepository";
import {UserInterface} from "../../entities/User";

const {register} = new AuthRepositoryImpl()

export const RegisterAuhtUseCase = async (user: UserInterface) => {
    return await register(user)
}