import React, {useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {FormInputInlineWithIcon} from "../../components/TextInput";
import {RoundedButton} from "../../components/RoundedButton";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import viewModel from "./ViewModel";
import styles from "./StylesRegister";

export function RegisterScreen({navigation}: PropsStackNavigation) {
    const {onChangeLogin} = viewModel.LoginViewModel();
    const [isLogin, setIsLogin] = useState(false);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../../../assets/logoniamniam.png")}/>

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
                        onPressFormInterface={(text: string) => onChangeLogin('name', text)}
                    />

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

                    <FormInputInlineWithIcon
                        image={require("../../../../assets/logoniamniam.png")}
                        placeholder={"Repeat Password"}
                        keyboardType="default"
                        secureTextEntry={true}
                        onPressFormInterface={(text: string) => onChangeLogin('repeatPassword', text)}
                    />


                </View>

                <View style={{width: '100%', marginTop: "auto"}}>
                    <RoundedButton text={"Register"} onPressFromInterface={() => {
                    }}/>
                </View>
            </View>
        </View>
    );
}
