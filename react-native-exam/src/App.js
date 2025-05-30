import { View } from "react-native";
import SignupScreen from "./components/SignupScreen";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
`

const App = () => {
    return (
        <Container>
            <SignupScreen />
        </Container>
    )
}

export default App;