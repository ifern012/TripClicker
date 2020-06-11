import React, {Component, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, SafeAreaView, Linking, Dimensions, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Card, Input, Button, Icon, CheckBox} from 'react-native-elements';
import Colors from './../assets/Colors.js';
import {User} from './signup.js';

const styles = StyleSheet.create({
    errorText: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'red'
    },
    tripsText: {
      fontSize: 22,
      fontWeight: "bold",
      color: 'darkgrey',
    },
    titleText: {
      fontSize: 25,
      fontWeight: "bold",
      backgroundColor: 'rgba(255,255,255,0.5)',
      color: Colors.darkGreyColor,
    },
    tripsTitle: {
      fontSize: 56,
      fontWeight: "bold",
      color: 'white',
      position: "relative",
      top: -100, 
      marginBottom: -80
    }
  });

const win = Dimensions.get('window');


export function getUser() {
    return User;
}

export default class NewUserInfo extends Component{

// function HomeScreen({ navigation }) {
    constructor(props){
        super(props)
    
        this.state={
          showError: false,
          setError : false,
          checked: false,
        }
    }
    handleChecked = () => {
      if(this.state.checked){
        this.setState({ checked: false });
        User.travelForBuisness = false;
      }else{
        this.setState({checked: true});
        User.travelForBuisness = false;
      }
    }
    handleSubmit = () => {
        const value = User.username; // use that ref to get the form value
        if((User.name != null && User.age != null || User.favoriteLoc != null))
        {
          this.setState({showError: false});
          this.props.navigation.navigate('DrawerNavigation');
        }else{
         // alert("incomplete information!")
         this.setState({showError: true});
          //setError(true);
        }
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
          <View style={{height: win.height*0.27}}></View>
          <Text style={styles.titleText}> {"  New User Information  "}</Text>
          <View style={{height: 40}}></View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
            <View style={{flexDirection:'column', justifyContent:'center', flex: 0.7}}>
            <Input
                placeholder=''
                label='Full Name'
                inputStyle={{color: 'white'}}
                labelStyle={{color: 'rgba(255,255,255,0.5)'}}
                onChangeText={value => User.name = value}
            />
            <Input 
                placeholder="" 
                label='Age'
                inputStyle={{color: 'white'}}
                labelStyle={{color: 'rgba(255,255,255,0.5)'}}
                onChangeText={value => User.age = value}
            />
            <Input 
                placeholder="" 
                label='Favorite Travel Destination'
                inputStyle={{color: 'white'}}
                labelStyle={{color: 'rgba(255,255,255,0.5)'}}
                onChangeText={value => User.age = value}
            />
            <CheckBox
              center
              title='Traveling For Buisness?'
              checked={this.state.checked}
              type='clear'
              onPress={() => this.handleChecked()}
            />
            </View>
            </View>
            { this.state.showError && <Text style={styles.errorText}>Please enter all user information {"\n"}</Text>}
            <Button
            title="Sign Up"
            type='clear'
            titleStyle={{color: 'white'}}
            onPress={() => this.handleSubmit()}
            />
        </View>
        );
    }
  }