import React, { Component } from 'react';
import {ActivityIndicator ,Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Modal, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements';
import axios from 'axios';

class EditPost extends Component {
	constructor(props){
		super(props)
		this.state = {
				title: '',
				id: 0,
				data: [],
			 	data_user : [],
				data_category : [],
				data_type : [],
				user: [],
		}
	}

	componentDidMount = async () => {
		this.GetData();
		this.PutData();
		this.setState({
			id: this.props.navigation.state.params.id
		});
	}

	GetData = async () => {
		const token =  await AsyncStorage.getItem("token");
		await fetch('http://127.0.0.1:8000/api/displaypost/'+this.state.id, {
			method: 'GET',
			headers: {
				"Authorization": "Bearer " + token
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
					title: responseJson.data.title,
					data:responseJson.data,
					data_user: responseJson.data.user,
					data_category: responseJson.data.category,
					data_type: responseJson.data.type,
					user: responseJson.user,
			});
			})
			.catch((error) => {
	    	console.error(error);
			});
	}
	PutData = async () => {
		const token =  await AsyncStorage.getItem("token");
		const title = this.state.title;
		const data = {
				'title': title,
		}
		const headers = {
				headers: {
						'Content-Type': 'application/json',
						"Authorization": "Bearer " + token
				}
		};
		await axios.put('http://127.0.0.1:8000/api/displaypost/update/'+ this.state.id, data, headers)
		.then(res => {
					this.props.navigation.navigate('Profile');
			},
			err => {
					console.log('error');
			})
	};
  render() {
    return (

			<View>
			<View>
			<CardView cardElevation={4}
								maxCardElevation={4}
								radius={2}
								marginTop={8}>
								<View style={{ padding: 18, width: '100%', textAlign: 'center', paddingBottom: 30 }}>
										<View style={styles.headerContain}>
											<View style={styles.headerLeft}>
													<View style={{flexDirection: 'row', textAlign: 'center'}}>
														<View>
															<Text style={styles.username}>{this.state.data_user.username}</Text>
															<Text style={styles.date}>28 Apr 2020</Text>
														</View>
														<View style={{justifyContent: 'center', marginTop: 18}}>
															{this.state.data_type.type_name === 'Offer' ? (
																<Image source={require('../../../images/ColorType/type.png')}  style={{ marginLeft: 10, marginBottom: 12 }}/>
															):
															(
																<Image source={require('../../../images/ColorType/type_2.png')}  style={{ marginLeft: 10, marginBottom: 12 }}/>
															)
															}
														</View>
													</View>
											</View>
											<View style={styles.headerRight}>
													{this.state.data_type.type_name === 'Offer' ?
														(
															<Text style={[styles.type, {color: '#F7C217'}]}>{this.state.data_type.type_name}</Text>
														)
														:
														(
															<Text style={[styles.type, {color: '#97CACA'}]}>{this.state.data_type.type_name}</Text>
														)
													}
													<Text style={styles.category}>{this.state.data_category.category_name}</Text>
											 </View>
										</View>
										<View style={styles.imageContainer}>
											 <View style={styles.titleContain}>
											 		<TextInput
													 	style={styles.title}
													 	onChangeText={(text) => {this.setState({title: text})}}
													 	defaultValue={this.state.title}
													 	editable = {true}
													 	multiline = {false}
													 	maxLength = {200}
											 		/>
											 		</View>
											 <View style={styles.imageContain}>
													<Image style={styles.image} source={{ uri: this.state.data.image_url }}/>
											 </View>
										</View>
								</View>
			 </CardView>
			</View>
			<View>
				<TouchableOpacity style={{height: 50, width: 100, backgroundColor: 'red', justifyContent: 'center'}}
						onPress={this.PutData}>
						<Text style={{color: '#fff', textAlign: 'center'}}>Save</Text>
				</TouchableOpacity>
			</View>
		 </View>
    );
  }
}
const styles = StyleSheet.create({
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
		marginBottom: 0,
	},
	title: {
		fontFamily: 'Montserrat-Regular',
    fontSize: 13
	},
	imageContainer:{
		marginTop: 24
	},
	imageContain: {
		paddingTop: -20
	},
	image: {
		height: 240,
    width: '100%',
    justifyContent: 'center',
	},
});
export default EditPost;
