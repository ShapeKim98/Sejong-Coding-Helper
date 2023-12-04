import React, { useEffect} from 'react';
import axios from 'axios';
import Lecture from '../../models/Lecture';
import { RoadmapProblemModel } from '../../models/RoadmapProblem';

export const GetRoadmapSearchAll = (handleRoadmap: (data: Lecture[] | null) => void) => {
    useEffect(() => {
        axios.get<Lecture[] | null>('/api/v1/roadmap/search/all')
        .then(result => {
            if (result.status == 200) {
                handleRoadmap(result.data)
            } else {
                handleRoadmap(null)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
}

export const GetRoadmapSearchID = (params: number, handleRoadmap: (data: Lecture | null) => void) => {
    useEffect(() => {
        axios.get<Lecture | null>('/api/v1/roadmap/search/?roadmapId=' + params)
        .then(result => {
            if (result.status == 200) {
                handleRoadmap(result.data)
            } else {
                handleRoadmap(null)
            }
        })
        .catch(error => {
            console.log(error)
        })

    }, [params]);
}

export const GetRoadmapProblemSearchWeek = (params: {
    roadmapId: number,
    week: number
}, handleRoadmapProblem: (data: RoadmapProblemModel[] | null) => void) => {
    useEffect(() => {
        axios.get<RoadmapProblemModel[] | null>('/api/v1/roadmap/problem/search/weekly?roadmapId=' + params.roadmapId + '&week=' + params.week)
        .then(result => {
            if (result.status == 200) {
                handleRoadmapProblem(result.data)
            } else {
                handleRoadmapProblem(null)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [params.week]);
}