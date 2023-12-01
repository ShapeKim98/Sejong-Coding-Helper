import React, { useCallback, useEffect, useState} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import {
    Title,
    Week,
    RoadmapProblem,
    ProblemTitle,
    Tag
} from './style'
import Lecture from '../../models/Lecture';
import { useLocation } from "react-router-dom";
import { 
    GetRoadmapSearchID, 
    GetRoadmapProblemSearchWeek
} from '../../api/Roadmap/RoadmapAPI';
import { RoadmapProblemModel } from '../../models/RoadmapProblem';
import { GetProblemFindID } from '../../api/Roadmap/ProblemAPI';
import Problem from '../../models/Problem';
import axios from 'axios';


function ProblemButton({problemId}: {problemId: number}): React.ReactElement {
    const [problem, setProblem] = useState<Problem | null>(null);

    const handleProblem = (data: Problem | null) => {
        setProblem(data);
    }

    GetProblemFindID(problemId, handleProblem);

    return (
        <RoadmapProblem>
            {problem && <p>
            <VStack>
                <HStack>
                    <img style={{width: '20px', height: '20px', aspectRatio: '1 / 1'}} alt={problem.titleKo} src={require(`../../assets/Image/${problem.level}.svg`).default}></img>
                    <p style={{marginLeft: '16px'}}>{problem.problemId}</p>
                </HStack>

                <ProblemTitle>{problem.titleKo}</ProblemTitle>
            </VStack>

            <HStack>
                {problem.tags.map((tag: string): React.ReactElement => <Tag>{tag}</Tag>)}
            </HStack>
            </p>}
        </RoadmapProblem>
    );
}

function ProblemList(info: {currentWeek: number}): React.ReactElement {
    const roadmapID = useLocation().state.roadmapID;
    const [roadmapProblems, setRoadmapProblems] = useState<RoadmapProblemModel[] | null>(null);

    const handleRoadmapProblem = (data: RoadmapProblemModel[] | null) => {
        setRoadmapProblems(data);
    }

    GetRoadmapProblemSearchWeek({roadmapId: roadmapID, week: info.currentWeek}, handleRoadmapProblem);

    return (
        <HStack style={{flexWrap: 'wrap', marginLeft: 'calc(-268.46154px + 28.36538vw - 12px)'}}>
            {roadmapProblems?.map((problem: RoadmapProblemModel): React.ReactElement =>
                <p>
                    {problem && <ProblemButton problemId={problem.problemId} />}
                </p>
            )}
        </HStack>
    );
}

function RoadmapDetail(): React.ReactElement {
    const roadmapID = useLocation().state.roadmapID;
    const [roadmap, setRoadmap] = useState<Lecture | null>(null);
    const [problems, setProblems] = useState<(Problem | null)[]>([]);
    const [currentWeek, setWeek] = useState<number>(1);

    const hadleRoadmap = (data: Lecture | null) => {
        setRoadmap(data);
    }

    GetRoadmapSearchID(roadmapID, hadleRoadmap);

    return (
        <VStack style={{paddingTop: '80px'}}>
            <Title>
                {roadmap?.name}
            </Title>
            <HStack style={{flexWrap: 'wrap', paddingTop: '60px', marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {Array.from({ length: 15 }, (_, index) => index + 1).map((week: number): React.ReactElement =>
            {return(<Week style={{color: (currentWeek === week) ? '#ffffff' : '#28424F', 
                                borderRadius: '50%', 
                                backgroundColor: (currentWeek === week) ? '#C8001E' : 'transparent'}}
                                onClick={ () => {
                                    setWeek(week)
                                }}
                                >{week}주</Week>);}
            )}
        </HStack>
            <ProblemList currentWeek={currentWeek} />
        </VStack>
    );
}

export default RoadmapDetail;