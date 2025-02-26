import {ApiDeliveryResponse} from "../../data/sources/remote/models/ResponseApiDelivery";
import {FavoritosRecetaInterface} from "../entities/FavoritosReceta";
import {UserInterface} from "../entities/User";

export interface FavRepository {
    addFav: (user: UserInterface,favoritosReceta: FavoritosRecetaInterface) => Promise<ApiDeliveryResponse>;
    deleteFav: (user: UserInterface, favoritosReceta: FavoritosRecetaInterface) => Promise<ApiDeliveryResponse>;
}
