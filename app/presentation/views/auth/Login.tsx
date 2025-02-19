import React from "react";
import { Image, Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; // Importamos el gradiente
import styles from "./StylesLogin";
import {FormInputInlineWithIcon} from "../../components/TextInput";
import {RoundedButton} from "../../components/RoundedButton";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import viewModel from "./ViewModel";


export function LoginScreen({navigation} : PropsStackNavigation) {

    const {onChangeLogin} = viewModel.LoginViewModel();


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../../../../assets/logoniamniam.png")}></Image>
            </View>

            <View style={styles.formContainer}>

                <FormInputInlineWithIcon
                    image={require("../../../../assets/logoniamniam.png")}
                    placeholder={"E-Mail"}
                    keyboardType="email-address"
                    secureTextEntry={false}
                    onPressFormInterface={(text: string) => onChangeLogin('email', text)}
                ></FormInputInlineWithIcon>

                <FormInputInlineWithIcon
                    image={require("../../../../assets/logoniamniam.png")}
                    placeholder={"Password"}
                    keyboardType="default"
                    secureTextEntry={true}
                    onPressFormInterface={(text:string) => onChangeLogin('password', text)}
                ></FormInputInlineWithIcon>

                <View>
                    <RoundedButton text={"Log In"} onPressFromInterface={() => {
                        // navigation.navigate("LoginScreen")
                    }}></RoundedButton>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>ForgotPassword?</Text>
                </View>

                {/*<View style={{marginTop: 30}}>*/}
                {/*    <RoundedButton text={"Registrar"} onPressFromInterface={() => {*/}
                {/*        navigation.navigate("RegisterScreen")*/}
                {/*    }}></RoundedButton>*/}
                {/*</View>*/}
            </View>

        </View>
    );
}
