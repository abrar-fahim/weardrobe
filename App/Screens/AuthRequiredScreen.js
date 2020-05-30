import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform } from 'react-native';



export default function AuthRequiredScreen(props) {


    return (
        <View>
            <Button title="login/signup" onPress={() => (props.navigation.navigate('Login'))} />
        </View>
    );
}
