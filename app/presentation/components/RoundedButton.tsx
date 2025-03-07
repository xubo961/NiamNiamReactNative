import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { AppColors } from "../theme/AppTheme";

interface Props {
    text: string,
    onPressFromInterface: () => void,
}

export const RoundedButton = ({ text, onPressFromInterface }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonForm} onPress={onPressFromInterface}>
                <Text style={styles.buttonFormText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.5,
        alignSelf: 'center',
    },
    buttonForm: {
        backgroundColor: AppColors.rojo,
        paddingVertical: windowWidth * 0.03,
        paddingHorizontal: windowWidth * 0.1,
        borderRadius: 50,
        width: "100%",
        alignItems: "center",
    },
    buttonFormText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: windowWidth * 0.04,
    }
});