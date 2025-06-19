import axios from "axios";
import { Client_Id, Client_Secret } from "../constants/apiConfig";

const naverApi = axios.create({
    baseURL: 'https://openapi.naver.com/v1/search',
    headers: {
        'X-Naver-Client-Id': Client_Id,
        'X-Naver-Client-Secret': Client_Secret,
    }
})

const searchBooks = async (query) => {
    try {
        const response = await naverApi.get('/book.json', { params: { query } });
        return response.data.items || [];
    } catch (error) {
        console.error('네이버 API 호출 실패', error);
        return [];
    }
}

export default searchBooks;