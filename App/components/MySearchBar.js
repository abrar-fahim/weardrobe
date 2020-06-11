import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MySearchBar = (props) => {
    return (
        <View style={styles.searchContainer}>
            <Ionicons name="md-search" size={25} color="grey" />
            <TextInput
                // placeholder="Search for people..."
                // onChangeText={searchAllUsernames}
                // style={styles.searchBar}

                {...props}
                style={styles.searchBar}
                

            />
        </View>
    )
}

export default MySearchBar

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        height: 55,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10

    },
    searchBar: {
        paddingHorizontal: 10,
        marginLeft: 10
    },
})