import React, { Component } from 'react';
import PickAScene from './PickAScene'
import NameAProject from './NameAProject'

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
        // this.handleChange = this.handleChange.bind(this);
  }

AddSceneDescription = (project, intro, sceneName, outro) => {
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project]: {
      ...prevState.ProjectObj[project],
     [sceneName] : {
       description: intro + ' ' + sceneName + ' ' + outro,
       images: []
     }
    }
  }
}))
}


handleChange = (e) => {
  // const name = e.target && e.target.name;
  const value = e;
  // alert(e)
  this.setState((prevState) => ({
    ...prevState,
    ProjectNameInput : e
  }));
  // setTimeout(() => {
  //   alert(this.props.Info.ProjectNameInput)
  // }, 1000);
}

AddProject = (ProjectNameInput) => {
this.setState((prevState) => ({
  ...prevState,
  activeProject: ProjectNameInput,
  ProjectObj : {
    ...prevState.ProjectObj,
    [ProjectNameInput] : {}
  }
}))  
// alert(this.state.ProjectObj)
}
 
updatePictures = (imageURL, Scene, Img, project ) => {
// alert(JSON.stringify(Img))
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj.[project],
      [Scene] : {
        // ...prevState.ProjectObj.[project].[Scene],
        description: Scene,
        images: [...Img, imageURL]
      }
    }
  }
}))
}
// takeScreenshot = () => {
//   // check for write permissions, if not then request
//   if (!this.state.writeAccessPermission) {
//     this.requestWriteAccessPermission();
//   }

//   this._arNavigator._takeScreenshot("figment_still_" + this.state.screenshot_count, false).then((retDict)=>{
//     if (!retDict.success) {
//       if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
//         this._displayVideoRecordAlert("Screenshot Error", "Please allow camera permissions!" + errorCode);
//       }
//     }
//     let currentCount = this.state.screenshot_count + 1;
//     this.setState({
//       videoUrl: "file://" + retDict.url,
//       haveSavedMedia : false,
//       playPreview : false,
//       previewType: kPreviewTypePhoto,
//       screenshot_count: currentCount,
//     });
//     this.props.dispatchDisplayUIScreen(UIConstants.SHOW_SHARE_SCREEN);
//   });
// }


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
                  activeProject : el,
                  ProjectNameInput: el
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
                <Link to="/addAProject">
                <Text style={localStyles.buttonText}>{"+"}</Text>
                </Link>
              </TouchableHighlight>
          </Route>
          {/* routes */}
          <Route path="/scene" render={props => 
          (<PickAScene {...props} updatePictures={this.updatePictures} ProjectNameInput={this.state.ProjectNameInput} AddSceneDescription={this.AddSceneDescription} Info={this.state} ObjofProje={this.state.ProjectObj[this.state.activeProject]}/>)
          }/>
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

