import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet, TouchableOpacity,Image, FlatList, TouchableHighlight} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';

class Search extends Component {
	constructor(props){
		super(props)
		this.state = {
			isLoading: true,
			text: '',
			newData: [],
			user: []
		}
	}
	componentDidMount = async () => {
		this.SearchData();
	}
	SearchData = async () => {
		const token =  await AsyncStorage.getItem("token");
		await fetch('http://127.0.0.1:8000/api/search'+'?data='+this.state.text, {
			method: 'GET',
			headers: {
				"Authorization": "Bearer " + token
			},
		}).then((response) => response.json())
		.then((responseJson) => {
				if(this.state.text != ''){
					this.setState({
						newData: responseJson.data,
						user: responseJson.user
					})
				}
				else {
					console.log('no data');
				}
			})
			.catch((error) => {
	    	console.error(error);
			});
	};
  render() {
    return (
        <View >
            <View style={styles.container}>
							<View style={{flexDirection:'row'}}>
							<View style={{ width: '100%', borderWidth: 1, borderRadius: 30}}>
							 <TextInput
								 style={{alignItems:'center',justifyContent:'center', borderRadius: 30, paddingLeft: 10, height: 45}}
								 onChangeText={(text) => this.setState({ text: text })}
								 value={this.state.text}
								 placeholder = 'Search'
								 keyboardType = 'web-search'
								 onSubmitEditing = {()=>{this.SearchData(); this.props.navigation.navigate('SearchData', {'data': this.state.newData, 'user': this.state.user })}}
								 ref = 'searchBar'
								 />
						 </View>
						</View>
            <Text style={styles.find}> Find by category</Text>
						<TouchableOpacity
							style={[styles.textBtn, {borderColor: '#F7C217',width: 50}]}
							onPress={() => this.props.navigation.navigate('Category')}>
							<Text style={[styles.TextStyle,{color: '#F7C217'}]}>All</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.textBtn, {borderColor: '#B14297',width: 140}]}
							onPress={this.onPressOffer}>
							<Text style={[styles.TextStyle,{color: '#B14297'}]}>Transportation</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.textBtn, {borderColor: '#97CACA',width: 90}]}
							onPress={this.onPressOffer}>
							<Text style={[styles.TextStyle,{color: '#97CACA'}]}>Clothes</Text>
						</TouchableOpacity>
            <Text style={styles.find}> Find by type</Text>
						<TouchableOpacity
							style={[styles.textBtn, {borderColor: '#B14297',width: 50}]}
							onPress={this.onPressOffer}>
							<Text style={[styles.TextStyle,{color: '#B14297'}]}>All</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.textBtn, {borderColor: '#F7C217',width: 85}]}
							onPress={() => this.props.navigation.navigate('Offer')}>
							<Text style={[styles.TextStyle,{color: '#F7C217'}]}>Offers</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.textBtn, {borderColor: '#97CACA',width: 90}]}
							onPress={() => this.props.navigation.navigate('Request')}>
							<Text style={[styles.TextStyle,{color: '#97CACA'}]}>Request</Text>
						</TouchableOpacity>
            </View>
        </View>
      );
   }
}
export default Search

const styles = StyleSheet.create({

    container: {
      margin: 10,
    },
    header: {
      backgroundColor: '#F7C217',
      padding: 13,
      fontSize: 25,
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
      color: 'white'
    },
    find: {
      fontFamily: 'Montserrat-Bold',
			marginTop: 8
    },
		textBtn: {
				height: 30,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: 'white',
        marginTop: 8,
				justifyContent: 'center',
      },
			TextStyle: {
				fontFamily: 'Montserrat-Bold',
        fontSize: 14,
				textAlign: 'center',
			},
    border:{
      height:45,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 30,
      paddingLeft: 90,
    },
		headerContain: {
			width: '100%',
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 8,
		},
		typeColor: {
			color: '#97CACA',
			marginLeft: 10,
			fontSize: 100
		},
		titleContain: {
			marginTop: 8,
		},
		username: {
			fontFamily: 'Montserrat-Bold',
			fontSize: 16
		},
		date: {
			fontFamily: 'Montserrat-Regular',
			fontSize: 11,
		},
		type: {
			textAlign: 'right',
			fontFamily: 'Montserrat-Bold',
			fontSize: 11,
			alignSelf: 'stretch',
		},
		category: {
			textAlign: 'right',
			color: '#000',
			fontFamily: 'Montserrat-Bold',
			fontSize: 11,
			alignSelf: 'stretch'
		},
		titleContain: {
			marginBottom: 8,
		},
		title: {
			fontFamily: 'Montserrat-Regular',
			fontSize: 13
		},
		imageContain: {
			marginBottom: 20,
		},
		image: {
			height: 240,
			width: '100%',
			justifyContent: 'center',
		},
		TextContain: {
			flexDirection: 'row',
		},
		TextInputStyle: {
			paddingLeft: 12,
			width: '85%',
			height: 40,
			borderWidth: 1,
			borderRadius: 30
		},
		sentContain: {
			backgroundColor:'#fff',
			justifyContent: 'center',
		},
});
