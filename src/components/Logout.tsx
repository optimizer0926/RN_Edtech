import { Feather, Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LogoutIcon=() => {
  const {logout} = useContext<any>(AuthContext);
  return (
    <TouchableOpacity  onPress={logout}>
      <Feather
        name="log-out"
        size={24}
        color="#C6C6C6"
        style={{left:8}}
      />
    </TouchableOpacity>
  );
};

export default LogoutIcon;