import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Animated, PanResponder } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderOptions from '../../Styles/HeaderOptions';
import ScreenStyle from '../../Styles/ScreenStyle';



// import * as THREE from "three";






// // Create an Asset from a resource
// const asset = Asset.fromModule(require('./image.png'));

// await asset.downloadAsync();

// // This is the local URI
// const uri = asset.localUri;

// from https://github.com/expo/expo-three
import { Renderer } from 'expo-three';
import { THREE } from 'expo-three';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';

import { TextureLoader } from 'expo-three';

import { Asset } from 'expo-asset';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';



async function StudioScreen() {

    const asset = Asset.fromModule(require('../../assets/3d/sphere/sphere.obj'))


    await asset.downloadAsync();

    const loader = new OBJLoader();
    loader.load(asset.localUri, group => {
        // Model loaded...
    })

    return (
        <View style={ScreenStyle}>
            <Text> Studio Screen</Text>
            <GLView
                style={{ flex: 1 }}
                onContextCreate={(gl) => {
                    // Create a WebGLRenderer without a DOM element
                    const renderer = new Renderer({ gl });
                    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
                }}
            />
        </View>

    );

}

export default function StudioStackScreen() {
    const StudioStack = createStackNavigator();
    return (
        <StudioStack.Navigator
            screenOptions={HeaderOptions}
        >
            <StudioStack.Screen name="StudioScreen" component={StudioScreen} options={{

            }} />
        </StudioStack.Navigator>

    )
}

