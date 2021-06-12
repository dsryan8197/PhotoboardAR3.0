import React, { Component } from 'react'
import modelArray from '../../modelScript'
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'
import camera from '../../camerasnapshot.png'
import character from '../../charactericon.png'

import {
  AppRegistry,
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
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

import { NativeRouter, Route, Link } from "react-router-native";
import ARScene from '../../js/HelloWorldSceneAR'
var sharedProps = {
  apiKey:"API_KEY_HERE",
}
import ViewShot from "react-native-view-shot";
import { NativeModules, PermissionsAndroid, Image } from 'react-native';

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
  this._arNavigator._takeScreenshot("figment_still_" + this.state.screenshot_count, true).then((retDict)=>{
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
 alert(this.props.activeProject) //undefined again!
 setTimeout(() => {
  this.props.updatePictures(this.state.videoUrl, this.props.Info.description, this.props.Info.images, this.props.activeProject)
 }, 2000)
}

componentDidMount() {
  alert(JSON.stringify(this.props.Info))
}

//this render method returns 4 possible functions
//1. PIC - shows all pics (images) in a selected scene or allows you to add a new which routes to AR
//2. AR - AR view that shows all the models, enables user to take screenshot or add model which routes to 3.
//3. Character - upon clicking a new model in AR view , this function shows all types of models. onclick routes to 4.
//4. Position - this shows all the stances of a selected Character. Routes to AR view with that model rendered
  render() {
    //this is an array of all the model types thats looped over
  let Display = []
  for (let i = 0; i < modelArray.length; i++) {
    Display.push(
      <TouchableHighlight onPress={()=> {(this.setState((prevState) => ({ chosenModel: i, navigator : 'Positions' })))}}>
        <Image style={localStyles.Modelbuttons} source={modelArray[i].image}></Image>
      </TouchableHighlight>
    )
  }
  //upon selection of a model type, all the poses that model is availiable in is looped over and stored in an array to be selected
const stance = []
if (this.state.chosenModel) {
for (let i = 0; i < modelArray[this.state.chosenModel].models.length ; i++) {
  stance.push(
    <TouchableHighlight onPress={()=> {(this.setState((prevState) => ({ 
      ...prevState,
      chosenStyle: modelArray[this.state.chosenModel].models[i], 
      navigator : 'AR',
      Viro: [...prevState.Viro, [modelArray[this.state.chosenModel].gltf[i], modelArray[this.state.chosenModel].bin[i]] ]
       })))}}>
        <Image style={localStyles.Modelbuttons} source={ modelArray[this.state.chosenModel].models[i]}></Image>
      </TouchableHighlight>
  )}
}
//1.
  if (this.state.navigator == 'PIC') {
     return (
      <NativeRouter>
        <Route exact path="/">
      {/* <View style={localStyles.outer} > */}
         <View style={localStyles.inner} >
        <View style={localStyles.outer}>
          <Image style={localStyles.Modelbuttons} onPress={() => this.goBac()} source={back}></Image>
            <Text style={localStyles.titleText}>Snapshot</Text>
            <Image style={localStyles.Modelbuttons} source={trash}></Image>
         </View>
          <View style={localStyles.viewforobjects} >
         {this.props.Info.images.map((el, i) => { 
          return (
           <TouchableHighlight key={i} onPress={()=> {(this.setState((prevState) => ({ activePic : el })) )}} >
             <Image style={localStyles.buttons} source={{ uri :el }}></Image>
           </TouchableHighlight>
        
           )})}
           <TouchableHighlight
            style={localStyles.buttons}
            onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  navigator : 'AR'
                }))
              )}} 
            underlayColor={'#68a0ff'} >
              <Text style={localStyles.buttonText}>{"+"}</Text>
          </TouchableHighlight>
       </View>
       </View>
        <View style={localStyles.outer}>
            <Image style={localStyles.Modelbuttons} onPress={()=>{alert('download')}} source={download}></Image>
        </View>
      </Route>
        {/* </View>
      </View> */}
    </NativeRouter>
    )
  }
  // 2.
  else if (this.state.navigator == 'AR') { 
     return (
     <NativeRouter>
    <View style={localStyles.inner} >
       <View style={localStyles.outer}>
         <Image
            style={localStyles.Modelbuttons}
            source={back}
            onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  navigator : 'PIC'
                }))
              )}} >
          </Image>
        </View>
       <View style={localStyles.ARNav} >
          {/* this is the AR view that is found in helloWorldSceneAR.js */}
         <ViroARSceneNavigator
             ref={this._setARNavigatorRef} 
            {...this.state.sharedProps}
            initialScene={{scene: ARScene}}
            viroAppProps={this.state.Viro} 
            />
        </View>
        </View>
         <View style={localStyles.outer}>
         <Image
        //  title="Character"
        style={localStyles.character}
         source={character}
          key='character'
          onPress={()=> {(
          this.setState((prevState) => ({
           navigator : 'Characters'
           })))}}>
      </Image>  
        <Image
        style={localStyles.buttonsplus}
        source={camera}
        key="camera_button"
        onPress={()=> this.shot()}
       >
       </Image>
        
      </View>
     </NativeRouter>

    );
  } 
  // 3.
  if (this.state.navigator == 'Characters') {
  return (
<NativeRouter>
       {/* <View style={localStyles.outer}  > */}
         <Button
            style={localStyles.buttons}
            title="back"
            onPress={()=> {(
                this.setState((prevState) => ({
                  navigator : 'AR'
                }))
              )}} 
            underlayColor={'#68a0ff'} >
          </Button>
          <Text style={localStyles.titleText}>
           {"Select Your models style"}
           </Text>
       <ScrollView>
      {Display}
       </ScrollView>
        {/* </View> */}
     </NativeRouter>
  )
  }
// 4.
  if (this.state.navigator == 'Positions') {
    return (
    <NativeRouter>
       {/* <View style={localStyles.outer} > */}
         <Button
            style={localStyles.buttons}
            title="back"
            onPress={()=> {(
                this.setState((prevState) => ({
                  navigator : 'Characters'
                }))
              )}} 
            underlayColor={'#68a0ff'} >
          </Button>
          <Text style={localStyles.titleText}>
           {"Select A Stance"}
           </Text>
       <ScrollView>
        {stance}
        </ScrollView> 
       {/* </View> */}
   </NativeRouter>
    )}
}}

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
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#FFFFFF",
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
  Modelbuttons : {
   height: 25,
    width: 25,
    paddingTop:20,
    paddingBottom:20,
    // marginLeft: '0%',
    marginTop: 10,
    marginBottom: 10,
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
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor:'#FFFFFF',
    borderWidth: 8,
    borderColor: '#FFFFFF',
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
});
module.exports = PickAPic