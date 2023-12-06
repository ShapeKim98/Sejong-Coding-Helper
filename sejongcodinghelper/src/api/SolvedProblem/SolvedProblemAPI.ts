import React, { useEffect, useState} from 'react';
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