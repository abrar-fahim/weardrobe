import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderOptions from '../../Styles/HeaderOptions';
import ScreenStyle from '../../Styles/ScreenStyle'


export function NotificationsScreen(props) {
    return (
        <View style={ScreenStyle}>
            <Text> Notifications Screen</Text>
            <Button onPress={() => { }} title="Button" />
        </View>
    );

}

export default function NotificationsStackScreen() {
    const NotificationsStack = createStackNavigator();
    const CustomView = Platform.OS === "ios" ? KeyboardAvoidingView : View;
    return (
        <CustomView
            style={{ flex: 1 }}
            behavior="padding"
        >
            <NotificationsStack.Navigator
                screenOptions={HeaderOptions}
            >
                <NotificationsStack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{}} />
            </NotificationsStack.Navigator>
        </CustomView>

    )
}