import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  PixelRatio,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";
import Swipeout from 'react-native-swipeout';
import help from '../../help.png'
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import bigDownload from '../../bigDownload.png'
import back from '../../backArrow.png'
import PickAPic from './PickAPic'
import NameAScene from '../create/NameAScene'

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { NativeRouter, Route, Link } from "react-router-native";
//on selecting a film (project),this shows all the scenes in that film or allows you to create a new
export default class PickAScene extends Component {
  constructor(props) {
    super();
    this.state = {
      activeScene: null
  }}

goBack(){
  this.props.history.push('/')
}
render() {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
 <StatusBar hidden={false} />
 <NativeRouter>
     <Route exact path="/">
     <View style={{flex: 1}}>
       <View style={{width: SCREEN_WIDTH,
                    height: 0,
                    borderTopColor: '#F7F5FB',
                    opacity: 1,
                    borderTopWidth: SCREEN_HEIGHT / 1.7,
                    borderRightWidth: SCREEN_WIDTH,
                    borderRightColor: 'transparent',
                    position: 'absolute'}}></View>

       <Grid>
          <Row size={1}>
              <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
                 <TouchableHighlight style={localStyles.backButton, {justifyContent: 'center'}} onPress={() => this.goBack()}>
                  <Image style={localStyles.backButton} source={back}></Image>
                  </TouchableHighlight>
              </Col>
               <Col size={3} style={{justifyContent: 'center'}}>
                  <Text style={localStyles.Film}>Scene</Text>
               </Col>
               <Col size={1} style={{justifyContent: 'center'}}>
                <TouchableHighlight onPress={()=>{this.props.goBackToInfo()}}>
                   <Image style={localStyles.Modelbuttonsone} source={help}></Image>
                </TouchableHighlight>
               </Col>  
          </Row>
          <Row size={7}>
            <Col size={1}></Col>
             <Col size={6}>
                <ScrollView>
                  {Object.keys(this.props.ObjofProje).map((el, i) => { 
                   return (
                 <Swipeout right={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => { this.props.DeleteSceneDescription(el, this.props.ProjectNameInput, this.props.Info) }
                    }]}
                       autoClose='true'
                      style={{alignItems: 'center'}}
                       backgroundColor= 'transparent'>
                  <Link to="/pics" key={i} style={localStyles.buttons} onPress={()=> {(
                   this.setState((prevState) => ({
                     ...prevState,
                     activeScene : el
                    })))}}>
                    <Text style={localStyles.titleText2}>{this.props.ObjofProje[el].description}</Text>
                </Link>
               </Swipeout>
             )})}
            </ScrollView>
          </Col>
          <Col size={1}></Col>
       </Row>
      <Row size={1} style={{paddingTop: 10}}>
         <Col size={1}></Col> 
          <Col size={5} style={{backgroundColor: '#7844CA', borderRadius: 50, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
              {/* <TouchableHighlight onPress={()=>{this.props.goBackToInfo()}}>
                <Image style={localStyles.Modelbuttonsone} source={help}></Image>
             </TouchableHighlight> */}
               <Image style={localStyles.Modelbuttons2} onPress={()=>{alert('download')}} source={bigDownload}></Image>
              <Link to="/NameAScene"  style={localStyles.buttonsplus}>
                <Text style={localStyles.buttonText}>{"+"}</Text>
              </Link>
             <Image style={localStyles.Modelbuttons2} onPress={()=>{alert('download')}} source={download}></Image>
          </Col>
          <Col size={1}></Col>
      </Row>
    </Grid>
    </View>
  </Route>
          {/* select a projec to go to the list of images (pics) */}
          <Route path="/pics" render={props => 
           (<PickAPic {...props}
           deletePicture={this.props.deletePicture}
           goBackToInfo={this.props.goBackToInfo}
           activeProject={this.props.Info.activeProject}
           Arrange={this.props.Arrange}
           updatePictures={this.props.updatePictures}
           ProjectNameInput={this.props.ProjectNameInput}
           Info={this.props.ObjofProje[this.state.activeScene]}/>)
          }/>
          {/* select "+" to route to create a scene */}
             <Route path="/NameAScene" render={props => 
           (<NameAScene {...props}
           created={"true"}
           Arrange={this.props.Arrange}
          goBackToInfo={this.props.goBackToInfo}
           deletePicture={this.props.deletePicture}
           activeProject={this.props.Info.activeProject}
           updatePictures={this.props.updatePictures}
           ObjofProje={this.props.ObjofProje}
           ProjectNameInput={this.props.ProjectNameInput}
           AddSceneDescription={this.props.AddSceneDescription}
           Info={this.props.Info}/>)
          }/>
</NativeRouter>
</SafeAreaView>
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
  Film: {
    color:'#7844CA',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 35
  },
  inner: {
    flex : 1,
    width: '100%',
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
  buttonsplus : {
    height: 80,
    width: 80,
    borderRadius: 80/2,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
    borderWidth: 8,
    borderColor: '#C3BEF7',
  },
  backButton : {
    height: 35,
    width: 25,
  },
   Modelbuttons : {
    height: 25,
    width: 25,
    paddingBottom:20,
    position: 'absolute',
    right: 120,
    top: 2,
  },
   Modelbuttons2 : {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
   Modelbuttonsone : {
    height: 25,
    width: 25,
    paddingBottom:20,
      justifyContent: 'center',
    alignItems: 'center'
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
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
  },
});
module.exports = PickAScene