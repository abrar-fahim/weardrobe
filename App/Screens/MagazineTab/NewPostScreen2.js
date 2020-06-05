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

export default function NewPostScreen2(props) {

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


    const createUserPost = useCallback(async (formData) => {
        try {
            // console.log(formData)
            await dispatch(magazineActions.createUserPost(formData))
        }
        catch(err) {
            console.log(err)
        }
    })


    // const uploadImage = async (uri) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();


    // }
    const formData = new FormData();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result);
            const response = await fetch(result.uri);
            const blob = await response.blob()
            formData.append("photos", blob)
            formData.append("caption", "mwahahahaha")
            console.log('done')
        }

        // uploadImage(image)
    };

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (<GenericHeaderButton title="newPost" iconName="md-create" onPress={() => {
                // console.log(formData)
                createUserPost(formData)
                // props.navigation.navigate('NewPost3', {
                //     formData: formData
                // })
            }
            } />)

        })
    })




    return (
        <View style={styles.Main}>

            <View style={styles.Direction}>
                <MaterialCommunityIcons name="circle-outline" size={30} color='black' />
                <MaterialCommunityIcons name="arrow-right" size={30} color='black' />
                <MaterialCommunityIcons name="circle" size={30} color='green' />
                <MaterialCommunityIcons name="arrow-right" size={30} color='black' />
                <MaterialCommunityIcons name="circle-outline" size={30} color='black' />
            </View>

            <View style={styles.LayoutText}>

                <Text style={styles.ChooseLayout}>Select Picture</Text>


            </View>

            <View style={styles.Image}>
                <Image source={image ? image : require('../../assets/Images/img.png')} style={styles.Pic} />
            </View>

            <View style={styles.Buttons}>
                <Button title='Upload Picture' color='black' onPress={() => {
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
        paddingTop: 25,
        paddingLeft: 100
    },
    LayoutText:
    {
        flex: 1

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
        width: Dimensions.get('window').width / 1.5

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
        width: '100%'

    }

});