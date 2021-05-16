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
      text : "Initializing AR..."
    };
    this._onInitialized = this._onInitialized.bind(this);
    this.renderModels = this.renderModels.bind(this);
  }

//should take array of models and loop over creating viro Node with each 'gltf' and 'bin'
  renderModels = () => {
    alert(JSON.stringify(this.props.sceneNavigator.viroAppProps))
    // return this.props
     return(<ViroNode position={[1,-0.5,-2]} dragType="FixedToWorld" onDrag={()=>{}} >
           <Viro3DObject
            source={require('../finalModels/Fall/AutumnManA.002.gltf')}
            resources={[require('../finalModels/Fall/AutumnManA.002_data.bin')]}
            position={[1, .5, 0]}
            scale={[1, 1, 1]}
            type="GLTF" />
        </ViroNode>)
  }

  render() {
    const arrayObjects = []

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} style={styles.ARNav}  >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroBox position={[0, -.5, -2]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        {/* <ViroNode position={[1,-0.5,-2]} dragType="FixedToWorld" onDrag={()=>{}} >
           <Viro3DObject
            source={require('./importsAutumn/scene.gltf')}
            resources={[require('./importsAutumn/scene.bin'),
                require('./importsAutumn/textures/Autumn01_baseColor.png'),
                // require('./res/emoji_smile/emoji_smile_specular.png')
                ]}
            position={[0, .5, 0]}
            scale={[.2, .2, .2]}
            type="VRX" />
        </ViroNode> */}
        {/* {this.props.models} */}
        {/* <ViroText text={this.props.sceneNavigator.viroAppProps} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}
        {this.renderModels()}
       {/* {this.props.viroAppsProps} */}
        {/* </ViroNode> */}
      <ViroNode position={[1,-0.5,-2]} dragType="FixedToWorld" onDrag={()=>{}} >
           <Viro3DObject
            source={require('../finalModels/Fall/AutumnManA.002.gltf')}
            resources={[require('../finalModels/Fall/AutumnManA.002_data.bin')]}
            position={[1, .5, 0]}
            scale={[1, 1, 1]}
            type="GLTF" />
        </ViroNode>
      </ViroARScene>
    );
  }

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
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
