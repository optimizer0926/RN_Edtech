import React, { useState } from "react";
import { TouchableOpacity, Image } from "react-native";

const BookmarkButton: React.FC = (): JSX.Element => {
  const [saved, setSaved] = useState(false); // temporarily keeping default value as true

  // do something when bookmark is clicked
  const onPress = () => {
    setSaved(saved ? false : true);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      {saved ? (
        <Image
          source={require("../../assets/images/bookmark-icon/active.png")}
        />
      ) : (
        <Image
          source={require("../../assets/images/bookmark-icon/inactive.png")}
        />
      )}
    </TouchableOpacity>
  );
};

export default BookmarkButton;
