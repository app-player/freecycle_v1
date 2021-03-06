import React, { Component } from 'react';
import { View, Text,Image,ImageBackground, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
	FunctionLogin = async () => {
		const email = this.state.email;
		const password = this.state.password;
		const data = {
				'email': email.toLowerCase(),
				'password': password,
		}
		const headers = {
				headers: {
						'Content-Type': 'application/json',
				}
		};
		await axios.post('http://127.0.0.1:8000/api/login', data, headers)
		.then(res => {
      console.log(res.data.token);
					AsyncStorage.setItem("token", res.data.token)
					.then(res => {
						this.props.navigation.navigate('App');
					});
			},
			err => {
					if(email.length<=0&&password.length<=0){

            this.setState({msg:'Please enter the email and password'});
          }
          else{
            if(email.length<=0){
              this.setState({msg:'Please enter the email!'});
            }
            else{
              if(password.length<=0){
              this.setState({msg:'Please enter the password!'});
              }
              else{
                this.setState({msg:'Your email or password incorrect!'});
              }
            }
          }
			})
	}
  render() {
    return(
      <View style={styles.container}>
      <ImageBackground source={require('../../images/login.png')} style={styles.image}>
        <View style={{alignItems: "center", justifyContent: "center"}}>
        <Text style={{textAlign: 'center', fontSize: 25, fontFamily: 'Montserrat-Bold',marginTop: 60,marginBottom:5}}>Login</Text>
        <Text style={{color: 'red', fontFamily: 'Montserrat-Regular'}}>{this.state.msg}</Text>
      <View style={styles.border}>
                  <Image source = {{uri:'https://www.flaticon.com/premium-icon/icons/svg/1144/1144760.svg'}}
                  style = {{ width: 35,height:35, marginLeft: 10, marginTop: 5}}/>
                <TextInput
                style={styles.inputText}
                      placeholder="Username"
                      onChangeText={data => this.setState({ email:data })}
											value = { this.state.email }
                  />
                </View>
                <View style={styles.border}>
                  <Image source = {{uri:'https://www.flaticon.com/premium-icon/icons/svg/2889/2889676.svg'}}
                  style = {{ width: 35,height:35, marginLeft: 10, marginTop: 5}}/>
                <TextInput
                style={styles.inputText}
                secureTextEntry={true}
                      placeholder="Password"
                      onChangeText={data => this.setState({ password: data })}
											value = { this.state.password }

                  />
                </View>
                <Text style={{color: 'red', fontFamily: 'Montserrat-Regular'}}>{this.state.msgp}</Text>
                <TouchableOpacity style={styles.button} onPress={this.FunctionLogin}>
                    <Text style = {styles.signup}>
                        Login
                    </Text>
                </TouchableOpacity>
                <View style = {styles.loginwithfacebook}>
                  <Image source = {{uri:'https://www.flaticon.com/premium-icon/icons/svg/2392/2392484.svg'}}
                  style = {{ width: 20,height:20, marginLeft: 5,marginRight:30}}/>
                <Text style={{color: 'white',fontFamily: 'Montserrat-Bold'}}>
                  Login with Facebook
                </Text>
                </View>
                <View style={styles.login}><Text style={{color: '#B14297',fontFamily: 'Montserrat-Bold'}}> No account yet?</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={{color: '#B14297',fontFamily: 'Montserrat-Bold'}}>  Sign Up</Text>
                </TouchableOpacity>
                </View>
                </View>
      </ImageBackground>
    </View>
    );
  }
}
export default Login
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    border:{
      width: 300,
      marginTop: 5,
      borderWidth: 1,
      borderRadius: 30,
      flexDirection: 'row',
      borderColor: '#707070'
    },
    signup: {
      width: 300,
      borderWidth: 2,
      padding: 10,
      borderColor: '#0000',
      borderRadius: 30,
      backgroundColor: '#F7C217',
      fontFamily: 'Montserrat-Bold',
     // marginTop: 0,
      textAlign: 'center',
    },
    loginwithfacebook: {
        width: 300,
        borderWidth: 2,
        padding: 10,
        borderColor: '#0000',
        borderRadius: 30,
        backgroundColor: '#3b5998',
        fontFamily: 'Montserrat-Bold',
        marginTop: 15,
        textAlign: 'center',
        flexDirection: 'row',
      },
    login: {
      flexDirection: 'row',
      marginTop: 15,
    },
    inputText:{
      fontFamily: 'Montserrat-Regular',
      width: 300
    }
  });
/*class Login extends Component{
    render(){
        return(
            <View>
                 <Text>Login</Text>
                <Button
                title={'Login'}
                onPress={()=>this.props.navigation.navigate('BottomNavigation')}
                />
                <Button
                title={'SignUp'}
                onPress={()=>this.props.navigation.navigate('SignUp')}
                />
            </View>
        )
    }
}*/
