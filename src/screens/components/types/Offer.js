import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, TextInput, Modal} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements';
import Moment from 'moment';

export default class Offer extends Component{

	constructor(props){
		super(props)
		this.state = {
			 data_post : [],
			 data_user : [],
			 modalVisible: false,
		};
	}

	componentDidMount = async () => {
		const token =  await AsyncStorage.getItem("token");
		await fetch('http://127.0.0.1:8000/api/type/1', {
			method: 'GET',
			headers: {
				"Authorization": "Bearer " + token
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
					data_post: responseJson.data,
					data_user: responseJson.datauser,
		})
		}).catch((error) => {
				console.error(error);
		});
	}
	clickEvent = (item) => {
    this.setState({ editItem: item }, () => {
      this.setModelVisible(true);
    });
  }
  setModelVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render(){
    return (
			<View>
			<FlatList
				data={this.state.data_post}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<CardView cardElevation={4}
										maxCardElevation={4}
										radius={2}
										marginTop={8}>
										<View style={{ padding: 18, width: '100%', textAlign: 'center', paddingBottom: 30 }}>
												<View style={styles.headerContain}>
													<View style={styles.headerLeft}>
															<View style={{flexDirection: 'row', textAlign: 'center'}}>
																<View>
																	<Text style={styles.username}>{item.user.username}</Text>
																	<Text style={styles.date}>{Moment(item.created_at).format('d MMM yyyy')}</Text>
																</View>
																<View style={{justifyContent: 'center'}}>
																	{item.type.type_name === 'Offer' ? (
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
															{item.type.type_name === 'Offer' ?
																	this.state.data_user.username === item.user.username ? (
																	<TouchableOpacity onPress={()=>{this.clickEvent(item)}}>
							                      <Text style={[styles.type, {color: '#F7C217'}]}>Edit</Text>
							                    </TouchableOpacity>
																):
																(
																	<Text style={[styles.type, {color: '#F7C217'}]}>{item.type.type_name}</Text>
																)
																:
																	this.state.data_user.username === item.user.username ? (
																	<TouchableOpacity onPress={()=>{this.clickEvent(item)}}>
							                      <Text style={[styles.type, {color: '#97CACA'}]}>Edit</Text>
							                    </TouchableOpacity>
																):
																(
																	<Text style={[styles.type, {color: '#97CACA'}]}>{item.type.type_name}</Text>
																)
															}
															<Text style={styles.category}>{item.category.category_name}</Text>
													 </View>
												</View>
												<View style={styles.imageContainer}>
													 <View style={styles.titleContain}>
															<Text style={styles.title}>{item.title}</Text>
													 </View>
													 <View style={styles.imageContain}>
															<Image style={styles.image} source={{ uri: item.image_url }}/>
													 </View>
													 <View style={styles.TextContain}>
															<TextInput
																style={styles.TextInputStyle}
																placeholder="Write a message here"
															/>
															<Button
																buttonStyle={styles.sentContain}
																icon={{name: 'send', type: 'material icon'}} />
													 </View>
												</View>
										</View>
					 </CardView>
				)}
			/>
			<Modal
				animationType={'fade'}
				transparent={true}
				onRequestClose={() => this.setModelVisible(false)}
				visible={this.state.modalVisible}>
				<View style={{justifyContent: "center", alignItems: "center", marginTop: 250}}>
				<View style={styles.container2}>
					<View>
						<TouchableOpacity style={styles.eachItem}>
							<Text style={styles.changeType}>Edit category</Text>
							<Image style={{ height: 16, width: 16, marginTop: 8 }}
								source={require('../../../images/basic-app.png')}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.eachItem}>
							<Text style={styles.changeType}>Edit status</Text>
							<Image style={{ height: 16, width: 16, marginTop: 8 }}
								source={require('../../../images/basic-app.png')}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.eachItem}>
							<Text style={styles.changeType}>Mark as taken</Text>
							<Image style={{ height: 16, width: 16, marginTop: 8 }}
								source={require('../../../images/basic-app.png')}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.eachItem}>
							<Text style={styles.changeType}>Delete</Text>
							<Image style={{ height: 16, width: 16, marginTop: 8 }}
								source={require('../../../images/basic-app.png')}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.eachItem} onPress={()=>{this.setModelVisible(false)}}>
							<Text style={styles.changeType}>Cancel</Text>
							<Image style={{ height: 16, width: 16, marginTop: 8 }}
								source={require('../../../images/basic-app.png')}
							/>
						</TouchableOpacity>
					</View>
				</View>
				</View>
			</Modal>
    </View>
  );
	}
}

const styles = StyleSheet.create({
	categoryFrame:{
    borderRadius: 20,
    padding: 8,
    borderColor: '#B14297',
    borderWidth: 1,
    marginHorizontal: 5,
    color: '#B14297',
    fontFamily: 'Montserrat-Bold'
  },
  categoryFrameSelected:{
    borderRadius: 20,
    borderColor: '#B14297',
    borderWidth: 1,
    backgroundColor: '#B14297',
    marginHorizontal: 5,
    padding: 8,
    color: 'white',
    fontFamily: 'Montserrat-Bold'
  },
  categoryCarousel:{
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
	headerContain: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	headerRight: {
		paddingRight: 10,
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
	imageContainer:{
		paddingRight: 10
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
	eachItem: {
    flexDirection: "row",
	},
	changeType: {
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    flex: 1
	},
	container2:{
  	height: 207,
  	width: 334,
  	borderColor: '#ccc',
  	borderWidth: 1,
  	borderRadius: 22,
  	padding: 20,
  	backgroundColor: '#fff'
	}

});
