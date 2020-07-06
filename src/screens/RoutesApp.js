import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from './components/Home';
import Search from './components/Search';
import Upload from './components/Upload';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Category from './components/categories/Category';
import Setting from './components/ProfileSetting/Setting';

// stack navigation
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}
const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
			<SearchStack.Screen name="Category" component={Category} />
    </SearchStack.Navigator>
  );
}
const UploadStack = createStackNavigator();
function UploadStackScreen() {
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen name="Upload" component={Upload} />
    </UploadStack.Navigator>
  );
}
const ChatStack = createStackNavigator();
function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );
}
const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
			<ProfileStack.Screen name="Setting" component={Setting} />
    </ProfileStack.Navigator>
  );
}

// bottom navigation
const Tab = createBottomTabNavigator();
function RoutesApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
				<Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
				<Tab.Screen name="Upload" component={UploadStackScreen} />
				<Tab.Screen name="Chat" component={ChatStackScreen} />
				<Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default RoutesApp;
