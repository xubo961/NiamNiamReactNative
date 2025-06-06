import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Linking,
    Dimensions,
    Modal,
    TextInput,
    Alert,
    FlatList,
    Switch,
} from 'react-native';
import { Menu, Divider, Provider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './StylesCalendar';
import { useCalendarViewModel } from './CalendarViewModel';
import { PropsStackNavigation } from '../../interfaces/StackNav';
import { useUserLocalStorage } from '../../hooks/useUserLocalStorage';
import ProfileViewModel from '../profile/ProfileViewModel';
import {Picker} from "@react-native-picker/picker";

const { width } = Dimensions.get('window');

export const Calendar = ({ navigation }: PropsStackNavigation) => {

    const { user } = useUserLocalStorage();
    const { deleteSession, changePassword, changingPassword } = ProfileViewModel.ProfileViewModel();
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { days, meals } = useCalendarViewModel();
    const [selectedDay, setSelectedDay] = useState<string>(days[0]);
    const [recipeModalVisible, setRecipeModalVisible] = useState(false);
    const [currentMeal, setCurrentMeal] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipes, setRecipes] = useState<any[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
    const [calendarRecipes, setCalendarRecipes] = useState<Record<string, any>>({});

    const [saveMode, setSaveMode] = useState<'SEMANA' | 'PERMANENTE'>('SEMANA');

    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [detailRecipe, setDetailRecipe] = useState<any | null>(null);

    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);
    const openUrlBo = () => Linking.openURL('https://github.com/xubo961/').catch(() => {});
    const openUrlSantiago = () => Linking.openURL('https://github.com/SNgomez27').catch(() => {});

    const handlePasswordChange = async () => {
        if (newPassword.length < 6) return Alert.alert('Error', 'The new password must be at least 6 characters long.');
        if (currentPassword === newPassword) return Alert.alert('Error', 'The new password cannot be the same as the current one.');
        if (newPassword !== confirmPassword) return Alert.alert('Error', 'The passwords do not match.');
        try {
            await changePassword({ email: user?.email || '', oldPassword: currentPassword, newPassword });
            Alert.alert('Success', 'Password changed successfully.');
            setPasswordModalVisible(false);
            setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Unexpected error');
        }
    };

    const openRecipeModal = (meal: string) => {
        const key = `${selectedDay}-${meal}`;
        const saved = calendarRecipes[key];
        if (saved) {
            setDetailRecipe(saved);
            setDetailModalVisible(true);
        } else {
            setCurrentMeal(meal);
            setSearchTerm('');
            setRecipes([]);
            setSelectedRecipe(null);
            setRecipeModalVisible(true);
        }
    };

    useEffect(() => {
        if (!recipeModalVisible) return;
        const fetchRecipes = async () => {
            const q = searchTerm.trim();
            if (!q) { setRecipes([]); return; }
            try {
                if (q.includes(',')) {
                    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(q)}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    setRecipes(data.meals || []);
                } else {
                    const [nameRes, ingRes] = await Promise.all([
                        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`),
                        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(q)}`),
                    ]);
                    const nameData = await nameRes.json();
                    const ingData = await ingRes.json();
                    const byName = nameData.meals || [];
                    const byIng = ingData.meals || [];
                    const merged = [
                        ...byName,
                        ...byIng.filter((i: any) => !byName.some((n: any) => n.idMeal === i.idMeal)),
                    ];
                    setRecipes(merged);
                }
            } catch {
                Alert.alert('Error', 'No se pudo obtener recetas');
            }
        };
        fetchRecipes();
    }, [searchTerm, recipeModalVisible]);

    const handleSaveRecipe = () => {
        if (!selectedRecipe) return;
        const key = `${selectedDay}-${currentMeal}`;
        setCalendarRecipes(prev => ({ ...prev, [key]: selectedRecipe }));
        setRecipeModalVisible(false);
    };

    const handleCleanRecipe = () => {
        const key = `${selectedDay}-${currentMeal}`;
        setCalendarRecipes(prev => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
        });
        setRecipeModalVisible(false);
    };

    return (
        <Provider>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../../../assets/logoniamniam.png')} style={[styles.logo, { width: width * 0.15, height: width * 0.15 }]} />
                    <Text style={[styles.screenTitle, { fontSize: width * 0.06, flexShrink: 1 }]}>Calendar</Text>
                    <Menu visible={visibleMenu} onDismiss={closeMenu} anchor={<TouchableOpacity onPress={openMenu}><MaterialIcons name="more-vert" size={30} color="black" /></TouchableOpacity>}>
                        <Menu.Item onPress={openUrlBo} title="About Bo" />
                        <Menu.Item onPress={openUrlSantiago} title="About Santiago" />
                        <Menu.Item onPress={() => { closeMenu(); setPasswordModalVisible(true); }} title="Change Password" />
                        <Divider />
                        <Menu.Item onPress={() => { closeMenu(); deleteSession(); navigation.navigate('WelcomeScreen'); }} title="Logout" />
                    </Menu>
                </View>

                <View style={styles.saveModeContainer}>
                    <Text style={styles.saveModeLabel}>Save for week</Text>
                    <Switch
                        value={saveMode === 'PERMANENTE'}
                        onValueChange={v => setSaveMode(v ? 'PERMANENTE' : 'SEMANA')}
                    />
                    <Text style={styles.saveModeLabel}>Save permanently</Text>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={styles.labelHeading}>Select your day</Text>
                    <Picker style={styles.dropdown} selectedValue={selectedDay} onValueChange={setSelectedDay}>
                        {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
                    </Picker>
                    {meals.map(meal => {
                        const key = `${selectedDay}-${meal}`;
                        const saved = calendarRecipes[key];
                        return (
                            <View style={styles.mealRow} key={key}>
                                <View style={styles.mealLabel}><Text style={styles.labelText}>{meal}</Text></View>
                                {saved ? (
                                    <TouchableOpacity style={styles.mealSavedBox} onPress={() => openRecipeModal(meal)}>
                                        <Image source={{ uri: saved.strMealThumb }} style={styles.savedImage} />
                                        <Text style={styles.savedText}>{saved.strMeal}</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.mealBox} onPress={() => openRecipeModal(meal)}>
                                        <Text style={styles.plus}>+</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </View>

                <Modal animationType="slide" transparent visible={passwordModalVisible} onRequestClose={() => setPasswordModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.detailCard}>
                            <Text style={styles.title1}>Change Password</Text>
                            <Text style={styles.detailLabel}>Current password</Text>
                            <TextInput style={styles.input} secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} placeholder="Enter your current password" />
                            <Text style={styles.detailLabel}>New password</Text>
                            <TextInput style={styles.input} secureTextEntry value={newPassword} onChangeText={setNewPassword} placeholder="Enter your new password" />
                            <Text style={styles.detailLabel}>Confirm new password</Text>
                            <TextInput style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm your new password" />
                            <View style={styles.detailButtonRow}>
                                <TouchableOpacity style={[styles.cleanButton, { backgroundColor: '#4caf50' }]} onPress={handlePasswordChange}>
                                    <Text style={styles.cleanButtonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.closeButton, { backgroundColor: '#f44336' }]} onPress={() => setPasswordModalVisible(false)}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal animationType="slide" transparent visible={recipeModalVisible} onRequestClose={() => setRecipeModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { maxHeight: '80%' }]}>
                            <Text style={styles.title1}>Search for a recipe for {currentMeal} on {selectedDay}</Text>
                            <TextInput placeholder="Write ingredients or name..." value={searchTerm} onChangeText={setSearchTerm} style={{ borderWidth:1, borderColor:'#CCC', borderRadius:8, padding:8, marginVertical:12 }} />
                            {selectedRecipe && (
                                <View style={{ alignItems:'center', marginBottom:12 }}>
                                    <Image source={{ uri: selectedRecipe.strMealThumb }} style={{ width:100, height:100, borderRadius:8 }} />
                                    <Text style={{ marginTop:8 }}>{selectedRecipe.strMeal}</Text>
                                </View>
                            )}
                            <FlatList data={recipes} keyExtractor={item => item.idMeal} renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => setSelectedRecipe(item)} style={{ flexDirection:'row', alignItems:'center', padding:8, backgroundColor:selectedRecipe?.idMeal===item.idMeal?'#eaeaea':'transparent', borderRadius:6, marginBottom:4 }}>
                                    <Image source={{ uri: item.strMealThumb }} style={{ width:50, height:50, borderRadius:4, marginRight:8 }} />
                                    <Text>{item.strMeal}</Text>
                                </TouchableOpacity>
                            )} style={{ marginBottom:12 }} />
                            <View style={{ flexDirection:'row', justifyContent:'flex-end' }}>
                                <TouchableOpacity onPress={() => setRecipeModalVisible(false)} style={styles.modalCloseButton}>
                                    <Text style={styles.modalCloseButtonText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCleanRecipe} style={styles.modalCleanButton}>
                                    <Text style={styles.modalCleanButtonText}>Clean</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSaveRecipe} disabled={!selectedRecipe} style={[styles.modalSaveButton, !selectedRecipe && { opacity: 0.6 }]}>
                                    <Text style={styles.modalSaveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal animationType="slide" transparent visible={detailModalVisible} onRequestClose={() => setDetailModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={[styles.detailCard, { maxHeight: '70%' }]}>
                            <Text style={styles.title1}>{detailRecipe?.strMeal}</Text>
                            <ScrollView style={styles.detailContent} contentContainerStyle={{ paddingBottom: 20 }}>
                                <Text style={styles.detailLabel}>Ingredients:</Text>
                                {(detailRecipe
                                        ? Array.from({ length: 20 })
                                            .map((_, i) => detailRecipe[`strIngredient${i + 1}`])
                                            .filter(Boolean)
                                        : []
                                ).map((ing: string, idx: number) => (
                                    <Text key={idx} style={styles.detailText}>• {ing}</Text>
                                ))}
                                <Text style={[styles.detailLabel, { marginTop: 12 }]}>Preparation:</Text>
                                <Text style={styles.detailText}>{detailRecipe?.strInstructions}</Text>
                                <Image source={{ uri: detailRecipe?.strMealThumb }} style={styles.detailImage} />
                            </ScrollView>
                            <View style={styles.detailButtonRow}>
                                <TouchableOpacity style={styles.cleanButton} onPress={() => { handleCleanRecipe(); setDetailModalVisible(false); }}><Text style={styles.cleanButtonText}>Clean</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setDetailModalVisible(false)}><Text style={styles.closeButtonText}>Close</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </Provider>
    );
};
