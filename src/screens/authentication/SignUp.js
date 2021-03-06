import React, { Component } from 'react'
import { View, Text, Image, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios';

class Registration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
	FunctionRegister = () => { 
		axios.post('http://127.0.0.1:8000/api/register', {
            username: this.state.username,
            email: this.state.email.toLowerCase(),
            password: this.state.password,
        })
        .then((response)=>{
          this.props.navigation.navigate('Login');
        })
        .catch(error=> {
         const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(this.state.username&&this.state.email&&this.state.password)
            {
              if(reg.test(this.state.email)===false && this.state.password.length<=5){
              this.setState({msg:'The email and password invalid!'});
               }
               else{
                 if(this.state.password.length<=5){
                  this.setState({msg:'The password invalid!'});
                 }
                 else{
                  this.setState({msg:'The email invalid!'});
                 }
               }
            }
            else
            {
              if(this.state.username.length<=0&&this.state.email.length<=0&&this.state.password.length<=0){
                this.setState({msg:'Please enter the username email and password'});
              }
              else{
                if(this.state.username.length<=0){
                  this.setState({msg:'Please enter the username!'});
                }
                else{
                  if(this.state.email.length<=0){
                    this.setState({msg:'Please enter the email!'});
                  }
                  else{
                    this.setState({msg:'Please enter the password!'});
                  }
                }
              }
            }
        });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/login.png')} style={styles.image}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Montserrat-Bold', marginTop: 40}}>Registration</Text>
            <Text style={{color: 'red', fontFamily: 'Montserrat-Regular'}}>{this.state.msg}</Text>
            <View style={styles.border}>
              <Image source={{ uri: 'https://www.flaticon.com/premium-icon/icons/svg/1144/1144760.svg' }}
                style={{ width: 35, height: 35, marginLeft: 10, marginTop: 5 }} />
              <TextInput
                style={styles.inputText}
                placeholder="Username"
                onChangeText={data => this.setState({ username: data })}
								value={this.state.username}
              />
            </View>
            <View style={styles.border}>
              <Image source={{ uri: 'https://www.flaticon.com/premium-icon/icons/svg/542/542638.svg' }}
                style={{ width: 30, height: 30, marginLeft: 10, marginTop: 7 }} />
              <TextInput
                style={styles.inputText}
                placeholder="Email"
                onChangeText={data => this.setState({ email: data })}
								value = {this.state.email}
              />
            </View>
            <View style={styles.border}>
              <Image source={{ uri: 'https://www.flaticon.com/premium-icon/icons/svg/2889/2889676.svg' }}
                style={{ width: 35, height: 35, marginLeft: 10, marginTop: 5 }} />
              <TextInput
                style={styles.inputText}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={data => this.setState({ password: data })}
								value={this.state.password}
              />
            </View>
            <TouchableOpacity onPress={this.FunctionRegister}>
              <Text style={styles.text}>
                Sign Up
                    </Text>
            </TouchableOpacity>
            <View style={styles.login}><Text style={{ color: '#B14297', fontFamily: 'Montserrat-Bold' }}> Have an account?</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{ color: '#B14297', fontFamily: 'Montserrat-Bold' }}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default Registration
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


/*import React, { Component } from 'react'
import { View, Text,Image,ImageBackground, TextInput, StyleSheet,TouchableOpacity } from 'react-native'

class Registration extends Component {
  render() {
    return(
      <View style={styles.container}>
      <ImageBackground source={require('../images/login.png')} style={styles.image}>
      <View style={{alignItems: "center", justifyContent: "center"}}>
        <Text style={{textAlign: 'center', fontSize: 25, fontFamily: 'Montserrat-Bold',marginTop: 40,marginBottom:15}}>Registration</Text>
      <View style={styles.border}>
                  <Image source = {{uri:'https://www.flaticon.com/premium-icon/icons/svg/1144/1144760.svg'}}
                  style = {{ width: 35,height:35, marginLeft: 10, marginTop: 5}}/>
                <TextInput
                style={styles.inputText}
                      placeholder="Username"
                      onChangeText={(text) => this.setState({text})}
                  />
                </View>
                <View style={styles.border}>
                  <Image  source = {{uri:'https://www.flaticon.com/premium-icon/icons/svg/542/542638.svg'}}
                  style = {{ width: 30,height:30, marginLeft: 10, marginTop: 7}}/>
                <TextInput
                style={styles.inputText}
                      placeholder="Email"
                      onChangeText={(text) => this.setState({text})}
                  />
                </View>
                <View style={styles.border}>
                  <Image source = {{uri:'https://www.flaticon.com/premium-icon/icons/svg/2889/2889676.svg'}}
                  style = {{ width: 35,height:35, marginLeft: 10, marginTop: 5}}/>
                <TextInput
                style={styles.inputText}
                secureTextEntry={true}
                      placeholder="Password"
                      onChangeText={(text) => this.setState({text})}
                  />
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Proceed')}>
                    <Text style = {styles.text}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
                <View style={styles.login}><Text style={{color: '#B14297',fontFamily: 'Montserrat-Bold'}}> Have an account?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{color: '#B14297', fontFamily: 'Montserrat-Bold'}}> Login</Text>
                </TouchableOpacity>
                </View>
                </View>
      </ImageBackground>
    </View>
    );
  }
}
export default Registration
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
    border:{
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
    inputText:{
      fontFamily: 'Montserrat-Regular',
      width: 300
    }
  });

  */
