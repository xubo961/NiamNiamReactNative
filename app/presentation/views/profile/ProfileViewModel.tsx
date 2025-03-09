import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";
import { MisRecetasInterface } from "../../../domain/entities/MisRecetas";
import Toast from 'react-native-toast-message';
import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";

export const ProfileViewModel = () => {
    let [recetasList, setRecetasList] = useState<MisRecetasInterface[]>([]);
    let [showLoading, setShowLoading] = useState(true);

    const loadMisRecetas = async (usuarioId: number) => {
        ApiDelivery.get(`/recetas/usuario/${usuarioId}`)
            .then((response) => {
                setRecetasList(response.data);
                console.log(response.data);
                setShowLoading(false);
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
                setShowLoading(false);
            });
    };

    const deleteReceta = async (usuarioId: number, recetaId: number, index: number) => {
        try {
            const response = await ApiDelivery.delete(`/recetas/usuario/${usuarioId}/receta/${recetaId}`);

            if (response.status === 204) {
                const updatedRecetasList = [...recetasList];
                updatedRecetasList.splice(index, 1);
                setRecetasList(updatedRecetasList);
                Toast.show({
                    type: 'success',
                    text1: "Receta eliminada correctamente.",
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
        recetasList,
        setRecetasList,
        loadMisRecetas,
        showLoading,
        deleteReceta,
    };
};

export default { ProfileViewModel };
