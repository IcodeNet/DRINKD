import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import fetchAPI from "./src/api/YelpApi";

//ReactNav
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";
import JoinScreen from "./src/screens/JoinScreen";
import CreateScreen from "./src/screens/Createscreen";

import rootReducer from "./src/reducers/index";

// Store
const store = createStore(rootReducer);

//Stack
const HomeDrawer = createDrawerNavigator();
const AppStack = createStackNavigator();

const Home = () => {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen name="Home" component={HomeScreen} />
      <HomeDrawer.Screen name="TopChoice" component={TopChoiceScreen} />
      <HomeDrawer.Screen name="JoinScreen" component={JoinScreen} />
      <HomeDrawer.Screen name="CreateScreen" component={CreateScreen} />
    </HomeDrawer.Navigator>
  );
};

const App = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="HomeApp" component={Home} />
    </AppStack.Navigator>
  );
};

export default function () {
  //Calls API
  useEffect(() => {
    // the parenth below is syntax for => function(){...}
    (async () => {
      const data = await fetchAPI();
      console.log(data);
    })();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}
