import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreateBlogScreen1({ navigation }) {
    //choose structure

    const formData = new FormData()
    return (
        <View style={styles.screen}>

            <TouchableOpacity
                onPress={() => {
                    formData.append('structure', '1')
                    navigation.navigate('CreateBlog2', {
                        formData: formData
                    })

                }}
                style={styles.layout}
            >
                <Text style={styles.num}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    formData.append('structure', '2')
                    navigation.navigate('CreateBlog2', {
                        formData: formData
                    })

                }}
                style={styles.layout}

            >
                <Text style={styles.num}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    formData.append('structure', '3')
                    navigation.navigate('CreateBlog2', {
                        formData: formData
                    })
                }}
                style={styles.layout}
            >
                <Text style={styles.num}>3</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        alignItems: 'center'
    },
    layout: {
        marginVertical: 20,
        marginHorizontal: 10
    },
    num: {
        fontSize: 30,
        fontWeight: '700'
    }
})
