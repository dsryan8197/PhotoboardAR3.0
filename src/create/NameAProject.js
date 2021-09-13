import React, { Component } from 'react';
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'
import PickAPic from '../view/PickAPic'
import NameAScene from './NameAScene'

import {
  AppRegistry,
  Text,
  Button,
  TextInput,
  Image,
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

export default class NameAProject extends Component {
  constructor(props) {
    super();
    this.state = {
    }
  }

goBack(){
  this.props.history.push('/')
}

//add a new project and immediatley route to 'create a new scene' in that project
render() {
  return (
    <NativeRouter>
     <Route exact path="/">
      <View style={localStyles.inner} >
        <View style={localStyles.outer} >
           {this.props.created && <TouchableHighlight onPress={() => this.goBack()}>
             <Image style={localStyles.Modelbuttons} source={back}></Image>      
           </TouchableHighlight>}
          <Text style={localStyles.titleText}>Name Your Film</Text>
       </View>
         <View style={localStyles.viewforobjects}>
           <View style={localStyles.createSCene}>
             <TextInput 
             placeholder="Title"
             value={this.state.ProjectNameInput}
             style={localStyles.insertfilmname}
             onChangeText={e => {this.props.handleChange(e)}}
             />
           </View>
             <View style={localStyles.createSCene}>
               <Link to="/NameAScene" onPress={() => {this.props.AddProject(this.props.ProjectNameInput)}} style={localStyles.buttonsplus}>
                 <Text style={localStyles.buttonText}>+</Text>
               </Link>
             </View>
        </View>
     </View>
   <View style={localStyles.outer}>
   </View>
  </Route>
      {/* create a scene route */}
       <Route path="/NameAScene" render={props => 
         (<NameAScene {...props}
         DeleteSceneDescription={this.props.DeleteSceneDescription}
         deletePicture={this.props.deletePicture}
         updatePictures={this.props.updatePictures}
         ObjofProje={this.props.ObjofProje[this.props.Info.activeProject]}
         ProjectNameInput={this.props.ProjectNameInput}
         AddSceneDescription={this.props.AddSceneDescription}
         activeProject={this.props.Info.activeProject}
         Info={this.props.Info}/>)
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
  littleText: {
     paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 10
  },
  inner: {
       flex : 1,
    width: '100%',
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#FFFFFF",
  },
  titleText: {
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
  insertfilmname : {
    height: 80, 
    width: '70%',
    alignItems: 'center',
    borderBottomColor:'rgba(0,0,0,.2)',
    borderBottomWidth: 2,
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 20
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
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
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
   createSCene : {
    width: '50%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
});
module.exports = NameAProject