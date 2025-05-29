import { useReducer } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

//로그인폼을 만들어야 하는데 다음과 같은 상태가 필요하다.
//email(문자열)
//Password(문자열)
//errorMessage(문자열)
//isSubmitting(논리형)
//isLoginIn(논리형)
//상태가 많아지게 되면 관리가 복잡해지고, 로직이 흩어지게 된다.

const initialState = {
    email: '',
    password: '',
    isSubmitting: false,
    isLoggedIn: false,
    errorMessage: '',
};

// 리듀서 함수 정의
const loginReducer = (state, action) => {
    switch (action.type) {
        //dispatch로부터 넘겨받은 payload에 들어있는 데이터를 state에 세팅
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'LOGIN_START':
            return { ...state, isSubmitting: true, errorMessage: '' };
        case 'LOGIN_SUCCESS':
            return { ...state, isSubmitting: false, isLoggedIn: true };
        case 'LOGIN_ERROR':
            return {
                ...state,
                isSubmitting: false,
                errorMessage: '이메일과 비밀번호를 확인해주세요.',
            };
        default:
            return state;
    }
};

const LoginForm = () => {
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const handleLogin = () => {
        dispatch({ type: 'LOGIN_START' });


        if (state.email === 'test@example.com' && state.password === '1234') {
            dispatch({ type: 'LOGIN_SUCCESS' });
        } else {
            dispatch({ type: 'LOGIN_ERROR' });
        }
    };

    return (
        <View style={styles.container}>
            {state.isLoggedIn ? (
                <Text style={styles.successText}>로그인 성공!</Text>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="이메일을 입력해 주세요"
                        value={state.email}
                        onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="비밀번호를 입력해 주세요"
                        value={state.password}
                        onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
                        secureTextEntry
                    />
                    {state.errorMessage ? (
                        <Text style={styles.errorText}>{state.errorMessage}</Text>
                    ) : null}
                    <Button title={state.isSubmitting ? '로그인 중...' : '로그인'} onPress={handleLogin} disabled={state.isSubmitting} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successText: {
        fontSize: 18,
        color: 'green',
    },
});

export default LoginForm;