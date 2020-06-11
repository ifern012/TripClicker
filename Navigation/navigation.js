import React from 'react'
import {createAppContainer, createSwitchNavigator}  from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator , DrawerNavigatorItems} from 'react-navigation-drawer';

import { Button, Platform, View, SafeAreaView } from 'react-native';

// import SavedTripsScreen from './../screens/savedTrips.js';
// import TripCreationScreen from './../screens/tripCreation.js';
import TitleScreen from './../screens/titleScreen.js';
import LoginScreen from './../screens/login.js';
import SignupScreen from './../screens/signup.js';
import NewUserInfoScreen from './../screens/newuserinfo.js'
// import TripCreationScreen from './../screens/tripCreation.js';
// import TripDetailsScreen from './../screens/tripDetails.js';
// import NewUserInfoScreen from './../screens/newuserinfo.js';

import Colors from './../assets/Colors.js';

// const SavedTripsStack = createStackNavigator({
//     SavedTripsScreen: SavedTripsScreen,
// })


// const TripCreationStack = createStackNavigator(
//     {
//         TripCreationScreen: TripCreationScreen,
//         TripDetailsScreen: TripDetailsScreen,
//     },
//     {
//         defaultNavigationOptions: {
//             headerShown: false
//         },
//     }
// )

// const Drawer = createDrawerNavigator(
//     {
//       'Trip Creation': {
//         screen: TripsCreationStack,
//       },
//         'Saved Trips': SavedTripsStack,
//     },
//     {
//         initialRouteName: 'Trip Creation',
//         drawerPosition: 'right',
//         drawerBackgroundColor: Colors.lightTanColor,
//         contentOptions: {
//             labelStyle: {
//               color: Colors.greyBlueColor,
//             },
//             activeBackgroundColor: Colors.lightmedTanColor,
//         },
//         contentComponent: props => {
//             // const dispatch = useDispatch()
//             return (
//               <View style={{ flex: 1, paddingTop: 40 }}>
//                 <SafeAreaView forceInset={{ bottom: 'always', horizontal: 'never' }}>
//                   <DrawerNavigatorItems {...props} />
//                   <Button
//                     title="Logout"
//                     color={Colors.greyBlueColor}
//                     paddingLeft={5}
//                     paddingRight={5}
//                     onPress={() => {
//                         props.navigation.navigate('TitleScreen')
//                         alert("logged out!")
//                     }}
//                   />
//                 </SafeAreaView>
//               </View>
//             );
//           }
//     },
// )

const Title = createStackNavigator(
    {
        TitleScreen: TitleScreen,
        SignupScreen: SignupScreen,
        LoginScreen:LoginScreen,
        NewUserInfoScreen:NewUserInfoScreen,
    },
    {
        defaultNavigationOptions: {
            headerShown: false
        },
    }
)

const MainNavigator = createSwitchNavigator({
    TitleS: Title,
    // DrawerNavigation: Drawer,
    
})


export default createAppContainer(MainNavigator)