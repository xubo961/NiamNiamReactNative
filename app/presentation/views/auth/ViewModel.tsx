import React, {useEffect, useState} from "react";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {RegisterAuhtUseCase} from "../../../domain/useCases/auth/RegisterAuth";
import {LoginAuhtUseCase} from "../../../domain/useCases/auth/LoginAuth";
import * as child_process from "node:child_process";
import {UserLogin, UserLogininterface} from "../../../domain/entities/User";
import {SaveUserUseCase} from "../../../domain/useCases/userLocal/SaveUser";
import {getUserUseCase} from "../../../domain/useCases/userLocal/GetUser";
import {useUserLocalStorage} from "../../hooks/useUserLocalStorage";

const LoginViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const {user, getUserSession} = useUserLocalStorage();

    const login = async () => {
        if (validateForm()) {
            const response = await LoginAuhtUseCase(values as UserLogininterface)
            if (!response.success) {
                setErrorMessage(response.message)
            }
            else {
                await SaveUserUseCase(response.data as UserLogin)
                await getUserSession()
                console.log(JSON.stringify(user))
            }
        }

    }

    const onChangeLogin = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }

    const validateForm = () => {
        if (values.email === "") {
            setErrorMessage("El correo es obligatorio")
            return false
        }
        if (values.password === "") {
            setErrorMessage("La contraseña es obligatoria")
            return false
        }
        return true
    }

    return {
        ...values,
        onChangeLogin,
        login,
        user,
        errorMessage
    }
}

const RegisterViewModel = () => {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [values, setValues] = useState({
        firstName: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const onChangeRegister = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }

    const register = async () => {
        if (validateForm()) {
            const response = await RegisterAuhtUseCase(values)
            console.log("RESULT: " + JSON.stringify(response))
        }

    }

    const validateForm = () => {
        if (values.firstName === "") {
            setErrorMessage("El nombre es obligatorio")
            return false
        }
        if (values.email === "") {
            setErrorMessage("El correo es obligatorio")
            return false
        }

        if (values.password === "") {
            setErrorMessage("La contraseña es obligatoria")
            return false
        }
        if (values.repeatPassword === "") {
            setErrorMessage("Repetir la contraseña es obligatoria")
            return false
        }
        if (values.password !== values.repeatPassword) {
            setErrorMessage("La contraseña no coinciden")
            return false
        }
        return true
    }

    return {
        ...values,
        onChangeRegister,
        register,
        errorMessage,
    }
}

export default {LoginViewModel, RegisterViewModel};


