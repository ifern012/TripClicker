import React, { useState }  from 'react';
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Linking, Dimensions, TextInput } from 'react-native';
import { Card, Input, Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
// import { DetailsScreen } from './screens/tripCreation.js';
import TripCreation from './screens/tripCreation.js';
import { TripsScreen } from './screens/savedTrips.js';

import Navigation from './Navigation/navigation.js';
// testing
import LoginScreen from './screens/login.js';
import TitleScreen from './screens/titleScreen.js';

//Variables
export var User = {
    username: null,
    password: null,
};
var users = [
  {username: 'Ivan', password: 'cs175'}, 
  {username: 'david', password: 'cs175'}]

export var trips = [
  {
    id:'1',
    username: 'Ivan',
    destination: 'Oahu',
    image: 'https://media.iatiseguros.com/wp-content/uploads/2018/04/04005429/que-hacer-en-hawaii-5.jpg',
    hotel: {
      name: 'Waikiki Beach Resort',
      link: 'http://www.booking.com/Share-Fn1Gi0N',
      image: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?s=1024x768',
      description: 'Located across from the Ala Wai Canal, this boutique hotel offers free daily continental breakfast and free Wi-Fi. The Royal Hawaiian Shopping Center is less than a 10-minute walk away.'
    },
    activities: [
      {
        name: 'Kayaking',
        description: 'Perfect for exercising and disconnecting from you stressful life',
        link: 'http://adventureinhawaii.com/oahu/oahu-kayak-tours/',
        image: 'http://adventureinhawaii.com/site/wp-content/uploads/2014/03/kailua-kayak-3.jpg'
      },
      {
        name: 'Skydiving',
        description: 'Live an exciting experience full of adrenaline by throwing yourself from 12000 feet in the air',
        link: 'http://www.skydivehawaii.com/',
        image: 'http://www.skydivehawaii.com/Portals/0/WebSitesCreative_Banner/560/8d5eed02-42dc-46af-ba8e-98890be2f336_resized.jpg'
      },
      {
        name: 'Hiking',
        description: 'Live an exciting experience full of adrenaline by throwing yourself from 12000 feet in the air',
        link: 'https://www.backroads.com/award-winning-tours/hawaii',
        image: 'https://s29081.pcdn.co/wp-content/uploads/2018/02/best-hikes-on-kauai-hawaii-02521.jpg.optimal.jpg'
      }
    ],
    restaurants: [
      {
        name: 'Poké Bar',
        description: '$',
        link: 'https://www.ilovepokebar.com/',
        image: 'https://www.foodrepublic.com/wp-content/uploads/2017/01/pokebowl.jpg'
      },
      {
        name: 'Pooké Bar',
        description: '$$',
        link: 'https://www.ilovepokebar.com/',
        image: 'https://www.foodrepublic.com/wp-content/uploads/2017/01/pokebowl.jpg'
      }
    ]
  }
];
var destinations = [
  {
    destination: 'Oahu',
    image: 'https://media.iatiseguros.com/wp-content/uploads/2018/04/04005429/que-hacer-en-hawaii-5.jpg',
    hotels: [{
      name: 'Waikiki Beach Resort',
      link: 'http://www.booking.com/Share-Fn1Gi0N',
      image: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?s=1024x768',
      description: 'Located across from the Ala Wai Canal, this boutique hotel offers free daily continental breakfast and free Wi-Fi. The Royal Hawaiian Shopping Center is less than a 10-minute walk away.'
    }, {
      name: 'Waikiki Beeeeeach Resort',
      link: 'http://www.booking.com/Share-Fn1Gi0N',
      image: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?s=1024x768',
      description: 'Located across from the Ala Wai Canal, this boutique hotel offers free daily continental breakfast and free Wi-Fi. The Royal Hawaiian Shopping Center is less than a 10-minute walk away.'
    }],
    activities: [
      {
        name: 'Kayaking',
        description: 'Perfect for exercising and disconnecting from you stressful life',
        link: 'http://adventureinhawaii.com/oahu/oahu-kayak-tours/',
        image: 'http://adventureinhawaii.com/site/wp-content/uploads/2014/03/kailua-kayak-3.jpg'
      },
      {
        name: 'Skydiving',
        description: 'Live an exciting experience full of adrenaline by throwing yourself from 12000 feet in the air',
        link: 'http://www.skydivehawaii.com/',
        image: 'http://www.skydivehawaii.com/Portals/0/WebSitesCreative_Banner/560/8d5eed02-42dc-46af-ba8e-98890be2f336_resized.jpg'
      },
      {
        name: 'Hiking',
        description: 'Live an exciting experience full of adrenaline by throwing yourself from 12000 feet in the air',
        link: 'https://www.backroads.com/award-winning-tours/hawaii',
        image: 'https://s29081.pcdn.co/wp-content/uploads/2018/02/best-hikes-on-kauai-hawaii-02521.jpg.optimal.jpg'
      }
    ],
    restaurants: [
      {
        name: 'Poké Bar',
        description: '$',
        link: 'https://www.ilovepokebar.com/',
        image: 'https://www.foodrepublic.com/wp-content/uploads/2017/01/pokebowl.jpg'
      },
      {
        name: 'Pooké Bar',
        description: '$$',
        link: 'https://www.ilovepokebar.com/',
        image: 'https://www.foodrepublic.com/wp-content/uploads/2017/01/pokebowl.jpg'
      }
    ]
  },
  {
    destination: 'Paris',
    image: 'https://aws.traveler.es/prod/designs/v1/assets/940x627/98404.jpg',
    hotels: [
      {
        name: 'Hotel Saint Marcel - Paris',
        link: 'https://www.hotel-saint-marcel-paris.com/en/',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/c5/07/5d/photo0jpg.jpg',
        description: 'Hotel where you can a day like any other in Paris, between the 5th and 13th arrondissements : dynamic and exciting, with entirely renovated rooms.'
      },
      {
        name: 'Le Sénat',
        link: 'https://www.hotelsenat.com/es/',
        image: 'https://www.secretplaces.es/hotel-media/460-1.jpg',
        description: 'Close to all public transport links, at the heart of the left bank of the Seine, between Saint-Germain-des-Prés and the Latin Quarter'
      },
      {
        name: 'Hôtel Du Mont Dore',
        link: 'https://www.hotel-dumontdore.com/en/',
        image: 'https://x.cdrst.com/foto/hotel-sf/1413d/granderesp/hotel-du-mont-dore-batignolles-general-97aa2b.jpg',
        description: 'Standard rooms have 11 square meters and they are perfect for relaxing while staying connected'
      }
    ],
    activities: [
      {
        name: 'Mouline Rouge show',
        description: 'Moulin Rouge is best known as the birthplace of the modern form of the can-can dance, originally introduced as a seductive dance by the courtesans who operated from the site.',
        link: 'https://www.moulinrouge.fr/reservations',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Cheret_MoulinRouge_ParisCancan.jpg/800px-Cheret_MoulinRouge_ParisCancan.jpg'
      },
      {
        name: 'Bateaux Parisiens Seine River Dinner Cruise',
        description: 'Enhance your Paris sightseeing experience on a glamorous Bateaux Parisiens Seine River cruise, including dinner and live music.',
        link: 'https://www.bateauxparisiens.com/en/meal-cruise.html',
        image: 'https://i.ytimg.com/vi/3ibIzoRc8RM/maxresdefault.jpg'
      },
      {
        name: 'Louvre Museum Guided Tour including Venus de Milo and Mona Lisa',
        description: 'See the highlights at the Louvre with a guide, and gain a depth of understanding for famous works such as the \'Mona Lisa\' and \'Venus de Milo.\'',
        link: 'https://www.viator.com/tours/Paris/Skip-the-Line-Louvre-Museum-Walking-Tour-including-Venus-de-Milo-and-Mona-Lisa/d479-3731LOUVRE',
        image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/32/b7/2f.jpg'
      }
    ],
    restaurants: [
      {
        name: 'Septime',
        description: '$$$',
        link: 'http://www.septime-charonne.fr/',
        image: 'https://i0.wp.com/escapeandco.com/wp-content/uploads/2017/06/Septime-Paris6.png?ssl=1'
      },
      {
        name: 'Bistrot Victoires',
        description: '$$',
        link: 'https://www.paris-bistro.com/choisir/paris1/bistrot-des-victoires',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/87/b7/92/belle-terrasse-avec-vu.jpg'
      },
      {
        name: 'Lizard Lounge',
        description: '$$',
        link: 'http://www.cheapblonde.com/',
        image: 'https://media.timeout.com/images/102413817/630/472/image.jpg'
      },
      {
        name: 'Fresh food',
        description: '$',
        link: 'https://freshfood-restaurant.business.site/',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/e2/c4/dd/fresh-food.jpg'

      }
    ]
  },
  {
    destination: 'New York City',
    image: 'https://d12dkjq56sjcos.cloudfront.net/pub/media/wysiwyg/newyork/01-city-landing/New-York-Skyline-Big-Bus-Tours-Jan-2018.jpg',
    hotels: [
      {
        name: 'Freehand New York',
        link: 'https://freehandhotels.com/new-york/',
        image: 'https://d1sacvjbhsczdb.cloudfront.net/media/hotels/slideshow_images_staged/large/1078471.jpg',
        description: 'Located in Manhattan’s Flatiron District, Freehand New York is housed in the former George Washington Hotel—once home to many storied writers, musicians and creatives.'
      },
      {
        name: 'Arlo SoHo',
        link: 'https://www.arlohotels.com/arlo-soho/',
        image: 'https://foto.hrsstatic.com/fotos/0/3/1388/780/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2F7%2F0%2F1%2F0%2F%2Fteaser_701071.jpg/0yENYP3mx0P2FubTK4%2FCGg%3D%3D/2996,2000/6/Arlo_SoHo-New_York-Terrasse-701071.jpg',
        description: 'SoHo hotel offers thoughtfully designed guest rooms that combine flexible, modern furniture with efficient storage spaces and a range of playful touches.'
      },
      {
        name: 'Fairfield Inn & Suites by Marriott New York Midtown Manhattan/Penn Station',
        link: 'https://www.nycgo.com/hotels/fairfield-inn-suites-by-marriott-new-york-midtown-manhattan-penn-station',
        image: 'https://cache.marriott.com/marriottassets/marriott/NYCPS/nycps-bar-0044-hor-feat.jpg?downsize=1440px:*',
        description: 'The Midtown Manhattan hotel is adjacent to Madison Square Garden and Penn Station. It features free Wi-Fi access and a rooftop bar and lounge with skyline views.'
      }
    ],
    activities: [
      {
        name: 'Join the party at Club Cumming',
        description: 'You never know what you might find in Alan Cumming’s eponymous East Village club, but you’re guaranteed to have a memorable night out.',
        link: 'https://clubcummingnyc.com/',
        image: 'https://media.timeout.com/images/104707611/380/285/image.jpg'
      },
      {
        name: 'See a Broadway show',
        description: ' Broadway shows are practically synonymous with New York City, and the word Broadway is often used as shorthand for theater itself.',
        link: 'https://broadway.timeout.com/',
        image: 'https://thenypost.files.wordpress.com/2020/03/telecharge-refunds-coronavirus.jpg?quality=80&strip=all&w=618&h=410&crop=1'
      },
      {
        name: 'Get cultured at the Metropolitan Museum of Art',
        description: 'his gorgeous late 19th century neo-classical institution is one of the biggest museums in the world.',
        link: 'https://www.timeout.com/newyork/museums/the-metropolitan-museum-of-art-1',
        image: 'https://media.timeout.com/images/104677565/380/285/image.jpg'
      }
    ],
    restaurants: [
      {
        name: 'Balthazar',
        description: '$$$',
        link: 'https://balthazarny.com/',
        image: 'https://www.solaennuevayork.com/wp-content/uploads/2012/03/balthazar.jpg'
      },
      {
        name: 'Eataly NYC Downtown',
        description: '$$',
        link: 'https://www.eataly.com/us_en/stores/nyc-downtown/',
        image: 'https://pbs.twimg.com/media/Dge3e-iVMAA7cTn.jpg'
      },
      {
        name: 'Bluebird London NYC',
        description: '$$$$',
        link: 'https://www.bluebirdlondon.nyc/',
        image: 'https://cdn.vox-cdn.com/thumbor/mQyDisgLTb4W9ZicY5RrwrkLltI=/0x0:5760x3840/1200x675/filters:focal(2420x1460:3340x2380)/cdn.vox-cdn.com/uploads/chorus_image/image/61388497/Bluebird_12.1536864341.jpg'
      },
      {
        name: 'Excuse My French',
        description: '$',
        link: 'https://www.excusemyfrench-nyc.com/',
        image: 'https://static.wixstatic.com/media/2fabfa_1532640022144f7f8baa586166b7243b.jpg'
      }
    ]
  },
  {
    destination: 'London',
    image: 'https://www.eliberico.com/wp-content/uploads/2020/02/london-eye-20-cumplean%CC%83os.jpg',
    hotels: [
      {
        name: 'Thistle Piccadilly Hotel',
        link: 'https://www.thistle.com/en/hotels/london/piccadilly.html',
        image: 'https://q-cf.bstatic.com/images/hotel/max1024x768/793/79380509.jpg',
        description: 'Thistle Piccadilly offers an authentic Victorian exterior, nestled among key cultural locations. Whether you want to explore the National Gallery, or take in a show at West End, our hotel is the perfect place to rest your head.'
      },
      {
        name: 'London House Hotel',
        link: 'https://www.londonhousehotels.com/',
        image: 'https://pix10.agoda.net/hotelImages/512/51239/51239_15022315170025526027.jpg?s=1024x768',
        description: 'The London House Hotel comprises five interconnected Victorian era buildings to form a 103 room hotel.'    
      },
      {
        name: 'Lidos Hotel',
        link: 'https://lidoshotel.com/',
        image: 'https://content.r9cdn.net/rimg/himg/d6/e5/20/arbisoftimages-129144-201401240804441437421784_outside2-image.jpg?crop=true&width=500&height=350',
        description: 'Located in the centre of London, Lidos Hotel is a convenient budget hotel for all types of travellers. Lidos Hotel London is the perfect choice for the cost conscious traveller looking for quality accommodation coming to London.'
      }
    ],
    activities: [
      {
        name: 'London Eye',
        description: 'Originally constructed to celebrate the millennium, the Eye is a giant ferris wheel offering gorgeous views across the city',
        link: 'https://www.londoneye.com/',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG'
      },
      {
        name: 'Thames Cruise',
        description: 'The Thames is the lifeblood of London, bringing industry to the city for centuries. It is England’s longest river, leading into the North Sea at its end.',
        link: 'https://www.citycruises.com/',
        image: 'https://cdn.thecrazytourist.com/wp-content/uploads/2018/08/ccimage-shutterstock_617406509.jpg'
      },
      {
        name: 'Visit the Natural History Museum',
        description: 'Museum that exhibits a vast range of specimens from various segments of natural history.',
        link: 'https://www.nhm.ac.uk/',
        image: 'https://www.nhm.ac.uk/content/dam/nhmwww/press-office/press-image-archive/2018/Hintze%20Halll%2031%20May%202018-08_FINAL.jpg.thumb.1920.1920.png'
      }
    ],
    restaurants: [
      {
        name: 'Holborn Dining Room',
        description: '$$$',
        link: 'https://holborndiningroom.com/#homepage-popup',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/05/df/bf/22/holborn-dining-room.jpg'
      },
      {
        name: 'Dinner by Heston Blumenthal',
        description: '$$$$',
        link: 'https://www.mandarinoriental.com/london/hyde-park/fine-dining/restaurants/british-cuisine/dinner-by-heston-blumenthal?htl=MOLON&kw=MOLON_dinner&eng=google&src=local',
        image: 'https://photos.mandarinoriental.com/is/image/MandarinOriental/london-restaurants-dinner-main-dining-room?wid=2880&hei=1414&fmt=jpeg&crop=36,783,4435,2177&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop'
      },
      {
        name: 'Après Food Co.',
        description: '$$',
        link: 'https://www.apresfood.com/',
        image: 'https://i.pinimg.com/474x/37/b2/e2/37b2e272a1339ebe1a907a759849770e.jpg'
      },
      {
        name: 'Leon Bankside',
        description: '$',
        link: 'https://leon.co/restaurants/bankside/',
        image: 'https://lh3.googleusercontent.com/proxy/qcbuKXP5XyWKVCa712cKOz9mVh2e19f0P5pOCnClcy6kkzFFcXdA2QbdAxinaPHhBp91dz6nn-1ZKNNi0dEWFu6SHM59gMBMtWEIwy81'
      }
    ]
  }
];
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

//---------------Export functions---------------------
export function destinationPresent(dest)
{
  for(var i = 0; i<destinations.length;i++)
  {
    if(destinations[i].destination === dest)
    {
      return true;
    }
  }
  return false;
}
export function addTrip(trip)
{
  var newId = Math.floor(Math.random() * 1000000) + 1;
  var newTrip = {
    id: newId,
    username: User.username,
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    image: trip.image,
    hotel: trip.hotel,
    activities: trip.activities,
    restaurants: trip.restaurants
  }
  trips.push(newTrip);
}
export function getDestination(id)
{
  for(var i = 0; i<destinations.length; i++)
  {
    if(destinations[i].destination == id)
    {
      return destinations[i];
    }
  }
  return null;
}
export function getTrip(id)
{
  for(var i = 0; i<trips.length; i++)
  {
    if(trips[i].id == id)
    {
      return trips[i];
    }
  }
  return null;
}
export function getUser() {
  return User;
}

//-----------------Home------------------
// export const Stack = createStackNavigator();

function App() {
  return (
    <TripCreation />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="TripClicker" component={HomeScreen} />
    //     <Stack.Screen name="Details" component={MainScreen} options={{title: 'TripClicker', headerLeft: () => {}}} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
// function HomeScreen({ navigation }) {
//   const [showError, setError] = useState(false);
//   return (
//     <View style={{ flex: 1, alignItems: 'center' }}>
//     <Image source = {require('./photoblur.jpg')} style={{
//         height: win.height,
//         width: win.width,
//         margin: 0,
//         padding: 0,
//         position:"absolute"
//       }} />
//     <Image source = {require('./logo.png')} style={{
//           width: win.width,
//           margin: 0,
//           padding: 0,
//           marginTop: 50,
//           resizeMode: 'contain'
//       }} />
//       <View style={{flexDirection:'row', justifyContent:'center'}}>
//       <View style={{flexDirection:'column', justifyContent:'center', flex: 0.7}}>
//         <Input
//           placeholder='Name'
//           label='Name'
//           inputStyle={{color: 'white'}}
//           labelStyle={{color: 'rgba(255,255,255,0.5)'}}
//           onChangeText={value => User.username = value}
//         />
//         <Input 
//           placeholder="Password" 
//           secureTextEntry={true} 
//           inputStyle={{color: 'white'}}
//           labelStyle={{color: 'rgba(255,255,255,0.5)'}}
//           label='Password'
//           onChangeText={value => User.password = value}
//         />
//       </View>
//       </View>
//       { showError && <Text style={styles.errorText}>Username and password not valid {"\n"}</Text>}
//       <Button
//         title="Sign In"
//         type='clear'
//         titleStyle={{color: 'white'}}
//         onPress={() => handleSubmit({navigation}, setError)}
//       />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();
function MainScreen() {
  return (
      <Drawer.Navigator initialRouteName="CreateTrip" screenOptions={{headerShown: false}}>
        <Drawer.Screen name="CreateTrip" component={DetailsScreen} options={{title: 'Create new trip'}} />
        <Drawer.Screen name="Trips" component={TripsScreen} options={{title: 'My trips'}}/>
      </Drawer.Navigator>
  );
}
// function userPresent(User)
// {
//   for(var i = 0; i<users.length;i++)
//   {
//     if(users[i].username === User.username && users[i].password === User.password)
//     {
//       return true;
//     }
//   }
//   return false;
// }
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

export default App;