import React, { Component } from 'react';
import PickAScene from './PickAScene'

import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { NativeRouter, Route, Link } from "react-router-native";
// var sharedProps = {
//   apiKey:"API_KEY_HERE",
// }

// var InitialARScene = require('./js/HelloWorldSceneAR');
// var InitialVRScene = require('./js/HelloWorldScene');

export default class PickAProject extends Component {
  constructor(props) {
    super();
    this.state = {
      activeProject : null,
      ProjectObj : {
         Project1: {
           Scene1 : ["P1S1", "P1S1", "P1S1"],
           Scene2 : ["P1S2", "P1S2", "P1S2"]
         },
         Project2: {
           Scene1 : ["P2S1", "P2S1", "P2S1"],
           Scene2 : ["P2S2", "P2S2", "P2S2"],
           Scene3 : ["P2S3", "P2S3", "P2S3"]
         }
      }
    } 
  }

  render() {
    return (
    <NativeRouter>
      <View style={localStyles.outer} >
         <View style={localStyles.inner} >
         <Route exact path="/">
          <Text style={localStyles.titleText}>
             Select a current project or start a new one
           </Text>
           {/* loop over state projects */}
          {Object.keys(this.state.ProjectObj).map((el, i) => { 
            return (
              // BIG BAD BUG YOU HAVE TO CLICK THE HIGHLIGHT TO GET STATE CHANED THEN CLICK THE LINK
           <TouchableHighlight key={i} style={localStyles.buttons}
              onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState, 
                  activeProject : el
                }))
              )}}
              underlayColor={'#68a0ff'} >
           <Link to="/scene">
              <Text style={localStyles.buttonText}>{el}</Text>
          </Link>
             </TouchableHighlight>
          )})}
           {/* add a plus button */}
             <TouchableHighlight style={localStyles.buttons}
                // onPress={(i) => {}}
              //   onPress={()=> {(
              //   this.setState(prevState => ({
              //     ...prevState,
              //     ProjectObj["New Scene"] : {};
              //   }));
              // //   this.setState((prevState) => ({
              // //     ...prevState, 
              // //     activeProject : j
              // //   }))
              // )}}
                underlayColor={'#68a0ff'} >
                <Link to="/scene">
                <Text style={localStyles.buttonText}>{"+"}</Text>
                </Link>
              </TouchableHighlight>
          </Route>
          {/* routes */}
          <Route path="/scene" render={props => 
          (<PickAScene {...props} Info={this.state.ProjectObj[this.state.activeProject]}/>)
          }/>
        </View>
      </View>
    </NativeRouter>
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

