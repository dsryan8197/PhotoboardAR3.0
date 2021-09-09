import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';


import Swipeout from 'react-native-swipeout';
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'
import PickAPic from './PickAPic'
import NameAScene from '../create/NameAScene'

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { NativeRouter, Route, Link } from "react-router-native";

//on selecting a film (project),this shows all the scenes in that film or allows you to create a new
export default class PickAScene extends Component {
  constructor(props) {
    super();
    this.state = {
      activeScene: null
  }}

goBack(){
  this.props.history.push('/')
}
render() {
  return (
      <NativeRouter>
       <Route exact path="/">
         <View style={localStyles.inner} >
           <View style={localStyles.outer}>
             <TouchableHighlight onPress={() => this.goBack()}>
               <Image style={localStyles.Modelbuttons} source={back}></Image>
             </TouchableHighlight>
             <Text style={localStyles.titleText}>Scene</Text>
          </View>
          <View style={localStyles.viewforobjects} >
            {Object.keys(this.props.ObjofProje).map((el, i) => { 
             return (
               <Swipeout right={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => { this.props.DeleteSceneDescription(el, this.props.ProjectNameInput, this.props.Info) }
                  }]}
                  autoClose='true'
                  style={{width: 200, height: 130, alignItems: 'center'}}
                  backgroundColor= 'transparent'>
                <Link to="/pics" key={i} style={localStyles.buttons} onPress={()=> {(
                   this.setState((prevState) => ({
                     ...prevState,
                     activeScene : el
                    })))}}>
                    <Text style={localStyles.titleText2}>{this.props.ObjofProje[el].description}</Text>
                </Link>
              </Swipeout>
            )})}
            <Link to="/NameAScene"  style={localStyles.buttonsplus}>
              <Text style={localStyles.buttonText}>{"+"}</Text>
            </Link>
        </View>
      </View>
      <View style={localStyles.outer}>
         <Image style={localStyles.Modelbuttons2} onPress={()=>{alert('download')}} source={download}></Image>
      </View>
    </Route>
          {/* select a projec to go to the list of images (pics) */}
          <Route path="/pics" render={props => 
           (<PickAPic {...props} deletePicture={this.props.deletePicture} activeProject={this.props.Info.activeProject} updatePictures={this.props.updatePictures} ProjectNameInput={this.props.ProjectNameInput} Info={this.props.ObjofProje[this.state.activeScene]}/>)
          }/>
          {/* select "+" to route to create a scene */}
             <Route path="/NameAScene" render={props => 
           (<NameAScene {...props} created={"true"} deletePicture={this.props.deletePicture} activeProject={this.props.Info.activeProject} updatePictures={this.props.updatePictures} ObjofProje={this.props.ObjofProje} ProjectNameInput={this.props.ProjectNameInput} AddSceneDescription={this.props.AddSceneDescription} Info={this.props.Info}/>)
          }/>
  </NativeRouter>
  )}}

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
    width: '100%',
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#FFFFFF",
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
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 25
  },
  buttonText: {
    color:'#C3BEF7',
    textAlign:'center',
    fontSize : 30
  },
  buttons : {
    height: 80,
    width: '70%',
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#C3BEF7',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.2)',
  },
  buttonsplus : {
      height: 80,
    width: 80,
    borderRadius: 80/2,
    paddingTop:10,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#FFFFFF',
    borderWidth: 8,
    borderColor: '#C3BEF7',
  },
   Modelbuttons : {
    height: 25,
    width: 25,
    paddingBottom:20,
    position: 'absolute',
    right: 120,
    top: 2,
  },
   Modelbuttons2 : {
    height: 25,
    width: 25,
    position: 'absolute',
    left: '85%',
    top: '20%',
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
  },
  viewforobjects : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
  },
});
module.exports = PickAScene