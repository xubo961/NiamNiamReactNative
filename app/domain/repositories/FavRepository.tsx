import {FavoritosInterface} from "../entities/FavoritosReceta";
import {ApiDeliveryResponse} from "../../data/sources/remote/models/ResponseApiDelivery";

export interface FavRepository {
    addFavorito: (usuarioId: number,favorito: FavoritosInterface) => Promise<ApiDeliveryResponse>;
    getAllFavoritos: () => Promise<ApiDeliveryResponse>;
    getFavoritoById: (id: number) => Promise<ApiDeliveryResponse>;
    getFavoritosByUsuario: (usuarioId: number) => Promise<ApiDeliveryResponse>;
    removeRecetaDeFavoritos: (usuarioId: number, recetaId: number) => Promise<ApiDeliveryResponse>;
}