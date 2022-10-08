import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  userInfo,
  AppContextInterface,
  ContextProps,
} from "../interface/AuthInterface";

export const AuthContext = createContext<
  AppContextInterface | ContextProps | null
>(null);

export const AuthProvider: React.FunctionComponent<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<userInfo | string>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    token: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [splashLoading, setSplashLoading] = useState<boolean>(false);

  const register = (
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
    confirmPassword: string
  ) => {
    //  setIsLoading(true);
    console.log(firstName, lastName, emailAddress, password, confirmPassword);

    axios
      .post(
        "https://ml-dev-web-api.azurewebsites.net/api/v1/Account/Register",
        {
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        Alert.alert("Registration was Successful!");
        let userInfo = response.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        //  setIsLoading(false);
        console.log(userInfo);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.message);
        console.log(err.stack);
      });
    /*    .then(function () {
               // always executed
           }); */
  };

  const login = ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    setIsLoading(false);

    axios
      .post(
        "https://ml-dev-web-api.azurewebsites.net/api/v1/Account/Login",
        {
          emailAddress: emailAddress,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        // navigation.navigate("Home");
        let userInfo = response.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        //  setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.message);
        console.log(err.stack);
      })
      .then(function () {
        // always executed
      });
  };

  const logout = () => {
    // setIsLoading(true);

    axios
      .get("https://ml-dev-web-api.azurewebsites.net/api/v1/Account/Logout", {
        headers: { Accept: "*", Authorization: `Bearer ${userInfo.token}` },
      })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({
          firstName: "",
          lastName: "",
          emailAddress: "",
          password: "",
          token: "",
        });
        //  setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        console.log(e.response);
        console.log(e.message);
        console.log(e.stack);
        // setIsLoading(false);
      });
  };

  const editSubmit = async (firstName: string, lastName: string) => {
    try {
      const response = await axios.put(
        "https://ml-dev-web-api.azurewebsites.net/api/v1/Person/UpdatePersonProfile",
        {
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            Accept: "text/plain",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
          },
        }
      );
      let userInfo = await response.data;
      console.log(userInfo);
      setUserInfo(userInfo);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (err) {
      console.log(err.response);
      console.log(err.message);
      console.log(err.stack);
    }
  };

  // const editSubmit = (firstName: string, lastName: string) => {
  //   setIsLoading(false);

  //   axios
  //     .put(
  //       "https://ml-dev-web-api.azurewebsites.net/api/v1/Person/UpdatePersonProfile",
  //       {
  //         firstName: firstName,
  //         lastName: lastName,
  //       },
  //       {
  //         headers: {
  //           Accept: "text/plain",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           "Access-Control-Allow-Methods": "*",
  //           "Access-Control-Allow-Headers": "*",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       // navigation.navigate("Home");
  //       let userInfo = response.data;
  //       console.log(userInfo);
  //       setUserInfo(userInfo);
  //       AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  //       //  setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       console.log(err.message);
  //       console.log(err.stack);
  //     })
  //     .then(function () {
  //       // always executed
  //     });
  // };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo: string | null = (await AsyncStorage.getItem(
        "userInfo"
      )) as string;
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        editSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
