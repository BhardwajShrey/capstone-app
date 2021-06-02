import React, {useState, useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import * as firebase from "firebase";

import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./redux/reducers/Index";
import thunk from "redux-thunk";
//redux imports

import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Main from "./components/Main";

console.disableYellowBox = true;

const store = createStore(rootReducer, applyMiddleware(thunk));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "nevergonnagiveyouup",
  authDomain: "nevergonnaletyoudown",
  projectId: "nevergonnaturnaround",
  storageBucket: "desertyou",
  messagingSenderId: "nevergonnamakeyoucry",
  appId: "nevergonnasaygoodbye",
  measurementId: "nevergonnatellalieandhurtyou"
};
// use environment variables when in production

if(firebase.apps.length === 0)
{
  firebase.initializeApp(firebaseConfig);
}

const onAuthStateChange = (callback) =>
{
  return firebase.auth().onAuthStateChanged(
    (user) =>
    {
      if (user) {
        callback({loggedIn: true, email: user.email});
      } else {
        callback({loggedIn: false, email: ""});
      }
    }
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState( {loggedIn: false, email: ""} );

  useEffect(
    () =>
    {
      const unsubscribe = onAuthStateChange(setUser);
      return () => unsubscribe();
    }, []
  );
  
  if(!user.loggedIn)
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name = "Landing" component = {Landing} options = {{headerShown: false}} />
          <Stack.Screen name = "Register" component = {Register} />
          <Stack.Screen name = "Login" component = {Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else
  {
    return(
      <Provider store = {store}>
        <NavigationContainer  independent = {true}>
          <Stack.Navigator initialRouteName = "Main">
            <Stack.Screen name = "Main" component = {Main} options = {{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}