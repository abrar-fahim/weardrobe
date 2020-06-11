import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SearchBar, Overlay, CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';

import { USERS } from '../../dummy-data/users'
import * as chatActions from '../../store/actions/chats'
import * as profileActions from '../../store/actions/profile'
import * as searchActions from '../../store/actions/search'

import { useSelector, useDispatch } from 'react-redux';
import GenericHeaderButton from '../../components/GenericHeaderButton';
import { Ionicons } from '@expo/vector-icons';


export default function NewChatScreen(props) {

    const [selected, setSelected] = useState([]);


    const myFollowers = useSelector(state => state.profile.myFollowers);

    const dispatch = useDispatch();



    const searchResults = useSelector(state => state.search.usernames)

    const loadMyFollowers = useCallback(async () => {
        try {
            await dispatch(profileActions.getMyFollowers())
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    const searchAllUsernames = useCallback(async (username) => {
        try {
            await dispatch(searchActions.searchAllUsernames(username))
        }
        catch (err) {
            console.log(err)
        }

    })

    const createGroup = useCallback(async () => {
        try {
            await dispatch(chatActions.createGroup(selected.map(person => person.id)))
            await dispatch(chatActions.getGroups())
        }
        catch (err) {
            console.log(err)
        }

    }, [selected])

    useEffect(() => {
        loadMyFollowers()
    }, [])


    useLayoutEffect(() => {
        props.navigation.setOptions(
            {
                headerRight: () => (
                    <Button title="done" onPress={() => {
                        createGroup();
                        props.navigation.goBack()
                    }} />
                )
            }
        )
    })


    function renderItems(itemData) {

        return (
            <View style={styles.listItem}>
                <Image source={require('../../assets/Images/pic2.jpg')} style={styles.image} />

                <Text style={styles.name} >{itemData.item.firstName}</Text>

                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        checked={selected.some(person => person.id === itemData.item.id)}
                        onPress={() => {

                            selected.some(person => person.id === itemData.item.id) ? setSelected(selected.filter(person => person.id !== itemData.item.id)) : setSelected(state => [...state, itemData.item])
                        }}
                    />
                </View>


            </View>
        )

    }

    const MySearchBar = useCallback((props) => (
        <SearchBar
            {...props}
        />

    ))
    return (
        <View style={ScreenStyle}>

            <View style={styles.searchContainer}>
                <Ionicons name="md-search" size={25} color="grey" />
                <TextInput
                    placeholder="Search for people..."
                    onChangeText={searchAllUsernames}
                    style={styles.searchBar}

                />
            </View>


            {/* <SearchBar
                placeholder="Search for people..."
                lightTheme={true}
                containerStyle={{ height: 55 }}
                platform={Platform.OS}
                // onChangeText={searchAllUsernames} 
                /> */}
            <FlatList data={
                searchResults.length === 0 ?
                    (selected.length === 0 ? myFollowers : selected)
                    : searchResults
            } renderItem={renderItems} />


        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        height: 55,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10

    },
    searchBar: {
        paddingHorizontal: 10,
        marginLeft: 10
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eae9e9',
        width: '90%',
        margin: 10,
        padding: 5
    },
    image: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    name: {
        marginLeft: 10

    },
    checkBoxContainer: {
        flex: 1,
        alignItems: 'flex-end',

    },

})