import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import  PRODUCTS   from '../../dummy-data/Products'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import ScreenStyle from '../../Styles/ScreenStyle';
import UIButton from '../../components/UIButton'
import Colors from '../../Styles/Colors';
import UIButtonTextStyle from '../../Styles/UIButtonTextStyle';
import RatingStars from '../../components/RatingStars'
import ColorCircles from '../../components/ColorCircles'

export default function ProductScreen(props) {
    const productId = props.route.params?.productId ?? 'default'

    const product= PRODUCTS.find(product => product.id === productId)


    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => {
    //             return(
    //                 <DrawerButton navigation={navigation}/>
    //             )
    //         }
    //     })
    // })

    // <TouchableOpacity onPress={() => props.navigation.goBack()}>
    // <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 250, backgroundColor: "#b19cd9", marginLeft: 75}}>
        
    //     <Text style={{fontSize: 25}}>Add to cart</Text>
    //     <MaterialIcons name="add-shopping-cart" size={25} />
        

    // </View>
    // </TouchableOpacity>



    // <TouchableOpacity onPress={() => props.navigation.goBack()}>
    //     <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: 250, backgroundColor: "#b19cd9", marginLeft: 75, marginTop: 20}}>
            
    //         <Text style={{fontSize: 25}}>Add to WishList</Text>
    //         <MaterialIcons name="star" size={25}/>
            

    //     </View>
    // </TouchableOpacity>
    return (
        <ScrollView style={{...ScreenStyle, ...styles.screen}}>

            <View style={{padding: 10, justifyContent: 'center',}}>
                <Text style={{fontWeight: 'bold', fontSize: 35}} >{product.name}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                <Image source={product.picture} style={{height: 300, width: 350}}/>
            </View>

            <View style={{justifyContent: 'flex-start', padding: 10, marginRight: 10, flexDirection: 'row'}}>
                <RatingStars rating={4.5} size={30} /> 
                <Ionicons color={Colors.buttonColor} name="ios-share-alt" size={40} style={{marginLeft: Dimensions.get('window').width / 1.9}}/>
            </View>
           

            

            <View style={{marginTop: 30, padding: 5}}>
                <Text style ={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: 'grey'
                    }}> {product.description} </Text>
            </View>
            

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 30}}>
                

                <View>
                    <View>
                        <Text style={styles.text}> COLOR </Text>
                    </View>
                    
                    <ColorCircles colors={product.colors}/>
                </View>

                
                <View>
                    <Text style={styles.text}> SIZE </Text>
                    <Text style= {styles.text}> {product.sizes} </Text>

                </View>



            </View>
            
            

            <TouchableOpacity onPress={() => props.navigation.goBack()} >
                <View style={{backgroundColor: Colors.buttonColor, height: 50, justifyContent: 'center', marginTop: 40}}>
                    <View style={{marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10}}>
                        <Text style={UIButtonTextStyle}> ADD TO CART</Text> 
                        <Text style={UIButtonTextStyle}>{"BDT "  + product.price}</Text>

                    </View>

                
                </View>
            </TouchableOpacity>

            <View style={styles.qa}>

                <Text style={styles.heading}>Customer Questions</Text>
                <Text>{product.qa[0].question.asker}</Text>
                <Text>{product.qa[0].question.question}</Text>
                <Text>{product.qa[0].ans}</Text>

            </View>

            <View style={styles.reviews}>
                <Text style={styles.heading}>Customer Reviews</Text>

                <Text>{product.reviews[0].reviewer}</Text>
                <RatingStars rating={product.reviews[0].stars} size={20}/>
                <Text>{product.reviews[0].review}</Text>


            </View>
            

            
           

            
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
    },
    screen: {
        marginBottom: 10
    },
    qa: {
        width: '100%',
        margin: 10

    },
    reviews: {
        width: '100%',
        margin: 10

    },
    heading: {
        fontSize: 22,
        fontWeight: '700'
    },
    shareButton: {
        alignItems: 'flex-end'

    }
    


}

)