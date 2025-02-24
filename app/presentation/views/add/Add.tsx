import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import styles from "./StylesAdd";
import { Divider, Menu, Provider } from "react-native-paper";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import { MultiSelect } from "react-native-element-dropdown";
import * as ImagePicker from 'expo-image-picker';
import ViewModel from "../add/AddViewModel";

const { width, height } = Dimensions.get('window');

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export const AddScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [image, setImage] = useState<string | null>(null);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const {deleteSession} = ViewModel.AddViewModel();


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
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={[styles.logo, { width: width * 0.15, height: width * 0.15 }]}
                        source={require("../../../../assets/logoniamniam.png")}
                    />
                    <Text style={[styles.title, { fontSize: width * 0.06 }]}>Add Recipe</Text>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <MaterialIcons name="more-vert" size={30} color="black" />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={() => alert('Acerca de')} title="About us" />
                        <Menu.Item onPress={() => alert('Hola:D')} title="Hola:D" />
                        <Menu.Item onPress={() => alert('jaja')} title="jaja" />
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
                        <TextInput style={styles.input} placeholder="Enter name" />
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
                            value={selected}
                            search
                            searchPlaceholder="Search..."
                            onChange={item => setSelected(item)}
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
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.image} />
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
                            <Text style={styles.titleDivTetxt}>Descripción</Text>
                            <TextInput style={styles.descriptionInput} placeholder="Texto..." multiline />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Provider>
    );
};