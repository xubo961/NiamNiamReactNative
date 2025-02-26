import {deleteUserUseCase} from "../../../domain/useCases/userLocal/DeleteUser";
import {deleteFavCase} from "../../../domain/useCases/fav/deleteFav";
import {ApiDeliveryResponse} from "../../../data/sources/remote/models/ResponseApiDelivery";
import {FavoritosRecetaInterface} from "../../../domain/entities/FavoritosReceta";
import {UserInterface} from "../../../domain/entities/User";
import {addFavCase} from "../../../domain/useCases/fav/addFav";

export const HomeViewModel =  () => {
    const deleteSession = async () => {
        await deleteUserUseCase();
    }

    const addFavorite = async (
        user: UserInterface,
        receta: FavoritosRecetaInterface
    ): Promise<ApiDeliveryResponse> => {
        try {
            const response = await addFavCase(user, receta);
            return response;
        } catch (error) {
            console.error("Error adding favorite:", error);
            throw error;
        }
    };

    const deleteFavorite = async (
        user: UserInterface,
        receta: FavoritosRecetaInterface
    ): Promise<ApiDeliveryResponse> => {
        try {
            const response = await deleteFavCase(user, receta);
            return response;
        } catch (error) {
            console.error("Error deleting favorite:", error);
            throw error;
        }
    };

    return {
        addFavorite,
        deleteFavorite,
        deleteSession
    };
}

export default {HomeViewModel};