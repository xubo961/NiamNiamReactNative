import {FavoritosInterface} from "../../entities/FavoritosReceta";
import {FavRepositoryImpl} from "../../../data/repositories/FavRepository";

const repository = new FavRepositoryImpl();

export const AddFavoritos = async (favorito: FavoritosInterface) => {
    return await repository.addFavorito(favorito);
};