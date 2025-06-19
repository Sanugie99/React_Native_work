import { useState } from "react";
import { View, TextInput, Button, FlatList, StyleSheet } from "react-native";
import BookItem from "../components/BookItem";
import searchBooks from "../api/naverApi";

const searchScreen = ({ navigation }) => {

    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        
        const items = await searchBooks(query);
        setBooks(items);
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder="검색어"
                    value={query}
                    onChangeText={setQuery}
                />
                <Button title="검색" onPress={handleSearch} />
            </View>
            <FlatList
                data={books}
                keyExtractor={item => item.link}
                renderItem={({ item }) => (
                    <BookItem item={item} onPress={book => navigation.navigate('Detail', { book: item })} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    search: { 
        flexDirection: 'row', 
        padding: 8 
    },
    input: { 
        flex: 1,
        borderWidth: 1, 
        padding: 4, 
        marginRight: 8 },
});

export default searchScreen;