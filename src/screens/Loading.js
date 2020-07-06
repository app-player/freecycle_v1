import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator, StatusBar } from 'react-native';
export default class Loading extends Component {
	constructor(props){
		super(props)
		this.state = {
			 data: []
		};
	}
		componentDidMount() {
				this.checkToken();
  	}
    checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        if(token){
					this.props.navigation.navigate('App');
				}
				else{
					this.props.navigation.navigate('Auth');
				}
    }

    render(){
			console.log(this.state.data);
        return(
            <View>
								<ActivityIndicator />
								<StatusBar barStyle="default" />
            </View>
        )
    }
}
