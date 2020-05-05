import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import {FEEDITEMS} from '../../dummy-data/Feed'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


const renderFeedItem = (itemData) => {
    return (
        <View style={styles.gridItem} >
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 20, height: 20}} source={require('../../assets/Images/face.png')}/>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}> Stickman </Text>
                </View>
                
                
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <Image  source={itemData.item.picture} style={{height: 120, width: 300}}/>
                <Text> {itemData.item.caption}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={ () => {}}>
                <MaterialCommunityIcons name="hand-okay" size={35} />
                    </TouchableOpacity>

                <TextInput placeholder="Comment" style={{borderColor: 'purple', height: 40, width: 200, backgroundColor: 'grey'}}/>
            </View>
            
           
        </View>

    )

}

export function MagazineScreen(props) {
    //console.log(props);
    return (
        <View>
            <FlatList 
                data={FEEDITEMS}
                renderItem={renderFeedItem}
            />
            <Text> Magazine Screen</Text>
            <Button onPress={ () => {} } title="Button"/>
        </View>
    );

}

export default function MagazineStackScreen() {
    const MagazineStack = createStackNavigator();
    return (
        <MagazineStack.Navigator>
            <MagazineStack.Screen name="MagazineScreen" component={MagazineScreen} options = {{}}/>
        </MagazineStack.Navigator>
        
    )
}


const styles = {
    gridItem: {
        flex: 1,
        margin: 15,
        height: 300,
        flexDirection: 'column'
    },
}