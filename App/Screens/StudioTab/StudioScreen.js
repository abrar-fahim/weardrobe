import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Animated, PanResponder } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function StudioScreen() {

    return (
        <View>
            <Text>studio screen</Text>
        </View>
    )

}

export default function StudioStackScreen() {
    const StudioStack = createStackNavigator();
    return (
        <StudioStack.Navigator
            screenOptions={HeaderOptions}
        >
            <StudioStack.Screen name="StudioScreen" component={StudioScreen} options={{

            }} />
        </StudioStack.Navigator>

    )
}

