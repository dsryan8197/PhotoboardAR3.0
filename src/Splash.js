import React, { Component } from 'react';
// import PickAScene from './view/PickAScene'
import NameAProject from './create/NameAProject'
import persons from '../Group8.png'
import trash from '../trashicon2.png'
import Info1 from '../slate1.jpg'
import Info2 from '../people1.jpg'
import Info3 from '../camera1.jpg'
import Info4 from '../Info4.jpg'
import Info5 from '../Info5.jpg'
import back from '../backArrow.png'
import { Col, Row, Grid } from "react-native-easy-grid";
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import Swipeout from 'react-native-swipeout';
import { AsyncStorage } from 'react-native';
import download from '../downArrow.png'
import bigDownload from '../bigDownload.png'
import back2 from '../back2.png'
import camera from '../camerasnapshot.png'
import character from '../charactericon.png'
import help from '../help.png'
import PickAProject  from './App'

import {
  AppRegistry,
  Text,
  Button,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  // Redirect,
  PixelRatio,
  Dimensions,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

// import { , Switch } from 'react-router-dom'
import { Redirect, NativeRouter, Route, Link } from "react-router-native";

export default class Splash extends Component {
 constructor(props) {
    super();
    this.state = {
      path : "/"
    }
  }
render() {
    setTimeout(() => {
    this.setState(() => ({
          path: "/App",
        }));
     }, 3500)
return (
  <NativeRouter>
 <StatusBar hidden={false} />
 
 {this.state.path == "/" &&
  <Route>
  <SafeAreaView style={{width: '100%', height: '100%',backgroundColor: '#7844CA' }}>
      <Grid>
    <Row size={1} style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    {/* <View style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}> */}
    <Image
        style={{width: 115, height: 170, alignItems: 'center', justifyContent: 'center'}}
        source={persons}
        key="cbutton">
       </Image>
       {/* </View> */}
      {/* <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
        <Text style={{ color: '#8F8F8F', fontSize: 30}}>photobo</Text><Text style={{color: '#C3BEF7', fontSize:35}}>AR</Text><Text style={{color: '#8F8F8F', fontSize: 30}}>d</Text>
       </View> */}
    </Row>
     </Grid>
</SafeAreaView>
  </Route>
  }


  {this.state.path == "/App" && <Route render={() => (<PickAProject  />)}/>}

</NativeRouter >
)
  }
}
var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: "#8A4FFF",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#FFFFFF",
  },
  viewforobjects : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
  },
  Film: {
    color:'#7844CA',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 30,
    fontWeight: '200',
  },
  titleText: {
    paddingTop: 35,
    color:'white',
    textAlign:'center',
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 25
  },
  titleText2: {
    color:'white',
    textAlign:'center',
    justifyContent: 'center',
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 25,
    width: 300
  },
  buttonText: {
    color:'#C3BEF7',
    textAlign:'center',
    fontSize : 30
  },
  buttonTextII: {
    color:'#C3BEF7',
    textAlign:'center',
    fontSize : 40,
  },
  deleteButton : {
    color: 'white'
  },
  buttons : {
    height: 80,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center', //Centered vertically    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor:'#C3BEF7',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.2)',
  },
   buttonsplus : {
    height: 80,
    width: 80,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
    borderRadius: 80/2,
    borderWidth: 8,
    borderColor: '#C3BEF7',
  },
  // test: {
  //   backgroundColor: 'linear-gradient(165deg, #f7f5fb 50%, #fff 50%)',
  //   // backgroundImage: linear-gradient(165deg, rgb(247, 245, 251) 50%, rgb(255, 255, 255) 50%);
  // },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  introButton : {
     width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#7844CA'

  },
   Modelbuttons : {
    height: 25,
    width: 25,
    paddingTop:20,
    left: '95%',
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
  },
    Modelbuttons2 : {
    height: 35,
    opacity: 0.3,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
    Modelbuttonsone : {
    height: 31,
    width: 27,
    // paddingBottom:20,
      justifyContent: 'center',
    alignItems: 'center'
  },
});

module.exports = Splash