import React, { Component } from 'react';
import {ActivityIndicator ,Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Modal, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements';
import axios from 'axios';

class DataSearch extends Component {
	constructor(props){
		super(props)
		this.state = {
				data: []
		}
	}

	componentDidMount = async () => {
		this.setState({
			data: this.props.navigation.state.params.data
		});
	}
  render() {
    return (
			<View>
			<FlatList
					data={this.state.newData}
					renderItem={({ item }) => (
						<View>
							<Text>{item.user.username}</Text>
						</View>
					)}
					keyExtractor={item => item.id.toString()}
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
