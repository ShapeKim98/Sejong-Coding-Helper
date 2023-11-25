import React, { useCallback, useState} from 'react';
import HStack from '../../components/HStack';
import VStack from '../../components/VStack';
import Problem from '../../models/Problem';
import {
    Title,
    Week,
    RoadmapProblem,
    ProblemTitle,
    Tag
} from './style'

function ProblemButton({problem}: {problem: Problem}): React.ReactElement {
    return (
        <RoadmapProblem>
            <VStack>
                <HStack>
                    <img style={{width: '20px', height: '20px', aspectRatio: '1 / 1'}} alt={problem.tier} src={require(`../../assets/Image/${problem.tier}.svg`).default}></img>
                    <p style={{marginLeft: '16px'}}>{problem.number}</p>
                </HStack>

                <ProblemTitle>{problem.title}</ProblemTitle>
            </VStack>

            <HStack>
                {problem.tags.map((tag: string): React.ReactElement => <Tag>{tag}</Tag>)}
            </HStack>
        </RoadmapProblem>
    );
}

function ProblemList({problems}: {problems: Problem[]}): React.ReactElement {
    return (
        <HStack style={{flexWrap: 'wrap', marginLeft: 'calc(-268.46154px + 28.36538vw - 12px)'}}>
            {problems.map((problem: Problem): React.ReactElement =>
                <ProblemButton problem={problem} />
            )}
        </HStack>
    );
}

function Weeks(): React.ReactElement {
    return (
        <HStack style={{flexWrap: 'wrap', paddingTop: '60px', marginLeft: 'calc(-268.46154px + 28.36538vw + 24px)'}}>
            {Array.from({ length: 15 }, (_, index) => index + 1).map((week: number): React.ReactElement =>
                <Week>{week}주</Week>
            )}
        </HStack>
    );
}

function RoadmapDetail(): React.ReactElement {
    const [problems] = useState<Problem[]>([
        {
            title: "우승자는 누구?",
            number: "5179",
            tier: "8",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "아침 태권도",
            number: "29197",
            tier: "9",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "Haven",
            number: "20503",
            tier: "22",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "뒤집기",
            number: "1439",
            tier: "7",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        },
        {
            title: "카드 팩 구매하기",
            number: "15823",
            tier: "14",
            tags: [
                "#구현",
                "#문자열"
            ]
        }
    ])

    return (
        <VStack style={{paddingTop: '80px'}}>
            <Title>
                알고리즘및실습
            </Title>
            <Weeks />
            <ProblemList problems={problems} />
        </VStack>
    );
}

export default RoadmapDetail;