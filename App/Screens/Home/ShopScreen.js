import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';


import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { SearchBar, Overlay } from 'react-native-elements';
import { Drawer } from 'react-native-paper';

import Header from '../../components/Header.js'

import { SHOPS } from '../../dummy-data/shops'




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

    const renderGridItem = (itemData) => {
        return (
            <View style={styles.gridItem}>
                <Text> {itemData.item.name}</Text>
            </View>

        )

    }

    const [filterCategory, setFilterCategory] = useState('any');


    
    return (
        <View>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{height: 500 }}>

            <View>                
                <View style={ {flex: 1,  height: 40, justifyContent: 'space-between', top: 40} }>
                    <View>
                        
                        
                        <TextInput style={{borderBottomWidth: 2, borderBottomColor: 'black'}}
                            multiline={false}
                            placeholder="Search for something..."
                        />
                    </View>
                    

                    

                    <View style={ {flex: 1,  height: 40, justifyContent: 'space-between', top: 40, flexDirection: 'column'}} >
                    <Text> Filters</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View> 
                                <Text> Category </Text>
                                <Picker
                                    selectedValue={filterCategory}
                                    style={{height: 50, width: 150}}
                                    onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                    mode="dropdown"
                                    prompt="Select Category"
                                >
                                    <Picker.Item label="Shirts" value="shirts"/>
                                    <Picker.Item label="Trousers" value="trousers"/>
                                    <Picker.Item label="Any" value="any"/>

                                </Picker>
                            </View>
                            <View> 
                                <Text> Price Range </Text>
                                <Picker
                                    selectedValue={filterCategory}
                                    style={{height: 50, width: 150}}
                                    onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                    mode="dropdown"
                                    prompt="Select Category"
                                >
                                    <Picker.Item label="0-500" value="shirts"/>
                                    <Picker.Item label="500-1000" value="trousers"/>
                                    <Picker.Item label="1000-2000" value="3"/>
                                    <Picker.Item label="Any" value="any"/>

                                </Picker>
                            </View>
                            
                        </View>
                        

                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View> 
                                <Text> Delivery Time </Text>
                                <Picker
                                    selectedValue={filterCategory}
                                    style={{height: 50, width: 150}}
                                    onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                    mode="dropdown"
                                    prompt="Select Category"
                                >
                                    <Picker.Item label="Same day" value="shirts"/>
                                    <Picker.Item label="Same week" value="trousers"/>
                                    <Picker.Item label="Any" value="any"/>

                                </Picker>
                            </View>
                            <View> 
                                <Text> Ratings </Text>
                                <Picker
                                    selectedValue={filterCategory}
                                    style={{height: 50, width: 150}}
                                    onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                    mode="dropdown"
                                    prompt="Select Category"
                                >
                                    <Picker.Item label="Excellent" value="shirts"/>
                                    <Picker.Item label="Medium" value="trousers"/>
                                    <Picker.Item label="Any" value="any"/>

                                </Picker>
                            </View>
                            
                        </View>
                    </View>
                    

                    
                </View>
                

                <View style={styles.bottom}>
                 <Button title="Search" onPress={toggleOverlay} />
                </View>
            </View>

        </Overlay>
        
        <Text> Shop Screen</Text>

        <FlatList data={SHOPS} renderItem={renderGridItem} numColumns={2} />



                    
            
        </View>
    );

}
function SearchScreen(props) {
    
    return (
        <Overlay isVisible={visible}>
            <Text>Search Screen! </Text>       
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
    },

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})