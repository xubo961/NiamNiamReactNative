import {AuthRepositoryImpl} from "../../../data/repositories/AuthRepository";
import {ChangePasswordRequest} from "../../entities/User";

const { changePassword } = new AuthRepositoryImpl();

export const ChangePasswordUseCase = async (request: ChangePasswordRequest) => {
    return await changePassword(request);
};
