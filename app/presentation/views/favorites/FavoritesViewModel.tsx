import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";
import { FavoritosInterface } from "../../../domain/entities/FavoritosReceta";
import Toast from 'react-native-toast-message';
import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";
import {ChangePasswordRequest} from "../../../domain/entities/User";
import {AxiosError} from "axios";

export const FavoritesViewModel = () => {
    let [favListRecetas, setFavListRecetas] = useState<FavoritosInterface[]>([]);
    let [showLoading, setShowLoading] = useState(true);
    let [changingPassword, setChangingPassword] = useState(false);

    const loadFavRecetas = async (usuarioId: number) => {
        ApiDelivery.get(`/favoritos/usuario/${usuarioId}`)
            .then((response) => {
                setFavListRecetas(response.data);
                console.log(response.data);
                setShowLoading(false);
                Toast.show({
                    type: "success",
                    text1: "Agregado a favoritos",
                })
            })
            .catch((error) => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: "Hubo un error al cargar las recetas.",
                    text2: `Error: ${error.response ? error.response.status : error.message}`,
                });
            });
    };

    const deleteReceta = async (usuarioId: number, recetaId: number, index: number) => {
        try {
            const response = await ApiDelivery.delete(`/favoritos/usuario/${usuarioId}/receta/${recetaId}`);

            if (response.status === 204) {
                const updatedFavList = [...favListRecetas];
                updatedFavList.splice(index, 1);
                setFavListRecetas(updatedFavList);
                Toast.show({
                    type: 'success',
                    text1: "Receta eliminada de tus favoritos.",
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: "No se pudo eliminar la receta.",
                    text2: `Error: ${response.status}`,
                });
            }
        } catch (error: unknown) {
            console.error("Error al eliminar receta: ", error);

            if (error instanceof Error) {
                Toast.show({
                    type: 'error',
                    text1: "Hubo un error al eliminar la receta.",
                    text2: error.message,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: "Error desconocido.",
                    text2: "Hubo un problema al procesar la solicitud.",
                });
            }
        }
    };

    const changePassword = async (request: ChangePasswordRequest) => {
        try {
            const response = await ApiDelivery.post("/users/change-password", request);

            if (response.status === 200) {
                Toast.show({
                    type: "success",
                    text1: "Password changed successfully.",
                });
            } else {
                throw new Error(response.data?.message || `Error ${response.status}`);
            }
        } catch (error) {

            if (error instanceof AxiosError && error.response?.status === 400) {

                const backendMessage = error.response.data?.message;

                if (backendMessage === "Current password incorrect") {
                    throw new Error("The current password is incorrect.");
                } else {
                    throw new Error(backendMessage || "There was an unexpected error.");
                }
            } else {
                throw new Error("There was a problem with the request.");
            }
        }
    };


    const deleteSession = async () => {
        await deleteUserUseCase();
    };

    return {
        deleteSession,
        favListRecetas,
        setFavListRecetas,
        loadFavRecetas,
        showLoading,
        deleteReceta,
        changePassword,
        changingPassword,
    };
};

export default { FavoritesViewModel };
