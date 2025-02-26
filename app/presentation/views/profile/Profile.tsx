import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions
} from "react-native";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import styles from "./StylesProfile";

const { width } = Dimensions.get("window");

export const ProfileScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <View style={styles.container}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Image
                        source={require("../../../../assets/logoniamniam.png")}
                        style={[styles.logo, { width: width * 0.15, height: width * 0.15 }]}
                    />
                    <Text style={[styles.title, { fontSize: width * 0.06, flexShrink: 1 }]}>
                        Profile
                    </Text>
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

                {/* NOMBRE DE USUARIO */}
                <View style={styles.usernameContainer}>
                    <Text style={styles.usernameText}>Nombre de Usuario</Text>
                </View>

                {/* DESCRIPCIÓN */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>Description</Text>
                    <TextInput placeholder={"Description..."} />
                </View>

                {/* SECCIÓN: "Tus recetas" */}
                <Text style={styles.sectionTitle}>Tus recetas</Text>

                {/* GRID de recetas */}
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
