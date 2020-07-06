import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet,Button,TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

class Upload extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: '',
			title: '',
			image_path: null,
			type_id: '',
			category_id: '',
			offer: 0,
			request: 0,
		}
	}
	componentDidMount = async () => {
		this.UserData();
	}

	UserData = async () => {
		const token =  await AsyncStorage.getItem("token");
		await fetch('http://127.0.0.1:8000/api/user', {
			method: 'GET',
			headers: {
				"Authorization": "Bearer " + token
			}
		}).then((response) => response.json())
		.then((responseJson) => {
			this.setState({
					user: responseJson.user
			});
			})
			.catch((error) => {
	    	console.error(error);
			});
	}

	handleChoosePhoto = () => {
  const options = {
    noData: false,
  }
  ImagePicker.launchImageLibrary(options, response => {
    if (response.uri) {
      this.setState({ photo: response})
    	}
  	})
	}
	onPressOffer = () => {
  const offer = this.state.offer + 1
  if(offer === 1){
     this.setState({
			type_id: 1,
      offer: 1,
      // buttonEnabledOF: true
      });
  }
  if(offer === 2){
    this.setState({
      offer: 0,
      // buttonEnabledOF: false
    });
  }
  };

	onPressResquest = () => {
  const request = this.state.request + 2
  if(request === 2){
     this.setState({
			type_id: 2,
      request: 2,
      // buttonEnabledRE: true
      });
  }
  if(request === 4){
    this.setState({
      request: 0,
      // buttonEnabledRE: false
    });
  }
  };
	dataApi = async () => {
		const token =  await AsyncStorage.getItem("token");
		RNFetchBlob.fetch('POST', 'http://127.0.0.1:8000/api/post', {
			'Content-Type': 'application/json',
			"Authorization": "Bearer " + token,
			'Content-Type': 'multipart/form-data',
		}, [
				{ name: 'image_path', filename: this.state.photo.fileName, type: this.state.photo.type, data: this.state.photo.data },
				{ name: 'title', data: this.state.title },
				{ name: 'type_id', data: this.state.type_id.toString() },
				{ name: 'category_id', data: this.state.category_id.toString() },

			]).then((resp) => {
				 this.props.navigation.navigate('Profile');
			}).catch((err) => {
				console.log(err.message);
			})
	}
	post_data = () => {
		const image = this.state.image_path;
		const title = this.state.title;
		const offer = this.state.offer;
		const request = this.state.request;

		console.log(offer);
		console.log(request);
		if( image === null){
			console.log("input your image");
		}
		if( title.length === 0 ){
			console.log("fill your title");
		}
		if( (offer === 0 && request === 0) || (offer === 1 && request === 2)){
			console.log("error category");
		}
		else {
			this.dataApi();
		}
	}

    render() {
				const { photo } = this.state;
        return(
            <View>
                <View style={styles.container}>
                    <Text style={styles.name}>{this.state.user.username}</Text>
                    <View style={styles.row}>
                        <Text style={{fontSize: 11,fontFamily: 'Montserrat-Bold'}}>{Moment().utcOffset('+05:30').format('DD MMM YYYY')}</Text>
                    </View>
                    <View style={styles.textInputTitle}>
                        <TextInput
                            placeholder="What are you going to share today?"
                            onChangeText={(data) => this.setState({title: data})}
														value = { this.state.title }
                        />
                    </View>
                    <View style={styles.row1}>

												<TouchableOpacity
													style={[styles.textBtn, {borderColor: '#F7C217',width: 80}]}
													onPress={this.onPressOffer}>
													<Text style={[styles.TextStyle,{color: '#F7C217'}]}>Offer</Text>
												</TouchableOpacity>
												<TouchableOpacity
													style={[styles.textBtn, {borderColor: '#97CACA',width: 100, marginLeft: 10}]}
													onPress={this.onPressResquest}>
													<Text style={[styles.TextStyle,{color: '#97CACA'}]}>Request</Text>
												</TouchableOpacity>
												<Picker
													style={[styles.textBtn, {borderColor: '#B14297', height: 30, width: 120, marginLeft: 10 }]}
													selectedValue={this.state.category_id}
													onValueChange = {(itemValue, itemIndex) => this.setState({ category_id: itemValue })}>

													<Picker.Item label="Kitchen" value="1" />
        									<Picker.Item label="Clothes" value="2" />

												</Picker>
                    </View>
                    <Text style={{fontWeight: 'bold', marginTop: 10}}>Upload images</Text>
										<TouchableOpacity
											onPress={this.handleChoosePhoto}>
											<View style={styles.ImageContainer}>
												{photo && (
													<Image
														source={{ uri: photo.uri }}
														style={styles.ImageContainer}
													/>
												)}
        							</View>
										</TouchableOpacity>
                    <TouchableOpacity style={styles.post}
										onPress={this.post_data}>
												<Text style={styles.textPost}>Upload</Text>
										</TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Upload
const styles= StyleSheet.create({
    container:{
        margin: 10,
    },
    header:{
        backgroundColor: '#B14297',
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        padding: 13,
        fontSize: 25,
        textAlign: 'center'
    },
    name:{
        marginTop: 10,
        fontFamily: 'Montserrat-Bold'
    },
    row:{
        flexDirection: 'row',
    },
    row1:{
        flexDirection: 'row',
    },
    textInputTitle:{
        height:120,
        marginTop: 10,
        borderWidth: 1,
        paddingLeft: 10
    },
    textBtn: {
				height: 30,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: 'white',
        marginTop: 15,
				justifyContent: 'center',
      },
			TextStyle: {
				fontFamily: 'Montserrat-Bold',
        fontSize: 12,
				textAlign: 'center',
			},
			ImageContainer: {
				width: 120,
				height: 120,
				borderWidth: 1,
				borderColor: '#B14297',
				marginTop: 12,
			},
			Image: {
				width: 120,
				height: 120,
			},
      post: {
        width: 120,
        marginLeft: 110,
        padding: 10,
        borderColor: '#0000',
        borderRadius: 30,
        backgroundColor: '#B14297',
        fontFamily: 'Montserrat-Bold',
        marginTop: 15,
      },
			textPost: {
				color: 'white',
				textAlign: 'center',
			}
})
