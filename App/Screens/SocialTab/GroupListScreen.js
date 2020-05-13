import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ScreenStyle from '../../Styles/ScreenStyle';
import GROUPS from '../../dummy-data/Groups'

export default function GroupListScreen(props) {

    function renderItems(itemData) {
        return (
            
            <TouchableOpacity onPress={ () => props.navigation.navigate('GroupTab') }>
            <View style={styles.groupContainer}>

                <View style={styles.picName}>
                    <Image source={itemData.item.picture} style={styles.image}/>
                    <Text style={styles.groupName}>{itemData.item.name}</Text>

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
            <FlatList data={GROUPS} renderItem={renderItems}/>
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
    image : {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginTop: 5

    },
    groupName: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 5
    },
    picName : {
        flexDirection: 'row',
        width: '100%',
        height: 50, 
        alignItems: 'center'
    },
    timeContainer :{
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 2
    },
    time : {
        color: 'grey',
        fontWeight: '500',
        

    },
    lastText: {
        color: 'grey',
        fontWeight: '300',
        marginLeft: 5,
        marginTop: 5,
        marginLeft: 40

    }

})