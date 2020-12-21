import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS, TouchableOpacity } from 'react-native';

import DrawerStack from './DrawerStack';
import ScreenStyle from '../../Styles/ScreenStyle';
import { useDispatch, useSelector } from 'react-redux';
import * as productsActions from '../../store/actions/products'


export default function ParentCategoriesStack({ navigation }) {
    return (
        <DrawerStack
            name="ParentCategories"
            navigation={navigation}
            component={ParentCategoriesScreen}
            search="CATEGORY"
        />
    )

}

export function ParentCategoriesScreen(props) {

    const dispatch = useDispatch();

    const categories = useSelector(state => state.products.parentCategories)


    const [isLoading, setIsLoading] = useState(true)


    const laodCategories = useCallback(async () => {

        try {
            setIsLoading(true)

            await dispatch(productsActions.fetchParentCategories())

            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }


    }, [])




    useEffect(() => {
        laodCategories()
    }, [])

    return (
        <View style={styles.screen}>
            {categories.map((category, index) =>
                <TouchableOpacity
                    key={index.toString()}
                    style={styles.category}
                    onPress={() => {
                        props.navigation.navigate("Categories", {
                            parentCategoryId: category.id
                        })
                    }}

                >
                    <Text style={styles.name}>{category.name.toUpperCase()}</Text>
                    <Image source={category.thumbnail} style={styles.image}></Image>

                </TouchableOpacity>)}


        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        ...ScreenStyle,
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    category: {
        height: '50%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    name: {
        fontFamily: 'WorkSans_400Regular',
        zIndex: 2,
        fontSize: 22,
        letterSpacing: 1,
        color: 'black',
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'rgba(212, 212, 212, 0.8)',
    },

    image: {
        position: 'absolute',
        height: '92%',
        top: 0,
        width: '100%',
        alignSelf: 'center',
        resizeMode: "cover"
    },
})