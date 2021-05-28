import React, { Component } from 'react';
import PickAScene from './view/PickAScene'
import NameAProject from './create/NameAProject'

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

export default class PickAProject extends Component {
  constructor(props) {
    super();
    this.state = {
      activeProject : null,
      ProjectNameInput : '',
      ProjectObj : {
         Project1: {
           "EXT ALLEY DAY" : {
             description: 'EXT ALLEY DAY',
             images: []},
           "EXT ALLEY DAY" : {
             description: 'EXT ALLEY DAY',
             images : []}
         },
         Project2: {
           "EXT ALLEY DAY" : {
             description: 'EXT ALLEY DAY',
             images: []},
           "INT HOUSE NIght" : {
             description: 'INT HOUSE NIght',
             images : []}
         }
      },
    } 
  }

//adds a descrition to a created scene which then becomes the name of the scene as well
AddSceneDescription = (project, intro, sceneName, outro) => {
  alert(sceneName)
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project]: {
      ...prevState.ProjectObj[project],
    [sceneName]: {
       description: intro + ' ' + sceneName + ' ' + outro,
       images: []
     }
    }
  }
}))
}

//this holds the typed onChange value of a project name when being created
handleChange = (e) => {
  // alert(value)
  // const value = e;
  this.setState((prevState) => ({
    ...prevState,
    ProjectNameInput : e
  }));
}

//this function adds a new project to state and makes it the current project
AddProject = (ProjectNameInput) => {
this.setState((prevState) => ({
  ...prevState,
  activeProject: ProjectNameInput,
  ProjectObj : {
    ...prevState.ProjectObj,
    [ProjectNameInput] : {}
  }
}))  
}

//upon taking screenshot, this function adds that image to the list of pics in a selected scene
//within a selected project
updatePictures = (imageURL, Scene, Img, project ) => {
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj.[project],
      [Scene] : {
        description: [Scene],
        images: [...Img, imageURL]
      }
    }
  }
}))
}
 pathDirect = e => {
  this.props.history.push(e)
 }

//home page that shows all your projects and provides option to add a new project
  render() {
    return (
    <NativeRouter>
      <View style={localStyles.outer} >
         <View style={localStyles.inner} >
         <Route exact path="/">
          <Text style={localStyles.titleText}>
             {"Select a current project or start a new one"}
           </Text>
          {Object.keys(this.state.ProjectObj).map((el, i) => { 
            return (
              <Link to="/scene" key={i} style={localStyles.buttons}
              onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState, 
                  activeProject : el,
                  ProjectNameInput: el
                }))
              )}}
             >
              <Text style={localStyles.buttonText}>{el}</Text>
             </Link>
          )})}
                <Link to="/addAProject" style={localStyles.buttons}>
                <Text style={localStyles.buttonText}>{"+"}</Text>
                </Link>
          </Route>
          {/* route for when you click an existing project */}
          <Route path="/scene" render={props => 
          (<PickAScene {...props} updatePictures={this.updatePictures} ProjectNameInput={this.state.ProjectNameInput} AddSceneDescription={this.AddSceneDescription} Info={this.state} ObjofProje={this.state.ProjectObj[this.state.activeProject]}/>)
          }/>
          {/* route for when you click "+" add a new project */}
          <Route path="/addAProject" render={props => 
          (<NameAProject {...props} updatePictures={this.updatePictures} ObjofProje={this.state.ProjectObj} ProjectNameInput={this.state.ProjectNameInput} AddSceneDescription={this.AddSceneDescription} AddProject={this.AddProject} handleChange={this.handleChange} Info={this.state}/>)
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

