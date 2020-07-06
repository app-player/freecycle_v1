import React, { Component , useContext} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

class Setting extends Component{

	_signOutAsync = async () => {
		await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render(){
    return (
      <View>
        <ScrollView>
        <View style={styles.container}>
        <Text style={styles.textName}>xxjoanne</Text>
          <View style={styles.regionText}>
            <Text style={{fontSize: 13, fontFamily: 'Montserrat-Regular'}}>Phnom Penh</Text>
            <Text>,</Text>
            <Text style={{paddingLeft: 5, fontSize: 13, fontFamily: 'Montserrat-Regular'}}>Cambodia</Text>
          </View>
        <Text style={styles.textName}>Account setting</Text>
        <View style={styles.itemChange}>
          <View>
            <TouchableOpacity style={styles.eachItem}>
          <Text style={styles.changeType}>Change Email</Text>
          <Image style={{height: 16, width: 16, marginTop: 6}}
          source={require('../../../images/basic-app.png')}
          />
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.eachItem}>
          <Text style={styles.changeType}>Change Password</Text>
          <Image style={{height: 16, width: 16, marginTop: 6}}
          source={require('../../../images/basic-app.png')}
          />
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.eachItem}>
          <Text style={styles.changeType}>Change Facebook</Text>
          <Image style={{height: 16, width: 16, marginTop: 8}}
          source={require('../../../images/basic-app.png')}
          />
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.eachItem}>
          <Text style={styles.changeType}>Edit Location</Text>
          <Image style={{height: 16, width: 16, marginTop: 8}}
          source={require('../../../images/basic-app.png')}
          />
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.eachItem}>
          <Text style={styles.changeType}>Edit Phone Number</Text>
          <Image style={{height: 16, width: 16, marginTop: 8}}
          source={require('../../../images/basic-app.png')}
          />
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.eachItem} onPress={()=>this.props.navigation.navigate('Help')}>
          <Text style={styles.changeType}>Help</Text>
          <Image style={{height: 16, width: 16, marginTop: 8}}
          source={require('../../../images/basic-app.png')}
          />
          </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: "center"}}>
        <TouchableOpacity style={styles.button} onPress={this._signOutAsync}>
        <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textHeader: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
    flexGrow: 1,
    marginRight: 50
  },
  headerBar:{
    backgroundColor: '#97CACA',
    height: 65,
    alignItems: "center",
    flexDirection: "row"
  },
  container:{
    paddingLeft: 20,
    paddingRight:20
  },
  textName:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginTop: 30
  },
  regionText:{
    flexDirection: "row",
  },
  itemChange:{
    marginBottom: 30,
    marginTop: 30,
  },
  changeType:{
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    flex:1
  },
  eachItem:{
    flexDirection: "row"
  },
  button:{
    borderColor: '#B14297',
    borderWidth: 1,
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 286,
    marginBottom: 30
  },
  textButton:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    color: '#B14297'
  },
  icon:{
    marginLeft: 30
  }
});
export default Setting;
