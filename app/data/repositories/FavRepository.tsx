import {FavRepository} from "../../domain/repositories/FavRepository";
import {UserInterface} from "../../domain/entities/User";
import {ApiDeliveryResponse} from "../sources/remote/models/ResponseApiDelivery";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import {AxiosError} from "axios";
import {FavoritosRecetaInterface} from "../../domain/entities/FavoritosReceta";

export class FavRepositoryImpl implements FavRepository {

    async addFav(user: UserInterface, favoritosReceta: FavoritosRecetaInterface): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favoritos/usuario/${user.id}/add/${favoritosReceta.id}`, user);
            return response.data;
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse;
        }
    }

    async deleteFav(user: UserInterface, favoritosReceta: FavoritosRecetaInterface): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favoritos/usuario/${user.id}/remove/${favoritosReceta.id}`, user);
            return response.data;
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse;
        }
    }
}
