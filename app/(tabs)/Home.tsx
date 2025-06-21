import { useNavigation } from '@react-navigation/native';
import { Card } from '@rneui/themed';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

axios.defaults.withCredentials = true;
type UserToken = {
    user_id: string;
    username: string;
}
type postData = {
commentCount:number
comments:{
    body:string
    commentID:number
    date_posted:string
    username:string
}
content: string
date_posted:string
image:string
postID:number
reactCount:number
reacted:boolean
reactors:{
    react_time:string
    userId:number
    username:string
} 
title:string
topic_name:string
username: string
}


export default function Home() {
    const [token, setToken] = useState<UserToken | null> (null);
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState<postData[]> ([]);
    const router = useRouter(); 
    const navigation = useNavigation();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL
    const checkUser = async () => {
        try{
            const response = await axios.get(`${apiUrl}/auth`,{withCredentials: true})
            // console.log(response.data.result)
            setToken(response.data.result);
            // console.log(token)
            } catch (error) {
                console.error(error)
            }
        };
    
    const userInfo = async () => {
        if(token?.user_id){
            try {
                const id = token?.user_id
                const response = await axios.get(`${apiUrl}/user/${id}`,{withCredentials:true})
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
                // console.log(token?.user_id);
                const id = token?.user_id

                const fetch_post = await axios.get(`${apiUrl}/post/all/${id}`,{withCredentials: true})
                // console.log(fetch_post.data.result)
                setPosts(fetch_post.data.result)
                console.log(posts)

            } catch (error) {
                console.error(error)
            }
    }
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
    <View style={styles.container}>
  <View style={styles.head}>
    {/* {posts && posts.length > 0 ? (
      posts.map((post: any, index: number) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <Text style={styles.text}>{post.title}</Text>
          <Text style={styles.text}>{post.username}</Text>
        </View>
      ))
    ) : (
      <Text>No post available</Text>
    )} */}

      <Card>
        <Text>This is a Card</Text>
      </Card>

  </View>
</View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    justifyContent: 'flex-start'
  },
  text: {
    justifyContent: 'flex-start',
    color: '#fff',
  },
});