import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import axios from 'axios';
import Home from './Home';
import Login from './Login';

const Drawer = createDrawerNavigator();
axios.defaults.withCredentials = true;

export default function Index({navigation }: any) {
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState (true);
    useEffect (() => {
        const checkUser = async () => {
            try{
            const response = await axios.get('http://localhost:4000/auth',{withCredentials: true})
            // console.log(check_user.data.status)
            setToken(response.data);
            } catch (error) {
                setToken('')
            }
           
            setLoading(false);
        };
        checkUser();
    }, []);

     if (loading) {
    // While checking auth status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

    return (
        <Drawer.Navigator>
            {
                token ? (
                
                    <Drawer.Screen name="Home" component={Home} />
                ) : (
                    <Drawer.Screen name="login" component={Login} />
                )   
            }
        </Drawer.Navigator>
    );
}