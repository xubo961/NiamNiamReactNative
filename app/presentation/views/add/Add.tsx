import React, { useState, useEffect } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./StylesAdd";
import { Divider, Menu, Provider } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import { MultiSelect } from "react-native-element-dropdown";
import * as ImagePicker from 'expo-image-picker';
import ViewModel from "../add/AddViewModel";
import { useUserLocalStorage } from "../../hooks/useUserLocalStorage";

const { width, height } = Dimensions.get('window');

const data = [
    { label: 'Egg', value: 'Egg' },
    { label: 'Beef', value: 'Beef' },
    { label: 'Rice', value: 'Rice' },
    { label: 'Chicken', value: 'Chicken' },
    { label: 'Potatoes', value: 'Potatoes' },
    { label: 'Pork', value: 'Pork' },
    { label: 'Salmon', value: 'Salmon' },
    { label: 'Spaghetti', value: 'Spaghetti' },
    { label: 'Onion', value: 'Onion' },
    { label: 'Sausages', value: 'Sausages' },
    { label: 'Banana', value: 'Banana' },
    { label: 'Avocado', value: 'Avocado' },
];

export const AddScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [state, setState] = useState({
        name: "",
        ingredients: [] as string[],
        image: [] as string[],
        description: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const { user } = useUserLocalStorage();
    const { deleteSession,
        addRecipeUseCase,
        changingPassword,
        changePassword} = ViewModel.AddViewModel();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const openUrlBo = () => {
        Linking.openURL('https://github.com/xubo961/')
            .catch(err => console.error("Error al intentar abrir la URL: ", err));
    };

    const openUrlSantiago = () => {
        Linking.openURL('https://github.com/SNgomez27')
            .catch(err => console.error("Error al intentar abrir la URL: ", err));
    };

    const renderItem = (item: { label: string, value: string }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setState(prevState => ({
                ...prevState,
                image: [result.assets[0].uri]
            }));
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setState(prevState => ({
                ...prevState,
                image: [result.assets[0].uri]
            }));
        }
    };

    const handleChangeText = (value: string, name: string) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveProduct = async () => {
        if (!user) {
            console.log("No user found");
            return;
        }

        setIsSaving(true);

        const recipeData = {
            idReceta: Date.now(),
            nameReceta: state.name,
            ingredientsReceta: state.ingredients.join(", "),
            preparationReceta: state.description,
            imageReceta: state.image.length > 0 ? state.image[0] : "",
        };

        const response = await addRecipeUseCase(user.id, recipeData);
        setIsSaving(false);

        if (response) {
            console.log("Recipe added successfully:", response);

            setState({
                name: "",
                ingredients: [],
                image: [],
                description: "",
            });

            alert("Recipe saved successfully!");
        } else {
            console.error("Failed to add recipe.");
            alert("Failed to save recipe.");
        }
    };

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
                        Add Recipe
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

                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                    <View style={styles.card}>
                        <Text style={[styles.titleDivTetxt, { fontSize: width * 0.05 }]}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter name"
                            onChangeText={(value) => handleChangeText(value, "name")}
                            value={state.name}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={[styles.titleDivTetxt, { fontSize: width * 0.05 }]}>Ingredients</Text>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Ingredients"
                            value={state.ingredients}
                            search
                            searchPlaceholder="Search..."
                            onChange={items => setState(prevState => ({
                                ...prevState,
                                ingredients: items
                            }))}
                            renderItem={renderItem}
                            renderSelectedItem={(item, unSelect) => (
                                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                                    <View style={styles.selectedStyle}>
                                        <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                        <AntDesign color="black" name="delete" size={17} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={[styles.titleDivTetxt, { fontSize: width * 0.05 }]}>Image</Text>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
                                {state.image.length > 0 ? (
                                    <Image source={{ uri: state.image[0] }} style={styles.image} />
                                ) : (
                                    <AntDesign name="plus" size={32} color="black" />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto}>
                                <Text style={styles.takePhotoButtonText}>Take a photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.titleDivTetxt}>Description</Text>
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Type..."
                                multiline
                                onChangeText={(value) => handleChangeText(value, "description")}
                                value={state.description}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={saveProduct}>
                        <Text style={styles.saveButtonText}>{isSaving ? "Saving..." : "Save"}</Text>
                    </TouchableOpacity>
                </ScrollView>
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
                                style={styles.inputPassword}
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm your new password"
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.saveButtonPassword, changingPassword && { opacity: 0.6 }]}
                                    onPress={handlePasswordChange}
                                    disabled={changingPassword}
                                >
                                    <Text style={styles.saveButtonTextPassword}>
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
