'use strict';

import React, { Component } from 'react';
import modelArray from '../modelScript'

import {StyleSheet} from 'react-native';

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
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor(props) {
    super();
    this.state = {
      text : "Initializing AR...",
      animation: [false,false,false,false,false,false,false,false,false,false,false]
    };
    this._onInitialized = this._onInitialized.bind(this);
    this.renderModels = this.renderModels.bind(this);
  }

_onClick = (z) => {
let ar = this.state.animation
let flag = this.state.animation[z]
let falsear = [false,false,false,false,false,false,false,false,false,false,false]
if (flag) {
  ar[z] = false
  this.setState((prevState) => ({animation: ar}));
}
if (!flag) {
ar[z] = true
  this.setState((prevState) => ({
    animation: ar
  }))
}
}
//this is the AR view that gets rendered
renderModels = () => {
let arr = []
// this loops over all the selected models in state and creates components for them
for (let i = 0; i < this.props.sceneNavigator.viroAppProps.length; i++) {
  arr.push(
    <ViroNode key={i} position={[1,-0.5,-2]} dragType="FixedToWorld" onDrag={()=>{}} >
      <Viro3DObject
       source={(this.props.sceneNavigator.viroAppProps[i])}
       onClick={() => {this._onClick(i)}}
      //  resources={[(this.props.sceneNavigator.viroAppProps[i][1])]}
       position={[0,-2.5,-1]}
      //  rotation={this.state.rotate[i]}
       animation={{name: "rotate", run: this.state.animation[i] , loop: true}}
       scale={[2.2, 2.2, 2.2]}
       type="GLB" />
     </ViroNode>
  )}
return [arr]
}
//rendered AR view
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} style={styles.ARNav}  >
        {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}
        {/* <ViroBox position={[0, -.5, -2]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/> */}
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
      <ViroNode position={[1,-0.5,-2]} dragType="FixedToWorld" onDrag={()=>{}} >
           {/* <Viro3DObject
            source={require('../finalModels/Fall/AutumnManA.002.glb')}
            onClick={() => {this._onClick(0)}}
            animation={{name: "rotate", run: this.state.animation[0] , loop: true}}
            // resources={[require('../finalModels/Fall/AutumnManA.002_data.bin')]}
            position={[0,-2.5,-1]}
            // rotation={[0, 0, 0]}
            scale={[2.5, 2.5, 2.5]}
            type="GLB" /> */}
        </ViroNode>
        {/* function on line 33 that creates all the selected models */}
        {this.renderModels()}
      </ViroARScene>
    );
  }

// this does something with the viro react library. i dunno
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
    ARNav : {
    width: '100%',
    height: '100%'
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250,
  },
});

module.exports = HelloWorldSceneAR;
