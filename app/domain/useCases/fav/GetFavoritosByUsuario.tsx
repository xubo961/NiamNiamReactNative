import {FavRepositoryImpl} from "../../../data/repositories/FavRepository";

const repository = new FavRepositoryImpl();

export const GetFavoritosByUsuarioUseCase = async (usuarioId: number) => {
    return await repository.getFavoritosByUsuario(usuarioId);
};