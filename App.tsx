import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Tabs from "./src/navigation/Tabs";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/context/AuthContext";
import { SearchProvider } from "./src/context/SearchFilterContext";
import ActivityLessonSelectProvider from "./src/context/ActivityLessonSelectContext";

export default function App() {
    const [loaded] = useFonts({
        Inter: require("./assets/fonts/Inter.ttf"),
        InterBold: require("./assets/fonts/Inter-Bold.ttf"),
        InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
        InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
        InterLight: require("./assets/fonts/Inter-Light.ttf"),
    });

    if (!loaded) return null;

    return (
        <AuthProvider>
            <SearchProvider>
                <ActivityLessonSelectProvider>
                    <NavigationContainer>
                        <Tabs />
                    </NavigationContainer>
                </ActivityLessonSelectProvider>
            </SearchProvider>
        </AuthProvider>
    );
}
