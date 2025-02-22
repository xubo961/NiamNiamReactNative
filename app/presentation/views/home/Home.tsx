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
} from "react-native";
import styles from "./StylesHome";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";

const { width } = Dimensions.get("window");

export const HomeScreen = ({ navigation }: PropsStackNavigation) => {
    const [visible, setVisible] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    useEffect(() => {
        // Fetch recipes from the API
        const fetchRecipes = async () => {
            try {
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
                );
                const data = await response.json();
                setRecipes(data.meals || []);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    // Fetch detailed recipe information
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

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Provider>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        style={[styles.logo, { width: width * 0.15, height: width * 0.15 }]}
                        source={require("../../../../assets/logoniamniam.png")}
                    />
                    <Text style={[styles.title, { fontSize: width * 0.06 }]}>What’s for eat?</Text>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <MaterialIcons name="more-vert" size={30} color="black" />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={() => alert("Acerca de")} title="About us" />
                        <Menu.Item onPress={() => alert("Hola:D")} title="Hola:D" />
                        <Menu.Item onPress={() => alert("jaja")} title="jaja" />
                        <Divider />
                        <Menu.Item onPress={() => navigation.navigate("WelcomeScreen")} title="Logout" />
                    </Menu>
                </View>
                <Text style={[styles.welcomeText, { fontSize: width * 0.05 }]}>Welcome, Name</Text>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <Text style={[styles.tab, styles.activeTab]}>Principales</Text>
                    <Text style={styles.tab}>Guarniciones</Text>
                    <Text style={styles.tab}>Postres</Text>
                    <Text style={styles.tab}>Sopas</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#555"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>

                {/* Recipe Cards */}
                <FlatList
                    data={filteredRecipes}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => fetchRecipeDetails(item.idMeal)}
                            style={styles.card}
                        >
                            <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{item.strMeal}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={styles.horizontalCardWrapper}
                />

                {/* Recipe Modal */}
                {showModal && (
                    <Modal
                        visible={showModal}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <ScrollView style={styles.modalScrollContent}>
                                    {/* Recipe Name */}
                                    <Text style={styles.modalTitle}>{selectedRecipe?.strMeal}</Text>

                                    {/* Description Section */}
                                    <View style={styles.descriptionContainer}>
                                        <Text style={styles.descriptionTitle}>Description</Text>
                                        <Text style={styles.descriptionText}>
                                            <Text style={styles.boldText}>Ingredients:</Text> {"\n"}
                                            {selectedRecipe?.strIngredient1 && `• ${selectedRecipe.strIngredient1}`}{"\n"}
                                            {selectedRecipe?.strIngredient2 && `• ${selectedRecipe.strIngredient2}`}{"\n"}
                                            {selectedRecipe?.strIngredient3 && `• ${selectedRecipe.strIngredient3}`}{"\n"}
                                            {selectedRecipe?.strIngredient4 && `• ${selectedRecipe.strIngredient4}`}{"\n"}
                                            {/* Add more ingredients if available */}
                                            {"\n"}
                                            <Text style={styles.boldText}>Preparation:</Text> {"\n"}
                                            {selectedRecipe?.strInstructions}
                                        </Text>
                                    </View>

                                    {/* Recipe Image */}
                                    <Image
                                        source={{ uri: selectedRecipe?.strMealThumb }}
                                        style={styles.modalRecipeImage}
                                    />
                                </ScrollView>
                                {/* Close Button */}
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
