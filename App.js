/* eslint-disable jsx-quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import CustomDrawer from './Component/CustomDrawer';
import Home from './Component/Home';
import { enableScreens } from 'react-native-screens';
import About from './Component/About';
import Contact from './Component/Contact';
import Gallery from './Component/Gallery';
import Login from './Component/Login';
import DeskBoard from './Component/DeskBoard';
import AddCustomer from './Component/AddCustomer';
import FollowUpcus from './Component/FollowUpcus';
import TotalCustomer from './Component/TotalCustomer';
import CustomerDetail from './Component/CustomerDetail';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditDetails from './Component/EditDetails';
import SplashScreen from './Component/SplashScreen';


enableScreens();
const Stack =createStackNavigator();



const stack =()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="DeskBoard" component={DeskBoard} options={{headerShown:false}} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ headerShown: false }} />
      <Stack.Screen name="FollowUpcus" component={FollowUpcus} options={{ headerShown: false }} />
      <Stack.Screen name='TotalCustomer' component={TotalCustomer} options={{ headerShown: false }} />
      <Stack.Screen name='CustomerDetail' component={CustomerDetail} options={{ headerShown: false }} />
      <Stack.Screen name='EditDetails' component={EditDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // New state to track login status
  const dimensions = useWindowDimensions();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
      } catch (error) {
        console.error('Error checking login status', error);
        setIsLoggedIn(false); // Default to false if there is an error
      }
    };

    checkLoginStatus();
  }, []);

  // Show a loading screen while checking login status
  if (isLoggedIn === null) {
    return null; // You can return a loading screen here if needed
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={isLoggedIn ? 'DeskBoard' : 'SplashScreen'} // Conditionally set the initial route
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        }}
      >
        
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
        <Drawer.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
        <Drawer.Screen name="Gallery" component={Gallery} options={{ headerShown: false }} />
        <Drawer.Screen name="DeskBoard" component={stack} options={{ headerShown: false }} />
        <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;