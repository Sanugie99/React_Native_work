import styled from "styled-components";

const Container = styled.View`
    padding: 16px;
    border-bottom-width: 1px;
    border-color: #eee;
    background-color: #000;
`

const Title = styled.Text`
    font-size: 18;
    font-weight: blod;
    margin-bottom: 8px;
`

const Text = styled.Text`
    font-size: 14px;
    color: #fff;
`

const PostItem = ({ post, onPress }) => {
    return(
        <Container onPress={() => onPress(post.id)}>
            <Title>{post.title}</Title>
            <Text>{post.text}</Text>
        </Container>
    )
}

export default PostItem;