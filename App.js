import React, { useState }  from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';


var User = {
    username: null,
    password: null,
};
var users = [{username: 'ivan',
  password: 'cs175'}, {username: 'david',
  password: 'cs175'}]
function HomeScreen({ navigation }) {
  const [showError, setError] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Input
        placeholder='Name'
        label='Name'
        onChangeText={value => User.username = value}
      />
      <Input 
        placeholder="Password" 
        secureTextEntry={true} 
        label='Password'
        onChangeText={value => User.password = value}
      />
      { showError && <Text style={styles.errorText}>Username and password not valid ~{"\n"}</Text>}
      <Button
        title="Sign In"
        onPress={() => handleSubmit({navigation}, setError)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'red'
  },
  titleText: {
  }
});
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
function setError(){

}
function handleSubmit ({navigation}, setError) {
  const value = User.username; // use that ref to get the form value
  if(userPresent(User))
  {
    setError(false);
    navigation.navigate('Details');
  }else{
    setError(true);
  }
}
const Drawer = createDrawerNavigator();
function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button onPress={() => navigation.toggleDrawer()}>Toggle</Button>
    </View>
  );
}
function Trips() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Trips Screen</Text>
    </View>
  );
}

function Dr() {
  return (
      <Drawer.Navigator initialRouteName="Details">
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Trips" component={Trips} />
      </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="TripClicker" component={HomeScreen} />
        <Stack.Screen name="Details" component={Dr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;