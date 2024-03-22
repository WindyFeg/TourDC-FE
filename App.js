import {
  React,
  NavigationContainer,
  createStackNavigator,
  useFonts,
  Login,
  Main,
  Register,
  ForgotPassword
} from './Globals.js';

const Stack = createStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    InterM: require('./assets/fonts/Inter/Inter-Medium.ttf'),
    InterR: require('./assets/fonts/Inter/Inter-Regular.ttf'),
    InterB: require('./assets/fonts/Inter/Inter-Bold.ttf'),
    InterSB: require('./assets/fonts/Inter/Inter-SemiBold.ttf'),
    InterL: require('./assets/fonts/Inter/Inter-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="TourDC_Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TourDC_Register"
          component={Register}
        />

        <Stack.Screen
          name="TourDC_ForgotPassword"
          component={ForgotPassword}
        />

        <Stack.Screen
          name="TourDC_Main"
          component={Main}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}