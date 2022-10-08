import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

const SettingIcon: React.FC = (): JSX.Element => {
  return (
    <TouchableOpacity>
      <Image
        style={{ width: 35, height: 35 }}
        source={require("../../assets/images/nav-header/icon-settings.png")}
      />
    </TouchableOpacity>
  );
};

export default SettingIcon;
