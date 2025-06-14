import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/StackNavigation";

const App = () => {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
};

export default App;