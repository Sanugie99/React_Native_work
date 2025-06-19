import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native'
import PostItem from '../components/PostItem'
import FloatingButton from '../components/FloatingButton'
import posts from '../data/posts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'


const BoardScreen = ({ navigation }) => {
    console.log('navigation : ', navigation);
    const [boardList, setBoardList] = useState([]);
    const isFocused = useIsFocused();

    //fetch나 axios를 통해서 읽어온 데이터들을 state에 담아서
    //FlatList에 출력
    const getBoardList = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:10000/api/posts');
            const serverPosts = response?.data?.data || [];

            setBoardList(serverPosts);
        } catch (error) {
            console.log('게시글 불러오기 실패', error);
        }
    }

    useEffect(() => {
        getBoardList();
    }, [isFocused])

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <PostItem post={item} />
        </Pressable>
    )


    return (
        <View style={styles.container}>
            <FlatList
                data={boardList}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>게시글이 비어있습니다.</Text>
                    </View>
                )}
            />
            <FloatingButton onPress={() => navigation.navigate('Write')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    emptyText: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        
    }
})

export default BoardScreen;