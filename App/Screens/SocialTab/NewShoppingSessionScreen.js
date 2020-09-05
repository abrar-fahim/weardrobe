import 'react-native-gesture-handler';
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';
import UIButton from '../../components/UIButton';

import * as chatActions from '../../store/actions/chats'
import { useSelector, useDispatch } from 'react-redux';


export default function NewShoppingSessionScreen(props) {

    const groupId = props.route.params?.groupId

    const dispatch = useDispatch();

    const [name, setName] = useState('')

    const newShoppingSession = useCallback(async (sessionName) => {
        try {
            await dispatch(chatActions.startSession(groupId, sessionName))
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    return (
        <View style={{ ...ScreenStyle, ...styles.screen }}>
            <TextInput style={styles.textInput} placeholder="Enter shopping session name" onChangeText={setName} />

            <UIButton text="Start Shopping!" height={60} width={200} onPress={() => {
                newShoppingSession(name)
                props.navigation.popToTop();
                props.navigation.navigate("Shop")
            }
            }
            />




        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#eae9e9',
        height: 50,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 50,
        padding: 10
    },
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})