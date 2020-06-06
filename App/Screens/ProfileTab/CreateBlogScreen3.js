import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../../store/actions/profile'



export default function CreateBlogScreen3(props) {
    const formData = props.route.params?.formData

    const dispatch = useDispatch();

    const createUserBlog = useCallback(async (formData) => {
        try {
            console.log(formData)
            await dispatch(profileActions.createUserBlog(formData))
        }
        catch (err) {
            console.log(err)
        }
    })

    const [texts, setTexts] = useState({
        text1: '',
        text2: '',
        text3: ''
    })
    return (
        <View style={ScreenStyle}>
            <Text> Create Blog 3</Text>

            <TextInput placeholder="text 1" onChangeText={(text) => {
                setTexts({
                    ...texts,
                    text1: text
                })
            }} />

            <TextInput placeholder="text 2" onChangeText={(text) => {
                setTexts({
                    ...texts,
                    text2: text
                })
            }} />

            <TextInput placeholder="text 3" onChangeText={(text) => {
                setTexts({
                    ...texts,
                    text3: text
                })
            }} />

            <Button title="create blog" onPress={() => {
                formData.append('text1', texts.text1)
                formData.append('text2', texts.text2)
                formData.append('text3', texts.text3)
                

                createUserBlog(formData)
                
                props.navigation.popToTop();

            }}/>
        </View>
    )
}
