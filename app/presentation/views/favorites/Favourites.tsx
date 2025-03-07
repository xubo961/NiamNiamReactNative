import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions,
    FlatList,
    ActivityIndicator
} from "react-native";
import styles from "./StylesFavorites";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import ViewModel from "../favorites/FavoritesViewModel";
import Toast from 'react-native-toast-message';
import { useUserLocalStorage } from "../../hooks/useUserLocalStorage";
import { FavoritosInterface } from "../../../domain/entities/FavoritosReceta";

const { width } = Dimensions.get("window");

export const FavouritesScreen = ({ navigation }: PropsStackNavigation) => {
    const { user, getUserSession } = useUserLocalStorage();
    const { favListRecetas, loadFavRecetas, showLoading, deleteReceta, deleteSession } = ViewModel.FavoritesViewModel();

    const [visible, setVisible] = useState(false);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        if (user?.id) {
            loadFavRecetas(user.id)
                .catch(() => setLoadError(true));
        } else {
            getUserSession();
        }

        const interval = setInterval(() => {
            if (user?.id) {
                loadFavRecetas(user.id)
                    .catch(() => setLoadError(true));
            }
        }, 1000);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [user]);

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

    // Función para manejar la eliminación de recetas de favoritos y recargar la lista
    const recargarPaginaEliminar = (usuarioId: number, recetaId: number, index: number) => {
        deleteReceta(usuarioId, recetaId, index); // Ahora solo llamamos a la función para eliminar y actualizar el estado
        Toast.show({
            type: "success",
            text1: "Receta eliminada de favoritos",
        });
    };

    const mostrarFavItems = ({ item, index }: { item: FavoritosInterface, index: number }) => (
        <View style={styles.favItemContainer}>
            <View style={styles.menuContainer}>
                <Text style={styles.favItemTitle}>{item.nameReceta}</Text>
                <Image source={{ uri: item.imageReceta }} style={styles.recipeImage} />
                {/*<Text>{item.ingredientsReceta}</Text>*/}
                {/*<Text>{item.preparationReceta}</Text>*/}
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (user?.id) {
                        recargarPaginaEliminar(user.id, item.id, index); // Llamamos a la función para eliminar y recargar
                    }
                }}
                style={styles.deleteButton}
            >
                <Text style={styles.deleteButtonText}>Eliminar de favoritos</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Provider>
            <View style={styles.container}>
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
                                deleteSession();
                                navigation.navigate("WelcomeScreen");
                            }}
                            title="Logout"
                        />
                    </Menu>
                </View>

                <Text style={styles.welcome}>Welcome to your favorites</Text>

                {showLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : loadError ? (
                    <Text style={styles.errorText}>Hubo un error al cargar tus recetas favoritas.</Text> // Mensaje de error
                ) : favListRecetas.length === 0 ? (
                    <Text style={styles.noFavoritesText}>No tienes recetas favoritas.</Text>
                ) : (
                    <FlatList
                        data={favListRecetas}
                        renderItem={mostrarFavItems}
                        keyExtractor={(item) => item.idReceta.toString()}
                    />
                )}
            </View>
        </Provider>
    );
};
