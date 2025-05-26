import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default CalculaterApp = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [result, setResult] = useState('Enter numbers and select operation');

    const calculator = (operation) => {
        //값이 입력이 안되어 있으면 값을 입력하세요 라고 경고 띄우기
        //숫자가 아닐경우 숫자를 입력하세요 라고 경고 띄우기
        //넘어온 연산자를 토대로 연산하기
        //나누기 할 때 정수를 0으로 나누려 하면, 0으로 나눌 수 없습니다. 메시지 출력하기
        const a = parseFloat(num1);
        const b = parseFloat(num2);

        if (num1.trim() === '' || num2.trim() === '') {
            alert('값을 입력하세요.');
            return;
        }
        if (isNaN(a) || isNaN(b)) {
            alert('숫자를 입력해 주세요.')
            return;
        }

        let res;
        switch (operation) {
            case '+':
                res = a + b;
                break;
            case '-':
                res = a - b;
                break;
            case '*':
                res = a * b;
                break;
            case '/':
                res = (b !== 0 ? a / b : '정수는 0으로 나눌수 없습니다.');
                break;
        }
        setResult(res);
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter first number"
                keyboardType="numeric"
                value={num1}
                onChangeText={setNum1}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter second number"
                keyboardType="numeric"
                value={num2}
                onChangeText={setNum2}
            />
            <Text style={styles.result}>{result}</Text>
            <View style={styles.buttonContainer}>
                {['+', '-', '*', '/'].map((op) => (
                    <Pressable key={op} style={styles.button} onPress={() => calculator(op)}>
                        <Text style={styles.buttonText}>{op}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: 'white',
        fontSize: 16,
        margin: 10,
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    //버튼을 감싸는 컨테이너
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 14,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    }
})
