import {FavRepositoryImpl} from "../../../data/repositories/FavRepository";

const repository = new FavRepositoryImpl();

export const GetAllFavoritos = async () => {
    return await repository.getAllFavoritos();
};
