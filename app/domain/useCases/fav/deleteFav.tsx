import {FavoritosRecetaInterface} from "../../entities/FavoritosReceta";
import {FavRepositoryImpl} from "../../../data/repositories/FavRepository";
import {UserInterface} from "../../entities/User";

const {deleteFav} = new FavRepositoryImpl();

export const deleteFavCase = async (user: UserInterface, favoritosReceta: FavoritosRecetaInterface) => {
    return await deleteFav(user, favoritosReceta);
};
