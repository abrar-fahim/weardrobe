import 'react-native-gesture-handler';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList } from 'react-native';



export default function SizeChartScreen(props) {

    const product = props.route.params?.product;

    // useLayoutEffect(() => {

    //     props.navigation.setOptions({
    //         title: product.name + ' size guide'

    //     });

    // }, [product]);


    return (
        <View style={{ flexDirection: 'column', marginTop: 30, ...ScreenStyle }}>

            <Text style={styles.title}>{product.name}</Text>


            <View style={styles.sizeChart}>
                <View style={styles.header}>
                    <Text style={styles.cell}>Area</Text>
                    <Text style={styles.cell}>S</Text>
                    <Text style={styles.cell}>M</Text>
                    <Text style={styles.cell}>L</Text>

                </View>

                <View style={styles.row}>
                    <Text style={styles.cell}>Collar</Text>
                    <Text style={styles.cell}>10</Text>
                    <Text style={styles.cell}>20</Text>
                    <Text style={styles.cell}>30</Text>

                </View>

                <View style={styles.row}>
                    <Text style={styles.cell}>Sleeves</Text>
                    <Text style={styles.cell}>10</Text>
                    <Text style={styles.cell}>20</Text>
                    <Text style={styles.cell}>30</Text>

                </View>

                <View style={styles.row}>
                    <Text style={styles.cell}>Height</Text>
                    <Text style={styles.cell}>10</Text>
                    <Text style={styles.cell}>20</Text>
                    <Text style={styles.cell}>30</Text>

                </View>

                <View style={styles.row}>
                    <Text style={styles.cell}>Width</Text>
                    <Text style={styles.cell}>10</Text>
                    <Text style={styles.cell}>20</Text>
                    <Text style={styles.cell}>30</Text>

                </View>





            </View>






        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 50,
        marginLeft: 20
    },
    sizeChart: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        margin: 20
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20

    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10

    },

    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18
    }



})