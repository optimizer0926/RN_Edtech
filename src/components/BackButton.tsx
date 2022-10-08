import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const BackButton: React.FC<IProps> = ({ route }: IProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={route}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
};

interface IProps {
  route: () => any;
}
export default BackButton;
