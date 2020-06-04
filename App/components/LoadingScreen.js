import React, { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList, Dimensions, ActivityIndicator } from 'react-native';

const LoadingScreen = (props) => {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default LoadingScreen