import React, { Component } from 'react';
import {ActivityIndicator ,Platform, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView, Modal, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import { Button } from 'react-native-elements';
import Moment from 'moment';

class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {
				modalVisible: false,
				refreshing: true,
			 	data_post : [],
				data_user: [],
				data_total: '',
				total_offer: '',
				total_request: '',
				editItem:[],
		}
	}
	deleteData = async () => {
		Alert.alert(
      "Delete",
      "Do you want delete data ?",
      [
        {
          text: "Cancel",
          onPress: () => this.setModelVisible(false),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.Delete() }
      ],
      { cancelable: false }
    );
	}
	Delete = async () => {
		const token =  await AsyncStorage.getItem("token");
    await fetch('http://127.0.0.1:8000/api/displaypost/delete/'+ this.state.editItem.id,{
      method: 'DELETE',
      headers:{
        "Authorization": "Bearer " + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response)=>response.json())
    .then((responseJson)=>{
      this.setModelVisible(false);
    }).catch((error)=>{
      console.error(error);
    })
	}
	componentDidMount = async () => {
		this.GetData();
	}
	GetData = async () => {
		const token =  await AsyncStorage.getItem("token");
		await fetch('http://127.0.0.1:8000/api/displaypost', {
			method: 'GET',
			headers: {
				"Authorization": "Bearer " + token
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
					refreshing: false,
					data_post: responseJson.data,
					data_user: responseJson.user,
					data_total: responseJson.total,
					total_offer: responseJson.total_offer,
					total_request: responseJson.total_request
			})
			})
			.catch((error) => {
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
	ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
	onRefresh() {
    //Clear old data of the list
    this.setState({
			data_post: [],
			data_user: [],
			data_total: [],
			total_offer: [],
			total_request: []
		});
    this.GetData();
  }
  render() {
		if (this.state.refreshing) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
		}
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.settingRegion}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textName}>{this.state.data_user.username}</Text>
              <View style={styles.regionText}>
                <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Regular' }}>Phnom Penh</Text>
                <Text>,</Text>
                <Text style={{ paddingLeft: 5, fontSize: 13, fontFamily: 'Montserrat-Regular' }}>Cambodia</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Setting')}>
              <Image
                style={{ height: 28, width: 28 }}
                source={require('../../images/settings.png')}
              />
            </TouchableOpacity>
          </View>
         </View>
        <ScrollView></ScrollView>
        <View style={styles.container1}>
          <View style={styles.post}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 30, fontFamily: 'Montserrat-Bold', color: '#B14297', paddingLeft: 15 }}>{this.state.data_total}</Text>
              <Text style={styles.typePost}>Total Posts</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 30, fontFamily: 'Montserrat-Bold', color: '#F7C217' }}>{this.state.total_offer}</Text>
              <Text style={styles.typePost}>Offers</Text>
            </View>
            <View>
              <Text style={{ fontSize: 30, fontFamily: 'Montserrat-Bold', color: '#8DB9BF', paddingLeft: 6 }}>{this.state.total_request}</Text>
              <Text style={styles.typePost}>Request</Text>
            </View>
          </View>
        </View>
        <View>
				<FlatList
					data={this.state.data_post}
					keyExtractor={(item) => item.id.toString()}
					ItemSeparatorComponent={this.ListViewItemSeparator}
					enableEmptySections={true}
					renderItem={({ item }) => (
						<CardView cardElevation={4}
											onPress={() => alert(item.id)}
											maxCardElevation={4}
											radius={2}
											marginTop={8}>
											<View style={{ padding: 18, width: '100%', textAlign: 'center', paddingBottom: 24 }}>
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
													</View>
											</View>
						 </CardView>
					)}
					refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.onRefresh.bind(this)}
							/>
					}
				/>
        </View>
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
                  source={require('../../images/basic-app.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
								<TouchableOpacity style={styles.eachItem}
									onPress={() => {this.props.navigation.navigate('EditPost', {'id': this.state.editItem.id }), this.setModelVisible(false)}}>
	                <Text style={styles.changeType}>Edit status</Text>
	                <Image style={{ height: 16, width: 16, marginTop: 8 }}
	                  source={require('../../images/basic-app.png')}
	                />
	              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.eachItem}>
                <Text style={styles.changeType}>Mark as taken</Text>
                <Image style={{ height: 16, width: 16, marginTop: 8 }}
                  source={require('../../images/basic-app.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.eachItem}
								onPress={() => this.deleteData()}>
                <Text style={styles.changeType}>Delete</Text>
                <Image style={{ height: 16, width: 16, marginTop: 8 }}
                  source={require('../../images/basic-app.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.eachItem} onPress={()=>{this.setModelVisible(false)}}>
                <Text style={styles.changeType}>Cancel</Text>
                <Image style={{ height: 16, width: 16, marginTop: 8 }}
                  source={require('../../images/basic-app.png')}
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
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },
  container1: {
    paddingLeft: 20,
    paddingRight: 20,
  },
	post: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
	typePost:{
    fontFamily: 'Montserrat-Regular',
    fontSize: 13
  },
  textName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginTop: 20
  },
  regionText: {
    flexDirection: "row"
  },
  settingRegion: {
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    width: 40,
    marginTop: 35,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  itemButton: {
    color: '#ffffff'
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
	image: {
		height: 240,
    width: '100%',
    justifyContent: 'center',
	},
  categoryType: {
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
    marginBottom: 5,
    fontSize: 11
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
export default Profile;
