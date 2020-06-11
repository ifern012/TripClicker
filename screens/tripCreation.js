import React, { useState }  from 'react';
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Linking, Dimensions, TextInput } from 'react-native';
import { Card, Input, Button, Icon, Divider } from 'react-native-elements';
import { getDestination, destinationPresent, Stack, getUser} from '../App.js';
import DatePicker from 'react-native-datepicker';
  
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
var selectedTrip = {
  id:'1',
  startDate: 1,
  endDate: 1,
  username: '',
  destination: 'Oahu',
  image: 'https://media.iatiseguros.com/wp-content/uploads/2018/04/04005429/que-hacer-en-hawaii-5.jpg',
  hotel: {
    name: 'Waikiki Beach Resort',
    link: 'http://www.booking.com/Share-Fn1Gi0N',
    image: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?s=1024x768',
    description: 'Located across from the Ala Wai Canal, this boutique hotel offers free daily continental breakfast and free Wi-Fi. The Royal Hawaiian Shopping Center is less than a 10-minute walk away.'
  },
  activities: [],
  restaurants: []
}
export function DetailsScreen() {
  return (
    <Stack.Navigator initialRouteName="CreateTrip" screenOptions={{headerShown: false}}>
          <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
          <Stack.Screen name="TripCreator" component={TripCreator}  />
    </Stack.Navigator>
  );
}
function CreateTripScreen({navigation}) {
    var [city, setCity] = useState('');
    var [error, setError] = useState(false);
    var [date, setDate] = useState(0);
    return (
      
      <View style={{ flex: 1}}>
        
        <Image source = {require('../photoblur.jpg')} style={{
          height: win.height,
          width: win.width,
          margin: 0,
          padding: 0,
          position:"absolute"
        }} />
        <View style={{ flex: 0.2, flexDirection:'row', alignItems: 'center'}}>
          <Button
          icon={
            <Icon
              name="list"
              size={35}
              type="material"
              color="white"
            />
          }
          title=""
          buttonStyle = {{marginLeft: 10,
          backgroundColor: 'rgba(255,255,255,0)',
          }}
          onPress={() => navigation.toggleDrawer()}
          />
        </View>
        <Image source = {require('../logo.png')} style={{
            width: win.width,
            margin: 0,
            padding: 0,
            marginTop: 0,
            resizeMode: 'contain'
        }} />
        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <DatePicker
              style={{width: 200}}
              date={date}
              mode="date"
              placeholder="start date"
              format="YYYY-MM-DD"
              minDate="2020-06-12"
              maxDate="2022-06-12"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => changeDate(date, setDate, true)}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              style={{ height: 60, 
                borderColor: 'white', 
                borderWidth: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 40,
                flex: 0.7,
                fontSize: 20,
                color: 'rgb(255, 255, 255)',
                paddingLeft: 20,
              }}
              onChangeText={text => setCity(text)}
              placeholder='Search for a city'
            />
            <Button
              icon={
                <Icon
                  name="search"
                  size={35}
                  type="material"
                  color="grey"
                />
              }
              title=""
              buttonStyle = {{marginLeft: 10,borderRadius: 100,
              backgroundColor: "white"}}
              onPress={() => handleNewTripSubmit({navigation}, city, setError)}
              type="outline"
            />
          </View>
         
        </View>
        { error && <Text style={styles.errorText}>{"\n"}Destination selected not yet on database {"\n"}</Text>}
      </View>
    );
}
function changeDate(date, setDate, init)
{
  if(init)
  {
    selectedTrip.startDate = date;
    setDate(date);
  }else{
    selectedTrip.endDate = date;
    setDate(date);
  }
}
function TripCreator({ route, navigation }) {
  const { destination } = route.params;
  var trip = getDestination(destination);
  const [ hotels, setHotels ] = useState(new Array(trip.hotels.length).fill(false));
  const [ actBool, setActBool ] = useState(new Array(trip.activities.length).fill(false));
  const [ restBool, setRestBool ] = useState(new Array(trip.restaurants.length).fill(false));
  
  selectedTrip.destination = destination;
  selectedTrip.image = trip.image;
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
          <ScrollView horizontal={true} style={{}}>
            {hotelList(destination, hotels, setHotels)}
          </ScrollView>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <View style={styles.tripsContainer}>
            <Text style={styles.tripsText}>WHAT TO DO</Text>
          </View>
          <ScrollView horizontal={true} style={{}}>
            {activitiesDestList(destination, actBool, setActBool)}
          </ScrollView>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <View style={styles.tripsContainer}>
            <Text style={styles.tripsText}>WHERE TO EAT</Text>
          </View>
          <ScrollView horizontal={true} style={{}}>
            {restaurantsDestList(destination, restBool, setRestBool)}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

//-----------Handle-----------
function handleNewTripSubmit ({navigation}, trip, setError) {
  if(destinationPresent(trip))
  {
    setError(false);
    navigation.navigate('TripCreator', {
      destination: trip
    });
  }else{
    setError(true);
  }
}

//------------List functions-------------

//-------------Hotels-------------
function hotelList(id, hotels, setHotels) {
  return getDestination(id).hotels.map((data) => {
    return (
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Card
          title={data.name}
          image={{uri: data.image}}
          containerStyle={{width: 300, flex:0.5, margin: 20, marginBottom: 50, borderRadius: 10}}>
            <Text>{data.description}{"\n"}</Text>
            <Button
            buttonStyle={{borderRadius: 10, marginLeft: 0, marginRight: 0, marginTop: 15}}
            title='GO TO ITS WEB' 
            onPress={() => Linking.openURL(data.link)}/>
            <Button
              buttonStyle={{borderRadius: 10, marginTop: 10, marginRight: 0, marginBottom: 5, backgroundColor: "#00e676"}}
              title={hotels[getDestination(id).hotels.indexOf(data)]?'Added':'Add to my trip'}
              disabled = {hotels[getDestination(id).hotels.indexOf(data)]}
              onPress={() => selectHotel(id, data, setHotels)}/>
          </Card></View>
    )
  })
}
function selectHotel (id, data, setHotels){
  selectedTrip.hotel = data;
  var h = new Array(getDestination(id).hotels.length).fill(false);
  h[getDestination(id).hotels.indexOf(data)] = true;
  setHotels(h);
}

//-------------Activities-------------
function activitiesDestList(id, actBool, setActBool) {
  return getDestination(id).activities.map((data) => {
    return (
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Card
        title={data.name}
        image={{uri: data.image}}
        containerStyle={{width: 300, flex:0.5, margin: 20, marginBottom: 50, borderRadius: 10}}>
        <Text>{data.description}</Text>
          <Button
            buttonStyle={{borderRadius: 10, marginLeft: 0, marginRight: 0, marginTop: 15}}
            title='GO TO ITS WEB' 
            onPress={() => Linking.openURL(data.link)}/>
            <Button
              buttonStyle={
                actBool[getDestination(id).activities.indexOf(data)]?
                {borderRadius: 10, marginTop: 10, marginRight: 0, marginBottom: 5, backgroundColor: "#00b248"}:
                {borderRadius: 10, marginTop: 10, marginRight: 0, marginBottom: 5, backgroundColor: "#00e676"}
              }
              title={actBool[getDestination(id).activities.indexOf(data)]?'Added':'Add to my trip'}
              onPress={() => selectActivity(id, data, actBool, setActBool)}/>
        </Card>
      </View>
    )
  })
}
function selectActivity (id, data, actBool, setActBool){
  if(!selectedTrip.activities.includes(data))
  {
    selectedTrip.activities.push(data);
    var h = [...actBool];
    h[getDestination(id).activities.indexOf(data)] = true;
    setActBool(h);
  }else{
    selectedTrip.activities.splice(selectedTrip.activities.indexOf(data), 1);
    var h = [...actBool];
    h[getDestination(id).activities.indexOf(data)] = false;
    setActBool(h);
  }
}

//-------------Restaurants-------------
function restaurantsDestList(id, restBool, setRestBool) {
  return getDestination(id).restaurants.map((data) => {
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
            <Button
              buttonStyle={
                restBool[getDestination(id).restaurants.indexOf(data)]?
                {borderRadius: 10, marginTop: 10, marginRight: 0, marginBottom: 5, backgroundColor: "#00b248"}:
                {borderRadius: 10, marginTop: 10, marginRight: 0, marginBottom: 5, backgroundColor: "#00e676"}
              }
              title={restBool[getDestination(id).restaurants.indexOf(data)]?'Added':'Add to my trip'}
              onPress={() => selectRestaurant(id, data, restBool, setRestBool)}/>
        </Card>
      </View>
    )
  })
}
function selectRestaurant (id, data, restBool, setRestBool){
  if(!selectedTrip.restaurants.includes(data))
  {
    selectedTrip.restaurants.push(data);
    var h = [...restBool];
    h[getDestination(id).restaurants.indexOf(data)] = true;
    setRestBool(h);
  }else{
    selectedTrip.restaurants.splice(selectedTrip.restaurants.indexOf(data), 1);
    var h = [...restBool];
    h[getDestination(id).restaurants.indexOf(data)] = false;
    setRestBool(h);
  }
}