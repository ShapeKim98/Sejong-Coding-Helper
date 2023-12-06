import React, { useCallback, useEffect, useRef, useState, WheelEvent} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import {
    Title,
    Week
} from './style'
import Lecture from '../../models/Lecture';
import { useLocation } from "react-router-dom";
import { 
    GetRoadmapSearchID, 
    GetRoadmapProblemSearchWeek
} from '../../api/Roadmap/RoadmapAPI';
import { RoadmapProblemModel } from '../../models/RoadmapProblem';
import ProblemCell from '../../components/ProblemCell';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

function ProblemList({currentWeek}: {currentWeek: number}): React.ReactElement {
    const roadmapID = useLocation().state.roadmapID;
    const [roadmapProblems, setRoadmapProblems] = useState<RoadmapProblemModel[] | null>(null);
    const user = useSelector((state: RootState) => state.user)

    const handleRoadmapProblem = (data: RoadmapProblemModel[] | null) => {
        setRoadmapProblems(data);
    }

    GetRoadmapProblemSearchWeek({roadmapId: roadmapID, week: currentWeek}, handleRoadmapProblem);

    return (
        <HStack style={{
            flexWrap: 'wrap', 
            marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {roadmapProblems && roadmapProblems.map((problem: RoadmapProblemModel): React.ReactElement =>
                problem && <ProblemCell key={problem.problemId} bojHandle={user.bojHandle ?? ''} problemID={problem.problemId} />
            )}
        </HStack>
    );
}

function RoadmapDetail(): React.ReactElement {
    const roadmapID = useLocation().state.roadmapID;
    const [roadmap, setRoadmap] = useState<Lecture | null>(null);
    const [currentWeek, setWeek] = useState<number>(1);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
        if (scrollRef.current) {
            const delta = (e.deltaY || e.deltaX)
            scrollRef.current.scrollLeft += delta;
        }
    };

    const handlHoverTrue = useCallback(() => {
        document.body.style.overflowY = 'hidden'
        document.body.style.overflowX = 'hidden'
    }, [])

    const hadleHoverFalse = useCallback(() => {
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'auto'
    }, [])

    const hadleRoadmap = (data: Lecture | null) => {
        setRoadmap(data);
    }

    GetRoadmapSearchID(roadmapID, hadleRoadmap);

    return (
        <VStack style={{
            overflow: 'hidden', 
            paddingTop: '80px',
            paddingRight: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            <Title>
                {roadmap?.name}
            </Title>

            <HStack style={{
                overflow: 'hidden',
                marginTop: '60px',
                overscrollBehaviorX: 'contain', 
                overflowX: 'scroll',
                paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}
                ref={scrollRef}
                onWheel={handleWheelScroll}
                onMouseOver={handlHoverTrue}
                onMouseOut={hadleHoverFalse}
                >
                {Array.from({ length: 15 }, (_, index) => index + 1).map((week: number): React.ReactElement =>
                    <Week key={week} style={{
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