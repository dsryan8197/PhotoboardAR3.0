import React, { Component } from 'react';
import PickAScene from './view/PickAScene'
import NameAProject from './create/NameAProject'
import trash from '../trashicon2.png'
import Swipeout from 'react-native-swipeout';
import { AsyncStorage } from 'react-native';

import {
  AppRegistry,
  Text,
  Button,
  View,
  SafeAreaView,
  StyleSheet,
  PixelRatio,
  Image,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { NativeRouter, Route, Link } from "react-router-native";

export default class PickAProject extends Component {
  constructor(props) {
    super();
    this.state = {
      activeProject : null,
      ProjectNameInput : '',
      ProjectObj : {
      },
    } 
  }

 storeData = async () => {
  try {
    const jsonValue = JSON.stringify(this.state)
    await AsyncStorage.setItem('photoboard', jsonValue)
  } catch (e) {
  }
}

 getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('photoboard')
    if(jsonValue != null) {
      this.setState(JSON.parse(jsonValue))
    }
  } catch(e) {
  }
}


DeleteSceneDescription = (sceneName, project, states) => {
const x = states.ProjectObj[project]
delete x[sceneName]
return (
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project]: {
      ...x
  }}}), () => {
  this.storeData()
  })
  )
}

AddSceneDescription = (project, intro, sceneName, outro, full) => {
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project]: {
      ...prevState.ProjectObj[project],
    [full]: {
       description: full,
       images: []
  }}}}), () => {
  this.storeData()
})
}

//this holds the typed onChange value of a project name when being created
handleChange = (e) => {
  this.setState((prevState) => ({
    ...prevState,
    ProjectNameInput : e
  }), () => {
  this.storeData()
  });
}

AddProject = (ProjectNameInput) => {
this.setState((prevState) => ({
  ...prevState,
  activeProject: ProjectNameInput,
  ProjectObj : {
    ...prevState.ProjectObj,
    [ProjectNameInput] : {}
  }}), () => {
  this.storeData()
})  
}

deleteProj = (ProjectNameInput) => {
const y = this.state.ProjectObj
delete y[ProjectNameInput]
return (
this.setState((prevState) => ({
  ...prevState,
  activeProject: ProjectNameInput,
  ProjectObj : {
     ...y
  }}), () => {
  this.storeData()
}))
}

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
  }}}}), () => {
this.storeData()
})
}

deletePicture = (imageURL, Scene, Img, project ) => {
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj.[project],
      [Scene] : {
        description: [Scene],
        images: [...Img].filter(el => el !== imageURL)
   }}}}), () => {
this.storeData()
})}

Arrange = ( imageURL, Scene, Img, project, direction, index ) => {
if (direction == "down" && index > 0) {
  let d = Img[index]
  Img[index] = Img[index - 1]
  Img[index - 1] = d
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj.[project],
      [Scene] : {
        description: [Scene],
        images: [...Img]
  }}}}), () => {
this.storeData()
})

} else if (direction == "up" && index < Img.length -1) {
  let q = Img[index]
  Img[index] = Img[index + 1]
  Img[index + 1] = q
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj.[project],
      [Scene] : {
        description: [Scene],
        images: [...Img]
  }}}}), () => {
this.storeData()
})
}
}
// changeOrder = ( imageURL, Scene, Img, project ) => {
//  this.setState()
//   this.storeData(this.state.ProjectObj)
// }

componentDidMount() {
if (this.props.reRender) {
this.setState((prevState) => ({
  ...this.props.reRender
  }))
} else {
  this.getData()
}}

//home page that shows all your projects (films) and provides option to add a new project
render() {
 return (
    <NativeRouter>
      <Route exact path="/">
         <View style={localStyles.inner} >
           <View style={localStyles.outer}>
             <Text style={localStyles.titleText}>Films</Text>
           </View>
         <View style={localStyles.viewforobjects} >
          {Object.keys(this.state.ProjectObj).map((el, i) => { 
            return (
               <Swipeout right={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => { this.deleteProj(el) }
                  }]} autoClose='true'
                  style={{alignItems: 'center'}}
                     backgroundColor= 'transparent'>
              <Link to="/scene" key={i} style={localStyles.buttons} onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState, 
                  activeProject : el,
                  ProjectNameInput: el
                })))}}>
              <Text style={localStyles.titleText2}>{el}</Text>
             </Link>
             </Swipeout>
          )})}
           <Link to="/addAProject" style={localStyles.buttonsplus}>
               <Text style={localStyles.buttonText}>{"+"}</Text>
           </Link>
          </View>
        </View>
       <View style={localStyles.outer}>
       </View>
      </Route>
          {/* route for when you click an existing project */}
          <Route path="/scene" render={props => 
          (<PickAScene {...props} 
          DeleteSceneDescription={this.DeleteSceneDescription}
          deletePicture={this.deletePicture}
          updatePictures={this.updatePictures}
          ProjectNameInput={this.state.ProjectNameInput}
          AddSceneDescription={this.AddSceneDescription}
          Info={this.state}
          Arrange={this.Arrange}
          Draggable={this.state[this.state.activeProject]}
          ObjofProje={this.state.ProjectObj[this.state.activeProject]}/>)
          }/>
          {/* route for when you click "+" add a new project */}
          <Route path="/addAProject" render={props => 
          (<NameAProject {...props}
          created={"true"}
          Arrange={this.Arrange}
          Arrange={this.Arrange}
          DeleteSceneDescription={this.DeleteSceneDescription}
          deletePicture={this.deletePicture}
          updatePictures={this.updatePictures}
          ObjofProje={this.state.ProjectObj}
          ProjectNameInput={this.state.ProjectNameInput}
          AddSceneDescription={this.AddSceneDescription}
          AddProject={this.AddProject}
          handleChange={this.handleChange}
          Info={this.state}/>)
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
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#FFFFFF",
  },
  viewforobjects : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
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
    fontSize : 25,
    width: 300
  },
  buttonText: {
    color:'#C3BEF7',
    textAlign:'center',
    fontSize : 30
  },
  deleteButton : {
    color: 'white'
  },
  buttons : {
    height: 80,
    width: '100%',
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
   Modelbuttons : {
    height: 25,
    width: 25,
    paddingTop:20,
    left: '95%',
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
  },
});

module.exports = PickAProject

