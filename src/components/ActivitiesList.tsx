import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { IDataObjProps } from "../interface/CardInterface";
import ActivityCardItem from "./ActivityCardItem";

const ActivitiesList = ({ data }: IDataObjProps): JSX.Element => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <ActivityCardItem item={item} />;
        }}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        horizontal={false}
      />
    </View>
  );
};

export default ActivitiesList;
