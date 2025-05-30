import { useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
`

const StyledText = styled.Text`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
`

const StyledInput = styled.TextInput`
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
`

const StyledButton = styled.Pressable`
    background-color: ${({ ButtonColor }) => (ButtonColor ? 'blue' : '#ccc')};
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    align-items: center;
`

const StyledButtonText = styled.Text`
    color: #fff;
    text-align: center;
    font-size: 18px;
`



const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const okSignup = validateEmail(email) && password.length >= 6;

    const handleSignUp = () => {
        if (okSignup) {
            Alert.alert('회원가입 완료');
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <StyledText>회원 가입</StyledText>
                <StyledInput
                    placeholder="이메일"
                    value={email}
                    onChangeText={setEmail}
                />
                <StyledInput
                    placeholder="비밀번호 (6자 이상)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <StyledInput
                    placeholder="이름"
                    value={name}
                    onChangeText={setName}
                />
                <StyledButton
                    onPress={handleSignUp}
                    ButtonColor={okSignup}
                    hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
                >
                    <StyledButtonText>가입하기</StyledButtonText>
                </StyledButton>
            </Container>
        </SafeAreaView>
    )
}

export default SignupScreen;