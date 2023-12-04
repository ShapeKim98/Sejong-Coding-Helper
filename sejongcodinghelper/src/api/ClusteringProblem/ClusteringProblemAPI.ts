import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ClusteringProblem from '../../models/ClusteringProblem';

export const GetMostSolvedProblem = ( handleProblem: (data: ClusteringProblem[] | null) => void) => {
    console.log(axios.defaults.headers.common['Access_Token'])
    useEffect(() => {
        axios.get<ClusteringProblem[] | null>('/api/v1/stat/problem/most-solved')
        .then(result => {
            if(result.status == 200) {
                handleProblem(result.data)
            } else {
                handleProblem(null)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
}