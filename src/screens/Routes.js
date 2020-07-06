import React, {Component} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';

import Login from './authentication/Login';
import SignUp from './authentication/SignUp';
import Proceed from './authentication/Proceed';

import Home from './components/Home';
import Search from './components/Search';
import Upload from './components/Upload';
import Chat from './components/Chat';
import Profile from './components/Profile';
//search
import SearchData from './components/DataSearch';
//category
import Category from './components/categories/Category';
//type
import Request from './components/types/Request';
import Offer from './components/types/Offer';
//profile
import Setting from './components/ProfileSetting/Setting';
import Help from './components/ProfileSetting/Help';
import EditPost from './components/ProfileSetting/EditPost';
//loading
import Loading from './Loading';

const Auth = createStackNavigator({
		 Login: Login,
		 SignUp: SignUp,
		 Proceed: {
	     screen: Proceed,
	 			navigationOptions: {
	 			title: "Proceed",
	 			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', alignSelf:'center' },
	 			headerTintColor: '#000',
	 			headerStyle: { backgroundColor: '#B14297' },
	 		}
	 	},
	},
	{
		headerMode: "none",
  	initialRouteName: 'Login',
	}
);

// AppNavigator
const HomeStack = createStackNavigator({
	Home: {
    screen: Home,
		navigationOptions: {
			title: "Feed",
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', alignSelf:'center' },
			headerTintColor: '#000',
			headerStyle: { backgroundColor: '#B14297' },
		}
	},
})
const SearchStack = createStackNavigator({
	Search: {
    screen: Search,
		navigationOptions: {
			title: "Search",
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', alignSelf:'center' },
			headerTintColor: '#000',
			headerStyle: { backgroundColor: '#F7C217' },
		}
	},
	SearchData: {
    screen: SearchData,
		navigationOptions: {
			title: "Search Data",
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold'},
			headerTintColor: '#fff',
			headerStyle: { backgroundColor: '#F7C217' },
		}
	},
	Category: Category,
	Request: {
		screen: Request,
		navigationOptions: {
			title: "Request",
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold' },
			headerTintColor: '#fff',
			headerStyle: { backgroundColor: '#97CACA' },
		}
	},
	Offer: {
		screen: Offer,
		navigationOptions: {
			title: "Offer",
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold' },
			headerTintColor: '#fff',
			headerStyle: { backgroundColor: '#F7C217' },
		}
	},
})
const UploadStack = createStackNavigator({
	Upload: {
    screen: Upload,
		navigationOptions: {
			title: "Upload",
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', alignSelf:'center' },
			headerTintColor: '#000',
			headerStyle: { backgroundColor: '#B14297' },
		}
	},
})
const ChatStack = createStackNavigator({
	Chat: {
    screen: Chat,
		navigationOptions: {
			title: "Chat",
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', alignSelf:'center' },
			headerTintColor: '#000',
			headerStyle: { backgroundColor: '#F7C217' },
		}
	},
})
const ProfileStack = createStackNavigator({
	Profile: {
		screen: Profile,
		title: "Profile",
		navigationOptions: {
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', alignSelf:'center' },
			headerTintColor: '#000',
			headerStyle: { backgroundColor: '#B14297' },
		}
	},
	EditPost: {
		screen: EditPost,
		title: "EditPost",
		navigationOptions: {
			headerTitleStyle: { fontSize: 18, color: "#fff", fontFamily: 'Montserrat-Bold' },
			headerTintColor: '#fff',
			headerStyle: { backgroundColor: '#B14297' },
		}
	},
	Setting: {
		screen: Setting,
		title: "Setting",
		navigationOptions: {
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', },
			headerTintColor: '#fff',
			headerStyle: { backgroundColor: '#B14297' },
		}
	},
	Help: {
		screen: Help,
		title: "Help",
		navigationOptions: {
			headerTitleStyle: { fontSize: 24, color: "#fff", fontFamily: 'Montserrat-Bold', },
			headerTintColor: '#fff',
			headerStyle: { backgroundColor: '#B14297' },
		}
	},
})
const App = createBottomTabNavigator({
	Home: {
		screen: HomeStack,
		navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name='home' type='octicon' size={24} color={tintColor} />
           )
      },
	},
	Search: {
		screen: SearchStack,
		navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="search" type='feather' size={24} color={tintColor} />
           )
      },
	},
	Upload: {
		screen: UploadStack,
		navigationOptions: {
        tabBarLabel: 'Upload',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="plus" type='simple-line-icon' size={24} color={tintColor} />
           )
      },
	},
	Chat: {
		screen: ChatStack,
		navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="bubbles" type='simple-line-icon' size={24} color={tintColor} />
           )
      },
	},
	Profile: {
		screen: ProfileStack,
		navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="user" type='feather' size={24} color={tintColor} />
           )
      },
	},
})

export default createAppContainer(
  createSwitchNavigator(
    {
			Loading: Loading,
      App: App,
      Auth: Auth,
    },
    {
      initialRouteName: 'Loading',
    }
  )
);
