import {deleteUserUseCase} from "../../../domain/useCases/userLocal/DeleteUser";

export const AddViewModel =  () => {
    const deleteSession = async () => {
        await deleteUserUseCase();
    }

    return {
        deleteSession
    }
}

export default {AddViewModel};