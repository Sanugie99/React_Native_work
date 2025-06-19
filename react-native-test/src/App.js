import { useState } from "react"
import FormInput from "./components/FormInput";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState('');

    const [id, setId] = useState('');
    const [errId, setErrId] = useState('');

    const [password, setPassword] = useState('');
    const [errPassword, setErrPassword] = useState('');

    const [name, setName] = useState('');
    const [errName, setErrName] = useState('');

    const validateEmail = (value) => {
        if (!value) {
            return "필수 입력 항목입니다"
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            return "올다른 이메일 형식이 아닙니다."
        }
        return "";
    }

    const validateId = (value) => {
        if (!value) {
            return "필수 입력 항목입니다"
        }
        const regex = /^[a-z0-9]{4,20}$/;
        if (!regex.test(value)) {
            return "아이디는 소문자와 숫자 조합의 4~20자여야 합니다."
        }
        return "";
    }

    const validatePassword = (value) => {
        if (!value) {
            return "필수 입력 항목입니다."
        }
        const passwordLength = value.length >= 6 && value.length <= 20;
        const passwordLetter = /[A-Za-z]/.test(value);
        const passwordNumber = /[0-9]/.test(value);
        const passwordSpecial = /[!@#$%^&*]/.test(value);

        const condition = [passwordLetter, passwordNumber, passwordSpecial].filter(Boolean).length;


        if (!passwordLength || condition < 2) {
            return "비밀번호는 6~20자이며, 영문/숫자/특수문자 중 2가지 이상 포함해야 합니다."
        }

    }

    const validateName = (value) => {
        if (!value) {
            return "필수 입력 항목입니다."
        }
        const regex = /^[A-Za-z가-힣]{1,30}$/;
        if (!regex.test(value)) {
            return "이름은 한글 또는 영문 1~30자여야 합니다."
        }
        return "";
    }

    const handleSubmit = () => {
        const emailErr = validateEmail(email);
        const idErr = validateId(id);
        const passwordErr = validatePassword(password);
        const nameErr = validateName(name);

        setErrEmail(emailErr);
        setErrId(idErr);
        setPassword(passwordErr);
        setErrName(nameErr);

        if (!emailErr && !idErr && !passwordErr && !nameErr) {
            Alert.alert(`이메일: ${email}\n아이디: ${id}\n이름: ${name}`);
        } else {
            Alert.alert("모든 항목을 작성해주세요")
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.header}>회원가입</Text>

            <FormInput
                value={email}
                onChangeText={(text) => {
                    setEmail(text)
                    setErrEmail(validateEmail(text))
                }}
                onBlur={() => setErrEmail(validateEmail(email))}
                placeholder="이메일"
                error={errEmail}
            />

            <FormInput
                value={id}
                onChangeText={(text) => {
                    setId(text)
                    setErrId(validateId(text))
                }}
                onBlur={() => setErrId(validateId(id))}
                placeholder="아이디"
                error={errId}
            />

            <FormInput
                value={password}
                onChangeText={(text) => {
                    setPassword(text)
                    setErrPassword(validatePassword(text))
                }}
                onBlur={() => setErrPassword(validatePassword(password))}
                placeholder="비밀번호"
                secureTextEntry
                error={errPassword}
            />

            <FormInput
                value={name}
                onChangeText={(text) => {
                    setName(text)
                    setErrName(validateName(text))
                }}
                onBlur={() => setErrName(validateName(name))}
                placeholder="이름"
                error={errName}
            />

            <View style={styles.buttonContainer}>
                <Button title="가입하기" onPress={handleSubmit} />
            </View>
        </View>
    )

}

export default Signup;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 50,
    },
});