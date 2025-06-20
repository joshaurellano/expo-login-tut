import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
    const router = useRouter(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try{
            const response = await axios.post('http://localhost:4000/auth/login',{
                username,
                password
            });
            console.log(response.data)
            console.log(navigation);
            // navigation.replace("HomeScreen");

            router.navigate('/HomeScreen');

        } catch (error) {
            Alert.alert("Login failed, check your crendentials")
        }
    }
    return (
        <View style={{ padding: 20}}>
            <Text>Username: </Text>
            <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1, marginBottom: 10, padding: 5}} />
            <Text>Password</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 5}} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
}
export default LoginScreen