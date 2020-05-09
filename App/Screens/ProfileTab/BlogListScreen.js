import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle'

const BLOGS=[
    {
        id: 1,
        title: "First Blog",
    },
    {
        id: 2,
        title: "First Blog",
    },
    {
        id: 3,
        title: "First Blog",
    },
    {
        id: 4,
        title: "First Blog",
    }
]


export default function BlogListScreen(props) {

    function renderItems(itemData) {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('BlogScreen')}>
                <View style={{height: 30, margin: 30}}>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }
    return (
        <View style={ScreenStyle}>
            <Text> Blog Screen</Text>
            <Button onPress={ () => (props.navigation.navigate('CreateBlog1')) } title="Create New Blog Post"/>
            <FlatList data={BLOGS} renderItem={renderItems}/>
        </View>
    );

}