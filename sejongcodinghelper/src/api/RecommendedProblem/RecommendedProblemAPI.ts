import React, { useCallback, useEffect} from 'react';
import axios from 'axios';

interface RecommendedProlemRequest {
    title: string
}

interface RecommendedProlemResponse {
    result: RecommendedProlem[] | null
    recommeneded_problems: RecommendedProlem[] | null
}

export const GetFindSimilarQuestion = (
    params: string, 
    handleRecommendedProblems: (data: RecommendedProlem[] | null) => void) => {
        useEffect(() => {
            axios.get<RecommendedProlemResponse>(`/api/v1/recommend/solved/recommend?title=${params}`)
            .then(result => {
                if (result.status == 200) {
                    handleRecommendedProblems(result.data.result)
                }
            })
            .catch(error => {
                console.log(error);
            })
        }, [params])
}

export const GetRecommededProblem = (
    params: string, 
    handleRecommendedProblems: (data: RecommendedProlem[] | null) => void) => {
        useEffect(() => {
            axios.get<RecommendedProlemResponse>(`/api/v1/recommend/solved/clustering?bojHandle=${params}`)
            .then(result => {
                if (result.status == 200) {
                    handleRecommendedProblems(result.data.recommeneded_problems)
                }
            })
            .catch(error => {
                console.log(error);
            })
        }, [params])
}