import React from 'react';
import {
  Card,
  ProblemTitle,
  ProblemWrapper,
  Tag,
  TagWrapper,
  TierImg,
} from './style';
import Problem from '../../../models/Problem';

/**
 * 게시판 용 문제 카드
 */
function BoardProblemCard({ problem }: { problem: Problem }) {
  return (
    <div>
      <Card>
        <a
          href={`https://www.acmicpc.net/problem/${problem.problemId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ProblemTitle>
            <TierImg
              src={`https://static.solved.ac/tier_small/${problem.level}.svg`}
            />
            <p>
              {problem.problemId !== '0' && `${problem.problemId}번 : `}
              {problem.titleKo}
            </p>
          </ProblemTitle>
          {problem.problemId !== '0' && (
            <ProblemWrapper>
              <TagWrapper>
                {problem.tags &&
                  problem.tags.map((tag) => <Tag key={tag}>#{tag} </Tag>)}
              </TagWrapper>
            </ProblemWrapper>
          )}
        </a>
      </Card>
    </div>
  );
}

export default BoardProblemCard;
