import {View, Text, StyleSheet} from 'react-native'
import posts from '../data/posts'

const DetailScreen = ({ route }) => {
    const { post } = route.params;

    return(
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
        flex:1,
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
    }
})

export default DetailScreen;

