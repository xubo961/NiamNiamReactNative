import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from "react-native";
import {HomeScreen} from "../views/home/Home";
import {FavouritesScreen} from "../views/favorites/Favourites";
import {Add} from "../views/add/Add";
import {ProfileScreen} from "../views/profile/Profile";
import {AppColors} from "../theme/AppTheme";

const Tab = createBottomTabNavigator();

export const AdminTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: AppColors.rojo,
            tabBarInactiveTintColor: AppColors.grisOscuro,
            tabBarLabel: () => null,
            headerShown: true
        }}>
            <Tab.Screen name="HomeScreen"
                        options={{
                            title: 'Home',
                            tabBarLabel: 'Home',
                            tabBarIcon: ({color}) => (
                                <Image
                                    source={require("../../../assets/home-icon-silhouette.png")}
                                    style={{width: 25, height: 25, tintColor: color}}
                                ></Image>
                            )
                        }}
                        component={HomeScreen}
            />

            <Tab.Screen name="FavouritesScreen"
                        options={{
                            title: 'Favourites',
                            tabBarLabel: 'Favourites',
                            tabBarIcon: ({color}) => (
                                <Image
                                    source={require("../../../assets/star.png")}
                                    style={{width: 25, height: 25, tintColor: color}}
                                ></Image>
                            )
                        }}
                        component={FavouritesScreen}
            />

            <Tab.Screen name="AddScreen"
                        options={{
                            title: 'Add',
                            tabBarLabel: 'Add',
                            tabBarIcon: ({color}) => (
                                <Image
                                    source={require("../../../assets/add.png")}
                                    style={{width: 25, height: 25, tintColor: color}}
                                ></Image>
                            )
                        }}
                        component={Add}
            />

            <Tab.Screen name="ProfileScreen"
                        options={{
                            title: 'Profile',
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({color}) => (
                                <Image
                                    source={require("../../../assets/profile.png")}
                                    style={{width: 25, height: 25, tintColor: color}}
                                ></Image>
                            )
                        }}
                        component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}