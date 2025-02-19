import {useState} from "react";

const LoginViewModel = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const onChangeLogin = (property: string, value: any) => {
        setValues({...values, [property]: value});
    }

    return {
        onChangeLogin
    }
}

export default {LoginViewModel};

