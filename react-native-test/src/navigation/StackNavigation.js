import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: '회원가입' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;