import React, {Component, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, SafeAreaView, Linking, Dimensions, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Card, Input, Button, Icon } from 'react-native-elements';

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
    }
  });

const win = Dimensions.get('window');

export var User = {
    username: null,
    password: null,
    name: null,
    age: null,
    favoriteLoc: null,
    travelForBuisness: null,
};

var users = [
  {username: 'Ivan', password: 'cs175'}, 
  {username: 'david', password: 'cs175'}]

export function getUser() {
    return User;
}

function userPresent(User)
{
  for(var i = 0; i<users.length;i++)
  {
    if(users[i].username === User.username && users[i].password === User.password)
    {
      return true;
    }
  }
  return false;
}

export default class Signup extends Component{

// function HomeScreen({ navigation }) {
    constructor(props){
        super(props)
    
        this.state={
          showError: false,
        }
    }

    handleSubmit = () => {
        const value = User.username; // use that ref to get the form value
       // alert(User.username)
        if((User.username != null && User.password != null) && !userPresent(User))
        {
          this.setState({showError: false})
          //setError(false);
          this.props.navigation.navigate('NewUserInfoScreen')
        }else{
            this.setState({showError: true})
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
        <Image source = {require('./../logo.png')} style={{
                width: win.width,
                margin: 0,
                padding: 0,
                marginTop: 50,
                resizeMode: 'contain'
            }} />
            <View style={{flexDirection:'row', justifyContent:'center'}}>
            <View style={{flexDirection:'column', justifyContent:'center', flex: 0.7}}>
            <Input
                placeholder='Name'
                label='Name'
                inputStyle={{color: 'white'}}
                labelStyle={{color: 'rgba(255,255,255,0.5)'}}
                onChangeText={value => User.username = value}
            />
            <Input 
                placeholder="Password" 
                secureTextEntry={true} 
                inputStyle={{color: 'white'}}
                labelStyle={{color: 'rgba(255,255,255,0.5)'}}
                label='Password'
                onChangeText={value => User.password = value}
            />
            </View>
            </View>
            { this.state.showError && <Text style={styles.errorText}>Enter valid username and password {"\n"}</Text>}
            <Button
            title="Sign Up"
            type='clear'
            titleStyle={{color: 'white'}}
            onPress={() => this.handleSubmit(this.state.setError)}
            />
            <View style={{height: win.height * 0.25}}></View>
            <Button
            title="Back"
            type='clear'
            titleStyle={{color: 'white'}}
            onPress={() => this.props.navigation.navigate('TitleScreen')}
            />
        </View>
        );
    }
  }