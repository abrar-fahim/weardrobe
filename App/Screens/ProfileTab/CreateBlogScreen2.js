import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenStyle from '../../Styles/ScreenStyle';
import GenericHeaderButton from '../../components/GenericHeaderButton'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../../store/actions/profile'

export default function CreateBlogScreen2(props) {
    const formData = props.route.params?.formData;
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const [texts, setTexts] = useState({
        text1: '',
        text2: '',
        text3: ''
    })

    const createUserBlog = useCallback(async (formData) => {
        try {
            console.log(formData)
            await dispatch(profileActions.createUserBlog(formData))
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

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => {
                    if (image !== null) {
                        formData.append("photos", {
                            name: '1.jpg',
                            type: 'image/jpeg',
                            uri:
                                Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
                        });
                    }

                    

                    formData.append('text1', texts.text1)
                    formData.append('text2', texts.text2)
                    formData.append('text3', texts.text3)
                    console.log(formData)

                    createUserBlog(formData)

                    props.navigation.popToTop();

                    // props.navigation.navigate('CreateBlog3', {
                    //     formData: formData
                    // })
                }
                }>
                    <Text>Publish</Text>
                </TouchableOpacity>


            )

        })
    }, [formData, image, texts])



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
        <ScrollView style={ScreenStyle}>



            <View style={styles.blogBody}>
                <Text style={styles.title}>Title here</Text>


                <Image source={image ? image : require('../../assets/Images/img.png')} style={styles.image}
                    resizeMode="contain" />
                <View style={styles.button}>
                    <Button title='Upload Picture' color='black' onPress={() => {
                        pickImage()
                    }}></Button>


                    {/* <FlatList

                        data={blog.texts}
                        renderItem={renderText}
                    /> */}

                    <TextInput multiline style={styles.text} placeholder="text one here" onChangeText={(text) => {
                        setTexts({
                            ...texts,
                            text1: text
                        })
                    }} />

                    <TextInput multiline style={styles.text} placeholder="text two here" onChangeText={(text) => {
                        setTexts({
                            ...texts,
                            text2: text
                        })
                    }} />
                    <TextInput multiline style={styles.text} placeholder="text three here" onChangeText={(text) => {
                        setTexts({
                            ...texts,
                            text3: text
                        })
                    }} />

                </View>



            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    image: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
    },
    text: {
        fontSize: 18,
        marginHorizontal: 10,
        marginVertical: 20
    },
    headerButton: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button:
    {
    },

});
