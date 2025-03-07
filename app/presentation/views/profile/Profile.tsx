import React, {useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions, Linking
} from "react-native";
import {Divider, Menu, Provider} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import styles from "./StylesProfile";
import ViewModel from "../profile/ProfileViewModel";

const {width} = Dimensions.get("window");

export const ProfileScreen = ({navigation}: PropsStackNavigation) => {
    const {deleteSession} = ViewModel.ProfileViewModel();

    const [visible, setVisible] = useState(false);

    const openUrlBo = () => {
        Linking.openURL("https://github.com/xubo961/").catch((err) =>
            console.error("Error opening URL: ", err)
        );
    };

    const openUrlSantiago = () => {
        Linking.openURL("https://github.com/SNgomez27").catch((err) =>
            console.error("Error opening URL: ", err)
        );
    }

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <View style={styles.container}>
                {/* HEADER */}
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

                <View style={styles.textFoodRecipesContainer}>
                    <Text style={styles.yourRecipesText}>Your Food Recipes</Text>
                </View>

                <View style={styles.yourRecipesItemContainer}>
                    <View style={styles.menuContainer}>
                        <Text style={styles.yourRecipesItemTitle}>{item.nameReceta}</Text>
                        <Image source={{uri: item.imageReceta}} style={styles.recipeImage}/>
                        <Text>{item.ingredientsReceta}</Text>
                        <Text>{item.preparationReceta}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (user?.id) {
                                deleteReceta(user.id, item.id, index);
                            }
                        }}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteButtonText}>Eliminar de favoritos</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </Provider>
    );
}
