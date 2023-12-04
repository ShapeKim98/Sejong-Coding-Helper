import React, { useCallback, useEffect, useState} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import {
    Title,
    Week,
    RoadmapProblem,
    ProblemTitle,
    Tag,
    ProblemID
} from './style'
import Lecture from '../../models/Lecture';
import { useLocation } from "react-router-dom";
import { 
    GetRoadmapSearchID, 
    GetRoadmapProblemSearchWeek
} from '../../api/Roadmap/RoadmapAPI';
import { RoadmapProblemModel } from '../../models/RoadmapProblem';
import { GetProblemFindID } from '../../api/Problem/ProblemAPI';
import Problem from '../../models/Problem';
import TagModel from '../../models/Tag';


function ProblemButton({problemId}: {problemId: number}): React.ReactElement {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleProblem = (data: Problem | null) => {
        setProblem(data);
    }

    GetProblemFindID(problemId, handleProblem);

    useEffect(() => {
        setImageUrl(`https://static.solved.ac/tier_small/${problem?.level}.svg`);
    }, [problem]);

    const openNewTab = () => {
        window.open('https://www.acmicpc.net/problem/' + problemId)
    }

    return (
        <p>
            {problem && <RoadmapProblem key={problem.problemId} onClick={openNewTab} style={{cursor: 'pointer'}}>
                <VStack>
                    <HStack>
                        <img style={{
                            width: '20px', 
                            height: '20px', 
                            aspectRatio: '1 / 1'}} 
                            alt={problem.titleKo} 
                            src={imageUrl}></img>
                        <ProblemID style={{marginLeft: '16px'}}>{problem.problemId}</ProblemID>
                    </HStack>

                    <ProblemTitle>{problem.titleKo}</ProblemTitle>
                </VStack>

                <HStack style={{flexWrap: 'wrap'}}>
                    {problem.tags.map((tag: string): React.ReactElement => <Tag>{tag}</Tag>)}
                </HStack>
            </RoadmapProblem>}
        </p>
    );
}

function ProblemList({currentWeek}: {currentWeek: number}): React.ReactElement {
    const roadmapID = useLocation().state.roadmapID;
    const [roadmapProblems, setRoadmapProblems] = useState<RoadmapProblemModel[] | null>(null);

    const handleRoadmapProblem = (data: RoadmapProblemModel[] | null) => {
        setRoadmapProblems(data);
    }

    GetRoadmapProblemSearchWeek({roadmapId: roadmapID, week: currentWeek}, handleRoadmapProblem);

    return (
        <HStack style={{
            flexWrap: 'wrap', 
            marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {roadmapProblems && roadmapProblems.map((problem: RoadmapProblemModel): React.ReactElement =>
                problem && <ProblemButton problemId={problem.problemId} />
            )}
        </HStack>
    );
}

function RoadmapDetail(): React.ReactElement {
    const roadmapID = useLocation().state.roadmapID;
    const [roadmap, setRoadmap] = useState<Lecture | null>(null);
    const [currentWeek, setWeek] = useState<number>(1);

    const hadleRoadmap = (data: Lecture | null) => {
        setRoadmap(data);
    }

    GetRoadmapSearchID(roadmapID, hadleRoadmap);

    return (
        <VStack style={{overflow: 'hidden', paddingTop: '80px'}}>
            <Title>
                {roadmap?.name}
            </Title>

            <HStack style={{
                marginTop: '60px',
                overscrollBehaviorX: 'contain', 
                overflowX: 'scroll',
                paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
                {Array.from({ length: 15 }, (_, index) => index + 1).map((week: number): React.ReactElement =>
                    <Week style={{
                        color: (currentWeek === week) ? '#ffffff' : '#28424F', 
                        borderRadius: '50%', 
                        backgroundColor: (currentWeek === week) ? '#C8001E' : 'transparent',
                        cursor: 'pointer'}}
                        onClick={ () => {
                            setWeek(week)
                        }}>
                        {week}주
                    </Week>
                )}
            </HStack>

            <ProblemList currentWeek={currentWeek} />
        </VStack>
    );
}

export default RoadmapDetail;