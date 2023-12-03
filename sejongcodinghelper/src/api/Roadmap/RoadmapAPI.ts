import React, { useEffect} from 'react';
import axios from 'axios';
import Lecture from '../../models/Lecture';
import { RoadmapProblemModel } from '../../models/RoadmapProblem';
import { logoutProc } from '../Auth/Auth';
import { error } from 'console';

export const GetRoadmapSearchAll = (handleRoadmap: (data: Lecture[] | null) => void) => {
    console.log(axios.defaults.headers.common['Access_Token'])
    useEffect(() => {
        axios.get<Lecture[] | null>('https://univps.kr/api/v1/roadmap/search/all')
        .then(result => {
            if (result.status == 200) {
                handleRoadmap(result.data)
            } else {
                handleRoadmap(null)
            }
        })
        .catch(error => {
            console.error(error)
        })
    }, []);
}

export const GetRoadmapSearchID = (params: number, handleRoadmap: (data: Lecture | null) => void) => {
    console.log(axios.defaults.headers.common['Access_Token'])
    useEffect(() => {
        axios.get<Lecture | null>('https://univps.kr/api/v1/roadmap/search/?roadmapId=' + params)
        .then(result => {
            if (result.status == 200) {
                handleRoadmap(result.data)
            } else {
                handleRoadmap(null)
            }
        })
        .catch(error => {
            console.error(error)
        })

    }, [params]);
}

export const GetRoadmapProblemSearchWeek = (params: {
    roadmapId: number,
    week: number
}, handleRoadmapProblem: (data: RoadmapProblemModel[] | null) => void) => {
    console.log(axios.defaults.headers.common['Access_Token'])
    useEffect(() => {
        axios.get<RoadmapProblemModel[] | null>('http://127.0.0.1:8080/api/v1/roadmap/problem/search/weekly?roadmapId=' + params.roadmapId + '&week=' + params.week)
        .then(result => {
            if (result.status == 200) {
                handleRoadmapProblem(result.data)
            } else {
                handleRoadmapProblem(null)
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [params.week]);
}