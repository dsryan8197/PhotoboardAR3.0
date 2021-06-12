import React, { Component } from 'react';
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'

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
import PickAPic from '../view/PickAPic'
import NameAScene from './NameAScene'

export default class NameAProject extends Component {
  constructor(props) {
    super();
    this.state = {
    }
  }

goBack(){
  this.props.history.push('/')
}

//this is all the functinality to add a new project to state and immediatley route to
//create a new scene in that project
  render() {
    return (
      <NativeRouter>
      <Route exact path="/">
      <View style={localStyles.inner} >
         <View style={localStyles.outer} >
          <Image style={localStyles.Modelbuttons} onPress={() => this.goBack()} source={back}></Image>      
          <Text style={localStyles.titleText}>
           Name Your Film
           </Text>
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
           (<NameAScene {...props} updatePictures={this.props.updatePictures} ObjofProje={this.props.ObjofProje[this.props.Info.activeProject]} ProjectNameInput={this.props.ProjectNameInput} AddSceneDescription={this.props.AddSceneDescription} activeProject={this.props.Info.activeProject} Info={this.props.Info}/>)
          }/>
       
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
    marginBottom: 30

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
    // marginLeft: '0%',
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
    // justifyContent: 'center',
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
  },
   createSCene : {
    // justifyContent: 'center',
    // paddingTop: '30%',
    width: '50%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    // paddingBottom: '10%',
    // height: '40%',
  },
});
module.exports = NameAProject



// WHAT goes into nameAProject from App IT WORK              what goes into pickascene from app
//  ObjofProje={this.state.ProjectObj}                           
//                                                       ObjofProje={this.state.ProjectObj[this.state.activeProject]}/>)
//   // handleChange={this.handleChange} Info={this.state}/>)



// // name a proj -> name a scene WORKS! look at name a project
// updatePictures={                                       this.props.updatePictures}
// ObjofProje={this.props.ObjofProje[this.props.Info.activeProject]}
// ProjectNameInput={                                                        this.props.ProjectNameInput}
// AddSceneDescription={this.props.AddSceneDescription}
// activeProject={                                     this.props.Info.activeProject}
// Info={this.props.Info}/>)






// when left gets passed in to name a scene it gets passed to pic well. when its passed from pick a scene

// // name ascene -> pics works!
// DataForPic={this.props.DataForPic}
// // updatePictures={this.props.updatePictures}
// Info={this.props.ObjofProje[this.state.location]} //just the scene object then go to the images of that scene

// Info2={this.props.Info}
// projectNameInput={this.props.ProjectNameInput}
// activeProject={this.props.activeProject}/>)


// make pic a scene props -> name a scene                                 dont touch beyond     name a scene -> select a pic NAME A SCENE HAS LOCATION (SCENE NAME)
// //     DataForPic={this.props.ObjofProje[this.state.activeScene]}           DataForPic={this.props.DataForPic} UNUSED    Info={this.props.ObjofProje[this.state.location]} ********so name a scene gives a location!!!!
// look more like name a proj props -> name a scene
// // ObjofProje={this.props.ObjofProje[this.props.Info.activeProject]}



// so maybe all i need to do is remove activeScene from PICASCENE and give it a activeproject instead
// to accept in pic a pic  
//  DataForPic={this.props.DataForPic}
// Info={this.props.ObjofProje[this.state.location]} 