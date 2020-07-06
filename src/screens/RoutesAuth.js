import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './authentication/Login';
import SignUp from './authentication/SignUp';

const Stack = createStackNavigator();
function RoutesAuth(){
	return (
		<NavigationContainer>
				<Stack.Navigator headerMode='none'>
					<Stack.Screen name="Login" component={Login}/>
					<Stack.Screen name="SignUp" component={SignUp}/>
				</Stack.Navigator>
		</NavigationContainer>
	)
}
export default RoutesAuth;
