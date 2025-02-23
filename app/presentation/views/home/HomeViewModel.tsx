import {deleteUserUseCase} from "../../../domain/useCases/userLocal/DeleteUser";

export const HomeViewModel =  () => {
    const deleteSession = async () => {
        await deleteUserUseCase();
    }

    return {
        deleteSession
    }
}

export default {HomeViewModel};