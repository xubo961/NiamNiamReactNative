import React, {useState, useEffect} from "react";
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
import {Divider, Menu, Provider} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import styles from "./StylesProfile";
import ProfileViewModel from "../profile/ProfileViewModel";
import {useUserLocalStorage} from "../../hooks/useUserLocalStorage";
import Toast from 'react-native-toast-message';
import {MisRecetasInterface} from "../../../domain/entities/MisRecetas"; // Añadido para notificaciones

const {width} = Dimensions.get("window");

export const ProfileScreen = ({navigation}: PropsStackNavigation) => {
    const {user} = useUserLocalStorage();
    const {recetasList, loadMisRecetas, showLoading, deleteReceta, deleteSession} = ProfileViewModel.ProfileViewModel();

    const [visible, setVisible] = useState(false);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        if (user?.id) {
            loadMisRecetas(user.id)
                .catch(() => setLoadError(true));
        }
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

    const recargarPaginaEliminar = (usuarioId: number, recetaId: number, index: number) => {
        deleteReceta(usuarioId, recetaId, index); // Llamamos a la función para eliminar y actualizar el estado
        Toast.show({
            type: "success",
            text1: "Receta eliminada de tu perfil",
        });
    };

    const mostrarMisRecetasItem = ({item, index}: { item: MisRecetasInterface, index: number }) => (
        <View style={styles.misRecetasItemContainer}>
            <View style={styles.menuContainer}>
                <Text style={styles.yourRecipesItemTitle}>{item.nameReceta}</Text>
                <Image source={{uri: item.imageReceta}} style={styles.recipeImage}/>
                <Text>{item.ingredientsReceta}</Text>
                <Text>{item.preparationReceta}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (user?.id) {
                        recargarPaginaEliminar(user.id, item.id, index); // Llamamos a la función para eliminar y recargar
                    }
                }}
                style={styles.deleteButton}
            >
                <Text style={styles.deleteButtonText}>Eliminar receta</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../../../../assets/logoniamniam.png")}
                        style={[styles.logo, {width: width * 0.15, height: width * 0.15}]}
                    />
                    <Text style={[styles.title, {fontSize: width * 0.06, flexShrink: 1}]}>
                        Profile
                    </Text>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <MaterialIcons name="more-vert" size={30} color="black"/>
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={openUrlBo} title="About Bo"/>
                        <Menu.Item onPress={openUrlSantiago} title="About Santiago"/>
                        <Divider/>
                        <Menu.Item
                            onPress={() => {
                                deleteSession();
                                navigation.navigate("WelcomeScreen");
                            }}
                            title="Logout"
                        />
                    </Menu>
                </View>

                <Text style={styles.yourRecipesText}>Your Food Recipes</Text>

                {showLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : loadError ? (
                    <Text style={styles.errorText}>Hubo un error al cargar tus recetas.</Text> // Mensaje de error
                ) : recetasList.length === 0 ? (
                    <Text style={styles.noMisRecetasText}>No tienes recetas guardadas.</Text>
                ) : (
                    <FlatList
                        data={recetasList}
                        renderItem={mostrarMisRecetasItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>
        </Provider>
    );
};
