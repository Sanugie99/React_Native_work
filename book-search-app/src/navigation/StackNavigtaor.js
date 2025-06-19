import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import searchScreen from "../screens/SearchScreen";
import detailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Search" component={searchScreen} />
                <Stack.Screen name="Detail" component={detailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;