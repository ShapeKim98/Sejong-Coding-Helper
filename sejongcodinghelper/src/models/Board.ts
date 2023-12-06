export interface IPost {
  id: number;
  boardId?: string;
  title: string;
  type: string;
  commentCount: number;
  bojHandle: string;
  createdDate: string;
  imageUUIDs: string;
  content?: string;
  problemId?: string;
}

export interface IComment {
  id: string;
  boardId: string;
  bojHandle: string;
  parentCommentId?: string;
  content: string;
  createdDate?: string;
}

export interface IShowComment extends IComment {
  replyList: IShowComment[];
  parentCommentId?: string;
}
