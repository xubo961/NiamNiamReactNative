import React, { useState, useEffect } from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    FlatList,
    Modal,
    ScrollView,
    Linking
} from "react-native";
import styles from "./StylesHome";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import { AppColors } from "../../theme/AppTheme";
import ViewModel from "./HomeViewModel";
import {FavoritosService} from "../../../data/repositories/FavRepository";

const { width } = Dimensions.get("window");

export const HomeScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Chicken");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const { deleteSession } = ViewModel.HomeViewModel();

    // Sincronizar favoritos al cargar el componente
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const userId = 1; // Aquí usarías el ID real del usuario
                const favoritos = await FavoritosService.obtenerFavoritos(userId);
                const favoriteIds = new Set(favoritos.map((fav) => fav.idReceta));
                setFavorites(favoriteIds);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, []);

    const toggleFavorite = async (id: string) => {
        try {
            const userId = 1; // Aquí usarías el ID real del usuario
            const newFavorites = new Set(favorites);
            if (newFavorites.has(id)) {
                await FavoritosService.quitarDeFavoritos(userId, Number(id));
                newFavorites.delete(id);
            } else {
                await FavoritosService.agregarAFavoritos(userId, Number(id));
                newFavorites.add(id);
            }
            setFavorites(newFavorites);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const isFavorite = (id: string) => favorites.has(id);

    const openUrlBo = () => {
        Linking.openURL('https://github.com/xubo961/')
            .catch(err => console.error("Error al intentar abrir la URL: ", err));
    };

    const openUrlSantiago = () => {
        Linking.openURL('https://github.com/SNgomez27')
            .catch(err => console.error("Error al intentar abrir la URL: ", err));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
                );
                const data = await response.json();
                setRecipes(data.meals || []);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };
        fetchRecipes();
    }, [selectedCategory]);

    const fetchRecipeDetails = async (id: string) => {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await response.json();
            setSelectedRecipe(data.meals[0]);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        }
    };

    const fetchAllRecipes = async () => {
        try {
            if (search.trim() === "") {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
                );
                const data = await response.json();
                setRecipes(data.meals || []);
            } else {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
                );
                const data = await response.json();
                setRecipes(data.meals || []);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
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
                    <Text style={[styles.title, { fontSize: width * 0.06, flexShrink: 1 }]}>What’s for eat?</Text>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <MaterialIcons name="more-vert" size={30} color="black" />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={() => {openUrlBo()}} title="About Bo" />
                        <Menu.Item onPress={() => {openUrlSantiago()}} title="About Santiago" />
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

                <Text style={[styles.welcomeText, { fontSize: width * 0.05, overflow: "hidden" }]}>Welcome, Name</Text>

                <ScrollView
                    horizontal
                    style={styles.categoryScroll}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryWrapper}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.idCategory}
                            onPress={() => setSelectedCategory(category.strCategory)}
                            style={[styles.categoryItem, { maxWidth: width * 0.3 }]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.strCategory && styles.activeCategoryText,
                                ]}
                                numberOfLines={1}
                            >
                                {category.strCategory}
                            </Text>
                            {selectedCategory === category.strCategory && (
                                <View style={styles.activeCategoryUnderline} />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#555"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                    <TouchableOpacity onPress={fetchAllRecipes}>
                        <Text style={{ color: AppColors.rojo, marginRight: 10 }}>Search</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => fetchRecipeDetails(item.idMeal)}
                            style={styles.card}
                        >
                            <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{item.strMeal}</Text>
                            <TouchableOpacity
                                style={styles.favoriteButton}
                                onPress={() => toggleFavorite(item.idMeal)}
                            >
                                <MaterialIcons
                                    name={isFavorite(item.idMeal) ? "favorite" : "favorite-border"}
                                    size={24}
                                    color={isFavorite(item.idMeal) ? AppColors.rojo : "black"}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={styles.horizontalCardWrapper}
                />

                {showModal && (
                    <Modal
                        visible={showModal}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <ScrollView>
                                    <Text style={styles.modalTitle}>{selectedRecipe?.strMeal}</Text>
                                    <TouchableOpacity
                                        style={styles.favoriteButton}
                                        onPress={() => toggleFavorite(selectedRecipe.idMeal)}
                                    >
                                        <MaterialIcons
                                            name={isFavorite(selectedRecipe.idMeal) ? "favorite" : "favorite-border"}
                                            size={24}
                                            color={isFavorite(selectedRecipe.idMeal) ? AppColors.rojo : "black"}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.descriptionTitle}>Description</Text>
                                        <Text style={styles.descriptionText}>
                                            <Text style={styles.boldText}>Ingredients:</Text> {"\n"}
                                            {selectedRecipe?.strIngredient1 && `• ${selectedRecipe.strIngredient1}`}{"\n"}
                                            {selectedRecipe?.strIngredient2 && `• ${selectedRecipe.strIngredient2}`}{"\n"}
                                            {selectedRecipe?.strIngredient3 && `• ${selectedRecipe.strIngredient3}`}{"\n"}
                                            {selectedRecipe?.strIngredient4 && `• ${selectedRecipe.strIngredient4}`}{"\n"}
                                            {"\n"}
                                            <Text style={styles.boldText}>Preparation:</Text> {"\n"}
                                            {selectedRecipe?.strInstructions}
                                        </Text>
                                    </View>
                                    <Image
                                        source={{ uri: selectedRecipe?.strMealThumb }}
                                        style={styles.modalRecipeImage}
                                    />
                                </ScrollView>
                                <TouchableOpacity
                                    style={styles.modalCloseButton}
                                    onPress={() => setShowModal(false)}
                                >
                                    <Text style={styles.modalCloseText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </Provider>
    );
};