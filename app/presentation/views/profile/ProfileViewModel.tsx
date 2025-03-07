import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery"; // Asegúrate de tener tu API configurada
import { MisRecetasInterface } from "../../../domain/entities/MisRecetas"; // Importa tu interfaz para las recetas
import Toast from 'react-native-toast-message';
import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";

export const ProfileViewModel = () => {
    let [recetasList, setRecetasList] = useState<MisRecetasInterface[]>([]);
    let [showLoading, setShowLoading] = useState(true); // Estado de carga

    // Función para cargar todas las recetas del usuario
    const loadMisRecetas = async (usuarioId: number) => {
        ApiDelivery.get(`/recetas/usuario/${usuarioId}`)
            .then((response) => {
                setRecetasList(response.data); // Actualizamos la lista de recetas
                console.log(response.data);
                setShowLoading(false); // Indicamos que terminó la carga
                Toast.show({
                    type: "success",
                    text1: "Recetas cargadas con éxito",
                });
            })
            .catch((error) => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: "Hubo un error al cargar las recetas.",
                    text2: `Error: ${error.response ? error.response.status : error.message}`,
                });
                setShowLoading(false); // Termina la carga incluso si hay error
            });
    };

    // Función para eliminar una receta de la lista
    const deleteReceta = async (usuarioId: number, recetaId: number, index: number) => {
        try {
            // Realizamos la solicitud DELETE a la API
            const response = await ApiDelivery.delete(`/recetas/usuario/${usuarioId}/receta/${recetaId}`);

            // Si la eliminación es exitosa, actualizamos la lista de recetas
            if (response.status === 204) {
                // Eliminar la receta de la lista de recetas en el estado
                const updatedRecetasList = [...recetasList];
                updatedRecetasList.splice(index, 1);  // Eliminamos la receta en la posición del índice
                setRecetasList(updatedRecetasList); // Actualizamos el estado con la lista modificada
                Toast.show({
                    type: 'success',
                    text1: "Receta eliminada correctamente.",
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

            // Usar type guard para asegurarnos de que el error es del tipo 'Error' (o cualquier otro tipo específico)
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

    // Función para eliminar la sesión del usuario
    const deleteSession = async () => {
        await deleteUserUseCase();
    };

    return {
        deleteSession,
        recetasList,
        setRecetasList,
        loadMisRecetas,
        showLoading,
        deleteReceta, // Se agrega la función de eliminación aquí
    };
};

export default { ProfileViewModel };
