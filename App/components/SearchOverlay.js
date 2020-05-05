import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Image, Platform, FlatList, SectionList, Picker, PickerIOS } from 'react-native';

import { Overlay } from 'react-native-elements';

export default function SearchOverlay(props) {

    const [filterCategory, setFilterCategory] = useState('any');

    return (
            <Overlay isVisible={props.isVisible} onBackdropPress={props.toggleOverlay} overlayStyle={{height: 500 }}>

                <View>                
                    <View style={ {flex: 1,  height: 40, justifyContent: 'space-between', top: 40} }>
                        <View>
                            
                            
                            <TextInput style={{borderBottomWidth: 2, borderBottomColor: 'black'}}
                                multiline={false}
                                placeholder="Search for something..."
                            />
                        </View>
                        

                        

                        <View style={ {flex: 1,  height: 40, justifyContent: 'space-between', top: 40, flexDirection: 'column'}} >
                        <Text> Filters</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View> 
                                    <Text> Category </Text>
                                    <Picker
                                        selectedValue={filterCategory}
                                        style={{height: 50, width: 150}}
                                        onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                        mode="dropdown"
                                        prompt="Select Category"
                                    >
                                        <Picker.Item label="Shirts" value="shirts"/>
                                        <Picker.Item label="Trousers" value="trousers"/>
                                        <Picker.Item label="Any" value="any"/>

                                    </Picker>
                                </View>
                                <View> 
                                    <Text> Price Range </Text>
                                    <Picker
                                        selectedValue={filterCategory}
                                        style={{height: 50, width: 150}}
                                        onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                        mode="dropdown"
                                        prompt="Select Category"
                                    >
                                        <Picker.Item label="0-500" value="0"/>
                                        <Picker.Item label="500-1000" value="2"/>
                                        <Picker.Item label="1000-2000" value="3"/>
                                        <Picker.Item label="Any" value="anyprice"/>

                                    </Picker>
                                </View>
                                
                            </View>
                            

                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View> 
                                    <Text> Delivery Time </Text>
                                    <Picker
                                        selectedValue={filterCategory}
                                        style={{height: 50, width: 150}}
                                        onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                        mode="dropdown"
                                        prompt="Select Category"
                                    >
                                        <Picker.Item label="Same day" value="5"/>
                                        <Picker.Item label="Same week" value="6"/>
                                        <Picker.Item label="Any" value="anyday"/>

                                    </Picker>
                                </View>
                                <View> 
                                    <Text> Ratings </Text>
                                    <Picker
                                        selectedValue={filterCategory}
                                        style={{height: 50, width: 150}}
                                        onValueChange={(itemValue, itemIndex) => setFilterCategory(itemValue)}
                                        mode="dropdown"
                                        prompt="Select Category"
                                    >
                                        <Picker.Item label="Excellent" value="e"/>
                                        <Picker.Item label="Medium" value="m"/>
                                        <Picker.Item label="Any" value="a"/>

                                    </Picker>
                                </View>
                                
                            </View>
                        </View>
                        

                        
                    </View>
                    

                    <View style={styles.bottom}>
                    <Button title="Search" onPress={props.toggleOverlay} />
                    </View>
                </View>

            </Overlay>
        
    )


}

const styles = StyleSheet.create({
    screen: {
        flex: 1  //ensures that this view takes all space it can get
    },

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
})