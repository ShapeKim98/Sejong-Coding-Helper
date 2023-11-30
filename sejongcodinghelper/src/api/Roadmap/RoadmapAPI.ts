import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lecture from '../../models/Lecture';
import { error } from 'console';
import console from 'console';

export const getRoadmapSearchAll = (setRoadmap: React.Dispatch<React.SetStateAction<Lecture[] | null>>) => {
    const fetchData = async () => {
        try {
            const response = await axios.get<Lecture[]>('http://127.0.0.1:8080/api/v1/roadmap/search/all');

            setRoadmap(response.data);
        } catch {
            console.log('getRoadmapSearchAll ->', error);
        }
    };

    fetchData();
};
