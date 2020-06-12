import React, { useState }  from 'react';
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Linking, Dimensions, TextInput } from 'react-native';
import { Card, Input, Button, Icon, CheckBox, Divider} from 'react-native-elements';
import { DetailsScreen } from './tripCreation.js'
import { User, Stack} from './../App.js';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'red',
    width: 300
  },
  tripsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#ffffff',
  },
  tripsContainer: {
    backgroundColor: '#b39ddb',
    flex: 0.1, alignItems: 'center',
    padding: 10, justifyContent: 'center', marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.44,
    shadowRadius: 3,
    elevation: 8,
    width: 280,
    height: 70,
  },
  tripsTitle: {
    fontSize: 56,
    fontWeight: "bold",
    color: 'white',
    position: "relative",
    top: -100, 
    marginBottom: -87
  },
  tripsPrice:{
    fontSize: 20,
    fontWeight: "bold",
    color: '#00e676',
  },
  finalTripsPrice:{
    fontSize: 22,
    fontWeight: "bold",
    color: '#00e676',

  },
});

export function UserInformationScreen() {
    return (
      <Stack.Navigator initialRouteName="UserInfoScreen" screenOptions={{headerShown: false}}>
            <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
      </Stack.Navigator>
    );
}

var TempUser = {
    name: null,
    age: null,
    faveDest: null,
    travelForBuisness: null,
}

// function getTempUser(type){
//     if(value="name"){
//         return User.name
//     }else if(value="age"){
//         return User.age
//     }else if(value="fave"){
//         return User.faveDest
//     }else if(value="travel"){
//         return User.travelForBuisness
//     }
// }

function getName(){
    return User.name
}
function getAge(){
    if(User.age){
        return User.age
    }else{
        return "";
    }
}
function getFave(){
    return User.faveDest
}
function getTravel(){
    return User.travelForBuisness
}


function handleChecked (checked, setChecked) {
    if(checked){
      setChecked(false);
      User.travelForBuisness = false;
    }else{
      setChecked(true);
      User.travelForBuisness = true;
    }
}

function UserInfoScreen({navigation}){
    var age = getAge()
    var name = getName()
    var faveDest = getFave()
    var travelForBuisness = getTravel()
    const [checked, setChecked] = useState(travelForBuisness);
    const [info, setUpdate] = useState(false);

    return (

        <SafeAreaView style={styles.container}>
        <ScrollView >
        <View style={{ flex: 1}}>
        <View style={{ flex: 0.2, flexDirection:'row', alignItems: 'center'}}>
            <Button
            icon={
            <Icon
                name="list"
                size={35}
                type="material"
                color="black"
            />
            }
            title=""
            buttonStyle = {{marginLeft: 10,
                marginTop: 30,
            backgroundColor: 'rgba(255,255,255,0)',
            }}
            onPress={() => navigation.toggleDrawer()}
        /></View>
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: win.height*0.1}}></View>
        <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
        <View style={styles.tripsContainer}>
        <Text style={styles.tripsText}>About Me</Text>
        </View>
        <View style={{height: 40}}></View>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
          <View style={{flexDirection:'column', justifyContent:'center', flex: 0.7}}>
          <Input
              placeholder='update name'
              placeholderTextColor='#836fa9'
              label = {name}
              inputStyle={{color: '#836fa9'}}
              labelStyle={{color: '#707070', fontSize: 20}}
              onChangeText={value => User.name = value}
          />
          <Input 
              placeholder="update age" 
              placeholderTextColor='#836fa9'
              label = {age}
              inputStyle={{color: '#836fa9'}}
              labelStyle={{color: '#707070', fontSize: 20}}
              onChangeText={value => User.age = value}
          />
          <Input 
              placeholder="update favorite destination" 
              placeholderTextColor='#836fa9'
              label = {faveDest}
              inputStyle={{color: '#836fa9'}}
              labelStyle={{color: '#707070', fontSize: 20}}
              onChangeText={value => User.faveDest = value}
          />
          <CheckBox
            center
            title='Traveling For Buisness?'
            checked={checked}
            type='clear'
            onPress={() => handleChecked(checked, setChecked)}
          />
          </View>
          </View>
          <View style={{height: 20}}></View>
          <Button
            title="Update Information"
            type='clear'
            style={{height: 50, width: 250,borderWidth: 1, justifyContent: 'center', borderColor: '#836fa9'}}
            titleStyle={{color: '#836fa9', fontSize: 24}}
            onPress={() => updateInformation({ navigation }, info, setUpdate)}
          />
        </View>
        </View>
        </ScrollView>
        </SafeAreaView>
      
    );
}
    {/* // return (


        
    //     <View>
    //     <View style={{ flex: 1, backgroundColor: '#ede7f6'}}>
    //     <View style={{ flex: 0.2, flexDirection:'row', alignItems: 'center'}}>
    //       <Button */
    //       icon=*/}
    //         <Icon
    //           name="list"
    //           size={35}
    //           type="material"
    //           color="#836fa9"
    //         />
    //         }
    //         title=""
    //         buttonStyle = {{marginLeft: 10,
    //         backgroundColor: 'rgba(255,255,255,0)',
    //         }}
    //         onPress={() => navigation.toggleDrawer()}
    //         />
    //     </View>
    //     </View>
    //     <View style={{ flex: 1, backgroundColor: '#ede7f6'}}>
    //         {/* <Image source={{uri: trip.image}} style={{
    //           height: 300,
    //           width: win.width,
    //           marginBottom: 0,
    //           paddingBottom: 0,
    //         }}/> */}
    //         <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
    //         <View style={styles.tripsContainer}>
    //             <Text style={styles.tripsText}>About Me</Text>
    //         </View>

    //         <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
    //         <Button
    //         title="Update Information"
    //         type='clear'
    //         style={{height: 50, width: 150,borderWidth: 1, justifyContent: 'center', borderColor: '#836fa9'}}
    //         titleStyle={{color: '#836fa9', fontSize: 24}}
    //         onPress={() => updateInformation()}
    //     />
    //     </View>
    //     </View>
    //   );
}
function updateInformation({navigation}, info, setUpdate){
    if(info){
        setUpdate(false);
      }else{
        setUpdate(true);
      }
    navigation.navigate('Details');
}