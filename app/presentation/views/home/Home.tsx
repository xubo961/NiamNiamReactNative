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
    Linking,
    Alert, ToastAndroid, Pressable,
} from "react-native";
import styles from "./StylesHome";
import { Divider, Menu, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsStackNavigation } from "../../interfaces/StackNav";
import { AppColors } from "../../theme/AppTheme";
import ViewModel from "./HomeViewModel";
import {useUserLocalStorage} from "../../hooks/useUserLocalStorage";

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

    const { user } = useUserLocalStorage();
    const {
        deleteSession,
        addFavorito,
        removeFavorito,
        isFavorite,
        changingPassword,
        changePassword} = ViewModel.HomeViewModel();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const openUrlBo = () => {
        Linking.openURL("https://github.com/xubo961/").catch((err) =>
            console.error("Error opening URL: ", err)
        );
    };

    const openUrlSantiago = () => {
        Linking.openURL("https://github.com/SNgomez27").catch((err) =>
            console.error("Error opening URL: ", err)
        );
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/categories.php"
                );
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

    const fetchRecipesByIngredients = async (ingredientsStr: string) => {
        const ingredientArray = ingredientsStr
            .split(",")
            .map((ing) => ing.trim())
            .filter((ing) => ing !== "");

        if (ingredientArray.length === 0) {
            Alert.alert("Please enter at least one ingredient");
            return;
        }

        try {
            const allResults = await Promise.all(
                ingredientArray.map(async (ing) => {
                    const response = await fetch(
                        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
                            ing
                        )}`
                    );
                    const data = await response.json();
                    return data.meals || [];
                })
            );

            let intersection = allResults[0];
            for (let i = 1; i < allResults.length; i++) {
                intersection = intersection.filter((meal) =>
                    allResults[i].some((m) => m.idMeal === meal.idMeal)
                );
            }

            if (intersection.length === 0) {
                Alert.alert("No recipes found for the selected ingredients");
            }
            setRecipes(intersection);
        } catch (error) {
            console.error("Error fetching recipes by ingredients:", error);
        }
    };

    const fetchAllRecipes = async () => {
        if (search.includes(",")) {
            await fetchRecipesByIngredients(search);
        } else {
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
        }
    };

    const botonFavorito = (recipe: any) => {
        if (isFavorite(recipe.idMeal)) {
            removeFavorito(recipe.idMeal);
            setFavorites((prev) => {
                const newFavorites = new Set(prev);
                newFavorites.delete(recipe.idMeal);
                return newFavorites;
            });
        } else {
            let ingredientsList = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== "") {
                    ingredientsList.push(`${measure} ${ingredient}`.trim());
                }
            }

            const favorito = {
                idReceta: recipe.idMeal,
                nameReceta: recipe.strMeal,
                ingredientsReceta: ingredientsList.join(", "),
                preparationReceta: recipe.strInstructions,
                imageReceta: recipe.strMealThumb,
            };

            addFavorito(favorito);
            setFavorites((prev) => new Set(prev).add(recipe.idMeal));
            ToastAndroid.show("Added to favorites", ToastAndroid.SHORT);
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
                        What's for eat?
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
                <Text style={styles.welcomeText}>
                    Recipes
                </Text>

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
                                    selectedCategory === category.strCategory &&
                                    styles.activeCategoryText,
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
                    <MaterialIcons
                        name="search"
                        size={24}
                        color="black"
                        style={styles.searchIcon}
                    />
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
                                onPress={() => botonFavorito(item)}
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
                        <View style={styles.modalOverlay1}>
                            <View style={styles.modalContainer}>
                                <ScrollView>
                                    <Text style={styles.modalTitle}>{selectedRecipe?.strMeal}</Text>
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