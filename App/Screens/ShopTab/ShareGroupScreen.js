import 'react-native-gesture-handler';
import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
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
import LoadingScreen from '../../components/LoadingScreen';
import Colors from '../../Styles/Colors';

export default function ShareGroupScreen(props) {

    const productId = props.route.params?.productId

    const groups = useSelector(state => state.social.groups)

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const [selected, setSelected] = useState([]);


    const dispatch = useDispatch()

    const LoadGroups = useCallback(async () => {
        try {
            setIsLoading(true)
            await dispatch(chatActions.getGroups(0))
            setIsLoading(false)
            setIter(0)
        }
        catch (err) {
            console.log(err)
        }

    })

    const LoadMoreGroups = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true);
                await dispatch(chatActions.getGroups(iter))
                setIter(iter => iter + 1)
                setIterLoading(false);
            }

        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false);

    }, [iter, iterLoading])

    const sendProduct = useCallback(async (groupId) => {
        try {


            await dispatch(chatActions.connectToGroup(groupId));

            await dispatch(chatActions.sendProduct(groupId, productId));

            // await dispatch(chatActions.disconnectFromGroup());


        }
        catch (err) {
            console.log(err)
        }

    }, [productId])

    useEffect(() => {
        LoadGroups()
        return async () => {
            await dispatch(chatActions.disconnectFromGroup())
        }
    }, []);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.headerButton} onPress={async () => {
                    if (selected.length > 0 && productId) {
                        selected.map(async groupId => {
                            await sendProduct(groupId)

                        })
                        props.navigation.goBack()
                    }
                }}>
                    <Text> Done</Text>
                </TouchableOpacity>
            )
        })
    })



    function renderItems(itemData) {

        return (

            <TouchableOpacity onPress={() => {
                selected.some(groupId => groupId === itemData.item.id) ? setSelected(state => state.filter(groupId => groupId !== itemData.item.id)) : setSelected(state => [...state, itemData.item.id])

            }}>

                <View style={styles.groupContainer}>

                    <View style={styles.picName}>
                        {itemData.item.picture !== null && itemData.item.picture !== undefined ? <Image source={itemData.item.picture} style={styles.image} /> :
                            <Ionicons name="md-people" size={30} color="grey" />
                        }


                        <Text style={styles.groupName}>{itemData.item.name !== null ? itemData.item.name : itemData.item.participants}</Text>

                    </View>

                    {selected.some(groupId => groupId === itemData.item.id) ? <Ionicons name="ios-checkmark" size={30} /> : null}

                </View>



            </TouchableOpacity>


        )
    }

    if (isLoading) {
        return <LoadingScreen />

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
                onEndReached={
                    LoadMoreGroups

                }
            />
        </View>
    )
}

const styles = StyleSheet.create({

    headerButton: {
        marginRight: 20
    },


    groupContainer: {
        flexDirection: 'row',
        height: 100,
        width: '90%',
        alignSelf: 'center',

        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.foregroundColor,
        paddingHorizontal: 30
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