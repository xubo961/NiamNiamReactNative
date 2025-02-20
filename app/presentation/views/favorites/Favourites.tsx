import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from "react-native";
import styles from "./StylesFavorites";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";

export const FavouritesScreen = ({ navigation }: PropsStackNavigation) => {
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
                    <Text style={styles.title}>Favorites</Text>
                </View>

                {/* SUBTÍTULO / SALUDO */}
                <Text style={styles.welcome}>Welcome to yours favorites</Text>

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
                    {/* Plato 2 */}
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    {/* Plato 2 */}
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    {/* Plato 2 */}
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    {/* Plato 2 */}
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>
                    {/* Plato 2 */}
                    <View style={styles.dishItem}>
                        <Image
                            source={{ uri: "https://example.com/tarta-de-queso.jpg" }}
                            style={styles.dishImage}
                        />
                        <Text style={styles.dishText}>Tarta de queso</Text>
                    </View>

                    {/* Agrega más platos según necesites */}
                </ScrollView>
            </View>
        </Provider>
    );
};
