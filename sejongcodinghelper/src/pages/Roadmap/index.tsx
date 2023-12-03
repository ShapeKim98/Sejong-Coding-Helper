import React, { useCallback, useEffect, useState} from 'react';
import VStack from '../../components/VStack';
import HStack from '../../components/HStack';
import {
    LectureButton,
    Tag,
    Title,
    Graduate
} from './style';
import Lecture from '../../models/Lecture';
import { GetRoadmapSearchAll } from '../../api/Roadmap/RoadmapAPI';
import { Link } from 'react-router-dom';

function Tags({lecture}: {lecture: Lecture}): React.ReactElement {
    return (
        <HStack style={{flexWrap: 'wrap'}}>
            {lecture.tags.map((tag: string): React.ReactElement =>
                <Tag>{tag}</Tag>
            )}
        </HStack>
    );
}

function LectureTitle({lecture}: {lecture: Lecture}): React.ReactElement {
    return (
        <VStack style={{fontFamily: 'Pretendard', fontWeight: '700'}}>
            <p style={{fontSize: '20px'}}>{lecture.name}</p>
            <p style={{fontSize: '16px', color: '#5E717B', paddingTop: '8px'}}>{lecture.lectureId}</p>
        </VStack>
    );
}

function LectureButtons({lectures}: {lectures: Lecture[]}): React.ReactElement {
    return (
        <HStack style={{overscrollBehaviorX: 'contain', overflowX: 'scroll', paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {lectures.map((lecture: Lecture): React.ReactElement => 
            <Link to={'/roadmapdetail'} state={{roadmapID: lecture.id}}>
            <LectureButton>
                <LectureTitle lecture={lecture} />
                <Tags lecture={lecture} />
            </LectureButton>
            </Link>)}
        </HStack>
    );
}

function Roadmap(): React.ReactElement {
    const [roadmap, setRoadmap] = useState<Lecture[] | null>(null);

    const hadleRoadmap = (data: Lecture[] | null) => {
        setRoadmap(data);
    }

    GetRoadmapSearchAll(hadleRoadmap)

    return (
        <VStack style={{paddingTop: '80px'}}>
            <Title>
                공부하는 수업을 선택해 주세요!<br />
                주차 별로 문제를 추천해 드릴게요
            </Title>
            <Graduate>
                1학년
            </Graduate>
            {roadmap && <LectureButtons lectures={roadmap} />}
        </VStack>
    );
}

export default Roadmap