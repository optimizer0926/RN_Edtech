import React from "react";
import { FlatList } from "react-native";
import { IDataProps } from "../interface/CardInterface";

import ActivityCardItem from "./ActivityCardItem";
const CarouselCards: React.FC<IProps> = ({ data }: IProps): JSX.Element => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => {
        return <ActivityCardItem item={item} />;
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

interface IProps {
  data: IDataProps[];
}
export default CarouselCards;
