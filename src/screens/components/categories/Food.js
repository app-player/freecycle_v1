import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Food extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: '',
            data_post: [],
        };
        this.show_post();
    }

    conponentDidMount = () => {
        this.show_post();
    }

    show_post = async () => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        await fetch('http://127.0.0.1:8000/api/category/2', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    amount: responseJson.amount,
                    data_post: responseJson.data,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        if (this.state.amount <= 0) {
            return (
                <View>
                    <View style={styles.headerBar}>
                        <Text style={styles.textHeader}>Feed</Text>
                    </View>
                    <View style={styles.categoryCarousel}>
                        <ScrollView horizontal={true}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                <View>
                                    <Text style={styles.categoryFrame}>All</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Transportation')}>
                                <View>
                                    <Text style={styles.categoryFrameSelected}>Transportation</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Food')}>
                                <View>
                                    <Text style={styles.categoryFrameSelected}>Food</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Clothes')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Clothes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Book')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Books</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Kitchen')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Kitchen</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Furniture')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Furniture</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Electronic')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Electronics</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Other')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Other</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.noResult}>
                        <Text style={styles.textNoResult}>No Result</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View>
                    <View style={styles.headerBar}>
                        <Text style={styles.textHeader}>Feed</Text>
                    </View>
                    <View style={styles.categoryCarousel}>
                        <ScrollView horizontal={true}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                <View>
                                    <Text style={styles.categoryFrame}>All</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Transportation')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Transportation</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Food')}>
                                <View>
                                    <Text style={styles.categoryFrameSelected}>Food</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Clothes')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Clothes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Book')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Books</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Kitchen')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Kitchen</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Furniture')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Furniture</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Electronic')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Electronics</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Other')}>
                                <View>
                                    <Text style={styles.categoryFrame}>Other</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={{ marginBottom: 230 }}>
                        <FlatList
                            data={this.state.data_post}
                            renderItem={({ item }) =>
                                <View style={styles.containerItem}>
                                    <View style={styles.regionText}>
                                        <View>
                                            <Text style={styles.userName}>{item.user.username}</Text>
                                            <Text style={styles.datePost}></Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.colorType}>.</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity>
                                                <Text style={styles.editButton}>{item.type.type_name}</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.categoryType}>{item.category.category_name}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.typePost}>{item.title}</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={{ height: 300, width: 370 }}
                                            source={{ uri: item.image_url }}
                                        />
                                    </View>
                                    <View style={styles.sendMessage}>
                                        <TextInput style={styles.inputSearch} placeholder="Write a message here" />
                                        <TouchableOpacity>
                                            <Image style={{ height: 36, width: 36, marginTop: 20, marginHorizontal: 10 }}
                                                source={require('../../../images/send.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            keyExtractor={(item) => item.toString()}
                        />
                    </View>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'Montserrat-Bold',
        color: '#ffffff'
    },
    headerBar: {
        backgroundColor: '#B14297',
        height: 65,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    },
    container1: {
        paddingLeft: 20,
        paddingRight: 20
    },
    containerItem: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30
    },
    textName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 20
    },
    regionText: {
        fontFamily: 'Montserrat-Regular',
        flexDirection: "row",
        fontSize: 13
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
    post: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    typePost: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 13
    },
    userName: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    datePost: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 11,
        marginTop: 5
    },
    colorType: {
        marginTop: -89,
        marginLeft: 5,
        color: '#97CACA',
        fontSize: 100
    },
    editButton: {
        fontFamily: 'Montserrat-Bold',
        color: '#B14297',
        marginBottom: 5,
        fontSize: 11,
        textAlign: 'right',
        alignSelf: 'stretch'
    },
    categoryType: {
        fontFamily: 'Montserrat-Bold',
        color: '#000000',
        marginBottom: 5,
        fontSize: 11,

        textAlign: 'right',
        alignSelf: 'stretch'
    },
    categoryFrame: {
        borderRadius: 20,
        padding: 8,
        borderColor: '#B14297',
        borderWidth: 1,
        marginHorizontal: 5,
        color: '#B14297',
        fontFamily: 'Montserrat-Bold'
    },
    categoryFrameSelected: {
        borderRadius: 20,
        borderColor: '#B14297',
        borderWidth: 1,
        backgroundColor: '#B14297',
        marginHorizontal: 5,
        padding: 8,
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    },
    categoryCarousel: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 15
    },
    inputSearch: {
        height: 36,
        width: 320,
        borderRadius: 17,
        borderColor: '#707070',
        fontFamily: 'Montserrat',
        marginVertical: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        borderWidth: 1
    },
    sendMessage: {
        flexDirection: "row"
    },
    noResult:{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
    },
    textNoResult:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    }
});
