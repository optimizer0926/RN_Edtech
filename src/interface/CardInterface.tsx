import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export interface IDataProps {
  title: string;
  id: number;
  description: string;
  length: string;
  imgUrl: any;
  colorUrl: any;
  saved: boolean;
}

export interface ActivityItemProp {
  item: IDataProps;
}
