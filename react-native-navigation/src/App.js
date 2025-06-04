import styled from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigation/Stack";
import TabNavigation from "./navigation/Tab";

const Container = styled.View`
    flex: 1;
    backgound-color: #fff;
    jutify-content : center;
    align-items : center;
`

const App = () => {
    return(
        //NavigationContainer : 해당 컴포넌트로 둘러싼 컴포넌트에 네비게이션 기능을 적용해주는 컴포넌트
        <NavigationContainer>
            <TabNavigation />
        </NavigationContainer>
    )
}

export default App;