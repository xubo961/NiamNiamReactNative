import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {ChangePasswordRequest} from "../../../domain/entities/User";
import Toast from "react-native-toast-message";
import {AxiosError} from "axios";
import {useState} from "react";

export const AddViewModel = () => {

    let [changingPassword, setChangingPassword] = useState(false);

    const deleteSession = async () => {
        await deleteUserUseCase();
    };

    const addRecipeUseCase = async (usuarioId: number | undefined, recipe: {
        nameReceta: string;
        preparationReceta: string;
        imageReceta: string;
        idReceta: number;
        ingredientsReceta: string
    }) => {
        try {
            const response = await ApiDelivery.post(`/recetas/add/${usuarioId}`, recipe);
            return response.data;
        } catch (error) {
            console.error("Error adding recipe:", error);
            return null;
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
        addRecipeUseCase,
        changePassword,
        changingPassword,
    };
};

export default { AddViewModel };
