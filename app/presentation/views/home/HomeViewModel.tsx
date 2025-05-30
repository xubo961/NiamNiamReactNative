import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";
import { RemoveRecetaDeFavoritosUseCase } from "../../../domain/useCases/fav/RemoveRecetaDeFavorito";
import { FavoritosInterface } from "../../../domain/entities/FavoritosReceta";
import { GetFavoritosByUsuarioUseCase } from "../../../domain/useCases/fav/GetFavoritosByUsuario";
import { useEffect, useState } from "react";
import { AddFavoritos } from "../../../domain/useCases/fav/AddFavorito";
import { useUserLocalStorage } from "../../hooks/useUserLocalStorage";
import {ChangePasswordRequest} from "../../../domain/entities/User";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import Toast from "react-native-toast-message";
import {AxiosError} from "axios";

export const HomeViewModel = () => {
    const [favoritos, setFavoritos] = useState<FavoritosInterface[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { user, getUserSession } = useUserLocalStorage();
    let [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        const fetchUserAndFavoritos = async () => {
            await getUserSession();
        };
        fetchUserAndFavoritos();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            loadFavoritos(user.id);
        }
    }, [user]);

    const loadFavoritos = async (usuarioId: number) => {
        const response = await GetFavoritosByUsuarioUseCase(usuarioId);
        if (!response.success) {
            setErrorMessage(response.message);
        } else {
            setFavoritos(response.data);
        }
    };

    const addFavorito = async (favorito: FavoritosInterface) => {
        if (!user || !user.id) return;
        const response = await AddFavoritos(user.id, favorito);
        if (!response.success) {
            setErrorMessage(response.message);
        } else {
            await loadFavoritos(user.id);
        }
    };

    const removeFavorito = async (recetaId: number) => {
        if (!user || !user.id) return;
        const response = await RemoveRecetaDeFavoritosUseCase(user.id, recetaId);
        if (!response.success) {
            setErrorMessage(response.message);
        } else {
            await loadFavoritos(user.id);
        }
    };

    const isFavorite = (recetaId: number) => {
        return favoritos.some(fav => fav.idReceta === recetaId);
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
        favoritos,
        errorMessage,
        loadFavoritos,
        addFavorito,
        removeFavorito,
        isFavorite,
        changePassword,
        changingPassword,
    };
};

export default { HomeViewModel };