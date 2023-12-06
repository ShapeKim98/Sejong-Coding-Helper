import React, { useCallback } from 'react';
import {
  WriteInfo,
  Writer,
  CreateDate,
  ReplyButton,
  FlexWrapper,
  ReplyWrapper,
  CommentWrapper,
} from './style';
import dayjs from 'dayjs';
import { BsArrowReturnRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../../../api/Board/\bcommentAPI';
import { IShowComment } from '../../../../models/Board';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';

/**
 * 댓글 한개 컴포넌트
 */
function Comment({
  comment,
  reply = false,
  loadComment,
}: {
  comment: IShowComment;
  reply: boolean;
  loadComment: () => void;
}) {
  const user = useSelector((state: RootState) => state.user);

  // 댓글 삭제
  const onClickDeleteComment = useCallback(() => {
    deleteComment(comment.id)
      .then(() => {
        loadComment();
      })
      .catch((e) => {
        console.error(e);
      });
  }, [comment.id, loadComment]);

  return (
    <div>
      <WriteInfo>
        <Link to={`/my-page/${comment.bojHandle}`}>
          <Writer>
            {reply && (
              <BsArrowReturnRight
                style={{ color: 'var(--color-textgrey)', marginRight: '5px' }}
              />
            )}
            {/* <CommonProfileImage
              width={20}
              height={20}
              src={
                comment.profileImg != 'null'
                  ? comment.profileImg
                  : 'https://static.solved.ac/misc/360x360/default_profile.png'
              }
            /> */}
            <div>{comment.bojHandle}</div>
            <CreateDate key={comment.id}>
              {dayjs(comment.createdDate).format('YYYY.MM.DD HH:mm')}
            </CreateDate>
          </Writer>
        </Link>
        {user.bojHandle && user.bojHandle === comment.bojHandle && (
          <FlexWrapper>
            <ReplyButton
              onClick={() => {
                onClickDeleteComment();
              }}
            >
              삭제
            </ReplyButton>
          </FlexWrapper>
        )}
      </WriteInfo>
      {reply ? (
        <ReplyWrapper>
          <div>{comment.content}</div>
        </ReplyWrapper>
      ) : (
        <CommentWrapper>
          <div>{comment.content}</div>
        </CommentWrapper>
      )}
    </div>
  );
}

export default Comment;
