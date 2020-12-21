import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Animated, PanResponder, KeyboardAvoidingView } from 'react-native';
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
    const CustomView = Platform.OS === "ios" ? KeyboardAvoidingView : View;
    return (
        <CustomView
            style={{ flex: 1 }}
            behavior="padding"
        >
            <StudioStack.Navigator
                screenOptions={HeaderOptions}
            >
                <StudioStack.Screen name="StudioScreen" component={StudioScreen} options={{

                }} />
            </StudioStack.Navigator>
        </CustomView>

    )
}

