import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from "react-native";
import React, {useState} from "react";
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./StylesHome";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";

export const HomeScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false); // Controlar la visibilidad del menú

    const openMenu = () => setVisible(true);   // Abrir el menú
    const closeMenu = () => setVisible(false); // Cerrar el menú

    return (

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.logo} source={require("../../../../assets/logoniamniam.png")} />
                    <Text style={styles.title}>What’s for eat?</Text>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <MaterialIcons name="more-vert" size={30} color="black" />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={() => alert('Acerca de')} title="Acerca de" />
                        <Menu.Item onPress={() => alert('Hola:D')} title="Hola:D" />
                        <Menu.Item onPress={() => alert('jaja')} title="jaja" />
                        <Divider />
                        <Menu.Item onPress={() => navigation.navigate("WelcomeScreen")} title="Logout" />
                    </Menu>
                </View>
                <Text style={styles.welcomeText}>Welcome, Name</Text>
                <View style={styles.tabContainer}>
                    <Text style={[styles.tab, styles.activeTab]}>Principales</Text>
                    <Text style={styles.tab}>Guarniciones</Text>
                    <Text style={styles.tab}>Postres</Text>
                    <Text style={styles.tab}>Sopas</Text>
                </View>
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput style={styles.searchInput} placeholder="Search..." placeholderTextColor="#555" />
                </View>
            </ScrollView>
        </Provider>
    );
}
