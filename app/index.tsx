import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

const Drawer = createDrawerNavigator();
axios.defaults.withCredentials = true;

export default function Index() {
    const [token, setToken] = useState('')

    useEffect (() => {
        const checkUser = async () => {
            const check_user = await axios.get('http://localhost:4000/auth/',{withCredentials: true})
            setToken(check_user.data);
        };
        checkUser();
    }, []);

    return (
        <Drawer.Navigator>
            {
                token ? (
                
                    <Drawer.Screen name="Home" component={HomeScreen} />
                ) : (
                    <Drawer.Screen name="Login" component={LoginScreen} />
                )   
            }
        </Drawer.Navigator>
    );
}