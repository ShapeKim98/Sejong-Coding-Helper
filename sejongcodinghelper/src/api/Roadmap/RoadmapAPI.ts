import React, { useEffect} from 'react';
import axios from 'axios';
import Lecture from '../../models/Lecture';
import { RoadmapProblemModel } from '../../models/RoadmapProblem';

export const GetRoadmapSearchAll = (handleRoadmap: (data: Lecture[] | null) => void) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Lecture[] | null>('http://127.0.0.1:8080/api/v1/roadmap/search/all');
                handleRoadmap(response.data)
            } catch (error) {
                console.error('getRoadmapSearchAll -> ', error);
                handleRoadmap(null)
            }
        }

        fetchData();
    }, []);
}

export const GetRoadmapSearchID = (params: number, handleRoadmap: (data: Lecture | null) => void) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Lecture | null>('http://127.0.0.1:8080/api/v1/roadmap/search/?roadmapId=' + params);
                handleRoadmap(response.data)
            } catch (error) {
                console.error('GetRoadmapSearchID -> ', error);
                handleRoadmap(null)
            }
        }

        fetchData();
    }, [params]);
}

export const GetRoadmapProblemSearchWeek = (params: {
    roadmapId: number,
    week: number
}, handleRoadmapProblem: (data: RoadmapProblemModel[] | null) => void) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<RoadmapProblemModel[] | null>('http://127.0.0.1:8080/api/v1/roadmap/problem/search/weekly?roadmapId=' + params.roadmapId + '&week=' + params.week);
                handleRoadmapProblem(response.data);
            } catch (error) {
                console.error('GetRoadmapProblemSearchWeek -> ', error);
                handleRoadmapProblem(null);
            }
        }

        fetchData();
    }, [params.week]);
}