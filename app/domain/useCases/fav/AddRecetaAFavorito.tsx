import {FavRepositoryImpl} from "../../../data/repositories/FavRepository";

const repository = new FavRepositoryImpl();

export const AddRecetaAFavoritosUseCase = async (usuarioId: number, recetaId: number) => {
    return await repository.addRecetaAFavoritos(usuarioId, recetaId);
};