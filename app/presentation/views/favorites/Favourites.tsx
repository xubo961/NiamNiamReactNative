import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from "react-native";
import styles from "./StylesFavorites";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";

export const FavouritesScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false); // Controlar la visibilidad del menú

    const openMenu = () => setVisible(true);   // Abrir el menú
    const closeMenu = () => setVisible(false); // Cerrar el menú

    return (
        <Provider>
            <View style={styles.container}>
                {/* HEADER */}
                <View style={styles.headerContainer}>
                    {/* Logo */}
                    <Image
                        style={styles.logo}
                        source={require("../../../../assets/logoniamniam.png")}
                    />

                    {/* Título */}
                    <Text style={styles.title}>Favorites</Text>
                </View>

                {/* SUBTÍTULO / SALUDO */}
                <Text style={styles.welcome}>Welcome to yours favorites</Text>

                {/* BARRA DE BÚSQUEDA */}
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#555" />
                </View>
                {/* LISTA HORIZONTAL DE PLATOS */}

            </View>
        </Provider>
    );
};
