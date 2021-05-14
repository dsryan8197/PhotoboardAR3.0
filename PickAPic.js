import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
  ViroConstants,
} from 'react-viro';

import { NativeRouter, Route, Link } from "react-router-native";
import ARScene from './js/HelloWorldSceneAR'
var sharedProps = {
  apiKey:"API_KEY_HERE",
}
// import {captureScreen} from 'react-native-view-shot';
import ViewShot from "react-native-view-shot";
import { NativeModules, PermissionsAndroid, Image } from 'react-native';

const kPreviewTypePhoto = 1;

export default class PickAPic extends Component {
  constructor(props) {
    super();
    this.state = {
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
    // this._onButtonTap = this._onButtonTap.bind(this);
    // this._arScene.sceneNavigator.takeScreenshot('output', true)
    this._setARNavigatorRef = this._setARNavigatorRef.bind(this);
    this._takeScreenshot = this._takeScreenshot.bind(this);
    this.requestWriteAccessPermission = this.requestWriteAccessPermission.bind(this);
  }
  goBac(){
  this.props.history.push('/')
}

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

_setARNavigatorRef(ARNavigator){
  this._arNavigator = ARNavigator;
}

_takeScreenshot() {
  if (!this.state.writeAccessPermission) {
    this.requestWriteAccessPermission();
  }
  this._arNavigator._takeScreenshot("figment_still_" + this.state.screenshot_count, true).then((retDict)=>{
    if (!retDict.success) {
      if (retDict.errorCode == ViroConstants.RECORD_ERROR_NO_PERMISSION) {
        this._displayVideoRecordAlert("Screenshot Error", "Please allow camera permissions!" + errorCode);
      }
    }
    let currentCount = this.state.screenshot_count + 1;
    this.setState({
      videoUrl: "file://" + retDict.url,
      haveSavedMedia : true,
      playPreview : true,
      previewType: kPreviewTypePhoto,
      screenshot_count: currentCount,
    });
    // alert(this.state.videoUrl)
  });
}

shot() {
 this._takeScreenshot()
//  alert(JSON.stringify(this.props.Info)) // { descritption: 'int house night' images : [P, P, file] }
//  alert(JSON.stringify(this.props.Info.description)) // int house night
//  alert(JSON.stringify(this.props.Info.images)) /// [; ; ]
// alert(JSON.stringify(this.))
 setTimeout(() => {
  this.props.updatePictures(this.state.videoUrl, this.props.Info.description, this.props.Info.images, this.props.ProjectNameInput)
 }, 2000)
}

  render() {
  if (this.state.navigator == 'PIC') {
     return (
      <NativeRouter>
      <View style={localStyles.outer} >
         <View style={localStyles.inner} >
      <Button title="back to scene" onPress={() => this.goBac()}/>
          <Route exact path="/">
          <Text style={localStyles.titleText}>
           Select Your pic or start a new !
           </Text>
           {/* loop over state projects */}
         {this.props.Info.images.map((el, i) => { 
          return (
                  // BIG BAD BUG YOU HAVE TO CLICK THE HIGHLIGHT TO GET STATE CHANED THEN CLICK THE LINK
           <TouchableHighlight key={i} style={localStyles.buttons}
              onPress={()=> {(
                this.setState((prevState) => ({
                  activePic : el
                }))
              )}}             
             underlayColor={'#68a0ff'} >
              <Text style={localStyles.buttonText}>{el}</Text>
           </TouchableHighlight>
        
           )})}
           <TouchableHighlight
            style={localStyles.buttons}
            onPress={()=> {(
                this.setState((prevState) => ({
                  navigator : 'AR'
                }))
              )}} 
            underlayColor={'#68a0ff'} >
              <Text style={localStyles.buttonText}>{"+"}</Text>
          </TouchableHighlight>
          </Route>
        </View>
      </View>
    </NativeRouter>
    )
  }
  else if (this.state.navigator == 'AR') { 
     return (
       <View style={localStyles.ARNav} >
         <Button
            style={localStyles.buttons}
            title={'back'}
            onPress={()=> {(
                this.setState((prevState) => ({
                  navigator : 'PIC'
                }))
              )}} 
            underlayColor={'#68a0ff'} >
          </Button>
         <ViroARSceneNavigator
             ref={this._setARNavigatorRef} 
            {...this.state.sharedProps}
            initialScene={{scene: ARScene}} />
      <Button
      title="snapshot"
       key="camera_button"
       onPress={()=> this.shot()}
      >
      </Button>
      {/* <View style={localStyles.ViewTemp}> */}
       {/* {this.state.videoUrl && <Image style={localStyles.ViewTemp} source={{uri: this.state.videoUrl}}></Image>} */}
        {/* <Text title={"asdfasdfasdfaSDFasdfasdfasdf"}></Text> */}
      {/* </View> */}
        </View>
    );
  }}
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  ARNav : {
    width: '100%',
    height: '90%'
  },
  //  ViewTemp : {
  //   width: '40%',
  //   height: '40%',
  //   borderWidth: 3,
  //   borderColor: 'white'
  // },
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
module.exports = PickAPic