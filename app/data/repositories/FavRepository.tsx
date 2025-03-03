import { AxiosError } from "axios";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";
import { ApiDeliveryResponse } from "../sources/remote/models/ResponseApiDelivery";
import {FavoritosInterface} from "../../domain/entities/FavoritosReceta";
import {FavRepository} from "../../domain/repositories/FavRepository";

export class FavRepositoryImpl implements FavRepository{

    async addFavorito(favorito: FavoritosInterface): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post("/favoritos/add", favorito);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async getAllFavoritos(): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.get("/favoritos");
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async getFavoritoById(id: number): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.get(`/favoritos/${id}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async getFavoritosByUsuario(usuarioId: number): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.get(`/favoritos/usuario/${usuarioId}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async addRecetaAFavoritos(usuarioId: number, recetaId: number): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.post(`/favoritos/usuario/${usuarioId}/receta/${recetaId}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }

    async removeRecetaDeFavoritos(usuarioId: number, recetaId: number): Promise<ApiDeliveryResponse> {
        try {
            const response = await ApiDelivery.delete(`/favoritos/usuario/${usuarioId}/receta/${recetaId}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = error as AxiosError;
            console.log("ERROR: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)) as ApiDeliveryResponse);
        }
    }
}
