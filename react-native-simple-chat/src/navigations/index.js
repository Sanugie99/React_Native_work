import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { Spinner } from "../components";
import { ProgressContext, UserContext } from "../contexts";
import MainStack from "./MainStack";

const Navigation = () => {
    const { inProgress } = useContext(ProgressContext);
    const { user } = useContext(UserContext);
    //?. : 옵셔널체이닝
    //객체의 속성이나 메서드에 접근할 때 값이 null이나 undefined여도 에러가 나지 않고
    //undefined를 반환하도록 하는 문법이다.
    return (
        <NavigationContainer>
            {user?.uid && user?.email ? <MainStack /> : <AuthStack />}
            {inProgress && <Spinner />}
        </NavigationContainer>
    )
}

export default Navigation;