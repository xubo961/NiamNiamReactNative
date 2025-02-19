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
            <TouchableOpacity style={styles.buttonForm}
                              onPress={() => onPressFromInterface()}>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
    },
    buttonFormText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 17
    }
});
