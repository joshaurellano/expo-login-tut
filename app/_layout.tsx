import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import axios from 'axios';
import { Drawer } from 'expo-router/drawer';

import { useRouter } from 'expo-router';


import { GestureHandlerRootView } from 'react-native-gesture-handler';

function CustomDrawerContent(props:DrawerContentComponentProps) {
 const router = useRouter(); 
   const handleLogout = async () => {
        await axios.post('http://localhost:4000/auth/logout',{withCredentials: true})
        // navigation.replace("Login");
        router.navigate('/');
    }


  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => handleLogout()}
      />
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name='(tabs)' options={{headerShown: false}} />
    //   <Stack.Screen name='index' options={{headerShown: false}} />
    // </Stack>
        <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawerContent}> 
       <Drawer.Screen
          name="index" 
          options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen 
         
        name='(tabs)'options={{drawerLabel:'Home',title:"Campus Bell"}} />

        
      </Drawer>
    </GestureHandlerRootView>
  )
}
