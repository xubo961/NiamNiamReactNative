import React, {useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./StylesHome";
import {Divider, Menu, Provider} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {PropsStackNavigation} from "../../interfaces/StackNav";

export const HomeScreen = ({navigation}: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false); // Controlar la visibilidad del menú

    const openMenu = () => setVisible(true); // Abrir el menú
    const closeMenu = () => setVisible(false); // Cerrar el menú

    return (
        <Provider>
            <View style={styles.header}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require("../../../../assets/logoniamniam.png")}/>
                    <Text>What's for eat?</Text>
                    <View style={styles.header}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <TouchableOpacity onPress={openMenu}>
                                    <MaterialIcons name="more-vert" size={30} color="black"/>
                                </TouchableOpacity>}
                        >
                            <Menu.Item onPress={() => alert('Option 1 selected')} title="Acerca de"/>
                            <Menu.Item onPress={() => alert('Option 2 selected')} title="Hola:D"/>
                            <Menu.Item onPress={() => alert('Option 3 selected')} title="jaja"/>
                            <Divider/>
                            <Menu.Item onPress={() => navigation.navigate("WelcomeScreen")} title="Logout"/>
                        </Menu>
                    </View>
                </View>
            </View>
        </Provider>
    )
}
