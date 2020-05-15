import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle';
import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NewPostScreen3(props) {
    return (
        <View style={styles.Main}>

            <View style={styles.Direction}>
                <MaterialCommunityIcons name="circle-outline" size={30} color='black' />
                <MaterialCommunityIcons name="arrow-right" size={30} color='black' />
                <MaterialCommunityIcons name="circle-outline" size={30} color='black' />
                <MaterialCommunityIcons name="arrow-right" size={30} color='black' />
                <MaterialCommunityIcons name="circle" size={30} color='green' />
            </View>

            <View style={styles.Caption}>
                 <Text style={styles.Txt}>Caption</Text>
                 <TextInput placeholder="Write Caption" style={styles.CapBox}/>
            </View>

            <View style={styles.Caption}>
                <Text style={styles.Txt}>Tag Someone</Text>
                <Button title='Tag' color='black' onPress={() => {props.navigation.navigate('NewPostTag')}} ></Button>

            </View>

            <View style={styles.PostButton}>
                <Button title='POST' color='black' onPress={() => {props.navigation.navigate('Magazine')}}></Button>

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
    Caption:
    {
        flex : 2,
        paddingLeft : 15,
        paddingRight : 15

    },
    PostButton :
    { 
        flex : 2,
        paddingTop : 150,
        paddingLeft : 100,
        paddingRight : 100,
    },
    Txt:
    {
        fontWeight: 'bold',
        fontSize: 20
    },
    CapBox:
    {
        backgroundColor : 'grey',
        height : 40
    }
    
});

// onPress={() => {props.navigation.navigate('NewPostTag')}