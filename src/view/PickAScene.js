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
import NameAScene from '../create/NameAScene'
// var sharedProps = {
//   apiKey:"API_KEY_HERE",
// }

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

//on selecting a projec,this shows all the scenes in that project or allows you to create a new
  render() {
    return (
      <NativeRouter>
      <View style={localStyles.outer} >
         <View style={localStyles.inner} >
          <Route exact path="/">
          <Button title="back to project" onPress={() => this.goBack()}/>
          <Text style={localStyles.titleText}>
            {"Pick your scene or start a new"}
           </Text>
          {Object.keys(this.props.ObjofProje).map((el, i) => { 
          return (
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
           <TouchableHighlight style={localStyles.buttons}
            underlayColor={'#68a0ff'} >
            <Link to="/NameAScene">
              <Text style={localStyles.buttonText}>{"+"}</Text>
            </Link>
          </TouchableHighlight>
          </Route>
          {/* select a projec to go to the list of images (pics) */}
          <Route path="/pics" render={props => 
           (<PickAPic {...props} updatePictures={this.props.updatePictures} ProjectNameInput={this.props.ProjectNameInput} Info={this.props.ObjofProje[this.state.activeScene]}/>)
          }/>
          {/* select "+" to route to create a scene */}
             <Route path="/NameAScene" render={props => 
           (<NameAScene {...props} updatePictures={this.props.updatePictures} DataForPic={this.props.ObjofProje[this.state.activeScene]} ProjectNameInput={this.props.ProjectNameInput} AddSceneDescription={this.props.AddSceneDescription} Info={this.props.Info}/>)
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
module.exports = PickAScene