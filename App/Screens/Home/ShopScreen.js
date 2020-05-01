import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'




function ShopScreen({navigation}) {
    

    const [visible, setVisible] = useState(false);

    function toggleOverlay() {
        setVisible(!visible);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                    //<Button onPress={ () => props.navigation.navigate('Cart')} title="My Cart" color="#000"/>
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='CartButton'
                            iconName='md-cart'
                            onPress={ () => navigation.navigate('Cart') }
                        />
                        <Item 
                            title='SearchButton'
                            iconName='md-search'
                            //onPress={() => navigation.navigate('Shop',{screen:'SearchScreen'})}
                            onPress={toggleOverlay}
                        />
                    </HeaderButtons>
            
                    ),
        })
    })
    
    return (
        <View>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View>
                <Text>Search overlay pops up with filters and stuff</Text>
            </View>
        </Overlay>



                    
            <Text> Shop Screen</Text>
        </View>
    );

}
function SearchScreen(props) {
    
    return (
        <Overlay isVisible={visible}>
            <Text>Woooah youre so pro omg! </Text>       
        </Overlay>
            
            
    
    )
}

function CategoriesScreen(props) {
    return (
        <View style={styles.screen}>
            <Header title="Categories"/>
            <Text> Categories Screen</Text>
        </View>
    )
}

function ShopStack(props) {
    const ShopStack = createStackNavigator();
    
    return (
    
        <ShopStack.Navigator>
            <ShopStack.Screen 
                name="ShopScreen" 
                component={ShopScreen} 
                options = {
                    ({navigation, route}) => ({
                
                    
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title='DrawerButton'
                                iconName='md-menu'
                                onPress={ () => props.navigation.openDrawer()} 
                            />
                        </HeaderButtons>
                    )
            
                })
            }

          />

          <ShopStack.Screen name="SearchScreen" component={SearchScreen}/>
        </ShopStack.Navigator>

    )
}

function CategoriesStack({ navigation }) {
    const CategoriesStack = createStackNavigator();

    return(
        <CategoriesStack.Navigator>
            <CategoriesStack.Screen name="CategoriesScreen" component={CategoriesScreen}
                options={{
                    headerRight: () => (
                        //<Button onPress={ () => props.navigation.navigate('Cart')} title="My Cart" color="#000"/>
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title='CartButton'
                                iconName='md-cart'
                                onPress={ () => navigation.navigate('Cart') }
                            />
                        </HeaderButtons>
                        ),
                    headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='DrawerButton'
                        iconName='md-menu'
                        onPress={ () => navigation.openDrawer()} 
                    />
                </HeaderButtons>)
            }}
             />
        </CategoriesStack.Navigator>
        
    )

}

function DealsStack( {navigation} ) {
    const DealsStack = createStackNavigator();

    return (
        <DealsStack.Navigator>
            <DealsStack.Screen name="DealsScreen" component = {DealsScreen} 
                options={{
                    headerRight: () => (
                        //<Button onPress={ () => props.navigation.navigate('Cart')} title="My Cart" color="#000"/>
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title='CartButton'
                                iconName='md-cart'
                                onPress={ () => navigation.navigate('Cart') }
                            />
                        </HeaderButtons>
                        ),
                     headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item 
                        title='DrawerButton'
                        iconName='md-menu'
                        onPress={ () => navigation.openDrawer()} 
                    />
                    </HeaderButtons>)
                    
            }}
            />
        </DealsStack.Navigator>
    )
}

function DealsScreen() {
    return (
        <View style={styles.screen}>
            <Text> Deals!!</Text>
        </View>
    )
}

export default function ShopStackScreen() {
    const ShopDrawer = createDrawerNavigator();

    
    
    return (
        <ShopDrawer.Navigator 
            drawerStyle={{
                width: 250
            }}
            drawerContentOptions={{
                itemStyle: {marginRight: 20},
                labelStyle: {width: 100}
            }}
         >
            <ShopDrawer.Screen  name="Shop" component={ShopStack} title="Shop"/>
            <ShopDrawer.Screen name="Categories" component={CategoriesStack} />
            <ShopDrawer.Screen name="Deals" component={DealsStack} />
            
        </ShopDrawer.Navigator>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    }
})