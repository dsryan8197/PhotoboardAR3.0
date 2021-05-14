import React, { Component } from 'react';
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
import PickAPic from './PickAPic'
import NameAScene from './NameAScene'
// var sharedProps = {
//   apiKey:"API_KEY_HERE",
// }

// var InitialARScene = require('./js/HelloWorldSceneAR');
// var InitialVRScene = require('./js/HelloWorldScene');
// var UNSET = "UNSET";
// var VR_NAVIGATOR_TYPE = "VR";
// var AR_NAVIGATOR_TYPE = "AR";

// var defaultNavigatorType = UNSET;

export default class PickAScene extends Component {
  constructor(props) {
    super();
    this.state = {
      activeScene: null
    }
  }

goBack(){
  this.props.history.push('/')
}

  render() {
    return (
      <NativeRouter>
      <View style={localStyles.outer} >
         <View style={localStyles.inner} >
          <Route exact path="/">
          <Button title="back to project" onPress={() => this.goBack()}/>
          <Text style={localStyles.titleText}>
            Pick your scene or start a new
           </Text>
           {/* loop over state projects */}
          {Object.keys(this.props.ObjofProje).map((el, i) => { 
          return (
                  // BIG BAD BUG YOU HAVE TO CLICK THE HIGHLIGHT TO GET STATE CHANED THEN CLICK THE LINK
           <TouchableHighlight key={i} style={localStyles.buttons}
              onPress={()=> {(
                this.setState((prevState) => ({
                  activeScene : el
                }))
              )}}            
             underlayColor={'#68a0ff'} >
            <Link to="/pics">
              <Text style={localStyles.buttonText}>{this.props.ObjofProje[el].description}</Text>
            </Link>
           </TouchableHighlight>
          )})}
          {/* ++ */}
           <TouchableHighlight style={localStyles.buttons}
               // onPress={(i) => {}}
            underlayColor={'#68a0ff'} >
            <Link to="/NameAScene">
              <Text style={localStyles.buttonText}>{"+"}</Text>
            </Link>
          </TouchableHighlight>
          {/* routes */}
          </Route>
          {/* <Route path="/project" render={props => (<)} */}
          <Route path="/pics" render={props => 
           (<PickAPic {...props} updatePictures={this.props.updatePictures} ProjectNameInput={this.props.ProjectNameInput} Info={this.props.ObjofProje[this.state.activeScene]}/>)
          }/>
             <Route path="/NameAScene" render={props => 
           (<NameAScene {...props} updatePictures={this.props.updatePictures} DataForPic={this.props.ObjofProje[this.state.activeScene]} ProjectNameInput={this.props.ProjectNameInput} AddSceneDescription={this.props.AddSceneDescription} Info={this.props.Info}/>)
          }/>
          {/* <Route exact path="/scene" component={PickAScene} /> */}
          {/* <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} /> */}
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
module.exports = PickAScene