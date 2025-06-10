import { useState } from "react";
import styled from "react-native-styled-components";
import { View } from "react-native";
import Input from "../components/CustomInput";
import Button from "../components/CustomButton";

const Container = styled(View, `

    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    padding : 20px;

`);

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container>
            <Input
                value={email}
                onChangeText={setEmail}
                placeholder='이메일'
            />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder='비밀번호'
                secureTextEntry
            />
            <Button
                title="로그인"
                onPress={() => console.log('로그인 버튼 클릭')}
            />
            <Button
                title="회원가입"
                onPress={() => navigation.navigate('Signup')}
            />
        </Container>
    )
}

export default Login;