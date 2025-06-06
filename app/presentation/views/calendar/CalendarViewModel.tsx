import { useState } from 'react';
import {ChangePasswordRequest} from "../../../domain/entities/User";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import Toast from "react-native-toast-message";
import {AxiosError} from "axios";

export const useCalendarViewModel = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Saturday'];
    const meals = ['Breakfast', 'Lunch', 'Snack ', 'Dinner'];
    let [changingPassword, setChangingPassword] = useState(false);

    const handleAddMeal = (meal: string, day: string) => {

        console.log(`Add recipe for ${meal} of ${day}`);
    };
    const changePassword = async (request: ChangePasswordRequest) => {
        try {
            const response = await ApiDelivery.post("/users/change-password", request);

            if (response.status === 200) {
                Toast.show({
                    type: "success",
                    text1: "Password changed successfully.",
                });
            } else {
                throw new Error(response.data?.message || `Error ${response.status}`);
            }
        } catch (error) {

            if (error instanceof AxiosError && error.response?.status === 400) {
                const backendMessage = error.response.data?.message;

                if (backendMessage === "Current password incorrect") {
                    throw new Error("The current password is incorrect.");
                } else {
                    throw new Error(backendMessage || "There was an unexpected error.");
                }
            } else {
                throw new Error("There was a problem with the request.");
            }
        }
    };


    return {
        days,
        meals,
        handleAddMeal,
        changePassword,
        changingPassword,
    };
};
