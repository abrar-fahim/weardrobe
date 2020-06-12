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
import * as chatActions from '../../store/actions/chats'


const PictureUploadScreen = (props) => {

    const groupId = props.route.params?.groupId

    console.log(groupId)

    const formData = new FormData();

    const [image, setImage] = useState(null)
    const dispatch = useDispatch()

    // console.log('screen3: '  + formData)

    const sendPhoto = useCallback(async (image) => {
        try {
            // console.log(formData)
            // await dispatch(chatActions.sendPhoto(formData))
            await dispatch(chatActions.sendPhotoFile(groupId, image.base64))
        }
        catch (err) {
            console.log(err)
        }
    })

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
            base64: true
        });

        if (!result.cancelled) {
            setImage(result);

            //dont formData.append here, cuz it doesnt work
        }
    };

    return (
        <View>

            <Button title="Pick Image" onPress={() => {
                pickImage()
            }} />

            {image !== null ?
                <View style={styles.container}>
                    <Image source={{ uri: image.uri }} style={styles.picture} />
                    <Button title="Send" onPress={async () => {
                        formData.append('groupId', groupId)
                        if (image !== null) {
                            formData.append("photo", {
                                name: '1.jpg',
                                type: 'image/jpeg',
                                uri:
                                    Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
                            });



                            // console.log(image)

                            sendPhoto(image)
                            // console.log('formData')
                            // const pic = await fetch(image.uri);

                            // const blob = await pic.blob()


                            // console.log(JSON.stringify({ item: blob }));

                            props.navigation.goBack()
                        }
                    }} />
                </View>
                : null}



        </View>
    )
}

const styles = StyleSheet.create({
    picture: {
        height: 300,
        width: 300,

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PictureUploadScreen