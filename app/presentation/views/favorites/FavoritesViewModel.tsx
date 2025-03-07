import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";
import { FavoritosInterface } from "../../../domain/entities/FavoritosReceta";
import Toast from 'react-native-toast-message';
import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";

export const FavoritesViewModel = () => {
    let [favListRecetas, setFavListRecetas] = useState<FavoritosInterface[]>([]);
    let [showLoading, setShowLoading] = useState(true);

    // Cargar todas las recetas favoritas de un usuario específico
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
            // Realizamos la solicitud DELETE a la API
            const response = await ApiDelivery.delete(`/favoritos/usuario/${usuarioId}/receta/${recetaId}`);

            // Si la eliminación es exitosa, actualizamos la lista de recetas favoritas
            if (response.status === 204) {
                // Eliminar la receta de la lista de favoritos en el estado
                const updatedFavList = [...favListRecetas];
                updatedFavList.splice(index, 1);  // Eliminamos la receta en la posición del índice
                setFavListRecetas(updatedFavList); // Actualizamos el estado con la lista modificada
                Toast.show({
                    type: 'success',
                    text1: "Receta eliminada de tus favoritos.",
                });
            } else {
                // Si el servidor no devuelve el código de éxito 204
                Toast.show({
                    type: 'error',
                    text1: "No se pudo eliminar la receta.",
                    text2: `Error: ${response.status}`,
                });
            }
        } catch (error: unknown) {
            console.error("Error al eliminar receta: ", error);

            // Usar type guard para asegurarnos de que el error es del tipo 'AxiosError' (o cualquier otro tipo específico)
            if (error instanceof Error) {
                // Ahora TypeScript sabe que 'error' es de tipo 'Error' y puedes acceder a 'message' y 'stack'
                Toast.show({
                    type: 'error',
                    text1: "Hubo un error al eliminar la receta.",
                    text2: error.message, // Mostrar el mensaje del error
                });
            } else {
                // Si no es un error conocido, muestra un mensaje genérico
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
        deleteReceta, // Se agrega la función de eliminación aquí
    };
};

export default { FavoritesViewModel };
