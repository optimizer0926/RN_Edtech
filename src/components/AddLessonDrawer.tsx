import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ImageStyle,
  Image,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import CarouselCards from "../components/CarouselCards";
import { ActivityLessonSelectContext } from "../context/ActivityLessonSelectContext";
import { ActivityLessonSelectContextProps } from "../interface/ContextInterface";

const MyLessonPlansScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(
    () => [
      Dimensions.get("window").height * 0.215,
      220,
      Dimensions.get("window").width * 1.3,
    ],
    []
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const { selectedPlan } = useContext<ActivityLessonSelectContextProps>(
    ActivityLessonSelectContext
  );

  // render
  // const [renderItem, setRenderItem] = useState<IDataObjProps[]>([]);

  // useEffect(() => {
  //   setRenderItem(selectedPlan);
  // }, [selectedPlan]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backgroundStyle={styles.drawer}
      style={styles.drawerContainer}
    >
      <Text style={styles.contentText}>
        DRAG AND DROP ACTIVITIES HERE TO CREATE YOUR LESSON PLAN
      </Text>
      <View
        style={{
          height: 220,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {selectedPlan.length === 0 ? (
          <>
            <View style={styles.bottomContainer}>
              <Image
                style={styles.addImage}
                source={require("../../assets/images/lesson-plan/Group6953.png")}
              />
              <TouchableOpacity style={styles.createPlanBtn}>
                <Text style={{ color: "white" }}>Create Plan</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.bottomContainer}>
              <View style={{ marginLeft: 15, marginTop: 25, height: 220 }}>
                <CarouselCards data={selectedPlan} />
              </View>
              <TouchableOpacity style={styles.createBtn}>
                <Text style={{ color: "white" }}>Create</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  drawer: {
    backgroundColor: "#F2F2F2",
    borderRadius: 50,
  },
  drawerContainer: {
    position: "absolute",
  },
  contentText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#5C5C5C",
    letterSpacing: 0.5,
    width: 300,
    alignSelf: "center",
    marginTop: 10,
  },
  addImage: {
    marginTop: 20,
    marginBottom: 20,
  },
  bottomContainer: {
    marginTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createPlanBtn: {
    backgroundColor: "#5C5C5C",
    borderRadius: 50,
    width: 145,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  createBtn: {
    backgroundColor: "#7583CA",
    borderRadius: 50,
    width: 145,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
});

export default MyLessonPlansScreen;
