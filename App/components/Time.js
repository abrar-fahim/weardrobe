import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';


export default function Time(props) {
    
    const date = new Date(props.value);
    // date.setTime(Date.parse(props.value));



    const now = Date.now(); //ms since origin
    const difference = now - date.getTime();

    if (difference < (24 * 60 * 60 * 1000)) {
        //if less than one day difference, return just now/x min/x hours ago
        if (difference > 60 * 60 * 1000) {
            //difference > 1 hour
            const hours = Math.floor(difference / (60 * 60 * 1000));
            return (
                <Text {...props} style={props?.style ?? styles.date}>{hours} hours ago</Text>
            )
        }


        if (difference > 60 * 1000) {
            const min = Math.floor(difference / (60 * 1000));
            return (
                <Text {...props} style={props?.style ?? styles.date}>{min} mins ago</Text>
            )

        }

        else {
            return (
                <Text {...props} style={props?.style ?? styles.date}>Just now</Text>
            )

        }


    }

    else {
        //> 1 day difference
        const day = date.getDate();
        const monthValue = date.getMonth();
        const year = date.getFullYear();

        //resolve month based on monthValue
        const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];





        if (difference < 365 * 24 * 60 * 60 * 1000) {
            // < 1 year difference
            return (
                <Text {...props} style={props?.style ?? styles.date}>{day} {months[monthValue]}</Text>
            )


        }
        else {


            return (
                <Text {...props} style={props?.style ?? styles.date}  >{day} {months[monthValue]} {year}</Text>
            )

        }
    }
}

const styles = StyleSheet.create({
    date: {
        fontSize: 15,
        color: 'grey',
        width: '100%',
        // flex: 1,


    },
})