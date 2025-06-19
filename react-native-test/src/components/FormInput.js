import { View, TextInput, Text, StyleSheet } from "react-native";

const FormInput = ({ value, onChangeText, onBlur, placeholder, error, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    )
}

export default FormInput;

const styles = StyleSheet.create({

    container: {
        marginBottom: 10,
    },

    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
    },

    error: {
        color: 'red',
        marginTop: 5,
    },

});