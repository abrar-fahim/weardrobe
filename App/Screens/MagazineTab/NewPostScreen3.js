import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle';
import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import * as magazineActions from '../../store/actions/magazine'
import Colors from '../../Styles/Colors';

export default function NewPostScreen3(props) {
    const formData = props.route.params?.formData;
    const product = props.route.params?.product;

    const [caption, setCaption] = useState('');

    const dispatch = useDispatch();
    // console.log('screen3: '  + formData)

    const createUserPost = useCallback(async (formData) => {
        try {
            // console.log(formData)
            await dispatch(magazineActions.createUserPost(formData))
        }
        catch (err) {
            console.log(err)
        }
    })


    return (
        <View style={styles.Main}>

            <View style={styles.Direction}>
                <MaterialCommunityIcons name="circle-outline" size={20} color='black' />
                <MaterialCommunityIcons name="arrow-right" size={20} color='black' />
                <MaterialCommunityIcons name="circle-outline" size={20} color='black' />
                <MaterialCommunityIcons name="arrow-right" size={20} color='black' />
                <MaterialCommunityIcons name="circle" size={20} color='lightblue' />
            </View>

            <View style={styles.Caption}>
                <Text style={styles.Txt}>Caption</Text>
                <TextInput placeholder="Write Caption" style={styles.CapBox} multiline onChangeText={setCaption} />
            </View>

            <View style={styles.Caption}>
                <Text style={styles.Txt}>Tag Someone</Text>
                <Button title='Tag' color={Colors.primaryColor} onPress={() => { props.navigation.navigate('NewPostTag') }} ></Button>

            </View>

            <View style={styles.PostButton}>
                <Button title='POST' color={Colors.primaryColor} onPress={() => {

                    formData.append('caption', caption)
                    if (product) formData.append('productId', product.id)
                    createUserPost(formData)
                    props.navigation.navigate('Magazine')
                }}></Button>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    Main:
    {
        flexDirection: 'column',
        flex: 1
    },
    Direction:
    {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center'
    },
    Caption:
    {
        flex: 2,
        paddingLeft: 15,
        paddingRight: 15

    },
    PostButton:
    {
        flex: 2,
        paddingTop: 150,
        paddingLeft: 100,
        paddingRight: 100,
    },
    Txt:
    {
        fontWeight: 'bold',
        fontSize: 20
    },
    CapBox:
    {
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        marginVertical: 10,
        
        
    }

});

// onPress={() => {props.navigation.navigate('NewPostTag')}