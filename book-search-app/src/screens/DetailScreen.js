import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

const detailScreen = ({ route }) => {

    const { book } = route.params;
    const title = book.title;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: book.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>저자: {book.author}</Text>
            <Text style={styles.text}>가격: {book.discount}원</Text>
            <Text style={styles.text}>설명: {book.description}</Text>
            <Text style={styles.text}>출판사: {book.publisher}</Text>
            <Text style={styles.text}>출간일: {book.pubdate}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        marginBottom: 10,
    }
});

export default detailScreen;

