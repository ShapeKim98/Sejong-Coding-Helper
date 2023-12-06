import React, { useCallback } from 'react';
import { InputForm, Input } from './style';

/**
 * 댓글 인풋 컴포넌트
 */
function CommentInput({ onSubmitComment, commentContent, onChangeComment }) {
  const onKeyDownComment = useCallback(
    (e) => {
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        e.nativeEvent.isComposing === false
      ) {
        onSubmitComment(e);
      }
    },
    [onSubmitComment]
  );

  return (
    <div>
      <InputForm onSubmit={onSubmitComment}>
        <Input
          placeholder="댓글 내용을 입력하세요"
          value={commentContent}
          onChange={onChangeComment}
          onKeyDown={onKeyDownComment}
        />
        <button>확인</button>
      </InputForm>
    </div>
  );
}

export default CommentInput;
