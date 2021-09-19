import React, { Component } from 'react';
import PickAScene from './view/PickAScene'
import NameAProject from './create/NameAProject'
import trash from '../trashicon2.png'
import Info1 from '../slate1.jpg'
import Info2 from '../people1.jpg'
import Info3 from '../camera1.jpg'
import Info4 from '../Info4.jpg'
import back from '../backArrow.png'
import { Col, Row, Grid } from "react-native-easy-grid";
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
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
  ScrollView,
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
      InfoPage: true,
      InfoPageSpecific: 'one',
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
if (!this.state.InfoPage) {

if (this.state.InfoPageSpecific == 'one') {
return (
  <SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
  <Grid>
    <Row size={1} >
    </Row>
      <Row size={4}>
    {/* <TouchableHighlight> */}
        <Image
        style={{width: '100%', height: '100%',  alignContent: 'center', justifyContent: 'center'}}
        source={Info1}
        key="cbutton">
       </Image>
     {/* </TouchableHighlight>  */}
    </Row>
  <Row size={2} style={{left: 40}}>
  <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={localStyles.buttonTextII}>Draft</Text>
        <Text style={{color: '#8F8F8F', fontSize: 20}}>Create your films and draft your scenes</Text>
    </View>
  </Row>
  <Row size={1} style={{ alignItems: 'center'}}>
  <Col size={0.5}></Col>
  <Col size={3} style={{top: 50}}>
  <AnimatedDotsCarousel
        length={4}
        currentIndex={0}
        maxIndicators={4}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'purple',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          borderColor: 'black',
          borderWidth: 1,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
  </Col>
  <Col size={1.5}>
        <TouchableHighlight onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  InfoPageSpecific : 'two'
            })))}} style={localStyles.introButton}>
            {/* <ArrowCircleRightIcon /> */}

            <Image style={{color: 'white', width: '50%', height: '50%', transform: [{ scaleX: -1 }]}} source={back}></Image>
        </TouchableHighlight>
  </Col>
  </Row>
  <Row size={1}>
  </Row>
      {/* </TouchableHighlight> */}
  {/* </View> */}
  </Grid>
  </SafeAreaView>
  )
}

if (this.state.InfoPageSpecific == 'two') {
return (
  <SafeAreaView style={{width: '100%', height: '100%'}}>
  <Grid>
    <Row size={1}>
    </Row>
      <Row size={4} style={{backgroundColor: 'blue'}}>
    {/* <View style={{width: '100%', height: '80%'}}> */}
    {/* <TouchableHighlight style={{alignContent: 'center'}}> */}
        <Image
        style={{width: '100%', height: '100%',  alignContent: 'center', justifyContent: 'center'}}
        source={Info2}
        key="cbutton">
       </Image>
     {/* </TouchableHighlight>  */}
    </Row>
  <Row size={2} style={{paddingLeft: '10%'}}>
  <View style={{alignItems: 'flex-start', width: '75%', justifyContent: 'center'}}>
        <Text style={localStyles.buttonTextII}>Frame</Text>
        {/* <Text>Create your films and draft your scenes</Text> */}
  {/* </Row>
  <Row size={1} style={{backgroundColor: 'red', left: 40}}> */}
        {/* <Text style={localStyles.buttonText}>Draft</Text> */}
        <Text style={{color: '#8F8F8F', paddintTop: '5%', fontSize: 20}}>Frame your shots in AR with up to 150 unique 3D models and poses</Text>
    </View>
  </Row>
  <Row size={1} style={{alignItems: 'center'}}>
  <Col size={0.5}></Col>
  <Col size={3} style={{top: 50}}>
  <AnimatedDotsCarousel
        length={4}
        // style={{alignItems: 'flex-end'}}
        currentIndex={1}
        maxIndicators={4}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'purple',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          borderColor: 'black',
          borderWidth: 1,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
  </Col>
  <Col size={1.5}>
        <TouchableHighlight onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  InfoPageSpecific : 'three'
            })))}} style={localStyles.introButton}>
            {/* <ArrowCircleRightIcon className="w-8 h-8"/> */}
            <Image style={{color: 'white', width: '50%', height: '50%', transform: [{ scaleX: -1 }]}} source={back}></Image>
        </TouchableHighlight>
  </Col>
  </Row>
  <Row size={1}>
  </Row>
      {/* </TouchableHighlight> */}
  {/* </View> */}
  </Grid>
  </SafeAreaView>
  )
}

if (this.state.InfoPageSpecific == 'three') {
return (
  <SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
  <Grid>
    <Row size={1}>
    </Row>
      <Row size={4}>
    {/* <TouchableHighlight> */}
        <Image
        style={{width: '100%', height: '100%',  alignContent: 'center', justifyContent: 'center'}}
        source={Info3}
        key="cbutton">
       </Image>
     {/* </TouchableHighlight>  */}
    </Row>
  <Row size={2} style={{paddingLeft: '10%'}}>
  <View style={{alignItems: 'flex-start', width: '75%', justifyContent: 'center'}}>
        <Text style={localStyles.buttonTextII}>Snap and Save</Text>
        <Text style={{color: '#8F8F8F', paddintTop: '5%', fontSize: 20}}>Create your storyboards and save them to your phones gallery</Text>
    </View>
  </Row>
  <Row size={1} style={{alignItems: 'center'}}>
  <Col size={0.5}></Col>
  <Col size={3} style={{top: 50}}>
  <AnimatedDotsCarousel
        length={4}
        currentIndex={2}
        maxIndicators={4}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'purple',
          margin: 3,
          opacity: 2,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          borderColor: 'black',
          borderWidth: 1,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
  </Col>
  <Col size={1.5}>
        <TouchableHighlight onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  InfoPageSpecific : 'four'
            })))}} style={localStyles.introButton}>
            <Image style={{color: 'white', width: '50%', height: '50%', transform: [{ scaleX: -1 }]}} source={back}></Image>
        </TouchableHighlight>
  </Col>
  </Row>
  <Row size={1}>
  </Row>
      {/* </TouchableHighlight> */}
  {/* </View> */}
  </Grid>
  </SafeAreaView>
  )
}

if (this.state.InfoPageSpecific == 'four') {
return (
  <SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
  <Grid>
  <Row size={1}>
  </Row>
  <Row size={4}>
        <Image
        style={{width: '100%', height: '100%',  alignContent: 'center', justifyContent: 'center'}}
        source={Info4}
        key="cbutton">
       </Image>
  </Row>
  <Row size={2} style={{paddingLeft: '10%'}}>
  <View style={{alignItems: 'flex-start', width: '75%', justifyContent: 'center'}}>
        <Text style={localStyles.buttonTextII}>Tips</Text>
        <Text style={{color: '#8F8F8F', paddintTop: '5%', fontSize: 20}}>Swipe to Delete and Reorder your scenes and storyboards</Text>
        <Text style={{color: '#8F8F8F', paddintTop: '5%', fontSize: 20}}>Tap your 3D models to rotate</Text>
    </View>
  </Row>
  <Row size={1} style={{alignItems: 'center'}}>
    <Col size={0.5}></Col>
    <Col size={3} style={{top: 50}}>
      <AnimatedDotsCarousel
        length={4}
        // style={{alignItems: 'flex-end'}}
        currentIndex={3}
        maxIndicators={4}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'purple',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          borderColor: 'black',
          borderWidth: 1,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
  </Col>
    <Col size={1.5}>
        <TouchableHighlight onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  // InfoPageSpecific : 'one'
                  InfoPage: false
            })))}} style={localStyles.introButton}>
            <Image style={{color: 'white', width: '50%', height: '50%', transform: [{ scaleX: -1 }]}} source={back}></Image>
        </TouchableHighlight>
    </Col>
  </Row>
  <Row size={1}>
  </Row>
  </Grid> 
  </SafeAreaView> 
  )
}

}
if (this.state.InfoPage) {
 return (
    <SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
    <NativeRouter >
      <Route exact path="/">
      <Grid>
        <Row size={1} style={{backgroundColor: 'red'}}>
         {/* <View style={localStyles.inner} > */}
         <Col size={1} style={{backgroundColor: 'blue'}}></Col>
           {/* <View style={localStyles.outer}> */}
           <Col size={3} style={{justifyContent: 'center'}}>
             <Text style={localStyles.Film}>Films</Text>
           </Col>
           {/* </View> */}
         <Col size={1}></Col>
        </Row>
        <Row size={5} style={{backgroundColor: 'blue'}}>
        <Col size={1}></Col>
        <Col size={6}>
          <ScrollView>
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
            </ScrollView>
          </Col>
          <Col size={1}></Col>
          </Row>
         <Row size={1} style={{backgroundColor: 'red'}}>
          <Col size={1} style={{backgroundColor: 'blue'}}></Col>
          <Col size={5} style={{justifyContent: 'center', alignItems: 'center'}}>
           <Link to="/addAProject" style={localStyles.buttonsplus}>
               <Text style={localStyles.buttonText}>{"+"}</Text>
           </Link>
           </Col>
            <Col size={1} style={{backgroundColor: 'black'}}></Col>
        </Row>
          {/* </View> */}
        {/* </View> */}
       {/* <View style={localStyles.outer}>
       </View> */}
       </Grid>
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
      </SafeAreaView>

    )}}

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
  Film: {
    // paddingTop: 35,
    color:'#7844CA',
    justifyContent: 'center', //Centered horizontally
       alignItems: 'center', //Centered vertically
    // textAlign:'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 25
  },
  titleText: {
    paddingTop: 35,
    color:'white',
    textAlign:'center',
    // alignContent: 'center',
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 25
  },
  titleText2: {
    color:'white',
    textAlign:'center',
    justifyContent: 'center',
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
  buttonTextII: {
    color:'#C3BEF7',
    textAlign:'center',
    fontSize : 40,
  },
  deleteButton : {
    color: 'white'
  },
  buttons : {
    height: 80,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center', //Centered vertically    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    // textAlign: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor:'#C3BEF7',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.2)',
  },
   buttonsplus : {
    height: 80,
    width: 80,
    borderRadius: 80/2,
    // textAlign:'center',
    // paddingTop:10,
    // paddingBottom:20,
    // marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
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
  introButton : {
     width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    // color: 'white',
    backgroundColor: '#7844CA'

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

