import React, {Component, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, SafeAreaView, Linking, Dimensions, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Card, Input, Button, Icon } from 'react-native-elements';
import Colors from './../assets/Colors';

const styles = StyleSheet.create({
    errorText: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'red'
    },
    tripsText: {
      fontSize: 22,
      fontWeight: "bold",
      color: 'darkgrey'
    },
    tripsTitle: {
      fontSize: 56,
      fontWeight: "bold",
      color: 'white',
      position: "relative",
      top: -100, 
      marginBottom: -80
    },
  });

const win = Dimensions.get('window');

export default class TitleScreen extends Component{

    constructor(props){
        super(props)
    }

    // const [showError, setError] = this.useState(false);
    render(){
        return (
        <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source = {require('./../photoblur.jpg')} style={{
            height: win.height,
            width: win.width,
            margin: 0,
            padding: 0,
            position:"absolute"
            }} />
        <Image source = {require('./../logo.png')} style={{
                width: win.width,
                margin: 0,
                padding: 0,
                marginTop: 50,
                resizeMode: 'contain'
            }} />
            {/* <View style={{flexDirection:'row', justifyContent:'center'}}>
            <View style={{flexDirection:'column', justifyContent:'center', flex: 0.7}}>
            </View>
            </View> */}
            <View style={{height: win.height * 0.38}}></View>
            <Button
            title="Sign In"
            type='clear'
            style={{color: 'pink', height: 50, width: 150, borderWidth: 1, justifyContent: 'center', borderColor: Colors.lightBlueColor}}
            titleStyle={{color: 'white', fontSize: 25}}
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            />
            <View style={{height: 20}}></View>
            <Button
            title="Sign Up"
            type='clear'
            style={{height: 50, width: 150,borderWidth: 1, justifyContent: 'center', borderColor: Colors.lightBlueColor}}
            titleStyle={{color: 'white', fontSize: 24}}
            onPress={() => this.props.navigation.navigate('SignupScreen')}
            />
        </View>
        );
    }
  }