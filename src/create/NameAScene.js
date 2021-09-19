import React, { Component } from 'react';
import trash from '../../trashicon2.png'
import download from '../../downArrow.png'
import back from '../../backArrow.png'
import PickAPic from '../view/PickAPic'
import PickAScene from '../view/PickAScene'
import { Col, Row, Grid } from "react-native-easy-grid";

import {
  AppRegistry,
  Text,
  Button,
  TextInput,
  Image,
  View,
  Picker,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';
import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import { NativeRouter, Route, Link } from "react-router-native";

export default class NameAScene extends Component {
  constructor(props) {
    super();
    this.state = {
      intExt: 'INT',
      location: '',
      dayNight : 'Day'
}}

goBack(){
  this.props.history.push('/')
}

//create a film scene and routes to list of pics
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
             {this.props.created && <TouchableHighlight style={localStyles.backButton, {justifyContent: 'center'}} onPress={() => this.goBack()}>
                <Image style={localStyles.backButton} source={back}></Image>     
             </TouchableHighlight> }
            </Col>
               <Col size={3} style={{justifyContent: 'center'}}>
            <Text style={localStyles.Film}>Create A Scene</Text>
           </Col>
              <Col size={1}></Col>  
         </Row>
           {/* </View> */}

          <Row size={5} style={{backgroundColor: 'blue'}}>
    <Col size={1}></Col>
        <Col size={6}>
           {/* <ScrollView> */}
         <View style={localStyles.createSCene} >
           <Picker
           style={{backgroundColor: 'white', width:'25%', paddingRight: 20}}
           selectedValue={this.state.intExt}
           onValueChange={(itemValue,itemIndex) => this.setState({intExt: itemValue})}
           >
            <Picker.Item label="INT" value="INT" />
            <Picker.Item label="EXT" value="EXT" />
           </Picker>

           <TextInput 
             placeholder="location"
             value={this.state.ProjectNameInput}
             style={{paddingLeft: 10, fontSize: 20, textAlign: 'center', width: '40%', paddingRight: 20}}
             onChangeText={e => this.setState((prevState) => ({
               location: e
             }))}
             />

            <Picker  style={{backgroundColor: 'white', paddingRight: 20, width:'25%'}}
              selectedValue={this.state.dayNight}
              onValueChange={(itemValue,itemIndex) => this.setState({dayNight: itemValue})}
             >
             <Picker.Item label="Day" value="Day" />
             <Picker.Item label="Night" value="Night" />
          </Picker>
         </View>
          </Col>
    <Col size={1}></Col>
    </Row>
     <Row size={1} style={{backgroundColor: 'purple'}}>
        <Col size={1} style={{backgroundColor: 'blue'}}></Col>
          
          <Col size={5} style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
              {/* <View style={{}}> */}
            <Link to="/pics"
             style={localStyles.buttonsplus}
            onPress={() => {
              this.props.AddSceneDescription(this.props.ProjectNameInput, this.state.intExt, this.state.location, this.state.dayNight, this.state.intExt + ' ' + this.state.location + ' ' + this.state.dayNight)}
              }>
              <Text style={localStyles.buttonText}>+</Text>
            </Link >
          </Col>
          
        <Col size={1} style={{backgroundColor: 'black'}}></Col>
        {/* </View> */}
      </Row>
     {/* <View style={localStyles.outer}>
   </View> */}
        </Grid>
 </Route>
         {/* routes to your list of pics in that scene (which will be none) */}
     <Route path="/pics" render={props => 
       (<PickAPic {...props}
       created={"true"}
       deletePicture={this.props.deletePicture}
       Arrange={this.props.Arrange}
       DataForPic={this.props.DataForPic}
       updatePictures={this.props.updatePictures}
       reRender={this.props.Info}
       Info={this.props.ObjofProje[this.state.intExt + ' ' + this.state.location + ' ' + this.state.dayNight]}
       projectNameInput={this.props.ProjectNameInput}
       ObjofProje={this.props.ObjofProje}
       activeProject={this.props.activeProject}/>)
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
    backButton : {
    height: 25,
    width: 25,
  },
  littleText: {
     paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 10
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
  buttonText: {
    color:'#C3BEF7',
    fontSize : 30,
        textAlign:'center',

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
  viewforobjects : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
  },
   createSCene : {
    justifyContent: 'center',
    height: 150,
    top: '50%',
    width: '100%',
    flexDirection: 'row',
    alignItems:'center',
    paddingBottom: '10%',
  },
  createSCene2 : {
    position: 'absolute',
    justifyContent: 'center',
    height: 150,
    borderWidth: 2,
    borderColor: 'black',
    top: '90%',
    width: '100%',
    flexDirection: 'row',
    alignItems:'center',
  },
});
module.exports = NameAScene