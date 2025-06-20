import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

axios.defaults.withCredentials = true;

type UserToken = {
    user_id: string;
    username: string;
}

const Home =({navigation }: any) => {
    const [token, setToken] = useState<UserToken | null> (null);
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState({});
    const router = useRouter(); 

    const checkUser = async () => {
        try{
            const response = await axios.get('http://localhost:4000/auth',{withCredentials: true})
            // console.log(response.data.result)
            setToken(response.data.result);
            console.log(token)
            } catch (error) {
                console.error(error)
            }
        };
    
    const userInfo = async () => {
        if(token?.user_id){
            try {
                const id = token?.user_id
                const response = await axios.get(`http://localhost:4000/user/${id}`,{withCredentials:true})
                //console.log(response.data.result)
                setUserData(response.data.result)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const fetchPost = async () => {
        if(token && token?.user_id){
            try {
                console.log(token?.user_id);
                const id = token?.user_id

                const fetch_post = await axios.get(`http://localhost:4000/post/all/${id}`,{withCredentials: true})
                // console.log(fetch_post.data.result)
                setPosts(fetch_post.data.result)

            } catch (error) {
                console.error(error)
            }
    }
}
    const handleLogout = async () => {
        await axios.post('http://localhost:4000/auth/logout',{withCredentials: true})
        // navigation.replace("Login");
        router.navigate('/Login');
    }

    useEffect(() => {
        checkUser();
    },[])

    useEffect(() => {
        if (token){
            userInfo()
            fetchPost()
        }
    },[token])
return (
    <View style={{ padding: 20 }}>
        <Text>Welcome</Text>
        <Button title='Logout' onPress={handleLogout} />
    </View>
    )
}

export default Home;