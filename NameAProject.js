import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  TextInput,
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

//tge goal of this is to add a project3 = {} to the porojectobj
//with a unique name 

export default class NameAProject extends Component {
  constructor(props) {
    super();
    this.state = {
    }
    // this.handleChange = this.handleChange.bind(this);
  }

goBack(){
  this.props.history.push('/')
}


  render() {
    return (
      <NativeRouter>
      <View style={localStyles.outer} >
         <View style={localStyles.inner} >
       <Button title="back to project" onPress={() => this.goBack()}/>
          <Route exact path="/">
          <Text style={localStyles.titleText}>
            Form to Add a Project
           </Text>
           <TextInput 
            //  name={"NameAProject"}
             placeholder="placeholder"
             value={this.state.ProjectNameInput}
             style={localStyles.buttons}
             onChangeText={e => {this.props.handleChange(e)}}
             />
            
            <TouchableHighlight style={localStyles.buttons}
              // title="Create"
              onPress={() => {this.props.AddProject(this.props.ProjectNameInput)}}
              >
              <Link to="/NameAScene">
              <Text style={localStyles.buttonText}>{"+"}</Text>
              </Link >
            </TouchableHighlight>

            {/* <Text style={localStyles.littleText}>dd{JSON.stringify(this.props.ObjofProje[this.props.Info.activeProject])}</Text> */}
          </Route>
          <Route path="/NameAScene" render={props => 
           (<NameAScene {...props} ObjofProje={this.props.ObjofProje[this.props.Info.activeProject]} ProjectNameInput={this.props.ProjectNameInput} AddSceneDescription={this.props.AddSceneDescription} Info={this.props.Info}/>)
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
  },  littleText: {
     paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 10
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
module.exports = NameAProject