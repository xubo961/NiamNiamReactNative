import { deleteUserUseCase } from "../../../domain/useCases/userLocal/DeleteUser";

export const ProfileViewModel = () => {
    const deleteSession = async () => {
        await deleteUserUseCase();
    };

    return { deleteSession };
};

export default { ProfileViewModel };
