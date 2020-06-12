import React, { useState }  from 'react';
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Linking, Dimensions, TextInput, Alert } from 'react-native';
import { Card, Input, Button, Icon, Divider } from 'react-native-elements';
import { getDestination, destinationPresent, Stack, addTrip, User, getTrip} from '../App.js';
import DatePicker from 'react-native-datepicker';
  
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
var selectedTrip = {
  startDate: 1,
  endDate: 1,
  destination: null,
  image: null,
  hotel: null,
  activities: [],
  restaurants: []
}
export function DetailsScreen() {
  return (
    <Stack.Navigator initialRouteName="CreateTrip" screenOptions={{headerShown: false}}>
          <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
          <Stack.Screen name="TripCreator" component={TripCreator}  />
          <Stack.Screen name="TotalPaymentCheckout" component={TotalPaymentCheckout} />
    </Stack.Navigator>
  );
}

function checkoutTrip({navigation}) {
  if(selectedTrip.hotel == null || !selectedTrip.activities || !selectedTrip.restaurants)
  {
    Alert.alert(
      'Could not create trip',
      'Please choose at least one for each category',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  }else{
    navigation.navigate('CreateTrip')
  }
}


global.setTrip = {
  dest: null,
  hotel: null,
  activities: [],
  restaurants: [],
}

export function getSetTrip(){
  return setTrip;
}

function TotalPaymentCheckout({ route, navigation }){

  var { tripID } = route.params;
  var { destination } = route.params;

  var trip = getTrip(tripID);
  totalPrice = getPriceTotal(tripID);
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
        <Text style={styles.tripsTitle}>{destination}</Text>
        <View style={{height: 20}}></View>
        <Text style={styles.tripsText}>Trip Reciept</Text></View>
        <View style={{flexDirection:'column'}}>
          <ScrollView horizontal={true} style={{}}>
          <Card title={"Hotel"}
                // image={{uri: trip.hotel.image}}
                containerStyle={{width: 250, flex: 0.8, marginBottom: 30 , borderRadius: 10}}>
                    <Text>{trip.hotel.name}</Text>
                    <View style={{height: 3}}></View>
                    <Text style={styles.tripsPrice}>{'$' + trip.hotel.price}</Text>
                    <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 5}}
                    title='WEBSITE' 
                    onPress={() => Linking.openURL(trip.hotel.link)}/>
          </Card>
          </ScrollView>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <ScrollView horizontal={true} style={{}}>
            {activitiesList(tripID)}
          </ScrollView>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <ScrollView horizontal={true} style={{}}>
            {restaurantsList(tripID)}
          </ScrollView>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <View style={styles.tripsContainer}>
          <Text style={styles.tripsText}>Total Price</Text>
          <View style={{height: 20}}></View>
          <Text style={styles.finalTripsPrice}>{'$' + totalPrice }</Text>
          </View>
          </View>
          <Divider style={{ backgroundColor: '#836fa9', height: 7}} />
          <Button
              buttonStyle={{borderRadius: 10, marginTop: 10, marginRight: 0, marginBottom: 5, backgroundColor: "#00e676"}}
              title={'Check Out'}
              onPress={() => checkoutTrip({navigation})}/>
        </View>
    </ScrollView>
    </SafeAreaView>
  );
}
function CreateTripScreen({navigation}) {
    var [city, setCity] = useState('');
    var [error, setError] = useState(false);
    var [dateError, setDateError] = useState(false);
    var [stDate, setStDate] = useState(0);
    var [endDate, setEndDate] = useState(0);
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
        <View style={{ flex: 0.8}}>
          <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <DatePicker
              style={{width: 150, marginBottom: 20}}
              date={stDate}
              mode="date"
              showIcon={false}
              placeholder="Start date"
              format="MM-DD-YYYY"
              minDate="06-12-2020"
              maxDate="06-12-2022"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  borderColor: 'white'
                },
                placeholderText: {
                  color: 'rgba(70, 70, 70, 1)',
                },
                dateText: {
                  color: 'rgba(70, 70, 70, 1)',
                }
            }}
            onDateChange={(date) => changeDate(date, setStDate, true)}
            />
            <DatePicker
              style={{width: 150, marginBottom: 20, marginRight: 100}}
              date={endDate}
              mode="date"
              showIcon={false}
              placeholder="End date"
              format="MM-DD-YYYY"
              minDate="06-12-2020"
              maxDate="06-12-2022"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  borderColor: 'white'
                },
                placeholderText: {
                  color: 'rgba(70, 70, 70, 1)',
                },
                dateText: {
                  color: 'rgba(70, 70, 70, 1)',
                }
            }}
            onDateChange={(date) => changeDate(date, setEndDate, false)}
            />
          </View>
          <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
              onPress={() => handleNewTripSubmit({navigation}, city, setError, setDateError)}
              type="outline"
            />
          </View>
          <View style={{ flex: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          { error && <Text style={styles.errorText}>{"\n"}Destination selected not yet on database {"\n"}</Text>}
          { dateError && <Text style={styles.errorText}>{"\n"}Dates are not valid {"\n"}</Text>}
          </View>
        </View>
        
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
          <Button
              buttonStyle={{borderRadius: 10, marginTop: 10, marginRight: 0, marginBottom: 5, backgroundColor: "#00e676"}}
              title={'Create trip'}
              onPress={() => createTrip({navigation})}/>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
function createTrip({navigation}) {
  if(selectedTrip.hotel == null || !selectedTrip.activities || !selectedTrip.restaurants)
  {
    Alert.alert(
      'Could not create trip',
      'Please choose at least one for each category',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  }else{
    // addTrip(selectedTrip);
    var newID = addTrip(selectedTrip);
    setTrip.hotel = selectedTrip.hotel
    setTrip.destination = selectedTrip.destination
    alert(selectedTrip.hotel.price)
    navigation.navigate('TotalPaymentCheckout', {
      tripID: newID,
      destination: selectedTrip.destination,
    });
  }
}
//-----------Handle-----------
function handleNewTripSubmit ({navigation}, trip, setError, setDateError) {
  if(destinationPresent(trip)){
    setError(false);
  }else{
    setError(true);
  }
  if(selectedTrip.startDate <= selectedTrip.endDate)
  {
    setDateError(false);
  }else{
    setDateError(true);
  }
  if(destinationPresent(trip) && selectedTrip.startDate <= selectedTrip.endDate)
  {
    selectedTrip = {
      startDate: selectedTrip.startDate,
      endDate: selectedTrip.endDate,
      destination: null,
      image: null,
      hotel: null,
      activities: [],
      restaurants: []
    }
    navigation.navigate('TripCreator', {
      destination: trip
    });
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
function activitiesList(id) {
  return getTrip(id).activities.map((data) => {
      return (
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Card
          title={"Activity"}
          // image={{uri: data.image}}
          containerStyle={{width: 250, flex:0.5, margin: 20, marginBottom: 50, borderRadius: 10}}>
          <Text>{data.name}</Text>
          <View style={{height: 3}}></View>
          <Text style={styles.tripsPrice}>{'$' + data.price}</Text>
          <Button
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 15}}
              title='WEBSITE' 
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
        title={"Restaurant"}
        // image={{uri: data.image}}
        containerStyle={{width: 250, flex:0.5, margin: 20, marginBottom: 50, borderRadius: 10}}>
          <Text>{data.name}</Text>
          <View style={{height: 3}}></View>
          <Text style={styles.tripsPrice}>{'$' + data.price}</Text>
          <Button
            buttonStyle={{borderRadius: 10, marginLeft: 0, marginRight: 0, marginTop: 15}}
            title='WEBSITE' 
            onPress={() => Linking.openURL(data.link)}/>
        </Card>
      </View>
    )
  })
}
//------------- Price Functions ------------------------------
function getRestaurantTotal(id) {
  var price = 0
  getTrip(id).restaurants.map((data) => {
    price+=parseInt(data.price,10)
  })
  alert(price)
  return price
}

function getActivitiesTotal(id) {
  var price = 0
  getTrip(id).activities.map((data) => {
    price+=parseInt(data.price,10)
  })
  alert(price)
  return price
}

function getPriceTotal(id){
  var trip = getTrip(id);
  var price = parseInt(trip.hotel.price,10);
  price+=getRestaurantTotal(id);
  price+=getActivitiesTotal(id);
  return price
}
