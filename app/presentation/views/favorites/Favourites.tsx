import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Linking,
    Dimensions
} from "react-native";
import styles from "./StylesFavorites";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";

const { width } = Dimensions.get("window");

export const FavouritesScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const openUrlBo = () => {
        Linking.openURL("https://github.com/xubo961/").catch(err =>
            console.error("Error al intentar abrir la URL: ", err)
        );
    };

    const openUrlSantiago = () => {
        Linking.openURL("https://github.com/SNgomez27").catch(err =>
            console.error("Error al intentar abrir la URL: ", err)
        );
    };

    return (
        <Provider>
            <View style={styles.container}>
                {/* HEADER */}
                <View style={styles.header}>
                    <Image
                        style={[styles.logo, { width: width * 0.15, height: width * 0.15 }]}
                        source={require("../../../../assets/logoniamniam.png")}
                    />
                    <Text style={[styles.title, { fontSize: width * 0.06, flexShrink: 1 }]}>
                        Favorites
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
                        <Menu.Item onPress={openUrlBo} title="About Bo" />
                        <Menu.Item onPress={openUrlSantiago} title="About Santiago" />
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

                <Text style={styles.welcome}>Welcome to your favorites</Text>

                {/* BARRA DE BÚSQUEDA */}
                <View style={styles.searchContainer}>
                    <MaterialIcons
                        name="search"
                        size={24}
                        color="black"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#555"
                    />
                </View>
            </View>
        </Provider>
    );
};
