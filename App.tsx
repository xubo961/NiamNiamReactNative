import {NavigationContainer, StackActions} from "@react-navigation/native";
import {LoginScreen} from "./app/presentation/views/auth/Login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {WelcomeScreen} from "./app/presentation/views/auth/Welcome";
import {RegisterScreen} from "./app/presentation/views/auth/Register";
import {AdminTabNavigator} from "./app/presentation/navigation/AdminTabNavigator";


export type RootStackParamsList = {
    WelcomeScreen: undefined,
    LoginScreen: undefined,
    RegisterScreen: undefined,
    AdminTabNavigator: undefined,

}
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="AdminTabNavigator" component={AdminTabNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
