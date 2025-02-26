import {deleteUserUseCase} from "../../../domain/useCases/userLocal/DeleteUser";

export const FavoritesViewModel = () =>{
    const deleteSession = async () =>{
        await deleteUserUseCase();
    }
    return {
        deleteSession
    }
}

export default {FavoritesViewModel};