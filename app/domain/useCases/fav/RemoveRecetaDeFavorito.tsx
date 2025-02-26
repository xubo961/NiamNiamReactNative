import {FavRepositoryImpl} from "../../../data/repositories/FavRepository";

const repository = new FavRepositoryImpl();

export const RemoveRecetaDeFavoritosUseCase = async (usuarioId: number, recetaId: number) => {
    return await repository.removeRecetaDeFavoritos(usuarioId, recetaId);
};