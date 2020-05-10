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
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('OthersProfile')}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{width: 20, height: 20}} source={require('../../assets/Images/face.png')}/>
                            <Text style={{fontWeight: 'bold', fontSize: 17}}> Stickman </Text>
                        </View>
                    </TouchableOpacity>
                    
                    
                    
                </View>
                <TouchableOpacity>
                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <Image  source={itemData.item.picture} style={{height: 120, width: 300}}/>
                        <Text> {itemData.item.caption}</Text>
                    </View>
                </TouchableOpacity>
               
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={ () => {}}>
                    <MaterialCommunityIcons name="hand-okay" size={35} />
                        </TouchableOpacity>
    
                    <TextInput placeholder="Comment" style={{borderColor: 'purple', height: 40, width: 200, backgroundColor: 'grey'}}/>
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
        margin: 15,
        height: 300,
        flexDirection: 'column'
    },
}