import {useEffect, useState} from "react";
import {UserLogin} from "../../domain/entities/User";
import {getUserUseCase} from "../../domain/useCases/userLocal/GetUser";


export const useUserLocalStorage = () => {

    const [user, setUser] = useState<UserLogin>();

    useEffect(() => {
        getUserSession()
    }, []);

    const getUserSession =  async () => {
        const user = await getUserUseCase();
        setUser(user);
    }

    return {
        user,
        getUserSession,
    };

}