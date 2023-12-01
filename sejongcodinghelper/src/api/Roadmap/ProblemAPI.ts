import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Problem from '../../models/Problem';

export const GetProblemFindID = (params: number, handleProblem: (data: Problem | null) => void) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Problem | null>('http://127.0.0.1:8080/api/v1/problem/find?problemId=' + params);
                handleProblem(response.data);
            } catch (error) {
                console.error('GetProblemFindID -> ', error);
                handleProblem(null);
            }
        }

       fetchData();
    }, [params]);
}