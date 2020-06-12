import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons, Feather } from '@expo/vector-icons';

import Colors from '../Styles/Colors'

export default function MyHeaderButton(props) {
    return <HeaderButton
        {...props}
        IconComponent={props.source === 'Feather' ? Feather : Ionicons}
        iconSize={23}
        color={Colors.headerButtonColor} />;
}