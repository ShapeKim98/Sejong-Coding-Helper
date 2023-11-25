import React, { useCallback, useState} from 'react';
import VStack from '../../components/VStack';
import HStack from '../../components/HStack';
import {
    LectureButton,
    Tag,
    Title,
    Graduate
} from './style';
import Lecture from '../../models/Lecture';

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
            <p style={{fontSize: '20px'}}>{lecture.title}</p>
            <p style={{fontSize: '16px', color: '#5E717B', paddingTop: '8px'}}>{lecture.id}</p>
        </VStack>
    );
}

function LectureButtons({lectures}: {lectures: Lecture[]}): React.ReactElement {
    return (
        <HStack style={{overscrollBehaviorX: 'contain', overflowX: 'scroll', paddingLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {lectures.map((lecture: Lecture): React.ReactElement => 
            <LectureButton>
                <LectureTitle lecture={lecture} />
                <Tags lecture={lecture} />
            </LectureButton>)}
        </HStack>
    );
}

function Roadmap(): React.ReactElement {
    const [freshman] = useState<Lecture[]>([
        {
            title: "C프로그래밍및실습",
            id: "009912",
            tags: [
                "#구현",
                "#문자열",
                "#수식",
                "#반복문",
                "#배열",
                "#포인터"
            ]
        },
        {
            title: "고급C프로그래밍및실습",
            id: "009913",
            tags: [
                "#구현",
                "#문자열",
                "#수식",
                "#반복문",
                "#배열",
                "#포인터"
            ]
        }
    ])
    const [junior] = useState<Lecture[]>([
        {
            title: "자료구조및실습",
            id: "009952",
            tags: [
                "#재귀",
                "#연결리스트",
                "#집합",
                "#스택",
                "#큐",
                "#트리"
            ]
        },
        {
            title: "알고리즘및실습",
            id: "009954",
            tags: [
                "#우선순위 큐",
                "#힙",
                "#정렬",
                "#분할정복",
                "#사진",
                "#탐색",
                "#해시",
                "#그래프 이론",
                "#그리디"
            ]
        }
    ])
    return (
        <VStack style={{paddingTop: '80px'}}>
            <Title>
                공부하는 수업을 선택해 주세요!<br />
                주차 별로 문제를 추천해 드릴게요
            </Title>
            <Graduate>
                1학년
            </Graduate>
            <LectureButtons lectures={freshman} />
            <Graduate>
                2학년
            </Graduate>
            <LectureButtons lectures={junior} />
        </VStack>
    );
}

export default Roadmap