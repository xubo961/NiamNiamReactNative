import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal,
    Pressable
} from "react-native";

interface ChangePasswordModalProps {
    visible: boolean;
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ visible, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }
        Alert.alert("Éxito", "La contraseña ha sido cambiada exitosamente.");
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Cambiar Contraseña</Text>

                    <Text style={styles.label}>Contraseña actual</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Ingresa tu contraseña actual"
                    />

                    <Text style={styles.label}>Nueva contraseña</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Ingresa tu nueva contraseña"
                    />

                    <Text style={styles.label}>Confirmar nueva contraseña</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirma tu nueva dadasdadasd contraseña"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handlePasswordChange}
                        >
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </TouchableOpacity>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    saveButton: {
        backgroundColor: "#4caf50",
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
        alignItems: "center"
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    cancelButton: {
        backgroundColor: "#f44336",
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
        alignItems: "center"
    },
    cancelButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default ChangePasswordModal;
