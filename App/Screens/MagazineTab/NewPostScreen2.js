import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ScreenStyle from '../../Styles/ScreenStyle';
import { Ionicons, Entypo, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GenericHeaderButton from '../../components/GenericHeaderButton'

import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as magazineActions from '../../store/actions/magazine'
import Colors from '../../Styles/Colors';

export default function NewPostScreen2(props) {
    const product = props.route.params?.product;

    const formData = new FormData();

    const [image, setImage] = useState(null)
    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            if (Platform.OS === 'ios') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result);
            //dont formData.append here, cuz it doesnt work
        }
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (<GenericHeaderButton title="newPost" iconName="md-arrow-forward" onPress={() => {
                if (image !== null) {
                    formData.append("photos", {
                        name: '1.jpg',
                        type: 'image/jpeg',
                        uri:
                            Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
                    });
                }
               


                props.navigation.navigate('NewPost3', {
                    formData: formData,
                    product: product
                })
            }
            } />)

        })
    }, [formData, image])




    return (
        <View style={styles.Main}>

            <View style={styles.Direction}>
                <MaterialCommunityIcons name="circle-outline" size={20} color='black' />
                <MaterialCommunityIcons name="arrow-right" size={20} color='black' />
                <MaterialCommunityIcons name="circle" size={20} color='lightblue' />
                <MaterialCommunityIcons name="arrow-right" size={20} color='black' />
                <MaterialCommunityIcons name="circle-outline" size={20} color='black' />
            </View>

            <View style={styles.LayoutText}>

                <Text style={styles.ChooseLayout}>Select Picture</Text>


            </View>

            <View style={styles.Image}>

                {image ? <Image source={image} style={styles.Pic} /> : <Ionicons name="ios-image" size={300} color="lightgrey" />}

            </View>

            <View style={styles.Buttons}>
                <Button title='Upload Picture' color={Colors.primaryColor} onPress={() => {
                    pickImage()
                }}></Button>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({

    Main:
    {
        flexDirection: 'column',
        flex: 1
    },
    Direction:
    {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center'
    },
    LayoutText:
    {
        height: 200

    },
    ChooseLayout:
    {
        flex: 1,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    Image:
    {
        height: 100,
        maxHeight: 100,

        justifyContent: 'center',
        alignItems: 'center'

    },
    Buttons:
    {
        marginTop: 150,
        flex: 3,
        paddingLeft: 50,
        paddingRight: 50
    },
    Pic:
    {
        width: '100%',
        maxHeight: 300

    }

});