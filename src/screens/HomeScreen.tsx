import React, { useContext, useState } from "react";
import {
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";
import CarouselCards from "../components/CarouselCards";
import { activityCardItemData } from "../components/ActivityCardItem";
import { newLessonCardItemData } from "../components/LessonCardItem";
import HomeScreenHeading from "../components/HomeScreenHeading";
import HomeScreenSearchComponent from "../components/HomeScreenSearchComponent";
import SearchPageViewAllBtn from "../components/SearchPageViewAllBtn";
import User from "../interface/UserInterface";
import { AuthContext } from "../context/AuthContext";
import { SearchFilterContext } from "../context/SearchFilterContext";
import LessonCarouselCards from "../components/LessonCarouselCards";

const HomeScreen: React.FC = ({ navigation }: any): JSX.Element => {
  const { updateSearchFilter } = useContext(SearchFilterContext);
  // Temporary data before API fetching
  const [user, setUser] = useState<User>({
    name: "Beth",
    plans: [
      {
        title: "Group Share",
        id: 101,
        description: "Decision Making",
        length: "Length: 20 minutes",
        imgUrl: require("../../assets/images/activity-plan/activity-plan-2.png"),
        colorUrl: require("../../assets/images/activity-plan/green-s.png"),
        saved: true,
      },
    ],
  });

  const [active, setactive] = useState<boolean>(false);
  //bringing Children props with Context API
  const { userInfo, isLoading, logout } = useContext<any>(AuthContext);
  // fetch user data
  // const savePlan = async () => {
  //   try {
  //     const { data } = await axios.get()
  //     setUser(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const newActivitiesBtn = {
    style: active == true ? styles.btnPressed : styles.btnNormal,
    onPress: () => setactive(active == false ? true : false),
  };

  const newLessonPlansBtn = {
    style: active == false ? styles.btnPressed : styles.btnNormal,
    onPress: () => setactive(active == true ? false : true),
  };

  const blackText = {
    style: active == false ? { color: "white" } : { color: "black" },
  };

  const whiteText = {
    style: active == false ? { color: "black" } : { color: "white" },
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/images/home-page/background.png")}
        style={styles.imgBackground}
      >
        <View>
          <Text style={styles.greetingMessage}>
            <Text>Welcome back, </Text>
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationColor: "#7583CA",
                fontStyle: "italic",
              }}
            >
              {userInfo.displayName}
            </Text>
            <Text>!</Text>
          </Text>
        </View>

        <View style={styles.learnMoreContainer}>
          <Image
            style={{ width: Dimensions.get("window").width }}
            source={require("../../assets/images/home-page/learn-more-background.png")}
          />
          <View style={styles.learnMoreInsideContainer}>
            <Text style={styles.learnMore}>
              Mindfulness Labs aims to create an inclusive environment in every
              classroom. We are a venture with a vision to see that every
              student succeeds, and by working alongside teachers, we're
              building thoughtful leaders.
            </Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => navigation.navigate("About SEL")}
            >
              <Text style={styles.learnMoreButtonText}>
                Learn More About SEL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <HomeScreenHeading heading="Lesson Pillars" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Searches");
                updateSearchFilter("Self Awareness");
              }}
            >
              <HomeScreenSearchComponent
                imgURL={require("../../assets/images/search-image-home-page/search-color-purple.png")}
                title="Self Awareness"
                description="Activities and Plans"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Searches");
                updateSearchFilter("Relationship Skills");
              }}
            >
              <HomeScreenSearchComponent
                imgURL={require("../../assets/images/search-image-home-page/search-color-blue.png")}
                title="Relationship Skills"
                description="Activities and Plans"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Searches");
                updateSearchFilter("Social Awareness");
              }}
            >
              <HomeScreenSearchComponent
                imgURL={require("../../assets/images/search-image-home-page/search-color-yellow.png")}
                title="Social Awareness"
                description="Activities and Plans"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Searches");
                updateSearchFilter("Decision Making");
              }}
            >
              <HomeScreenSearchComponent
                imgURL={require("../../assets/images/search-image-home-page/search-color-green.png")}
                title="Decision Making"
                description="Activities and Plans"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Searches");
                updateSearchFilter("Self Management");
              }}
            >
              <HomeScreenSearchComponent
                imgURL={require("../../assets/images/search-image-home-page/search-color-peach.png")}
                title="Self Management"
                description="Activities and Plans"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Searches");
                updateSearchFilter("Cultral Responsiveness");
              }}
            >
              <HomeScreenSearchComponent
                imgURL={require("../../assets/images/search-image-home-page/search-color-red.png")}
                title="Cultral Responsiveness"
                description="Tools and Information"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Searches");
                updateSearchFilter("View All");
              }}
            >
              <SearchPageViewAllBtn
                imageUrl={require("../../assets/images/search-image-home-page/search-color-purple-long.png")}
                title="View All"
                description="Activities and Plans"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <HomeScreenHeading heading="Recently Opened" />
          {/** Carousel component below has static data at the moment. Need to fetch data once API set up */}
          <View style={{ marginLeft: 20 }}>
            <CarouselCards data={activityCardItemData} />
          </View>
        </View>

        <View>
          <HomeScreenHeading heading="Newly Added" />

          <View>
            <View style={styles.newlyButtonContainer}>
              <TouchableOpacity {...newActivitiesBtn}>
                <Text {...whiteText}>New Activities</Text>
              </TouchableOpacity>
              <TouchableOpacity {...newLessonPlansBtn}>
                <Text {...blackText}>New Lesson Plans</Text>
              </TouchableOpacity>
            </View>

            {/** Carousel component below has static data at the moment. Need to fetch data once API set up
             * It filters between the two button of either new activities or new lesson plans
             */}
            <View style={{ marginBottom: 40, marginLeft: 20 }}>
              {active ? (
                <CarouselCards data={activityCardItemData} />
              ) : (
                <LessonCarouselCards data={newLessonCardItemData} />
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  logoIcon: {
    width: 50,
    height: 50,
    top: 45,
    left: 165,
  },
  greetingMessage: {
    fontSize: 25,
    paddingTop: 36,
    paddingLeft: 25,
    paddingBottom: 36,
    fontFamily: "Inter",
  },
  learnMoreContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  learnMoreInsideContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  learnMore: {
    backgroundColor: "white",
    width: 330,
    height: 130,
    padding: 8,
    textAlign: "center",
    opacity: 0.8,
    fontSize: 12.5,
    letterSpacing: 1,
    lineHeight: 22,
    fontFamily: "Inter",
  },
  learnMoreButton: {
    backgroundColor: "#7583CA",
    width: 190,
    height: 30,
    borderRadius: 15,
    top: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  learnMoreButtonText: {
    color: "white",
  },
  newlyButtonContainer: {
    padding: 8,
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
    backgroundColor: "white",
    width: Dimensions.get("window").width - 50,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 15,
    left: 25,
  },
  btnNormal: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  btnPressed: {
    backgroundColor: "#7583CA",
    padding: 5,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default HomeScreen;
