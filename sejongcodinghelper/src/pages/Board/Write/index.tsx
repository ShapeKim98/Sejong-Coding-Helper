import React, { useCallback, useEffect, useState } from 'react';
import { Container, Title } from '../style';
import {
  Form,
  ButtonWrapper,
  FormItem,
  ProblemNumberInputWrapper,
} from './style';
import MDEditor from '@uiw/react-md-editor';
import { FileDrop } from 'react-file-drop';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { createPost, getPost, updatePost } from '../../../api/Board/boardAPI';
import { getProblemInfo } from '../../../api/Problem/ProblemAPI';
import { IPost } from '../../../models/Board';
import BoardProblemCard from '../BoardProblemCard';
import Problem from '../../../models/Problem';

function BoardWrite() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editMode = !isEmpty(id);
  const TYPE = 'question';
  const [title, setTitle] = useState('');
  const [problemId, setProblemId] = useState('');
  const [boardColor, setBoardColor] = useState(false);
  const [problemInfo, setProblemInfo] = useState<Problem | null>(null);
  const [content, setContent] = useState<string | undefined>('');
  const user = useSelector((state: RootState) => state.user);
  // 업로드할 이미지의 uuid 리스트 (공백 없이 , 로 구분)
  const [uuidList, setUuidList] = useState('');
  // 유효성 검사
  const validate = useCallback(() => {
    if (isEmpty(title.trim()) || isEmpty(content)) {
      return;
    }
    setTitle(title.trim());
    return true;
  }, [title, content]);

  // 게시글 업로드
  const writePost = () => {
    if (!user.bojHandle || !content) return;
    const newPost: Omit<IPost, 'id' | 'commentCount' | 'createdDate'> = {
      type: TYPE,
      bojHandle: user.bojHandle,
      title,
      content,
      imageUUIDs: uuidList,
      problemId,
    };
    createPost(newPost)
      .then((res) => {
        navigate(`/board/${res.data.id}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 컨텐츠에서 이미지 uuid만 파싱
  const getImageUuids = useCallback((markdownContent: string) => {
    const regex = /!\[\]\((.*?)\)/g;
    const uuids = [];
    let match;
    while ((match = regex.exec(markdownContent)) !== null) {
      const uuid = match[1].split('/').splice(-1)[0];
      uuids.push(uuid);
    }
    return uuids.join(',');
  }, []);

  // 문제 입력 버튼 클릭 핸들러
  const onClickProblemButton = useCallback((id: string) => {
    getProblemInfo(id)
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            const { data } = res;
            setProblemInfo(data);
          }
        } else {
          setProblemInfo(null);
          setTitle('');
        }
      })
      .catch((e) => {
        setProblemInfo(null);
        setTitle('');
      });
  }, []);

  // 게시글 수정 시 유효성 검사 및 기본 정보 설정
  useEffect(() => {
    if (!editMode || !id) return;
    getPost(id)
      .then((res) => {
        const { data } = res;
        if (data.bojHandle !== user.bojHandle) {
          navigate('/board');
          return;
        }
        setProblemId(data.problemId);
        if (data.problemId) {
          onClickProblemButton(data.problemId);
        }
        setContent(data.content);
        setTitle(data.title);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [editMode, id, navigate, onClickProblemButton, user.bojHandle]);

  // 게시글 수정
  const editPost = () => {
    if (!user.bojHandle) return;
    const newPost = {
      boardId: id,
      type: TYPE,
      bojHandle: user.bojHandle,
      title,
      content,
      imageUUIDs: getImageUuids(content || ''),
      problemId,
    };
    updatePost(newPost)
      .then(() => {
        navigate(`/board/${newPost.boardId}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 작성 버튼 클릭. 유효성 검사 후 작성이면 작성 수정이면 수정 함수 호출
  const onClickWriteButton = () => {
    if (!validate()) {
      return;
    }
    if (editMode) {
      editPost();
      return;
    }
    writePost();
    return;
  };

  // 문제 입력에 따라 제목 설정
  useEffect(() => {
    if (!isEmpty(problemInfo)) {
      setTitle(`${problemInfo.problemId}번 : ${problemInfo.titleKo}`);
    }
  }, [problemInfo]);

  return (
    <Container>
      <Title>{editMode ? '글 수정' : '글 작성'}</Title>
      <Form>
        <FormItem>
          <div>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="제목"
            />
          </div>
        </FormItem>
        {/* 문제 번호 입력 */}
        <FormItem>
          <ProblemNumberInputWrapper>
            <input
              value={problemId}
              onChange={(e) => {
                setProblemId(e.target.value);
              }}
              placeholder="문제 번호를 입력해주세요"
              type="number"
            />
            <button
              onClick={() => {
                onClickProblemButton(problemId.toString());
              }}
            >
              입력
            </button>
          </ProblemNumberInputWrapper>
        </FormItem>
        {!isEmpty(problemInfo) && <BoardProblemCard problem={problemInfo} />}
        <FormItem>
          <div>
            <FileDrop
              onDragOver={(e) => {
                setBoardColor(true);
              }}
              onDragLeave={(e) => {
                setBoardColor(false);
              }}
              onDrop={(files, e) => {
                const formdata = new FormData();
                if (!files) return;
                formdata.append('file', files[0]);
                const headers = { 'Content-Type': files[0].type };
                if (files[0].size >= 5000000) {
                  alert('5MB 이상 파일은 업로드가 불가능합니다.');
                } else if (
                  files[0].type === 'image/png' ||
                  files[0].type === 'image/jpeg' ||
                  files[0].type === 'image/jpg'
                ) {
                  axios
                    .post('/api/v1/image/s3/upload', formdata, {
                      headers,
                    })
                    .then(function (res) {
                      const imageName = res.data.url;
                      const newContent = `${content}\n\n![${files[0].name}](${imageName})`;
                      setContent(newContent);
                      const uuid = imageName.split('/').slice(-1)[0];
                      setUuidList((prev) => {
                        if (isEmpty(prev)) return uuid;
                        return `${prev},${uuid}`;
                      });
                    });
                } else {
                  alert('png, jpg, jpeg 파일이 아닙니다.');
                }
                setBoardColor(false);
              }}
            >
              <MDEditor
                height={600}
                value={content}
                onChange={setContent}
                style={{
                  backgroundColor: boardColor ? '#d6e3ef' : '',
                  fontWeight: 'normal',
                }}
                data-color-mode='dark'
              />
            </FileDrop>
          </div>
        </FormItem>
        <ButtonWrapper>
          <button onClick={onClickWriteButton}>작성</button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}

export default BoardWrite;
