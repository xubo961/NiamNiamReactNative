import {FavoritosRecetaInterface} from "../../entities/FavoritosReceta";
import {FavRepositoryImpl} from "../../../data/repositories/FavRepository";
import {UserInterface} from "../../entities/User";

const {addFav} = new FavRepositoryImpl();

export const addFavCase = async (user: UserInterface, favoritosReceta: FavoritosRecetaInterface) => {
    return await addFav(user, favoritosReceta);
};