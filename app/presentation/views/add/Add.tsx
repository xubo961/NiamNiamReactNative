import React, {useState} from "react";
import {Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./StylesAdd";
import {Divider, Menu, Provider} from "react-native-paper";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {PropsStackNavigation} from "../../interfaces/StackNav";
import {MultiSelect} from "react-native-element-dropdown";

const {width, height} = Dimensions.get('window');

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export const AddScreen = ({navigation}: PropsStackNavigation) => {

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [selected, setSelected] = useState<string[]>([]); // Especificamos que 'selected' es un array de strings

    const renderItem = (item: {label: string, value: string}) => { // Especificamos tipo para 'item'
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            </View>
        );
    };

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={[styles.logo, {width: width * 0.15, height: width * 0.15}]}
                        source={require("../../../../assets/logoniamniam.png")}
                    />
                    <Text style={[styles.title, {fontSize: width * 0.06}]}>Add Recipe</Text>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={openMenu}>
                                <MaterialIcons name="more-vert" size={30} color="black"/>
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={() => alert('Acerca de')} title="About us"/>
                        <Menu.Item onPress={() => alert('Hola:D')} title="Hola:D"/>
                        <Menu.Item onPress={() => alert('jaja')} title="jaja"/>
                        <Divider/>
                        <Menu.Item onPress={() => navigation.navigate("WelcomeScreen")} title="Logout"/>
                    </Menu>
                </View>

                <View style={styles.divCard}>
                    <View style={styles.card}>
                        <Text style={[styles.welcomeText, {fontSize: width * 0.05}]}>Name</Text>
                        <TextInput style={styles.input} placeholder="Enter name" />
                    </View>

                    <View style={styles.card}>
                        <Text style={[styles.welcomeText, {fontSize: width * 0.05}]}>Ingredients</Text>
                        <View>
                            <MultiSelect
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Ingredients"
                                value={selected}
                                search
                                searchPlaceholder="Search..."
                                onChange={item => setSelected(item)}
                                renderLeftIcon={() => (
                                    <AntDesign
                                        style={styles.icon}
                                        color="black"
                                        name="Safety"
                                        size={20}
                                    />
                                )}
                                renderItem={renderItem}
                                renderSelectedItem={(item, unSelect) => (
                                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                                        <View style={styles.selectedStyle}>
                                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                                            <AntDesign color="black" name="delete" size={17} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={[styles.welcomeText, {fontSize: width * 0.05}]}>Image</Text>
                    </View>



                </View>
            </View>
        </Provider>
    )
}
