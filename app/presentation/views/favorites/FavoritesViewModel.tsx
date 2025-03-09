import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";
import { FavoritosInterface } from "../../../domain/entities/FavoritosReceta";
import Toast from 'react-native-toast-message';
import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";

export const FavoritesViewModel = () => {
    let [favListRecetas, setFavListRecetas] = useState<FavoritosInterface[]>([]);
    let [showLoading, setShowLoading] = useState(true);

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
    };
};

export default { FavoritesViewModel };
