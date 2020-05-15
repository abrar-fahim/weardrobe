import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle';
import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NewPostChooseLayout(props) {
    return (
        <View style={styles.Main}>

            <View style={styles.Direction}>
                <MaterialCommunityIcons name="circle" size={30} color='green' />
                <MaterialCommunityIcons name="arrow-right" size={30} color='black' />
                <MaterialCommunityIcons name="circle-outline" size={30} color='black' />
                <MaterialCommunityIcons name="arrow-right" size={30} color='black' />
                <MaterialCommunityIcons name="circle-outline" size={30} color='black' />
            </View>

            <View style={styles.LayoutText}>
                <Text style={styles.ChooseLayout}>Choose Layout</Text>
            </View>

            <View style={styles.Layouts}>

                
                <View style={styles.LayoutDesign}>
                    <Image source={require('../../assets/Images/img.png')} style={styles.Pic} />
                    <Image source={require('../../assets/Images/caption.png')} style={styles.Caption} />
                    </View>
                

                
                <View style={styles.LayoutDesign}>
                    <Image source={require('../../assets/Images/caption.png')} style={styles.Caption} />
                    <Image source={require('../../assets/Images/img.png')} style={styles.Pic} />
                 </View>
                


            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    Main:
    {
        flexDirection: 'column',
        flex: 1
    },
    Direction:
    {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 25,
        paddingLeft: 100
    },
    LayoutText:
    {
        flex: 1

    },
    ChooseLayout:
    {
        flex: 1,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    Layouts:
    {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 100,
    
    },
    Touch:
    {
        flex: 1,
        
    },
    LayoutDesign:
    {
        flex : 1,
        flexDirection: 'column',
        paddingLeft : 15
    },
    Pic:
    {
        flex: 2,
        width: '80%'
    },
    Caption:
    {
        flex: 1,
        width: '80%'

    }

});