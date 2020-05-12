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
import NewPostChooseLayout from './NewPostChooseLayoutScreen';
import NewPostButton from '../../components/NewPostButton';
import NewPostScreen2 from './NewPostScreen2';
import NewPostScreen3 from './NewPostScreen3';
import NewPostTagScreen from './NewPostTagScreen';
import NewPostNextButton from '../../components/NewPostNextButton';
import { ProfileTabsScreen } from '../ProfileTab/ProfileScreen';
import GenericHeaderButton from '../../components/GenericHeaderButton';
import Colors from '../../Styles/Colors'
import HeaderOptions from '../../Styles/HeaderOptions'
import ScreenStyle from '../../Styles/ScreenStyle';




export function MagazineScreen(props) {

    const renderFeedItem = (itemData) => {
        return (
            <View style={styles.gridItem} >
                <View style={{paddingLeft: 5}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('OthersProfile')}>
                        <View style={{flexDirection: 'row' , alignItems : 'center'}}>
                            <View style={{borderRadius: 25, overflow: 'hidden'}}>
                              <Image style={{width: 40, height: 40 }} source={require('../../assets/Images/tahsan.png')}/>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}> Tahsan </Text>
                        </View>
                    </TouchableOpacity>     
                </View>

                <TouchableOpacity style={{paddingTop: 10}}>
                    <View style={{flexDirection: 'column', width: '100%', height: 500, borderRadius: 30, overflow:'hidden'}}>
                        <Image  source={require('../../assets/Images/suit.png')} style={{height: '80%', width: '100%', flex:7}}/> 
                        <Text  style={{paddingTop: 10, flex:1, borderLeftColor: 'black',  fontWeight: 'bold', backgroundColor: 'grey'}} >   {itemData.item.caption}</Text>    
                    </View>    
                </TouchableOpacity>
   
                
               
                <View style={{paddingTop:15,flexDirection: 'row'}}>
                    <TouchableOpacity style={{paddingRight: 15, paddingLeft: 10, flex:1}} onPress={ () => {}}>
                    <MaterialCommunityIcons name="thumb-up" size={40} color='black'/>
                    </TouchableOpacity>
    
                    <TextInput placeholder="Comment" style={{flex: 3 ,paddingLeft: 5,height: 40, borderColor: 'black', backgroundColor: 'grey'}}/>
                </View>
                
               
            </View>
    
        )
    }
    return (
        <View style={ScreenStyle}>
            
            <FlatList 
                data={FEEDITEMS}
                renderItem={renderFeedItem}
            />
            
        </View>
    );

}

export default function MagazineStackScreen({navigation}) {
    const MagazineStack = createStackNavigator();
    return (
        <MagazineStack.Navigator
            screenOptions={{
                ...HeaderOptions
            }}
        >
            <MagazineStack.Screen name="Magazine" component={MagazineScreen} options = {{
                
                headerRight: () => (< NewPostButton onPress={() => navigation.navigate('NewPostChooseLayout')} />)
            }}/>
            <MagazineStack.Screen name="NewPostChooseLayout" component={NewPostChooseLayout} options = {{
                headerRight: () => (<GenericHeaderButton title="newPost" iconName="md-create" onPress={() => navigation.navigate('NewPost2')} />),    
            }}/>
            <MagazineStack.Screen name="NewPost2" component={NewPostScreen2} options = {{
                 headerRight: () => (<NewPostNextButton onPress={() => navigation.navigate('NewPost3')} />),
                 
            }}/>
            <MagazineStack.Screen name="NewPost3" component={NewPostScreen3} options = {{
                 headerRight: () => (<NewPostNextButton navigation={navigation} onPress={() => navigation.popToTop()} />)
            }}/>
            <MagazineStack.Screen name="NewPostTag" component={NewPostTagScreen}/>
            <MagazineStack.Screen name="OthersProfile" component={ProfileTabsScreen}/>

        </MagazineStack.Navigator>
        
    )
}


const styles = {
    gridItem: {
        flex: 1,
        padding : 10,
        margin: 0,
        height: 700,
        width: '100%',
        flexDirection: 'column'
    },
}