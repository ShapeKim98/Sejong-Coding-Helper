import React, { useEffect} from 'react';
import axios from 'axios';
import SolvedProblem from '../../models/SolvedProblem';

export const GetSolvedProblem = (params: string, handleSolvedProblem: (data: SolvedProblem[] | null) => void) => {
    useEffect(() => {
        axios.get<SolvedProblem[] | null>(`api/v1/user/info/today-solved?bojHandle=${params}`)
        .then(result => {
            if(result.status == 200) {
                handleSolvedProblem(result.data)
            } else {
                handleSolvedProblem(null)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [params]);
}

export const GetSolvedProblemRecommend = (
    params: string, 
    handleSolvedProblemRecommend: (data: SolvedProblemRecommend | null) => void) => {
        useEffect(() => {
            axios.get<SolvedProblemRecommend | null>(`api/v1/recommend/solved/?bojHandle=${params}`)
            .then(result => {
                if (result.status == 200) {
                    handleSolvedProblemRecommend(result.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
        }, [params])
}