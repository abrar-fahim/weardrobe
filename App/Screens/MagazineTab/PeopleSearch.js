import React, { useEffect, useCallback, useState, useRef } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import Colors from '../../Styles/Colors';
import MySearchBar from '../../components/MySearchBar';
import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../../store/actions/search'
import { TouchableOpacity } from 'react-native-gesture-handler';

const PeopleSearchScreen = (props) => {

    const searchResults = useSelector(state => state.search.people)


    const dispatch = useDispatch();

    const [username, setUsername] = useState('')

    const [iter, setIter] = useState(0);

    const [iterLoading, setIterLoading] = useState(false)


    const searchAllUsernames = useCallback(async (username) => {
        try {
            await dispatch(searchActions.searchAllUsernames(username, 0))
        }
        catch (err) {
            console.log(err)
        }

    })
    const loadMoreUsernames = useCallback(async () => {
        try {
            if (!iterLoading) {
                setIterLoading(true)
                await dispatch(searchActions.searchAllUsernames(username, iter))
                setIter(iter => iter + 1)
                setIterLoading(false)
            }

        }
        catch (err) {
            console.log(err)
        }
        setIterLoading(false)

    }, [username, iterLoading, iter])

    function renderItems(itemData) {

        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('OthersProfile', {
                profileId: itemData.item.id
            })}>
                <View style={styles.listItem}>
                    <Image source={itemData.item.profilePic} style={styles.image} />

                    <Text style={styles.name} >{itemData.item.firstName}</Text>

                </View>
            </TouchableOpacity>

        )

    }

    return (
        <View style={styles.screen}>
            <MySearchBar
                placeholder="Search for people and shops"
                onChangeText={(text) => {
                    setUsername(text);
                    searchAllUsernames(text)

                }}
                navigation={props.navigation}
                showBackButton={false}
            />
            <FlatList
                data={searchResults}
                renderItem={renderItems}
                onEndReached={loadMoreUsernames}

            />


        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.backgroundColor

    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eae9e9',
        width: '90%',
        margin: 10,
        padding: 10,
        height: 70,
        alignSelf: 'center'
    },
    image: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    name: {
        marginLeft: 10

    },
})

export default PeopleSearchScreen