import 'react-native-gesture-handler';
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import ScreenStyle from '../../Styles/ScreenStyle';
import UIButton from '../../components/UIButton';

import * as chatActions from '../../store/actions/chats'
import { useSelector, useDispatch } from 'react-redux';


export default function GroupInfoScreen(props) {

    const groupId = props.route.params?.groupId

    const dispatch = useDispatch();

    const people = useSelector(state => state.social.groupPeople)

    const getGroupPeople = useCallback(async () => {
        try {
            await dispatch(chatActions.getGroupPeople(groupId))
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    const deleteGroup = useCallback(async () => {
        try {
            await dispatch(chatActions.deleteGroup(groupId))
        }
        catch (err) {
            console.log(err)
        }

    }, [groupId])

    useEffect(() => {
        getGroupPeople();
    }, [])

    const renderPerson = (itemData) => {
        return (
            <View style={styles.person}>
                <Image source={itemData.item.profilePic} />
                <Text>{itemData.item.firstName}   {itemData.item.lastName} </Text>

            </View>
        )
    }

    return (
        <View style={{ ...ScreenStyle, ...styles.screen }}>
            <FlatList
                data={people}
                renderItem={renderPerson}
                ListFooterComponent={
                    <Button title="Delete group" onPress={() => {
                        deleteGroup()
                        props.navigation.navigate('Groups', {
                            hello: true
                        })
                    }} />
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
        marginBottom: 50
    },
    screen: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    person: {
        flexDirection: 'row',
        marginVertical: 40

    }
})