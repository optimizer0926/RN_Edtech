import { Image, View, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingIcon from "../components/SettingIcon";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "../screens/AboutScreen";
import * as React from "react";
import MyLessonScreen from "../screens/MyLessonScreen";
import SelfCareScreen from "../screens/SelfCareScreen";
import SELExercises from "../screens/SELExercises";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import SplashScreen from "../screens/SplashScreen";
import UserTypeScreen from "../screens/UserTypeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SavedActivitiesScreen from "../screens/SavedActivitiesPlan/SavedActivitiesScreen";
import AllActivitiesScreen from "../screens/SavedActivitiesPlan/AllActivitiesScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoutIcon from "../components/Logout";
import BackButton from "../components/BackButton";
import AllLessonsScreen from "../screens/SavedLessonPlans/AllLessonsScreen";
import SavedLessonsScreen from "../screens/SavedLessonPlans/SavedLessonsScreen";
import MyLessonPlansScreen from "../screens/MyLessonPlansScreen";
import SearchFilterScreen from "../screens/SearchScreen/SearchFilterScreen";
import { ContextProps, AppContextInterface } from "../interface/AuthInterface";
import EditProfile from "../screens/EditProfile";

const Tabs = ({ navigation }: any) => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { userInfo, splashLoading } = useContext<
    AppContextInterface | ContextProps | null
  >(AuthContext);

  {
    /** Tabs functions main return: */
  }
  return <RootNavigator />;

  function RootNavigator() {
    return (
      <Stack.Navigator>
        {/* Condition: if loged in use main else go to sign in */}
        {userInfo.token ? (
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UserType"
              component={UserTypeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: true }}
            />
          </>
        )}
      </Stack.Navigator>
    );
  }

  function HomeScreenNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                style={{ width: 40, height: 45, bottom: 5 }}
                source={require("../../assets/images/home-page/logo.png")}
              />
            ),
            headerRight: () => (
              <View style={{ right: Dimensions.get("window").width * 0.045 }}>
                <SettingIcon />
              </View>
            ),

            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="About SEL"
          component={AboutScreen}
          options={{
            headerRight: () => <SettingIcon />,

            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Searches"
          component={SearchFilterScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  }

  function SelfCareScreenNavigator({ navigation }: any) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Self-Care"
          component={SelfCareScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SEL Exercises"
          component={SELExercises}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <BackButton route={() => navigation.navigate("Self-Care")} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }

  function MyLessonsScreenNavigator({ navigation }: any) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Lessons"
          component={MyLessonScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Saved Activities"
          component={SavedActivitiesScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerLeft: () => (
              <BackButton route={() => navigation.navigate("My Lessons")} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="All Activities"
          component={AllActivitiesScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerLeft: () => (
              <BackButton route={() => navigation.navigate("My Lessons")} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="All Lessons"
          component={AllLessonsScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerLeft: () => (
              <BackButton route={() => navigation.navigate("My Lessons")} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Saved Lessons"
          component={SavedLessonsScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerLeft: () => (
              <BackButton route={() => navigation.navigate("My Lessons")} />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="My Lesson Plans"
          component={MyLessonPlansScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerLeft: () => (
              <BackButton route={() => navigation.navigate("My Lessons")} />
            ),
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  }

  function SearchScreenNavigator({ navigation }: any) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Searches"
          component={SearchFilterScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <BackButton route={() => navigation.navigate("Search")} />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }

  function ProfileScreenNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerLeft: () => <LogoutIcon />,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Edit-Profile"
          component={EditProfile}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },

            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  }

  function BottomTabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="HomePage"
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;

            if (route.name === "HomePage") {
              iconName = require("../../assets/images/tab-nav-icon/icon-home.png");
            } else if (route.name === "MyLessonsPage") {
              iconName = require("../../assets/images/tab-nav-icon/icon-bookopen.png");
            } else if (route.name === "SearchPage") {
              iconName = require("../../assets/images/tab-nav-icon/icon-search.png");
            } else if (route.name === "Self-CarePage") {
              iconName = require("../../assets/images/tab-nav-icon/icon-favorite.png");
            } else if (route.name === "ProfilePage") {
              iconName = require("../../assets/images/tab-nav-icon/icon-user.png");
            }
            return (
              <Image
                source={iconName}
                style={{ marginTop: 20, width: 45, height: 45 }}
              />
            );
          },
          tabBarLabel: " ",
        })}
      >
        <Tab.Screen
          name="MyLessonsPage"
          component={MyLessonsScreenNavigator}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="SearchPage"
          component={SearchScreenNavigator}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="HomePage"
          component={HomeScreenNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Self-CarePage"
          component={SelfCareScreenNavigator}
          options={{
            headerRight: () => <SettingIcon />,
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ProfilePage"
          component={ProfileScreenNavigator}
          options={{
            headerRight: () => <SettingIcon />,

            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "600",
            },
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }
};

export default Tabs;
