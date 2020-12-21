import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';
import SEARCHRESULTS from '../../dummy-data/SearchResults'

import * as chatActions from '../../store/actions/chats'
import * as profileActions from '../../store/actions/profile'
import { useSelector, useDispatch } from 'react-redux';

function renderItems(itemData) {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{itemData.item.firstName}</Text>
            <CheckBox />

        </View>
    )

}

export default function PeopleSearchScreen(props) {

    const myFollowers = useSelector(state => state.profile.myFollowers);

    const dispatch = useDispatch();

    const loadMyFollowers = useCallback(async () => {
        try {
            await dispatch(profileActions.getMyFollowers())
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    useEffect(() => {
        loadMyFollowers()
    }, [])
    return (
        <View style={ScreenStyle}>
            <SearchBar placeholder="Search for people..." lightTheme={true} containerStyle={{ height: 55 }} platform={Platform.OS} />
            <Text> Create Chat</Text>
            <FlatList data={myFollowers} renderItem={renderItems} />
        </View>
    )
}