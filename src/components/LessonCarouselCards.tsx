import React from "react";
import { FlatList } from "react-native";
import { IDataProps } from "../interface/CardInterface";
import LessonCardItem from "./LessonCardItem";

const LessonCarouselCards: React.FC<IProps> = ({
  data,
}: IProps): JSX.Element => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => {
        return <LessonCardItem item={item} />;
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

interface IProps {
  data: IDataProps[];
}
export default LessonCarouselCards;
