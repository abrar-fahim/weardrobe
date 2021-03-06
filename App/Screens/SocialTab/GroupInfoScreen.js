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
import LoadingScreen from '../../components/LoadingScreen';


export default function GroupInfoScreen(props) {

    const groupId = props.route.params?.groupId

    const dispatch = useDispatch();

    const people = useSelector(state => state.social.groupPeople)

    const [isLoading, setIsLoading] = useState(true)

    const getGroupPeople = useCallback(async () => {
        try {

            setIsLoading(true)
            await dispatch(chatActions.getGroupPeople(groupId))
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)

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

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <View style={{ ...ScreenStyle, ...styles.screen }}>
            <FlatList
                ListHeaderComponent={
                    <Text style={styles.heading}>Participants</Text>
                }
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
    heading: {
        flexDirection: 'row',
        fontSize: 20,
        fontWeight: '700',
        flex: 1,
        
    },
    screen: {
        flex: 1,
        padding: 10
    },
    person: {
        flexDirection: 'row',
        marginVertical: 40

    }
})