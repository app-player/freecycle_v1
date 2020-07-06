import React, {Component} from 'react'
import {View,Text,Image,ImageBackground,TextInput,StyleSheet, TouchableOpacity} from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Proceed extends Component {
	constructor(props) {
		super(props)

		this.state = {
			phone_number: '',
			location_id: '',
			link_facebook: ''
		}
	}
	FunctionProceed = async () => {
		const token =  await AsyncStorage.getItem("token");
		console.log(token);
		const phone_number = this.state.phone_number;
		const location_id = this.state.location_id;
		const link_facebook = this.state.link_facebook;
		const data = {
				'phone_number': phone_number,
				'location_id': location_id,
				'link_facebook': link_facebook,
		};
		const headers = {
				headers: {
						'Content-Type': 'application/json',
						"Authorization": "Bearer " + token,
				}
		};
		await axios.post('http://127.0.0.1:8000/api/proceed', data, headers)
		.then(res => {
					this.props.navigation.navigate('App');
			},
			err => {
					alert("Proceed Error");
			})
	}
  render(){
      return(
				<View style={styles.container}>
					<ImageBackground source={require('../../images/login.png')} style={styles.image}>
						<View style={{ alignItems: "center", justifyContent: "center" }}>
							<Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Montserrat-Bold', marginTop: 40, marginBottom: 15 }}>Proceed</Text>
							<View style={styles.border}>
								<Image source={{ uri: 'https://www.flaticon.com/premium-icon/icons/svg/1144/1144760.svg' }}
									style={{ width: 35, height: 35, marginLeft: 10, marginTop: 5 }} />
								<TextInput
									style={styles.inputText}
									placeholder="Phone Number"
									onChangeText={data => this.setState({ phone_number: data })}
									value={this.state.phone_number}
								/>
							</View>
							<View style={styles.border}>
								<Image source={{ uri: 'https://www.flaticon.com/premium-icon/icons/svg/542/542638.svg' }}
									style={{ width: 30, height: 30, marginLeft: 10, marginTop: 7 }} />
								<TextInput
									style={styles.inputText}
									placeholder="Location"
									onChangeText={data => this.setState({ location_id: data })}
									value = {this.state.location_id}
								/>
							</View>
							<View style={styles.border}>
								<Image source={{ uri: 'https://www.flaticon.com/premium-icon/icons/svg/2889/2889676.svg' }}
									style={{ width: 35, height: 35, marginLeft: 10, marginTop: 5 }} />
								<TextInput
									style={styles.inputText}
									placeholder="Link Facebook"
									onChangeText={data => this.setState({ link_facebook: data })}
									value={this.state.link_facebook}
								/>
							</View>
							<TouchableOpacity onPress={this.FunctionProceed}>
								<Text style={styles.text}>
									Proceed
								</Text>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				</View>
			);
		}
	}
	export default Proceed
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: "column"
		},
		image: {
			flex: 1,
			resizeMode: "cover",
			justifyContent: "center"
		},
		text: {
			color: "grey",
			fontSize: 30,
			fontWeight: "bold",
		},
		border: {
			width: 300,
			marginTop: 5,
			borderWidth: 1,
			borderRadius: 30,
			flexDirection: 'row',
			borderColor: '#707070'
		},
		text: {
			width: 300,
			borderWidth: 2,
			padding: 10,
	borderColor: '#0000',
			borderRadius: 30,
			backgroundColor: '#F7C217',
			fontFamily: 'Montserrat-Bold',
			marginTop: 15,
			textAlign: 'center'
		},
		login: {
			flexDirection: 'row',
			marginTop: 15,
		},
		inputText: {
			fontFamily: 'Montserrat-Regular',
			width: 300
		}
	});
