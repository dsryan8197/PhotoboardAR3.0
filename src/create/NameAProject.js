import React, { Component } from 'react';
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'
import PickAPic from '../view/PickAPic'
import NameAScene from './NameAScene'
import { Col, Row, Grid } from "react-native-easy-grid";

import {
  AppRegistry,
  Text,
  Button,
  TextInput,
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
  return (
          <SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>

    <NativeRouter>
     <Route exact path="/">
                  <Grid>
<Row size={1} style={{backgroundColor: 'red'}}>
         <Col size={1} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue'}}>

      {/* <View style={localStyles.inner} > */}
        {/* <View style={localStyles.outer} > */}
           {this.props.created && <TouchableHighlight  style={localStyles.backButton, {justifyContent: 'center'}} onPress={() => this.goBack()}>
             <Image style={localStyles.backButton} source={back}></Image>      
           </TouchableHighlight>}
            </Col>
               <Col size={3} style={{justifyContent: 'center'}}>

          <Text style={localStyles.Film}>Name Your Film</Text>
                     </Col>
              <Col size={1}></Col>  
         </Row>
       {/* </View> */}

    <Row size={5} style={{backgroundColor: 'blue'}}>
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
    <Row size={1} style={{backgroundColor: 'purple'}}>
        <Col size={1} style={{backgroundColor: 'blue'}}></Col>
          
          <Col size={5} style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>

             {/* <View style={localStyles.createSCene}> */}
               <Link to="/NameAScene"  style={localStyles.buttonsplus} onPress={() => {this.props.AddProject(this.props.ProjectNameInput)}} style={localStyles.buttonsplus}>
                 <Text style={localStyles.buttonText}>+</Text>
               </Link>
             {/* </View> */}
                  </Col>
          
        <Col size={1} style={{backgroundColor: 'black'}}></Col>
        {/* </View> */}
      </Row>
        {/* </View> */}
     {/* </View> */}
   {/* <View style={localStyles.outer}>
   </View> */}
    </Grid>

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
    borderBottomColor:'rgba(0,0,0,.2)',
    borderBottomWidth: 2,
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 20
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
      backButton : {
    height: 25,
    width: 25,
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
  viewforobjects : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
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