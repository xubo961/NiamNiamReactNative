import React, {useEffect, useState} from "react";
import {Image, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {FormInputInlineWithIcon} from "../../components/TextInput";
import {RoundedButton} from "../../components/RoundedButton";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import viewModel from "./ViewModel";
import styles from "./StylesRegister";
import {useNavigation} from "@react-navigation/native";

export function RegisterScreen({navigation}: PropsStackNavigation) {

    const {
        firstName,
        email,
        password,
        repeatPassword,
        onChangeRegister,
        register,
        errorMessage
    } = viewModel.RegisterViewModel();

    useEffect(() => {
        if (errorMessage != "") {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }
    }, [errorMessage]);

    const [isLogin, setIsLogin] = useState(false);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../../../assets/logoniamniam.png")} />

            <View style={styles.card}>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, isLogin && styles.activeButton]}
                        onPress={() => navigation.navigate("LoginScreen")}
                    >
                        <Text style={[styles.toggleText, isLogin && styles.activeText]}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, !isLogin && styles.activeButton]}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={[styles.toggleText, !isLogin && styles.activeText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formInput}>
                    <FormInputInlineWithIcon
                        image={require("../../../../assets/logoniamniam.png")}
                        placeholder={"Name"}
                        keyboardType="default"
                        secureTextEntry={false}
                        onPressFormInterface={(text: string) => onChangeRegister("firstName", text)}
                    />

                    <FormInputInlineWithIcon
                        image={require("../../../../assets/logoniamniam.png")}
                        placeholder={"E-Mail"}
                        keyboardType="email-address"
                        secureTextEntry={false}
                        onPressFormInterface={(text: string) => onChangeRegister("email", text)}
                    />

                    <FormInputInlineWithIcon
                        image={require("../../../../assets/logoniamniam.png")}
                        placeholder={"Password"}
                        keyboardType="default"
                        secureTextEntry={true}
                        onPressFormInterface={(text: string) => onChangeRegister("password", text)}
                    />

                    <FormInputInlineWithIcon
                        image={require("../../../../assets/logoniamniam.png")}
                        placeholder={"Repeat Password"}
                        keyboardType="default"
                        secureTextEntry={true}
                        onPressFormInterface={(text: string) => onChangeRegister("repeatPassword", text)}
                    />
                </View>

                <View style={{ width: "100%", marginTop: "auto" }}>
                    <RoundedButton text={"Register"} onPressFromInterface={() => register()} />
                </View>
            </View>
        </View>
    );
}
