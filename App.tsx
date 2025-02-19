import {NavigationContainer, StackActions} from "@react-navigation/native";
import {LoginScreen} from "./app/presentation/views/auth/Login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Text, View} from "react-native";


export type RootStackParamsList = {
    LoginScreen: undefined,

}
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
