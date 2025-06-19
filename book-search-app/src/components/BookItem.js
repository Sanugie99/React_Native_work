import { Text, Image, StyleSheet, Pressable } from "react-native";

const BookItem = ({ item, onPress }) => {

    const title = item.title;

    return (
        <Pressable onPress={() => onPress(item)} style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center'
    },
    image: {
        width: 40,
        height: 60,
        marginRight: 8
    },
});

export default BookItem;