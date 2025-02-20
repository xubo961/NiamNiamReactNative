import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./StylesRegister"; // Cambia la ruta o el nombre si lo deseas
import { FormInputInlineWithIcon } from "../../components/TextInput";
import { RoundedButton } from "../../components/RoundedButton";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import viewModel from "./ViewModel";

export function RegisterScreen({ navigation }: PropsStackNavigation) {

    // Aquí asumimos que tienes una función de ViewModel para el registro
    // similar a la de Login (LoginViewModel). Ajusta el nombre según tu implementación.
    const { onChangeRegister, onRegister } = viewModel.RegisterViewModel();

    return (
        <View style={styles.container}>

            {/* Contenedor de imagen (encabezado) */}
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../../../../assets/logoniamniam.png")}
                />
            </View>

            {/* Contenedor del formulario */}
            <View style={styles.formContainer}>

                <FormInputInlineWithIcon
                    image={require("../../../../assets/logoniamniam.png")}
                    placeholder={"Name"}
                    keyboardType="default"
                    secureTextEntry={false}
                    onPressFormInterface={(text: string) => onChangeRegister("name", text)}
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

                {/* Botón para registrar */}
                <View style={{ marginTop: 20 }}>
                    <RoundedButton
                        text={"Register"}
                        onPressFromInterface={() => {
                            onRegister();
                            navigation.navigate("HomeScreen");
                        }}
                    />
                </View>

                {/* Enlace para ir al login en caso de tener cuenta */}
                <View style={styles.textContainer}>
                    <Text style={styles.text}>¿Ya tienes cuenta?</Text>
                    <Text
                        style={[styles.text, { color: "blue" }]}
                        onPress={() => navigation.navigate("LoginScreen")}
                    >
                        Inicia sesión
                    </Text>
                </View>

            </View>
        </View>
    );
}
