import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF9E6", // Fondo similar al de la imagen
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    menuContainer: {
        // Ajusta si necesitas margen o padding adicional
    },
    usernameContainer: {
        backgroundColor: "#FDEBCD",
        borderRadius: 10,
        padding: 16,
        marginBottom: 8,
    },
    usernameText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    descriptionContainer: {
        backgroundColor: "#FDEBCD",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 14,
        color: "#000",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    recipesContainer: {
        flexDirection: "row",
        flexWrap: "wrap", // Permite que se distribuya en varias filas
        justifyContent: "space-between",
        paddingBottom: 16, // Un poco de espacio extra al final
    },
    recipeItem: {
        width: "48%", // Para que quepan 2 por fila
        alignItems: "center",
        marginBottom: 16,
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Circular
        marginBottom: 8,
    },
    recipeTitle: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "auto",  // Empuja el footer al final
        marginBottom: 16,
    },
});
