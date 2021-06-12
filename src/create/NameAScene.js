import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  TextInput,
  Image,
  View,
  Picker,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { NativeRouter, Route, Link } from "react-router-native";
import PickAPic from '../view/PickAPic'
import PickAScene from '../view/PickAScene'

export default class NameAScene extends Component {
  constructor(props) {
    super();
    this.state = {
      intExt: 'INT',
      location: '',
      dayNight : 'Day'
    }
  }

goBack(){
  this.props.history.push('/')
}

 
//function that enables you to create the three params of a film scene 
// (INTerior/EXTerior, location, time of day) routes to list of pics
  render() {
    return (
      <NativeRouter>
      <Route exact path="/">
      <View style={localStyles.inner} >
         <View style={localStyles.outer} >
          <Image style={localStyles.Modelbuttons} onPress={() => this.goBack()} source={back}></Image>      
            <Text style={localStyles.titleText}>Create A Scene</Text>
        </View>
       <View style={localStyles.createSCene} >
           <Picker
           style={{backgroundColor: 'white', width:'25%'}}
           selectedValue={this.state.intExt}
           onValueChange={(itemValue,itemIndex) => this.setState({intExt: itemValue})}
           >
            <Picker.Item label="INT" value="INT" />
           <Picker.Item label="EXT" value="EXT" />
         </Picker>

           <TextInput 
             placeholder="location"
             value={this.state.ProjectNameInput}
             style={{paddingLeft: 10, paddingRight: 10}}
             onChangeText={e => this.setState((prevState) => ({
               location: e
             }))}
             />

          <Picker  style={{backgroundColor: 'white', width:'25%'}}
           selectedValue={this.state.dayNight}
           onValueChange={(itemValue,itemIndex) => this.setState({dayNight: itemValue})}
           >
            <Picker.Item label="Day" value="Day" />
           <Picker.Item label="Night" value="Night" />
         </Picker>
         </View>
          <View style={localStyles.createSCene}>
              <Link to="/pics" style={localStyles.buttons}
              onPress={() => {this.props.AddSceneDescription(this.props.ProjectNameInput, this.state.intExt, this.state.location, this.state.dayNight)}}>
              <Text style={localStyles.buttonText}>{"Create"}</Text>
              </Link >
          </View>
        {/* </View> */}

            </View>
           <View style={localStyles.outer}>
          </View>
         </Route>
         {/* routes to your list of pics in that scene (which will be none) */}
         <Route path="/pics" render={props => 
           (<PickAPic {...props} DataForPic={this.props.DataForPic} updatePictures={this.props.updatePictures} Info={this.props.ObjofProje[this.state.location]} projectNameInput={this.props.ProjectNameInput} activeProject={this.props.activeProject}/>)
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
  littleText: {
     paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 10
  },
  buttonText: {
    color:'#fff',
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
    paddingTop: '30%',
    width: '50%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    // height: '40%',
  },
});
module.exports = NameAScene


// // wheres its right side oming from
// // pic a scene to name a scene
// activeProject={         this.props.Info.activeProject}
// updatePictures={        this.props.updatePictures}
//     DataForPic={this.props.ObjofProje[this.state.activeScene]}
// ProjectNameInput={       this.props.ProjectNameInput}
// AddSceneDescription={this.props.AddSceneDescription}
// Info={this.props.Info}/>



// name a scene to pic a pic should stay the same. do not touch name a scene
// touch what goes in. not from name a projct but pick a scene