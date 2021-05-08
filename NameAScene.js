import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  TextInput,
  View,
  Picker,
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
import PickAScene from './PickAScene'

//tge goal of this is to add a project3 = {} to the porojectobj
//with a unique name 

export default class NameAScene extends Component {
  constructor(props) {
    super();
    this.state = {
      intExt: 'INT',
      location: '',
      dayNight : 'Day'
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
            Add A Scene to Your New Project
           </Text>
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
             style={localStyles.buttons}
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
 {/* <Text style={localStyles.titleText}>dd{JSON.stringify(this.props.ProjectNameInput)}</Text> */}
            <TouchableHighlight style={localStyles.buttons}
              // title="Create"
              onPress={() => {this.props.AddSceneDescription(this.props.ProjectNameInput, this.state.intExt, this.state.location, this.state.dayNight)}}
              >
              <Link to="/pics">
              {/* <Link to="/NameAScene"> */}
              <Text style={localStyles.buttonText}>{"Create"}</Text>
              </Link >
              {/* </Link> */}
            </TouchableHighlight>
            {/* <Text style={localStyles.littleText}>dd{JSON.stringify(this.props.ObjofProje)}</Text> */}
         </Route>
         <Route path="/pics" render={props => 
           (<PickAPic {...props} Info={this.props.ObjofProje[this.state.location]}/>)
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
module.exports = NameAScene