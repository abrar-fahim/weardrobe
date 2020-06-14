import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';
import GROUPS from '../../dummy-data/Groups'

import * as chatActions from '../../store/actions/chats'
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

export default function GroupListScreen(props) {

    const groups = useSelector(state => state.social.groups)

    const dispatch = useDispatch()

    const LoadGroups = useCallback(async () => {
        try {
            await dispatch(chatActions.getGroups())
        }
        catch (err) {
            console.log(err)
        }

    })

    useEffect(() => {
        LoadGroups();
    }, [])
    

    function renderItems(itemData) {
        
        return (

            <TouchableOpacity onPress={() => props.navigation.navigate('GroupTab',
                {
                    groupId: itemData.item.id
                }
            )}>
                <View style={styles.groupContainer}>

                    <View style={styles.picName}>
                        {itemData.item.picture !== null && itemData.item.picture !== undefined  ? <Image source={itemData.item.picture} style={styles.image} /> :
                            <Ionicons name="md-people" size={30} color="grey" />
                        }


                        <Text style={styles.groupName}>{itemData.item.name !== null ? itemData.item.name : itemData.item.participants}</Text>


                        <View style={styles.timeContainer}>
                            <Text style={styles.time}> 5:55 pm</Text>
                        </View>

                    </View>

                    <Text style={styles.lastText}> Hi, just wanted to say that im interested...</Text>




                </View>
            </TouchableOpacity>


        )
    }
    return (
        <View style={ScreenStyle}>
            <FlatList
                data={groups}
                renderItem={renderItems}
                ListEmptyComponent={
                    <View>
                        <Text>No chats yet!</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    groupContainer: {
        height: 100,
        width: '90%',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        //backgroundColor: '#eae9e9'
    },
    image: {
        height: 35,
        width: 35,
        borderRadius: 35,
        marginTop: 5

    },
    groupName: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10
    },
    picName: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    timeContainer: {
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 2
    },
    time: {
        color: 'grey',
        fontWeight: '500',


    },
    lastText: {
        color: 'grey',
        fontWeight: '300',
        marginLeft: 41,
        marginTop: 5,

    }

})