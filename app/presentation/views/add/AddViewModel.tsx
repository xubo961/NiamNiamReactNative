import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";

export const AddViewModel = () => {
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

    return { deleteSession, addRecipeUseCase };
};

export default { AddViewModel };
