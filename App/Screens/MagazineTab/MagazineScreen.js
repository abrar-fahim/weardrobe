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
                <View style={styles.nameDP}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('OthersProfile')}>
                        <View style={styles.nameDP2}>
                            <View style={styles.DP}>
                              <Image style={styles.DPImage} source={require('../../assets/Images/tahsan.png')}/>
                            </View>
                            <Text style={styles.Name}> Tahsan </Text>
                        </View>
                    </TouchableOpacity>     
                </View>

                <TouchableOpacity style={styles.Post}>
                    <View style={styles.Post2}>
                        <Image  source={require('../../assets/Images/suit.png')} style={styles.PostImage}/> 
                        <Text  style={styles.Caption} >   {itemData.item.caption}</Text>    
                    </View>    
                </TouchableOpacity>
   
                
               
                <View style={styles.LikeComment}>
                    <TouchableOpacity style={styles.Like} onPress={ () => {}}>
                    <MaterialCommunityIcons name="thumb-up" size={40} color='black'/>
                    </TouchableOpacity>
    
                    <TextInput placeholder="Comment" style={styles.Comment}/>
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


const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        padding : 10,
        margin: 0,
        height: 700,
        width: '100%',
        flexDirection: 'column'
    },
    nameDP : {
        paddingLeft: 5
    },
    nameDP2 : 
    {
        flexDirection: 'row', 
        alignItems : 'center'
    },
    DP :
    {
        borderRadius: 25, 
        overflow: 'hidden'
    },
    DPImage :
    {
        width: 40, 
        height: 40
    },
    Name: 
    {
        fontWeight: 'bold', 
        fontSize: 20
    },
    Post:
    {
        paddingTop: 10
    },
    Post2:
    {
        flexDirection: 'column', 
        width: '100%', 
        height: 500, 
        borderRadius: 30, 
        overflow:'hidden'
    },
    PostImage:
    {
        height: '80%', 
        width: '100%', 
        flex:7
    },
    Caption:
    {
        paddingTop: 10, 
        flex:1, 
        borderLeftColor: 'black',  
        fontWeight: 'bold', 
        backgroundColor: 'grey'
    },
    LikeComment:
    {
        paddingTop:15,
        flexDirection: 'row'
    },
    Like:
    {
        paddingRight: 15, 
        paddingLeft: 10, 
        flex:1
    },
    Comment:
    {
        flex: 3 ,
        paddingLeft: 5,
        height: 40, 
        borderColor: 'black', 
        backgroundColor: 'grey'
    }
    
});