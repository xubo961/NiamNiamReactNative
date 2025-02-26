import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";
import { RemoveRecetaDeFavoritosUseCase } from "../../../domain/useCases/fav/RemoveRecetaDeFavorito";
import { FavoritosInterface } from "../../../domain/entities/FavoritosReceta";
import { GetFavoritosByUsuarioUseCase } from "../../../domain/useCases/fav/GetFavoritosByUsuario";
import { useEffect, useState } from "react";
import { AddFavoritos } from "../../../domain/useCases/fav/AddFavorito";
import { useUserLocalStorage } from "../../hooks/useUserLocalStorage";

export const HomeViewModel = () => {
    const [favoritos, setFavoritos] = useState<FavoritosInterface[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { user, getUserSession } = useUserLocalStorage();

    useEffect(() => {
        const fetchUserAndFavoritos = async () => {
            await getUserSession(); // Asegurar que el usuario está cargado
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

    const addFavorito = async (receta: FavoritosInterface) => {
        if (!user || !user.id) return;
        const response = await AddFavoritos(receta);
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

    return {
        deleteSession,
        favoritos,
        errorMessage,
        loadFavoritos,
        addFavorito,
        removeFavorito,
        isFavorite
    };
};

export default { HomeViewModel };
