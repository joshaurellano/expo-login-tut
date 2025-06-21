import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (    
    <Tabs>
      <Tabs.Screen name="Home" options={{ title:'Campus Bell', headerShown: false }} />
      <Tabs.Screen name="about" options={{ title:'about', headerShown: false}} />
    </Tabs>
);
}
