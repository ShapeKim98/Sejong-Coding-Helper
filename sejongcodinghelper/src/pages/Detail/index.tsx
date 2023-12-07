import React, { useCallback, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Title,
  Toolbar,
  Writer,
  CreateDate,
  Button,
  WriteInfo,
  Content,
  CommentWrapper,
  BackButton,
} from './style';
import CommentComponent from './CommentComponent';
import { Link, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { getProblemInfo } from '../../api/Problem/ProblemAPI';
import { useSelector } from 'react-redux';
import { deletePost, getPost } from '../../api/Board/boardAPI';
import { IPost } from '../../models/Board';
import { RootState } from '../../redux/Store';
import Problem from '../../models/Problem';
import BoardProblemCard from '../Board/BoardProblemCard';
import { Container } from '../Board/style';
import VStack from '../../components/VStack';

/**
 * 게시판 글 상세 컴포넌트
 */
function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Omit<IPost, 'imageUUIDs'> | null>(null);
  const [problemInfo, setProblemInfo] = useState<Problem | null>(null);

  const user = useSelector((state: RootState) => state.user);

  // 글 정보 불러오기
  const loadPost = useCallback(() => {
    if (!id) return;
    getPost(id)
      .then((res) => {
        const { data } = res;
        setPost(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  // 게시글에 문제 정보 있으면 가져오기
  useEffect(() => {
    if (post && post.problemId) {
      getProblemInfo(post.problemId.toString())
        .then((res) => {
          if (res.status === 200) {
            if (res.data) {
              const { data } = res;
              setProblemInfo(data);
            }
          } else {
            setProblemInfo(null);
          }
        })
        .catch((e) => {
          setProblemInfo(null);
        });
    }
  }, [post]);

  // 글 삭제
  const onClickDeletePost = useCallback(() => {
    if (!id) return;
    deletePost(id)
      .then(() => {
        alert('글을 삭제했습니다.');
        navigate('/board');
      })
      .catch((e) => {
        alert('글을 삭제하지 못하였습니다.');
      });
  }, [id, navigate]);

  if (!post) return null;

  return (
    <Container>
      <div>
        <BackButton
          size="25"
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title>{post.title}</Title>
        <Toolbar>
          <WriteInfo>
            <Link to={`/my-page/${post.bojHandle}`}>
              <Writer>
                {/* <CommonProfileImage
                  width={20}
                  height={20}
                  src={post.profileImg}
                /> */}
                <div>{post.bojHandle}</div>
              </Writer>
            </Link>
            <CreateDate>
              {dayjs(post.createdDate).format('YYYY년 M월 DD일 HH:mm')}
            </CreateDate>
          </WriteInfo>
          <WriteInfo>
            {user && user.bojHandle === post.bojHandle && (
              <>
                <Button
                  onClick={() => {
                    navigate(`/board/write/${post.id}`);
                  }}
                >
                  수정
                </Button>
                <Button onClick={onClickDeletePost}>삭제</Button>
              </>
            )}
          </WriteInfo>
        </Toolbar>
        {!isEmpty(problemInfo) && <BoardProblemCard problem={problemInfo} />}
        <Content 
        data-color-mode='light'>
          <MDEditor.Markdown
            style={{
              backgroundColor: 'transparent',
            }}
            source={post.content}
          />
        </Content>
        <CommentWrapper>
          {id && <CommentComponent boardId={id} />}
        </CommentWrapper>
      </div>
    </Container>
  );
}

export default BoardDetail;
