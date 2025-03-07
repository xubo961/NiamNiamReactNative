import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./StylesWelcome";
import {RoundedButton} from "../../components/RoundedButton";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {AppColors} from "../../theme/AppTheme";

export function WelcomeScreen({navigation} : PropsStackNavigation) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../../../../assets/logoniamniam.png")} />
            </View>

            <View style={styles.button}>
                <RoundedButton text={"Log In"} onPressFromInterface={() => {
                    navigation.navigate("LoginScreen")
                }}></RoundedButton>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                    <Text style={[styles.text, { color: AppColors.rojo }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}