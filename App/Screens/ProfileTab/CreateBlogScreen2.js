import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle';
import GenericHeaderButton from '../../components/GenericHeaderButton'
import * as ImagePicker from 'expo-image-picker';

export default function CreateBlogScreen2(props) {
    const formData = props.route.params?.formData
    const [image, setImage] = useState(null)

    

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
                console.log(formData)

                props.navigation.navigate('CreateBlog3', {
                    formData: formData
                })
            }
            } />)

        })
    }, [formData, image])



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

    return (
        <View style={ScreenStyle}>
            <Text> Create Blog 2</Text>

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
        width: '100%',
        maxHeight: 300

    }

});
