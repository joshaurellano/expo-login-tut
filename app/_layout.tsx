import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='Home' options={{}} />
      <Stack.Screen name='Login' options={{}} />
    </Stack>
  )
}
