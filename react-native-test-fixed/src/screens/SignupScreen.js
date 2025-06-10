import styled from "react-native-styled-components";
import { useState } from "react";
import Button from "../components/CustomButton";
import Input from "../components/CustomInput";

import { View } from "react-native";
const Container = styled(View, `

    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
    padding : 20px;

`);

const Signup = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container>
            <Input
                value={name}
                onChangeText={setName}
                placeholder='이름'
            />

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
                title="회원가입"
                onPress={() => console.log('회원가입 버튼 클릭')}
            />

            <Button
                title="로그인"
                onPress={() => navigation.navigate('Login')}
            />
        </Container>
    )
}

export default Signup;