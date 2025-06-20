import axios from 'axios';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

axios.defaults.withCredentials = true;

const HomeScreen =({navigation }: any) => {
    const router = useRouter(); 
    const handleLogout = async () => {
        await axios.post('http://localhost:4000/auth/logout',{withCredentials: true})
        // navigation.replace("Login");
        router.navigate('/LoginScreen');
    }

return (
    <View style={{ padding: 20 }}>
        <Text>Welcome</Text>
        <Button title='Logout' onPress={handleLogout} />
    </View>
    )
}

export default HomeScreen;