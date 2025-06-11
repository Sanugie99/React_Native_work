//게시판 메인 페이지
import { useState } from "react";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import AddPostButton from "../components/Button";
import posts from "../data/posts";


const Container = styled.View`
    flex: 1;
    background-color: black;
`
const Board = ({ navigation }) => {

    const [post, setPost] = useState(posts);

    //게시글 불러오기
    const boardItem = ({ item }) => {
        <PostItem
            post={item}
            onPress={id => navigation.navigate('Detail', { id })}
        />
    }

    //게시글을 추가
    const addPost = post => {
        setPost(prev => [post, ...prev]);
    }

    return (
        <Container>
            <List
                data={post}
                keyExtractor={item => item.id}
                boardItem={boardItem}
            />
            <AddPostButton onPrees={() => navigation.navigate('Write', { addPost })} />
        </Container>
    )

}