import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Problem from '../../models/Problem';
import { error } from 'console';

export const GetProblemFindID = (params: number, handleProblem: (data: Problem | null) => void) => {
    console.log(axios.defaults.headers.common['Access_Token'])
    useEffect(() => {
        axios.get<Problem | null>('https://univps.kr/api/v1/problem/find?problemId=' + params)
        .then(result => {
            if(result.status == 200) {
                handleProblem(result.data)
            } else {
                handleProblem(null)
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [params]);
}