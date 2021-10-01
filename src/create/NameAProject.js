import React, { Component } from 'react';
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'
import PickAPic from '../view/PickAPic'
import NameAScene from './NameAScene'
import { Col, Row, Grid } from "react-native-easy-grid";
import help from '../../help.png'
import bigDownload from '../../bigDownload.png'

import {
  AppRegistry,
  Dimensions,
  Text,
  Button,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  SafeAreaView,
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

export default class NameAProject extends Component {
  constructor(props) {
    super();
    this.state = {
    }
  }

goBack(){
  this.props.history.push('/')
}

//add a new project and immediatley route to 'create a new scene' in that project
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
            {this.props.created && <TouchableHighlight  style={localStyles.backButton, {justifyContent: 'center'}} onPress={() => this.goBack()}>
             <Image style={localStyles.backButton} source={back}></Image>      
               </TouchableHighlight>}
          </Col>
          <Col size={3} style={{justifyContent: 'center'}}>
            <Text style={localStyles.Film}>Name Your Film</Text>
          </Col>
           <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight style={{justifyContent: 'center'}}  onPress={()=>{this.props.goBackToInfo()}}>
              <Image style={localStyles.Modelbuttonsone} source={help}></Image>
           </TouchableHighlight>
           </Col>  
      </Row>
      <Row size={7} >
        <Col size={1}></Col>
         <Col size={6}>
           <View style={localStyles.viewforobjects}>
             {/* <View style={localStyles.createSCene}> */}
               <TextInput 
              placeholder="Title"
              value={this.state.ProjectNameInput}
              style={localStyles.insertfilmname}
              onChangeText={e => {this.props.handleChange(e)}}
              />
           </View>
        </Col>
        <Col size={1}></Col>
      </Row>
      <Row size={1} style={{paddingTop: 5}}>
        <Col size={1}></Col>   
        <Col size={5} style={{backgroundColor: '#7844CA', borderRadius: 50, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
               <View style={{paddingRight: 5}}>
        <Image style={localStyles.Modelbuttons2} onPress={()=>{alert('download')}} source={bigDownload}></Image>
        </View>
           <Link to="/NameAScene"  style={localStyles.buttonsplus} onPress={() => {this.props.AddProject(this.props.ProjectNameInput)}} style={localStyles.buttonsplus}>
             <Text style={localStyles.buttonText}>+</Text>
          </Link>
                 <View style={{paddingLeft: 5}}>
         <Image style={localStyles.Modelbuttons2} onPress={()=>{alert('download')}} source={download}></Image>
        </View>
        </Col>
        <Col size={1}></Col>
    </Row>
  </Grid>
  </View>
  </Route>
      {/* create a scene route */}
       <Route path="/NameAScene" render={props => 
         (<NameAScene {...props}
         DeleteSceneDescription={this.props.DeleteSceneDescription}
         Arrange={this.props.Arrange}
         deletePicture={this.props.deletePicture}
         updatePictures={this.props.updatePictures}
         ObjofProje={this.props.ObjofProje[this.props.Info.activeProject]}
         ProjectNameInput={this.props.ProjectNameInput}
         AddSceneDescription={this.props.AddSceneDescription}
         activeProject={this.props.Info.activeProject}
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
  littleText: {
     paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 10
  },
  inner: {
       flex : 1,
    width: '100%',
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#FFFFFF",
  },
  titleText: {
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
  insertfilmname : {
    height: 80, 
    width: '70%',
    alignItems: 'center',
    borderBottomColor:'#C4C4C4',
    borderBottomWidth: 2,
    textAlign: 'center',
    // marginBottom: 30,
    fontSize: 23
  },
   Modelbuttons2 : {
    height: 35,
    opacity: 0.3,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
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
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
    borderWidth: 8,
    borderColor: '#C3BEF7',
  },
   Modelbuttons : {
    height: 25,
    width: 25,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
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
      Modelbuttonsone : {
    height: 31,
    width: 27,
    // paddingBottom:20,
      justifyContent: 'center',
    alignItems: 'center'
  },
    backButton : {
    height: 35,
    width: 36,
  },
    Film: {
    color:'#7844CA',
    justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 30,
        fontWeight: '200',

  },
  viewforobjects : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '15%',
    height: '100%',
  },
   createSCene : {
    width: '50%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
});
module.exports = NameAProject