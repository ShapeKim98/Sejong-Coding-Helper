import React, { useCallback, useEffect, useState } from 'react';
import { Title, Container, WriteButton, PageWrapper } from './style';
import { BsFillPencilFill } from 'react-icons/bs';
import BoardTable from '../../components/BoardTable';
import { IPost } from '../../models/Board';
import { getAllPosts } from '../../api/Board/boardAPI';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

/**
 * 게시판 탭 내용 컴포넌트
 */
function Board() {
  const navigate = useNavigate();
  const SIZE = 10; // 한 페이지당 불러올 크기
  const [total, setTotal] = useState(0); // 전체 게시글 수
  const [page, setPage] = useState(1); // 현재 페이지
  const [postList, setPostList] = useState<
    Omit<IPost, 'content' | 'imageUUIDs' | 'problemId'>[]
  >([]); // 글 목록

  // 글 목록 불러오기
  const loadPosts = useCallback(() => {
    getAllPosts({ size: SIZE, page: page - 1 })
      .then((res) => {
        const { data } = res;
        setPostList(data.content);
        setTotal(data.totalElements);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts, page]);

  return (
    <Container>
      {/* 게시글 목록 */}
      <div>
        <Title>질문 게시판</Title>
        {/* 테이블 */}
        <BoardTable postList={postList} />
      </div>
      {Math.ceil(total / SIZE) > 1 && (
        <PageWrapper>
          <Pagination
            totalPage={Math.ceil(total / SIZE)}
            limitPage={5}
            page={page}
            setPage={setPage}
          />
        </PageWrapper>
      )}
      {/* 글쓰기 버튼 */}
      <WriteButton
        onClick={() => {
          navigate('write');
        }}
      >
        <BsFillPencilFill />
      </WriteButton>
    </Container>
  );
}

export default Board;
