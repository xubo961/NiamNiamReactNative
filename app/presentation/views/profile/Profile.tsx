import React from "react";
import {Button, Text, View} from "react-native";
import {PropsStackNavigation} from "../../interfaces/StackNav";

export const ProfileScreen = ({navigation, route}: PropsStackNavigation) => {


    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Ventana de perfil</Text>
            <Button title={"Cerrar sesión"} onPress={
                () => {
                    navigation.navigate("LoginScreen");
                }
            }></Button>
        </View>
    );

}