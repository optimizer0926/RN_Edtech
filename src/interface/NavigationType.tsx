import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  "My Lesson": undefined;
  Search: undefined;
  SelfCare: undefined;
  Profile: undefined;
  "Saved Activities": undefined;
  "My Lesson Plans": undefined;
  "All Activities": undefined;
  "Saved Lessons": undefined;
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList>,
  StackNavigationProp<RootStackParamList>
>;
