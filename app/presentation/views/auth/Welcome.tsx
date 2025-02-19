import {Button, Image, Text, View} from "react-native";
import styles from "./StylesWelcome";
import {RoundedButton} from "../../components/RoundedButton";
import {PropsStackNavigation} from "../../interfaces/StackNav";

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
                <Text style={styles.text}>
                    Dont have an account? Sign Up
                </Text>
            </View>

        </View>
    )
}