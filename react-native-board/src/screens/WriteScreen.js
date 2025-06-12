import { useState, useLayoutEffect } from "react";
import { View, TextInput, StyleSheet, Pressable, Text, Alert } from 'react-native'
import axios from "axios";


const WriteScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        if (!title.trim() || !author.trim() || !description.trim()) {
            return Alert.alert("입력 오류", "모든 필드를 채워주세요.");
        }

        try {
            await axios.post("http://10.0.2.2:10000/api/posts", {
                title,
                author,
                description,
            })

            Alert.alert("등록완료", "게시글이 성공적으로 등록되었습니다.", [
                { text: "확인", onPress: () => navigation.goBack() },
            ])
        } catch (error) {
            console.log("게시글 등록 실패", error);
            Alert.alert("등록 실패", "게시글을 등록하지 못했습니다.");
        }
    }

    useLayoutEffect(() => {
        if (navigation) {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable
                        style={{ marginRight: 12 }}
                        onPress={handleSubmit}
                    >
                        <View style={{
                            backgroundColor: '#2ecc71',
                            paddingHorizontal: 14,
                            paddingVertical: 6,
                            borderRadius: 6,
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>등록</Text>
                        </View>
                    </Pressable>
                )
            })
        }
    }, [navigation, title, author, description])

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="제목"
                placeholderTextColor="#fff"
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="저자"
                placeholderTextColor="#fff"
                style={styles.titleInput}
                value={author}
                onChangeText={setAuthor}
            />

            <TextInput
                placeholder="내용을 입력하세요"
                placeholderTextColor="#666"
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
            />
        </View>
    )

}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#121212',
            paddingHorizontal: 16,
            paddingTop: 8,
        },
        titleInput: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: '#333',
            marginBottom: 12,
            paddingVertical: 8,
        },
        descriptionInput: {
            flex: 1,
            fontSize: 16,
            color: '#fff',
            textAlignVertical: 'top',
        }
    });

export default WriteScreen;