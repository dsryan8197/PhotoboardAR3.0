import React, { Component } from 'react'
import modelArray from '../../modelScript'
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'
import back2 from '../../ARbackArrow.png'
import camera from '../../camerasnapshot.png'
import character from '../../charactericon.png'
// import RNImageToPdf from 'react-native-image-to-pdf';
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const ejs = require('ejs');
// const htmlPdf = require('html-pdf');
import Swipeout from 'react-native-swipeout';
import App from '../App.js';
import ARScene from '../../js/HelloWorldSceneAR'
import { Col, Row, Grid } from "react-native-easy-grid";

import {
  AppRegistry,
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
} from 'react-viro';

import { NativeModules, PermissionsAndroid, Image } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

const kPreviewTypePhoto = 1;

export default class PickAPic extends Component {
  constructor(props) {
    super();
    this.state = {
        chosenModel : null,
        chosenStyle : null,
        Viro: [],
        activePic: null,
        navigator: 'PIC',
        sharedProps : sharedProps,
        setSavedImagePath : '',
        setImageURI : '',
        screenshot_count:0,
        writeAccessPermission:false,
        videoUrl: null,
        haveSavedMedia : false,
        playPreview : false,
        previewType: kPreviewTypePhoto,
      }
    this._setARNavigatorRef = this._setARNavigatorRef.bind(this);
    this._takeScreenshot = this._takeScreenshot.bind(this);
    this.requestWriteAccessPermission = this.requestWriteAccessPermission.bind(this);
  }
  goBac(){
  this.props.history.push('/')
}

// get write access for android 
async requestWriteAccessPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Figment AR Audio Permission',
          'message': 'Figment AR App needs to access your photos / videos ' +
                     'so you can record cool videos and photos of' + 
                     'your augmented scenes.'
        }
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          writeAccessPermission:true,
        });
      } else {
        this.setState({
          writeAccessPermission:false,
        });
      }
    } catch (err) {
      console.warn("[PermissionsAndroid]" + err)
    }
  }
//navigates to AR view
_setARNavigatorRef(ARNavigator){
  this._arNavigator = ARNavigator;
}
//takescreenshot function
_takeScreenshot() {
  if (!this.state.writeAccessPermission) {
    this.requestWriteAccessPermission();
  }
  this._arNavigator._takeScreenshot("pb_" + this.state.screenshot_count, false).then((retDict)=>{
    if (!retDict.success) {
      if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
        this._displayVideoRecordAlert("Screenshot Error", "Please allow camera permissions!" + errorCode);
      }
    }
    let currentCount = this.state.screenshot_count + 1;
    this.setState((prevState) => ({
      ...prevState,
      videoUrl: "file://" + retDict.url,
      haveSavedMedia : true,
      playPreview : true,
      previewType: kPreviewTypePhoto,
      screenshot_count: currentCount,
    }));
  });
}
//async function that invokes screenshot function then updates state with a new image
shot() {
 this._takeScreenshot()
 setTimeout(() => {
  this.props.updatePictures(this.state.videoUrl, this.props.Info.description, this.props.Info.images, this.props.activeProject)
 }, 2000)
}




//this render method returns 4 possible functions
//1. PIC - shows all pics (images) in a selected scene or allows you to add a new which routes to AR
//2. AR - AR view that shows all the models, enables user to take screenshot or add model which routes to 3.
//3. Character - upon clicking a new model in AR view , this function shows all types of models. onclick routes to 4.
//4. Position - this shows all the stances of a selected Character. Routes to AR view with that model rendered
render() {
//1.
if (this.state.navigator == 'PIC') {
return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
 <NativeRouter>
  <Route exact path="/">
   <Grid>
     <Row size={1}>
       <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
         {!this.props.created ? 
         <TouchableHighlight style={localStyles.backButton, {justifyContent: 'center'}}  onPress={() => this.goBac()}>
             <Image style={localStyles.backButton} source={back}></Image>
           </TouchableHighlight>
         : 
         <Link style={localStyles.backButton, {justifyContent: 'center'}}  to={'/homepage'}>
            <Image style={localStyles.backButton} source={back}></Image>
          </Link>
        }
     </Col>
     <Col size={3} style={{justifyContent: 'center'}}>
        <Text style={localStyles.Film}>Snapshot</Text>
     </Col>
    <Col size={1}></Col>  
  </Row>
  <Row size={7}>
    <Col size={1}></Col>
    <Col size={6}>
     <ScrollView>
           {this.props.Info.images.map((el, i) => { 
            return (
            <Swipeout right={[
              {
                    text: 'Delete',
                    buttonWidth: 80,
                    backgroundColor: 'red',
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => { this.props.deletePicture(el, this.props.Info.description, this.props.Info.images, this.props.activeProject) }
                  },
                  { text: '↓',
                    buttonWidth: 80,
                    backgroundColor: 'green',
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => { this.props.Arrange(el, this.props.Info.description, this.props.Info.images, this.props.activeProject, "up", i) }
                  },
                  { text: '↑',
                    buttonWidth: 80,
                    backgroundColor: 'blue',
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => { this.props.Arrange(el, this.props.Info.description, this.props.Info.images, this.props.activeProject, "down", i) }
                  }
                  ]} autoClose='true'
                  style={{alignItems: 'center'}}
                     backgroundColor= 'transparent'
                    >
             <TouchableHighlight style={{paddingBottom: 20, alignItems: 'center'}}key={i} >
              <Image style={localStyles.imagesthing} source={{ uri :el }}></Image>
             </TouchableHighlight>
            </Swipeout>
           )})}
       </ScrollView>
    </Col>
    <Col size={1}></Col>
  </Row>
  <Row size={1} style={{paddingTop: 5}}>
      <Col size={1}></Col>
      <Col size={5} style={{backgroundColor: '#7844CA', borderRadius: 50,flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableHighlight
            style={localStyles.buttonsplus}
            onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  navigator : 'AR'
            })))}} 
            underlayColor={'#68a0ff'} >
               <Text style={localStyles.buttonText}>+</Text>
         </TouchableHighlight>
         <TouchableHighlight onPress={()=>{window.alert('f')}}>
            <Image style={localStyles.Modelbuttonsone} source={download}></Image>
          </TouchableHighlight>
      </Col>
      <Col size={1}></Col>
    </Row>
  </Grid>
</Route>
      {/* route for when you click an existing project */}
        <Route path="/homepage" render={props => 
          (<App {...props} renewed={"true"} reRender={this.props.reRender} />)
        }/>
</NativeRouter>
</SafeAreaView>
  )}

  // 2.
else if (this.state.navigator == 'AR') { 
return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
 <NativeRouter>
  <Grid>
   <Row size={1}>
     <ViroARSceneNavigator
         ref={this._setARNavigatorRef} 
         {...this.state.sharedProps}
         initialScene={{scene: ARScene}}
         viroAppProps={this.state.Viro} 
        />
     <TouchableHighlight style={{position: 'absolute', top: '5%', left: '5%', justifyContent: 'center'}} onPress={()=> {(
       this.setState((prevState) => ({
        ...prevState,
         navigator : 'PIC'
          })))}}>
         <Image
        style={localStyles.backButtonAR}
        source={back2} >
         </Image>
    </TouchableHighlight>
     <TouchableHighlight style={localStyles.Modelbuttonschar} onPress={()=> {(
       this.setState((prevState) => ({
        navigator : 'Characters'
        })))}}>
         <Image
          style={localStyles.character}
          source={character}
          key='character' >
         </Image>  
    </TouchableHighlight>
     <TouchableHighlight style={localStyles.capture} onPress={()=> this.shot()}>
        <Image
        style={localStyles.buttonsplus}
        source={camera}
        key="camera_button">
       </Image>
     </TouchableHighlight> 
  </Row>
</Grid>
</NativeRouter>
</SafeAreaView>
);
} 
  // 3.
if (this.state.navigator == 'Characters') {
  let Display = []
  for (let i = 0; i < modelArray.length; i++) {
    Display.push(
      <TouchableHighlight loading="lazy" key={i} onPress={()=> {(this.setState((prevState) => ({ chosenModel: i, navigator : 'Positions' })))}}>
        <Image loading="lazy" style={localStyles.models} source={modelArray[i].image}></Image>
      </TouchableHighlight>
   )}

return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
  <NativeRouter>
    <Grid>
      <Row size={1}>
        <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.backButton, {justifyContent: 'center'}} onPress={()=> {(
                this.setState((prevState) => ({
                  navigator : 'AR'
                })))}}>
              <Image 
              style={localStyles.backButton}
              source={back}></Image>
          </TouchableHighlight>
        </Col>
        <Col size={3} style={{justifyContent: 'center'}}>
           <Text style={localStyles.Film}>Characters</Text>
        </Col>
        <Col size={1}></Col> 
    </Row>
   <Row size={7}>
      <Col size={1}></Col>
        <Col size={6}>
          <ScrollView contentContainerStyle={localStyles.modelobjects}>
            {Display}
          </ScrollView>
       </Col>
       <Col size={1}></Col>
    </Row>
    <Row size={0.4}></Row>
 </Grid>
</NativeRouter>
</SafeAreaView>
)}

// 4.
if (this.state.navigator == 'Positions') {
const stance = []
if (this.state.chosenModel) {
for (let i = 0; i < modelArray[this.state.chosenModel].models.length; i++) {
  stance.push(
    <TouchableHighlight loading="lazy" key={i} onPress={()=> {(this.setState((prevState) => ({ 
      ...prevState,
      chosenStyle: modelArray[this.state.chosenModel].models[i], 
      navigator : 'AR',
      Viro: [...prevState.Viro, modelArray[this.state.chosenModel].gltf[i]]
       })))}}>
        <Image loading="lazy" style={localStyles.models} source={ modelArray[this.state.chosenModel].models[i]}></Image>
      </TouchableHighlight>
)}
}
 return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
  <NativeRouter>
    <Grid>
     <Row size={1}>
       <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.backButton, {justifyContent: 'center'}}  onPress={()=> {(
             this.setState((prevState) => ({
                navigator : 'Characters'
               })))}}>
              <Image
               style={localStyles.backButton} source={back}>
              </Image>
            </TouchableHighlight>
      </Col>
      <Col size={3} style={{justifyContent: 'center'}}>
         <Text style={localStyles.Film}>Poses</Text>
     </Col>
    <Col size={1}></Col> 
   </Row>
   <Row size={7}>
      <Col size={1}></Col>
      <Col size={6}>
          <ScrollView contentContainerStyle={localStyles.modelobjects}>
            {stance}
          </ScrollView> 
     </Col>
     <Col size={1}></Col>
  </Row>
  <Row size={0.4}></Row>
</Grid>
</NativeRouter>
</SafeAreaView>
)}}
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  character : {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  ARNav : {
    width: '100%',
    height: '90%'
  },
 outer : {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: "#8A4FFF",
  },
  character : {
    width: 25,
    height: 25,
  },
 inner: {
    flex : 1,
    width: '100%',
    height:'100%',
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
  buttonText: {
   color:'#C3BEF7',
    textAlign:'center',
    fontSize : 30
  },
  capture: {
    position: 'absolute',
    right: '50%',
    left: '40%',
    bottom: '2%',
  },
  models: {
    height: 200,
    width: 200,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.2)'
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
     buttonTextII: {
    color:'#C3BEF7',
    textAlign:'center',
    fontSize : 40,
  },
  pictures : {
    height: 25,
    width: '50%',
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
  },
  Modelbuttonsone : {
    height: 25,
    width: 25,
    paddingBottom:20,
      justifyContent: 'center',
    alignItems: 'center'
  },
  Modelbuttons : {
    height: 25,
    width: 25,
    paddingBottom:20,
    position: 'absolute',
    right: 110,
    top: 2,
  },
  Modelbuttons2 : {
    height: 25,
    width: 25,
    paddingBottom:20,
    position: 'absolute',
    right: 160,
    top: 2,
  },
  Modelbuttonschar: {
    height: 35,
    width: 35,
    position: 'absolute',
    left: '10%',
    bottom: '5%',
  },
  Modelbuttons3 : {
    height: 25,
    width: 25,
    paddingBottom:20,
    position: 'absolute',
    right: 110,
    top: 2,
  },
  Modelbuttons4 : {
    height: 25,
    width: 25,
    paddingBottom:20,
    position: 'absolute',
    right: 125,
    top: 2,
  },
  buttons : {
 height: 80,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center', //Centered vertically    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor:'#C3BEF7',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.2)',
  },
  imagesthing : {
    width: 169,
    height: 300,
    paddingTop:20,
    transform: [{ rotate: "270deg" }],
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
  Film: {
    color:'#7844CA',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 25
  },
  backButtonAR: {
      height: 35,
    width: 25,
      position: 'absolute',
    left: '10%',
    top: '50%',
  },
    backButton : {
    height: 35,
    width: 25,
  },
  backForCharacters : {
height: 25,
    width: 25,
  },
  viewforobjects : {
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
  },
   modelobjects : {
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
  },
});
module.exports = PickAPic