import React, { useCallback, useEffect, useState } from 'react';
import {
  CommentInfo,
  CommentList,
  ReplyButton,
  CommentWrapper,
  ReplyList,
} from './style';
import { isEmpty } from 'lodash';
import Comment from './Comment';
import { IComment, IShowComment } from '../../../models/Board';
import { createComment, getComment } from '../../../api/Board/\bcommentAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import CommentInput from './CommentInput';

/**
 * 댓글 컴포넌트
 */
function CommentComponent({ boardId }: { boardId: string }) {
  const [commentList, setCommentList] = useState<IShowComment[]>([]); // 구조화된 댓글 정보
  const [commentContent, setCommentContent] = useState(''); // 입력 중인 댓글 내용
  const [replyContentMap, setReplyContentMap] = useState<{
    [key: string]: string;
  }>({}); // 입력중인 답글 내용
  const [showReplyMap, setShowReplyMap] = useState<{ [key: string]: boolean }>(
    {}
  ); // 답글 보여주기 여부 값
  const [allCommentList, setAllcommentList] = useState<IComment[]>([]);
  const user = useSelector((state: RootState) => state.user);

  // 댓글 조회
  const loadAllComments = useCallback(() => {
    getComment(boardId)
      .then((res) => {
        const { data } = res;
        setAllcommentList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [boardId]);
  useEffect(() => {
    loadAllComments();
  }, [loadAllComments]);

  const toggleShowReply = (key: string) => {
    setShowReplyMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 답글을 댓글 하위 필드 배열로 넣어주는 함수
  const getOrganizeComments = useCallback((comments: IComment[]) => {
    const commentsMap: {
      [key: string]: IShowComment;
    } = {};
    const tmpReplyContentMap: {
      [key: string]: string;
    } = {};

    comments.forEach((comment) => {
      const newComment: IShowComment = { ...comment, replyList: [] };
      if (!comment.parentCommentId) {
        // 답글 내용 초기화
        tmpReplyContentMap[newComment.id] = '';
        commentsMap[newComment.id] = newComment;
      } else {
        // parentCommentId가 있는 경우 replyList에 추가
        const parentComment: IShowComment =
          commentsMap[comment.parentCommentId];
        if (!parentComment.replyList) {
          parentComment.replyList = [];
        }
        parentComment.replyList.push(newComment);
      }
    });
    setReplyContentMap(tmpReplyContentMap);
    return Object.values(commentsMap);
  }, []);

  // 모든 댓글 내용으로 댓글 구조화
  useEffect(() => {
    setCommentList(getOrganizeComments(allCommentList));
  }, [allCommentList, getOrganizeComments]);

  // 댓글 작성
  const onSubmitComment = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!user.bojHandle) return;
      if (isEmpty(commentContent.trim())) {
        return;
      }
      const commentInfo = {
        boardId,
        bojHandle: user.bojHandle,
        content: commentContent.trim(),
      };
      createComment(commentInfo)
        .then(() => {
          loadAllComments();
          setCommentContent('');
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [boardId, commentContent, loadAllComments, user.bojHandle]
  );

  // 답글 작성
  const onSubmitReply = useCallback(
    (e: any, parentCommentId: string) => {
      e.preventDefault();
      if (!user.bojHandle) return;
      if (isEmpty(replyContentMap[parentCommentId].trim())) {
        return;
      }
      const commentInfo = {
        boardId,
        bojHandle: user.bojHandle,
        content: replyContentMap[parentCommentId].trim(),
        parentCommentId: parentCommentId,
      };
      createComment(commentInfo)
        .then(() => {
          loadAllComments();
          setReplyContentMap({ ...replyContentMap, [parentCommentId]: '' });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [boardId, loadAllComments, replyContentMap, user.bojHandle]
  );

  if (!allCommentList) return null;

  return (
    <div>
      {/* 댓글 정보, input 폼 */}
      <CommentInfo>{allCommentList.length} 개의 댓글</CommentInfo>
      <CommentInput
        onChangeComment={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCommentContent(e.target.value);
        }}
        onSubmitComment={onSubmitComment}
        commentContent={commentContent}
      />
      {/* 댓글 목록 */}
      <CommentList>
        {commentList.map((comment) => (
          <CommentWrapper key={comment.id}>
            <Comment
              comment={comment}
              reply={false}
              loadComment={loadAllComments}
            />
            <ReplyButton
              onClick={() => {
                toggleShowReply(comment.id);
              }}
            >
              {showReplyMap[comment.id] ? '답글 접기' : '답글 보기'} (
              {comment.replyList.length})
            </ReplyButton>
            {/* 답글 목록 */}
            {showReplyMap[comment.id] && (
              <>
                {!isEmpty(comment.replyList) && (
                  <ReplyList>
                    {comment.replyList.map((reply) => (
                      <Comment
                        key={reply.id}
                        comment={reply}
                        reply
                        loadComment={loadAllComments}
                      />
                    ))}
                  </ReplyList>
                )}
                <CommentInput
                  onChangeComment={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setReplyContentMap({
                      ...replyContentMap,
                      [comment.id]: e.target.value,
                    });
                  }}
                  commentContent={replyContentMap[comment.id] || ''}
                  onSubmitComment={(e: any) => {
                    onSubmitReply(e, comment.id);
                  }}
                />
              </>
            )}
          </CommentWrapper>
        ))}
      </CommentList>
    </div>
  );
}

export default CommentComponent;
