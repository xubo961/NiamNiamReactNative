import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions,
    FlatList,
    ActivityIndicator, Modal, TextInput, Pressable, Alert
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
    const {
        favListRecetas,
        loadFavRecetas,
        showLoading,
        deleteReceta,
        deleteSession,
        changingPassword,
        changePassword, } = ViewModel.FavoritesViewModel();

    const [visible, setVisible] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const recargarPaginaEliminar = (usuarioId: number, recetaId: number, index: number) => {
        deleteReceta(usuarioId, recetaId, index);
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
                        recargarPaginaEliminar(user.id, item.id, index);
                    }
                }}
                style={styles.deleteButton}
            >
                <Text style={styles.deleteButtonText}>Eliminar de favoritos</Text>
            </TouchableOpacity>
        </View>
    );

    const handlePasswordChange = async () => {
        if (newPassword.length < 6) {
            Alert.alert("Error", "The new password must be at least 6 characters long.");
            return;
        }

        if (currentPassword === newPassword) {
            Alert.alert("Error", "The new password cannot be the same as the current one.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "The passwords do not match.");
            return;
        }

        try {
            await changePassword({
                email: user?.email || "",
                oldPassword: currentPassword,
                newPassword,
            });

            Alert.alert("Success", "The password has been successfully changed.");
            setModalVisible(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert("Error", "There was an unexpected problem when changing the password.");
            }
        }
    };

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require("../../../../assets/logoniamniam.png")}
                        style={[styles.logo, { width: width * 0.15, height: width * 0.15 }]}
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
                        <Menu.Item onPress={() => { closeMenu(); setModalVisible(true); }} title="Change Password" />
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
                    <Text style={styles.errorText}>Hubo un error al cargar tus recetas favoritas.</Text>
                ) : favListRecetas.length === 0 ? (
                    <Text style={styles.noFavoritesText}>No tienes recetas favoritas.</Text>
                ) : (
                    <FlatList
                        data={favListRecetas}
                        renderItem={mostrarFavItems}
                        keyExtractor={(item) => item.idReceta.toString()}
                    />
                )}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title1}>Change Password</Text>

                            <Text style={styles.label}>Current password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Enter your current password"
                            />

                            <Text style={styles.label}>New password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Enter your new password"
                            />

                            <Text style={styles.label}>Confirm new password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm your new password"
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.saveButton, changingPassword && { opacity: 0.6 }]}
                                    onPress={handlePasswordChange}
                                    disabled={changingPassword}
                                >
                                    <Text style={styles.saveButtonText}>
                                        {changingPassword ? "Saving..." : "Save"}
                                    </Text>
                                </TouchableOpacity>
                                <Pressable
                                    style={styles.cancelButton}
                                    onPress={() => {
                                        setModalVisible(false);
                                        setCurrentPassword("");
                                        setNewPassword("");
                                        setConfirmPassword("");
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </Provider>
    );
};
