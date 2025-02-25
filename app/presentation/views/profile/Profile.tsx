import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView, TextInput
} from "react-native";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import styles from "./StylesProfile";

export const ProfileScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <View style={styles.container}>

                {/* HEADER */}
                <View style={styles.headerContainer}>
                    <Image
                        source={require("../../../../assets/logoniamniam.png")}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>PROFILE</Text>

                    {/* Menú de 3 puntos (MaterialIcons) */}
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
                            <Menu.Item onPress={() => alert("Acerca de")} title="Acerca de" />
                            <Menu.Item onPress={() => alert("Hola:D")} title="Hola:D" />
                            <Menu.Item onPress={() => alert("jaja")} title="jaja" />
                            <Divider />
                            <Menu.Item
                                onPress={() => navigation.navigate("WelcomeScreen")}
                                title="Logout"
                            />
                        </Menu>
                    </View>
                </View>

                {/* NOMBRE DE USUARIO */}
                <View style={styles.usernameContainer}>
                    <Text style={styles.usernameText}>Nombre de Usuario</Text>
                </View>

                {/* DESCRIPCIÓN */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>Description</Text>
                    <TextInput placeholder={"Description..."}></TextInput>
                </View>

                {/* SECCIÓN: "Tus recetas" */}
                <Text style={styles.sectionTitle}>Tus recetas</Text>

                {/* GRID de recetas (4 ejemplos) */}
                <ScrollView contentContainerStyle={styles.recipesContainer}>
                    <View style={styles.recipeItem}>
                        <Image
                            source={{ uri: "https://example.com/pollo-al-limon.jpg" }}
                            style={styles.recipeImage}
                        />
                        <Text style={styles.recipeTitle}>Pollo al limón</Text>
                    </View>
                </ScrollView>


            </View>
        </Provider>
    );
};
