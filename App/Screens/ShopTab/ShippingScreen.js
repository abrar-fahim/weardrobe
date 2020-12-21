import React, { useEffect, useCallback, useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity, KeyboardAvoidingView, Switch } from 'react-native';
import ScreenStyle from '../../Styles/ScreenStyle'
import { useSelector, useDispatch } from 'react-redux';

import * as profileActions from '../../store/actions/profile'

import Colors from '../../Styles/Colors';
import { add } from 'react-native-reanimated';




export default function ShippingScreen(props) {

    const userId = useSelector(state => state.auth.userId);

    const profile = useSelector(state => state.profile.myProfile);
    const addresses = useSelector(state => state.profile.addresses);

    const [displayAddresses, setDisplayAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState(0);

    const [newAddress, setNewAddress] = useState({
        saveNewAddress: false,
        addingAddress: false,
        line1: null,
        line2: null,
        city: null,
        postalCode: null

    })



    const dispatch = useDispatch();

    const getProfile = useCallback(async () => {

        try {
            await dispatch(profileActions.getMyProfile(userId));
        }
        catch (err) {
            console.log(err);
        }
    }, [userId])
    const addAddressToProfile = useCallback(async () => {

        try {

            if (displayAddresses && selectedAddress) {
                await dispatch(profileActions.addAddressToProfile(displayAddresses[selectedAddress]));
            }

        }
        catch (err) {
            console.log(err);
        }
    }, [displayAddresses, selectedAddress])

    const getAddresses = useCallback(async () => {

        try {
            await dispatch(profileActions.getMyAddresses());
            // console.log(addresses);
            setDisplayAddresses(addresses.concat({ id: 'addAddress' }))
        }
        catch (err) {
            console.log(err);
        }
    }, [addresses])

    useEffect(() => {
        getProfile();
        getAddresses();

    }, [userId])

    const renderAddress = (itemData) => {
        // itemData.item.id === "addAddress" &&

        if (itemData.item.id === "addAddress" && newAddress.addingAddress) {

            return (
                <View style={styles.addAddress}>
                    <Text>Add New Address</Text>


                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>LINE 1</Text>

                        <TextInput
                            defaultValue={newAddress.line1}
                            onChangeText={(text) => setNewAddress(state => ({
                                ...state,
                                line1: text
                            }))}
                            style={styles.addAddressInput}
                            multiline
                        />


                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>LINE 2</Text>

                        <TextInput
                            defaultValue={newAddress.line2}
                            onChangeText={(text) => setNewAddress(state => ({
                                ...state,
                                line2: text
                            }))}
                            style={styles.addAddressInput}
                            multiline
                        />


                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>CITY</Text>

                        <TextInput
                            defaultValue={newAddress.city}
                            onChangeText={(text) => setNewAddress(state => ({
                                ...state,
                                city: text
                            }))}
                            style={styles.addAddressInput}
                            multiline
                        />


                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>POSTAL CODE</Text>

                        <TextInput
                            defaultValue={newAddress.postalCode}
                            onChangeText={(text) => setNewAddress(state => ({
                                ...state,
                                postalCode: text
                            }))}
                            style={styles.addAddressInput}
                            multiline
                        />


                    </View>







                    <View style={styles.addAddressButtons}>


                        <TouchableOpacity onPress={() => {
                            setNewAddress({
                                addingAddress: false,
                                line1: null,
                                line2: null,
                                city: null,
                                postalCode: null

                            })
                        }}>
                            <Text style={styles.addAddressCancelButtonText}>CANCEL</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {

                            setDisplayAddresses(addresses => {

                                addresses[addresses.length - 1] = {
                                    id: 'addAddress',
                                    line1: newAddress.line1,
                                    line2: newAddress.line2,
                                    city: newAddress.city,
                                    postalCode: newAddress.postalCode
                                }

                                return addresses;

                            })

                            setSelectedAddress(addresses.length + 1);
                            setNewAddress(state => ({
                                ...state,
                                addingAddress: false,
                            }))
                        }}>
                            <Text style={styles.addAddressDoneButtonText}>DONE</Text>

                        </TouchableOpacity>

                    </View>

                </View >
            )

        }

        else if (itemData.item.id === "addAddress" && !itemData.item.line1 && !itemData.item.line2 && !itemData.item.city && !itemData.item.postalCode) {
            return (
                <TouchableOpacity style={itemData.index === selectedAddress ? styles.selectedAddress : styles.address} onPress={() => setNewAddress(state => ({
                    ...state,
                    addingAddress: true
                }))}>

                    <Text>+ ADD ADDRESS</Text>


                </TouchableOpacity>

            )

        }
        else {
            return (
                <TouchableOpacity style={itemData.index === selectedAddress ? styles.selectedAddress : styles.address} onPress={() => setSelectedAddress(itemData.index)}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>LINE 1</Text>
                        <Text style={styles.text}>{itemData.item.line1}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>LINE 2</Text>
                        <Text style={styles.text}>{itemData.item.line2}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>CITY</Text>
                        <Text style={styles.text}>{itemData.item.city}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>POSTAL CODE</Text>
                        <Text style={styles.text}>{itemData.item.postalCode}</Text>
                    </View>

                    {itemData.item.id === "addAddress" ?
                        <>
                            <TouchableOpacity onPress={() => {

                                setNewAddress(state => ({
                                    ...state,
                                    addingAddress: true,
                                }))
                            }}>
                                <Text style={styles.addAddressDoneButtonText}>EDIT</Text>

                            </TouchableOpacity>

                            <View style={styles.saveAddressSwitchContainer}>
                                <Text>
                                    Save Address to profile?
                                </Text>
                                <Switch
                                    value={newAddress.saveNewAddress}
                                    onValueChange={(save) => setNewAddress(state => ({
                                        ...state,
                                        saveNewAddress: save
                                    }))}
                                />

                            </View>


                        </>
                        : null}




                </TouchableOpacity>
            )

        }

    }
    const CustomView = Platform.OS === "ios" ? KeyboardAvoidingView : View;

    return (
        <CustomView
            behavior="padding"
            keyboardVerticalOffset={64}
            style={styles.screen}
        >
            <Text style={styles.title}>Select Delivery Address</Text>

            <View style={styles.addressContainer}>

                <FlatList
                    data={displayAddresses}
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
                    if (newAddress.saveNewAddress) {
                        addAddressToProfile();

                    }
                    props.navigation.navigate('Payment', {
                        address: displayAddresses[selectedAddress]
                    })
                }}
            >
                <Text style={styles.buttonText}>Payment Details</Text>

            </TouchableOpacity>



        </CustomView>
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
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    address: {
        backgroundColor: 'white',
        borderRadius: 20,

        width: 200,
        elevation: 2,
        marginHorizontal: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedAddress: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#0779e4',
        borderWidth: 2,
        width: 200,
        elevation: 2,
        marginHorizontal: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAddress: {
        backgroundColor: 'white',
        borderRadius: 20,
        maxWidth: 300,
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

    addAddressInput: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        flex: 3,
        width: '50%',


    },

    addAddressButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10

    },
    addAddressDoneButtonText: {
        color: 'black',
        fontFamily: 'WorkSans_500Medium',
        fontSize: 16

    },
    addAddressCancelButtonText: {
        color: 'red',
        fontFamily: 'WorkSans_500Medium',
        fontSize: 16
    },
    saveAddressSwitchContainer: {
        marginTop: 10


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