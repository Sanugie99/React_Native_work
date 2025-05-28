import styled, { ThemeProvider } from "styled-components";
import User from "./components/User";
import { UserProvider } from "./contexts/UserContext";
import Input from "./components/Input";
import ThemeComponent from "./components/ThemeComponent";
import { UserTheme } from "./contexts/ThemeContext";
import HomeScreen from "./components/HomeScreen";

const Container = styled.View`
    flex:1;
    background-color:#fff;
    justify-content:center;
    align-items:center;
`

const App = () => {
    console.log("앱 시작");
    return (
        //Provider 컴포넌트로 부터 value를 전달하는 하위 컴포넌트의 수에는 제한이 없다.
        //하지만 Consumer 컴포넌트는 가장 가까운 Provider컴포넌트에서 값을 받으므로
        //자식 컴포넌트 중 Provider 컴포넌트가 있다면 그 중간에 있는 내용을 사용한다.
        // <UserProvider>
        // <UserTheme>
        //     <Container>
        //         {/* <User />
        //         <Input /> */}
        //         <ThemeComponent/>
        //     </Container>
        // </UserTheme>
        //</UserProvider>
        <UserProvider>
            <HomeScreen />
        </UserProvider>
    )
}

export default App;