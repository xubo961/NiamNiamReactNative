import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AppColors} from "../theme/AppTheme";

interface Props {
    text: string,
    onPressFromInterface: () => void,
}

export const RoundedButton = ({text, onPressFromInterface}: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonForm} onPress={onPressFromInterface}>
                <Text style={styles.buttonFormText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        alignSelf: 'center',
    },
    buttonForm: {
        backgroundColor: AppColors.rojo,
        paddingVertical: 9,
        paddingHorizontal: 30,
        borderRadius: 50,
        width: "100%",
        alignItems: "center",
    },
    buttonFormText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 17
    }
});
