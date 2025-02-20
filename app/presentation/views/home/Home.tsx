import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from "react-native";
import styles from "./StylesHome";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";

export const HomeScreen = ({ navigation }: PropsStackNavigation) => {
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
                    <Text style={styles.title}>What's for eat?</Text>

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

                {/* SUBTÍTULO / SALUDO */}
                <Text style={styles.welcome}>Welcome, Name</Text>

                {/* CATEGORÍAS */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>Principales</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>Guarniciones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>Postres</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>Sopas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>a</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>b</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Text style={styles.tabText}>c</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* BARRA DE BÚSQUEDA */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#999"
                    />
                </View>

                {/* LISTA HORIZONTAL DE PLATOS */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.dishesContainer}
                >
                    {/* Plato 1 */}
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/pollo-al-limon.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Pollo al limón</Text>
                    </View>

                    {/* Plato 2 */}
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>

                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>


                    {/* Agrega más platos según necesites */}
                </ScrollView>

                {/* FOOTER */}

            </View>
        </Provider>
    );
};
