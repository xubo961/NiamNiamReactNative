import { useState } from "react";
import { ApiDelivery } from "../../../data/sources/remote/api/ApiDelivery";
import { MisRecetasInterface } from "../../../domain/entities/MisRecetas";
import Toast from "react-native-toast-message";
import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";
import {ChangePasswordRequest} from "../../../domain/entities/User";
import {ChangePasswordUseCase} from "../../../domain/useCases/userChangePassword/ChangePassword";
import {AxiosError} from "axios";

export const ProfileViewModel = () => {
    let [recetasList, setRecetasList] = useState<MisRecetasInterface[]>([]);
    let [showLoading, setShowLoading] = useState(true);
    let [changingPassword, setChangingPassword] = useState(false);

    const loadMisRecetas = async (usuarioId: number) => {
        ApiDelivery.get(`/recetas/usuario/${usuarioId}`)
            .then((response) => {
                setRecetasList(response.data);
                console.log(response.data);
                setShowLoading(false);
                Toast.show({
                    type: "success",
                    text1: "Recipes loaded successfully",
                });
            })
            .catch((error) => {
                console.log(error);
                Toast.show({
                    type: "error",
                    text1: "There was an error loading the recipes.",
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
                    type: "success",
                    text1: "Recipe deleted successfully.",
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "The recipe could not be deleted.",
                    text2: `Error: ${response.status}`,
                });
            }
        } catch (error: unknown) {
            console.error("Error deleting recipe: ", error);

            if (error instanceof Error) {
                Toast.show({
                    type: "error",
                    text1: "There was an error deleting the recipe.",
                    text2: error.message,
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Unknown error.",
                    text2: "There was a problem processing the request.",
                });
            }
        }
    };

    const deleteSession = async () => {
        await deleteUserUseCase();
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
                // Manejar mensaje del backend
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

    return {
        deleteSession,
        recetasList,
        setRecetasList,
        loadMisRecetas,
        showLoading,
        deleteReceta,
        changePassword,
        changingPassword,
    };
};

export default { ProfileViewModel };
