import React, {useEffect, useState} from "react";
import {Image, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import styles from "./StylesLogin";
import {FormInputInlineWithIcon} from "../../components/TextInput";
import {RoundedButton} from "../../components/RoundedButton";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import viewModel from "./ViewModel";

export function LoginScreen({navigation}: PropsStackNavigation) {

    const {email, password, onChangeLogin, login, errorMessage, user} = viewModel.LoginViewModel();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (errorMessage != "")
            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    }, [errorMessage]);

    useEffect(() => {
        if (user && user?.token) {
            console.log(JSON.stringify(user));
            navigation.replace("AdminTabNavigator");
        }
    }, [user]);


    return (
        <View style={[styles.container]}>
            <Image style={styles.logo} source={require("../../../../assets/logoniamniam.png")}/>
            <View style={styles.card}>
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, isLogin && styles.activeButton]}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={[styles.toggleText, isLogin && styles.activeText]}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, !isLogin && styles.activeButton]}
                        onPress={() => navigation.navigate("RegisterScreen")}
                    >
                        <Text style={[styles.toggleText, !isLogin && styles.activeText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formInput}>
                    <FormInputInlineWithIcon
                        image={require("../../../../assets/logoniamniam.png")}
                        placeholder={"E-Mail"}
                        keyboardType="email-address"
                        secureTextEntry={false}
                        onPressFormInterface={(text: string) => onChangeLogin('email', text)}
                    />

                    <FormInputInlineWithIcon
                        image={require("../../../../assets/logoniamniam.png")}
                        placeholder={"Password"}
                        keyboardType="default"
                        secureTextEntry={true}
                        onPressFormInterface={(text: string) => onChangeLogin('password', text)}
                    />
                </View>

                <View style={{width: '100%', marginTop: "auto"}}>
                    <RoundedButton text={"Log In"} onPressFromInterface={() => {
                        login()
                    }}/>
                </View>
            </View>
        </View>
    );
}