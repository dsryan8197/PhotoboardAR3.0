import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

var sharedProps = {
  apiKey:"API_KEY_HERE",
}

var InitialARScene = require('./js/HelloWorldSceneAR');
var InitialVRScene = require('./js/HelloWorldScene');

export default class PickAProject extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps : sharedProps,
      ProjectObj : {
         Project1: {
           Scene1 : []
         },
         Project2: {
           Scene2 : []
         }
      }
    }
  }

  render() {
    return (
      <View style={localStyles.outer} >
         <View style={localStyles.inner} >
          <Text style={localStyles.titleText}>
             Select a current project or start a new one
           </Text>
           {/* loop over state projects */}
          {Object.keys(this.state.ProjectObj).map((el, i) => { 
            return (
          <TouchableHighlight key={i} style={localStyles.buttons}
            onPress={(i) => {}}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>{el}</Text>
          </TouchableHighlight>)})}
           {/* add a plus button */}
           <TouchableHighlight style={localStyles.buttons}
            onPress={(i) => {}}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>{"+"}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
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
  }
});

module.exports = PickAProject

