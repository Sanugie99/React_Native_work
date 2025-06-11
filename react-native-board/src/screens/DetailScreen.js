//게시글 상세보기 페이지
import styled from "styled-components";
import posts from "../data/posts";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #000;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const Detail = ({ rotue }) => {

    const {id} = rotue.params;
    const post = posts.find(p => p.id === id );
    if (!post) return null;

    return(
        <Container>
            <Title>{post.title}</Title>
            <Text>{post.Text}</Text>
        </Container>
    )
}