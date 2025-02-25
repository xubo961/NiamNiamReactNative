import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView, Linking
} from "react-native";
import styles from "./StylesFavorites";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import ViewModel from "../auth/ViewModel";

export const FavouritesScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false); // Controlar la visibilidad del menú

    const openMenu = () => setVisible(true);   // Abrir el menú
    const closeMenu = () => setVisible(false); // Cerrar el menú




    const openUrlBo = () => {
        Linking.openURL('https://github.com/xubo961/')
            .catch(err => console.error("Error al intentar abrir la URL: ", err));
    };

    const openUrlSantiago = () => {
        Linking.openURL('https://github.com/SNgomez27')
            .catch(err => console.error("Error al intentar abrir la URL: ", err));
    };


    return (
        <Provider>
            <View style={styles.container}>
                {/* HEADER */}
                <View style={[styles.headerContainer,{ justifyContent: "center"}]}>
                    {/* Logo */}
                    <Image
                        style={styles.logo}
                        source={require("../../../../assets/logoniamniam.png")}
                    />

                    {/* Título */}
                    <Text style={styles.title}>Favorites</Text>
                    <View style={styles.menuContainer}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <TouchableOpacity onPress={openMenu}>
                                    <MaterialIcons name="more-vert" size={30} color="black" />
                                </TouchableOpacity>
                            }
                        >
                            <Menu.Item onPress={() => {openUrlBo()}} title="About Bo" />
                            <Menu.Item onPress={() => {openUrlSantiago()}} title="About Santiago" />
                            <Divider />
                            <Menu.Item
                                onPress={() => {
                                   // deleteSession();
                                    navigation.navigate("WelcomeScreen");
                                }}
                                title="Logout"
                            />
                        </Menu>
                    </View>
                </View>

                <Text style={styles.welcome}>Welcome to yours favorites</Text>

                {/* BARRA DE BÚSQUEDA */}
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#555" />
                </View>

            </View>
        </Provider>
    );
};
