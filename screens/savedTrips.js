import React, { useState }  from 'react';
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Linking, Dimensions, TextInput } from 'react-native';
import { Card, Input, Button, Icon } from 'react-native-elements';
import { getTrip, Stack, trips, User } from '../App.js';

const win = Dimensions.get('window');
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
        <Text style={styles.tripsText}>{"\n"}Previous trips</Text>
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
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Image source={{uri: trip.image}} style={{
            height: 300,
            width: win.width,
            marginBottom: 10,
            borderBottomWidth: 0,
            paddingBottom: 0
            }}/>
            <Text style={styles.tripsTitle}>{trip.destination}</Text>
            <Text style={styles.tripsText}>Hotel</Text>
            <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Card
            title={trip.hotel.name}
            image={{uri: trip.hotel.image}}
            containerStyle={{flex: 0.8, marginBottom: 5}}>
                <Text>{trip.hotel.description}</Text>
                <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                title='GO TO BOOKING' 
                onPress={() => Linking.openURL(trip.hotel.link)}/>
            </Card></View>
            <Text style={styles.tripsText}>{"\n"}Activities</Text>
            {activitiesList(trip.id)}
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
        containerStyle={{flex: 0.8, marginBottom: 5}}>
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