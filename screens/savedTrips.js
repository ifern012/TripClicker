import React, { useState }  from 'react';
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Linking, Dimensions, TextInput } from 'react-native';
import { Card, Input, Button, Icon, Divider } from 'react-native-elements';
import { getTrip, Stack, trips, User } from '../App.js';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    errorText: {
      fontSize: 20,
      fontWeight: "bold",
      color: 'red',
      width: 300
    },
    tripsText: {
      fontSize: 22,
      fontWeight: "bold",
      color: '#ffffff',
    },
    tripsContainer: {
      backgroundColor: '#b39ddb',
      flex: 0.1, alignItems: 'center',
      padding: 10, justifyContent: 'center', marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.44,
      shadowRadius: 3,
  
      elevation: 8,
    },
    tripsTitle: {
      fontSize: 56,
      fontWeight: "bold",
      color: 'white',
      position: "relative",
      top: -100, 
      marginBottom: -87
    }
  });
export function TripsScreen() {
    return (
      <Stack.Navigator initialRouteName="TripList" screenOptions={{headerShown: false}}>
            <Stack.Screen name="TripList" component={Trips} />
            <Stack.Screen name="TripDetails" component={TripDetails}  />
      </Stack.Navigator>
    );
  }
  
function Trips({ navigation }) {
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
        <View style={styles.tripsContainer}>
            <Text style={styles.tripsText}>PREVIOUS TRIPS</Text>
          </View>
        {tripsList({navigation})}</View>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}
function TripDetails({ route, navigation }) {
    const { tripId } = route.params;
    var trip = getTrip(tripId);
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView >
      <View style={{ flex: 1, backgroundColor: '#ede7f6'}}>
        <Image source={{uri: trip.image}} style={{
          height: 300,
          width: win.width,
          marginBottom: 0,
          paddingBottom: 0,
        }}/>
        <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
        <View style={styles.tripsContainer}>
        <Text style={styles.tripsTitle}>{trip.destination}</Text>
        <Text style={styles.tripsText}>WHERE TO STAY</Text></View>
        <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Card
                title={trip.hotel.name}
                image={{uri: trip.hotel.image}}
                containerStyle={{flex: 0.8, marginBottom: 50 , borderRadius: 10}}>
                    <Text>{trip.hotel.description}</Text>
                    <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                    title='GO TO BOOKING' 
                    onPress={() => Linking.openURL(trip.hotel.link)}/>
                </Card>
            </View>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <View style={styles.tripsContainer}>
            <Text style={styles.tripsText}>WHAT TO DO</Text>
          </View>
          <ScrollView horizontal={true} style={{}}>
            {activitiesList(tripId)}
          </ScrollView>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <View style={styles.tripsContainer}>
            <Text style={styles.tripsText}>WHERE TO EAT</Text>
          </View>
          <ScrollView horizontal={true} style={{}}>
            {restaurantsList(tripId)}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
        </SafeAreaView>
    );
}

//------------List functions-------------
function tripsList({ navigation }) {
return trips.map((data) => {
    if(User.username == data.username){
    return (
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Card
        title={data.destination}
        image={{uri: data.image}}
        containerStyle={{flex: 0.8, marginBottom: 5}}>
            <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 5}}
            title='VIEW NOW' 
            onPress={() => navigation.navigate('TripDetails', {
                tripId: data.id
            })}/>
        </Card>
        </View>
    )
    }
})
}
function activitiesList(id) {
return getTrip(id).activities.map((data) => {
    return (
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Card
        title={data.name}
        image={{uri: data.image}}
        containerStyle={{width: 300, flex:0.5, margin: 20, marginBottom: 50, borderRadius: 10}}>
        <Text>{data.description}</Text>
        <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 15}}
            title='GO TO ITS WEB' 
            onPress={() => Linking.openURL(data.link)}/>
        </Card>
    </View>
    )
})
}
function restaurantsList(id) {
    return getTrip(id).restaurants.map((data) => {
      return (
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Card
          title={data.name}
          image={{uri: data.image}}
          containerStyle={{width: 300, flex:0.5, margin: 20, marginBottom: 50, borderRadius: 10}}>
          <View style={{alignItems: 'center'}}>
          <Text style={{color: '#616161', fontWeight: 'bold'}}>{data.description}</Text></View>
            <Button
              buttonStyle={{borderRadius: 10, marginLeft: 0, marginRight: 0, marginTop: 15}}
              title='GO TO ITS WEB' 
              onPress={() => Linking.openURL(data.link)}/>
          </Card>
        </View>
      )
    })
  }