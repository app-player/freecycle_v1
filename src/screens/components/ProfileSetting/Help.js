import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
class Help extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Uploading</Text>
                        <Text style={styles.description}>Do you want to upload some information and image please follow all this step it easy to use first you have to go to upload button or menu and the hjfdhudfhidhciudjfuidhfndjfhduyhfbdjhgfhcfudhjfnjduhci dhcdhfjhdhbcd df d fdufbuhfd db fbdu </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Delete your posting</Text>
                        <Text style={styles.description}>DO you want to delete some information and image please follow all this step it easy to use first you have to go to upload button or menu and the hjfdhudfhidhciudjfuidhfndjfhduyhfbdjhgfhcfudhjfnjduhci dhcdhfjhdhbcd df d fdufbuhfd db fbdu </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Edit your posting</Text>
                        <Text style={styles.description}>DO you want to upload some information and image please follow all this step it easy to use first you have to go to upload button or menu and the hjfdhudfhidhciudjfuidhfndjfhduyhfbdjhgfhcfudhjfnjduhci dhcdhfjhdhbcd df d fdufbuhfd db fbdu </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Edit your profile</Text>
                        <Text style={styles.description}>DO you want to upload some information and image please follow all this step it easy to use first you have to go to upload button or menu and the hjfdhudfhidhciudjfuidhfndjfhduyhfbdjhgfhcfudhjfnjduhci dhcdhfjhdhbcd df d fdufbuhfd db fbdu </Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Contact with other users</Text>
                        <Text style={styles.description}>DO you want to upload some information and image please follow all this step it easy to use first you have to go to upload button or menu and the hjfdhudfhidhciudjfuidhfndjfhduyhfbdjhgfhcfudhjfnjduhci dhcdhfjhdhbcd df d fdufbuhfd db fbdu </Text>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    textHeader: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'Montserrat-Bold',
        color: '#000000',
        flexGrow: 1,
        marginRight: 50
      },
      headerBar:{
        backgroundColor: '#F7C217',
        height: 65,
        alignItems: "center",
        flexDirection: "row"
      },
      title:{
          fontFamily: 'Montserrat-Bold',
          marginBottom: 20,
          marginTop: 20,
          fontSize: 18
      },
      description:{
          fontFamily: 'Montserrat-Regular',
          fontSize: 16
      },
      container:{
          margin: 10
      }
})
export default Help;
