import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import posts from '../data/posts'
import { useEffect, useState } from 'react';
import axios from 'axios';

const DetailScreen = ({ route }) => {
    const { id } = route.params;
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                console.log('DetailScreen :', id);
                const response = await axios.get(`http://10.0.2.2:10000/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('상세 조회 실패', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <ActivityIndicator style={Styles.center} />;
    if (!post) return <Text style={Styles.center}>게시글이 없습니다.</Text>;


    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>{post.title}</Text>
            <Text style={Styles.meta}>
                작성자: {post.author} | {post.time} | 조회수: {post.views}
            </Text>
            <Text style={Styles.description}>{post.description}</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    meta: {
        color: '#999',
        marginBottom: 12,
    },
    description: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
})

export default DetailScreen;

