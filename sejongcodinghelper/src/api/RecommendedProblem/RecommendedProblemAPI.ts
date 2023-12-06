import React, { useEffect} from 'react';
import axios from 'axios';

interface RecommendedProlemRequest {
    title: string
}

interface RecommendedProlemResponse {
    result: RecommendedProlem[]
}

export const GetFindSimilarQuestion = (
    params: string, 
    handleRecommendedProblems: (data: RecommendedProlem[] | null) => void) => {
        useEffect(() => {
            const request: RecommendedProlemRequest = {title: params}
            axios.post<RecommendedProlemResponse>('/ml/find_similar_question', request, {headers: {
                'Content-Type': 'application/json'
            }})
            .then(result => {
                    console.log(result.data)
                if (result.status == 200) {
                    handleRecommendedProblems(result.data.result)
                }
            })
            .catch(error => {
                console.log(error);
            })
        }, [params])
}