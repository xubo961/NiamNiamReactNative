import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";
import { RemoveRecetaDeFavoritosUseCase } from "../../../domain/useCases/fav/RemoveRecetaDeFavorito";
import { FavoritosInterface } from "../../../domain/entities/FavoritosReceta";
import { GetFavoritosByUsuarioUseCase } from "../../../domain/useCases/fav/GetFavoritosByUsuario";
import { useEffect, useState } from "react";
import { AddFavoritos } from "../../../domain/useCases/fav/AddFavorito";
import { useUserLocalStorage } from "../../hooks/useUserLocalStorage";
import {AddRecetaAFavoritosUseCase} from "../../../domain/useCases/fav/AddRecetaAFavorito";

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

    const addRecetaToUserFavorites = async (recetaId: number) => {
        if (!user || !user.id) return;

        try {
            const response = await fetch(`http://172.24.192.1:8080/api/favoritos/usuario/${user.id}/receta/${recetaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verifica el código de estado para obtener más detalles
            if (response.ok) {
                // Actualiza los favoritos del usuario en el frontend
                await loadFavoritos(user.id);
            } else {
                const errorText = await response.text(); // Captura el texto de error de la respuesta
                setErrorMessage(`Failed to add recipe to favorites: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            setErrorMessage("An error occurred while adding the recipe to favorites");
            console.error(error);
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
        addRecetaToUserFavorites // Nueva función exportada
    };
};

export default { HomeViewModel };
