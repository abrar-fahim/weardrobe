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
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

import MySearchBar from '../../components/MySearchBar'
import Colors from '../../Styles/Colors';

import * as popupActions from '../../store/actions/Popup'


export default function NewChatScreen(props) {

    const [selected, setSelected] = useState([]);


    const myFollowers = useSelector(state => state.profile.myFollowers);

    const dispatch = useDispatch();

    const [username, setUsername] = useState('')

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)




    const searchResults = useSelector(state => state.search.people)

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
            await dispatch(searchActions.searchAllUsernames(username, 0))
        }
        catch (err) {
            console.log(err)
        }

    })
    const loadMoreUsernames = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(searchActions.searchAllUsernames(username, iter))
                setIter(iter => iter + 1)
                setIterLoading(false)
            }

        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false)

    }, [username, iterLoading, iter])

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

                    <GenericHeaderButton title="create-group" iconName="md-checkmark" onPress={() => {
                        if (selected.length === 0) {
                            dispatch(popupActions.setMessage('Choose atleast one person', true))
                        }
                        else {
                            createGroup()
                            props.navigation.goBack();
                        }
                    }
                    } />

                )
            }
        )
    })


    function renderItems(itemData) {

        return (
            <View style={styles.listItem}>
                <Image source={itemData.item.profilePic} style={styles.image} />

                <Text style={styles.name} >{itemData.item.firstName}</Text>

                <View style={styles.checkBoxContainer}>

                    {selected.some(person => person.id === itemData.item.id) ?
                        <Ionicons
                            name="md-checkmark-circle"
                            size={28}
                            onPress={() => {
                                setSelected(selected.filter(person => person.id !== itemData.item.id))
                            }}
                            color={Colors.primaryColor}
                        /> :
                        <Feather
                            name="circle"
                            size={25}
                            onPress={() => {
                                setSelected(state => [...state, itemData.item])
                            }}
                            color={Colors.primaryColor}
                        />}

                    {/* <CheckBox
                        // checked=
                        onPress={() => {
                            selected.some(person => person.id === itemData.item.id) ?  : 
                        }}
                    /> */}
                </View>


            </View>
        )

    }

    // const MySearchBar = useCallback((props) => (
    //     <SearchBar
    //         {...props}
    //     />

    // ))
    return (
        <View style={ScreenStyle}>

            <MySearchBar
                placeholder="Search for people..."
                onChangeText={(text) => {
                    setUsername(text);
                    searchAllUsernames(text)

                }
                }
                navigation={props.navigation}
                showBackButton={false}
            />

            {/* <View style={styles.searchContainer}>
                <Ionicons name="md-search" size={25} color="grey" />
                <TextInput
                    placeholder="Search for people..."
                    onChangeText={searchAllUsernames}
                    style={styles.searchBar}

                />
            </View> */}


            {/* <SearchBar
                placeholder="Search for people..."
                lightTheme={true}
                containerStyle={{ height: 55 }}
                platform={Platform.OS}
                // onChangeText={searchAllUsernames} 
                /> */}
            <FlatList
                data={
                    searchResults.length === 0 ?
                        (selected.length === 0 ? myFollowers : selected)
                        : searchResults
                } renderItem={renderItems}
                onEndReached={loadMoreUsernames}

            />


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
        padding: 10,
        height: 70,
        alignSelf: 'center'
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