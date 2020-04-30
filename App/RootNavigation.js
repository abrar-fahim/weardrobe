import * as React from 'react';
import { StackActions } from '@react-navigation/native'

export const isMountedRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
    if(isMountedRef.current && navigationRef.current) {
        navigationRef.current?.navigate(name, params);
    }
    else {
        //executes if app hasnt mounted yet
    }
    
}
export function push(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
}