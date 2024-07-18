import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useMemo, useEffect, useCallback } from "react";

import ASO from "../utils/AsyncStorage_Calls";

import { useSelector, useDispatch } from "react-redux";
import { setToken } from '../redux/actions/loginAction'




import * as SplashScreen from 'expo-splash-screen';

import { Alert, View, Text } from "react-native";
import Login from "./AuthScreens/Login";

import { useFonts } from 'expo-font';
import OtpSender from "./AuthScreens/OtpSender";
import OtpVerify from "./AuthScreens/OtpVerify";
import Register from "./AuthScreens/Register";
import ForgotPassword from "./AuthScreens/ForgotPassword";
import BottomTabScreen from "./MainScreens/BottomTabScreen/BottomTabScreen";



// import FormScreen from "../Screens/MainScreens/ProfileRelated/";

import About_Guruji from "../Screens/MainScreens/ProfileRelated/About_Guruji";
import SatyaSadhana from "../Screens/MainScreens/ProfileRelated/SatyaSadhana";
import UpdateProfile from "../Screens/MainScreens/ProfileRelated/UpdateProfile";
import DeleteAccount from "../Screens/MainScreens/ProfileRelated/DeleteAccount";
import ChangePassword from "../Screens/MainScreens/ProfileRelated/ChangePassword";
import About from "../Screens/MainScreens/ProfileRelated/About";
import Help from "../Screens/MainScreens/ProfileRelated/Help";
import PrivacyPolicy from "../Screens/MainScreens/ProfileRelated/PrivacyPolicy";
import FormScreen from "./MainScreens/ProfileRelated/FormScreen";

// SplashScreen.preventAutoHideAsync();
export default function Screens() {

  // Variable for user is login or not  
  const [user, setUser] = useState()
  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();

  const loginSelector = useSelector((state) => state.isLogin);
  console.log(">>>>>>>>>>>>>>>>>isLogin", loginSelector)



  const [fontsLoaded] = useFonts({
  });



  const verifyToken = async () => {

    ASO.getTokenJWT('Token', (error, token) => {
      if (error) {
        console.error('Error getting token:', error);
      } else {
        if (token != null) {
          dispatch(setToken(token));
        }
      }
      setAppIsReady(true);
    });


    ASO.getTokenJWT('pageNumber', (error, pageNum) => {
      if (error) {
        console.error('Error getting token:', error);
      } else {
        if (pageNum != null) {
          dispatch(setAccountPage(pageNum));
        }
      }
      setAppIsReady(true);

    });

  }



  useEffect(() => {
    setUser(loginSelector)
  }, [loginSelector])







  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await verifyToken();
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.

      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }


  return (
    // <NavigationContainer >
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Group >
          {user ? (
            <>
              <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />


              <Stack.Screen name="FormScreen" component={FormScreen} />

              <Stack.Screen name="About_Guruji" component={About_Guruji} />
              <Stack.Screen name="About_SatyaSadhana" component={SatyaSadhana} />
              <Stack.Screen name="FullProfile" component={UpdateProfile} />
              <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
              <Stack.Screen name="ProfilePassword" component={ChangePassword} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="Help" component={Help} />
              <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />

            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ForgotPasswordEmail" component={OtpSender} />
              <Stack.Screen name="OtpVerify" component={OtpVerify} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </>
          )
          }
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

