import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import ScreenStyle from '../../Styles/ScreenStyle'
import { useSelector, useDispatch } from 'react-redux';

import * as profileActions from '../../store/actions/profile'

import Colors from '../../Styles/Colors';




export default function ShippingScreen(props) {

    const userId = useSelector(state => state.auth.userId);

    const profile = useSelector(state => state.profile.myProfile);


    const dispatch = useDispatch();

    const getProfile = useCallback(async () => {

        try {
            await dispatch(profileActions.getMyProfile(userId));
        }
        catch (err) {
            console.log(err);
        }
    }, [userId])

    useEffect(() => {
        getProfile()
    }, [userId])

    const renderAddress = (itemData) => {
        return (
            <TouchableOpacity style={styles.address}>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>CITY</Text>
                    <Text style={styles.text}>{itemData.item.city}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>STREET</Text>
                    <Text style={styles.text}>{itemData.item.street}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>HOUSE</Text>
                    <Text style={styles.text}>{itemData.item.house}</Text>
                </View>




            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Select Delivery Address</Text>

            <View style={styles.addressContainer}>

                <FlatList
                    data={profile.addresses}
                    renderItem={renderAddress}
                    horizontal={true}
                    contentContainerStyle={styles.listContainerStyle}
                />



            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>FIRST NAME</Text>
                <Text style={styles.text}>{profile.firstName}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>LAST NAME</Text>
                <Text style={styles.text}>{profile.lastName}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>PHONE NUMBER</Text>
                <Text style={styles.text}>{profile.phoneNumber}</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    props.navigation.navigate('Payment')
                }}
            >
                <Text style={styles.buttonText}>Payment Details</Text>

            </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        paddingVertical: 20

    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginHorizontal: 20
    },
    addressContainer: {
        height: 300,
        width: '100%',
        marginVertical: 20,
        // alignItems: 'center',
        // justifyContent: 'center',



    },
    listContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    address: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 200,
        width: 200,
        elevation: 2,
        marginHorizontal: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginHorizontal: 20,
        marginVertical: 10
    },
    label: {
        fontSize: 13,
        color: 'grey',
        fontWeight: '700',
        flex: 1

    },
    text: {
        fontSize: 15,
        width: '50%'
    },
    button: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        height: 50,
        width: '80%',
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        elevation: 2
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
        width: '100%',
        textAlign: 'center'
    }
})