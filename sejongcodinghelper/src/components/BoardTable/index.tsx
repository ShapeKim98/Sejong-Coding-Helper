import React from 'react';
import { Table, PostInfo } from './style';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { IPost } from '../../models/Board';

/**
 * 게시판 테이블 컴포넌트
 */
function BoardTable({
  postList,
}: {
  postList: Omit<IPost, 'content' | 'imageUUIDs' | 'problemId'>[];
}) {
  const navigate = useNavigate();
  return (
    <Table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {postList.map((post) => (
          <tr
            key={post.id}
            onClick={() => {
              navigate(`/board/${post.id}`);
            }}
          >
            <td>
              {post.title} {post.commentCount > 0 && `(${post.commentCount})`}
            </td>
            <PostInfo>{post.bojHandle}</PostInfo>
            <PostInfo>{dayjs(post.createdDate).format('YYYY-MM-DD')}</PostInfo>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BoardTable;
