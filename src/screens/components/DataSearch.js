import React, { Component } from 'react';
import {ActivityIndicator ,Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Modal, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements';
import Moment from 'moment';
import axios from 'axios';

class DataSearch extends Component {
	constructor(props){
		super(props)
		this.state = {
				data: [],
				user: []
		}
	}

	componentDidMount = async () => {
		this.setState({
			data: this.props.navigation.state.params.data,
			user: this.props.navigation.state.params.user
		});
	}
  render() {
    return (
			<View>
			<FlatList
				data={this.state.data}
				keyExtractor={(item) => item.id.toString()}
				enableEmptySections={true}
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
																		<Image source={require('../../images/ColorType/type.png')}  style={{ marginLeft: 10, marginBottom: 12 }}/>
																	):
																	(
																		<Image source={require('../../images/ColorType/type_2.png')}  style={{ marginLeft: 10, marginBottom: 12 }}/>
																	)
																	}
																</View>
															</View>
													</View>
													<View style={styles.headerRight}>
															{item.type.type_name === 'Offer' ?
																	this.state.user.username === item.user.username ? (
																	<TouchableOpacity onPress={()=>{this.clickEvent(item)}}>
																		<Text style={[styles.type, {color: '#F7C217'}]}>Edit</Text>
																	</TouchableOpacity>
																):
																(
																	<Text style={[styles.type, {color: '#F7C217'}]}>{item.type.type_name}</Text>
																)
																:
																	this.state.user.username === item.user.username ? (
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
export default DataSearch;
