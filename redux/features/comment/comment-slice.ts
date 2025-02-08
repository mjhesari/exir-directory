import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  CommentResponse, CommentState } from '@/types/dataTypes';
import { fetchComments, createComment } from '@/utils/api/index';

const initialState: CommentState = {
  comments: [],
  total: 0,
  pageSize: 10,
  pageIndex: 0,
  loading: false,
  error: null,
  refreshKey: 0,
  visibleReplies: [],
};

export const fetchCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async ({ targetId, pageIndex, pageSize }: { targetId: string; pageIndex: number; pageSize: number }) => {
    // Only fetch top-level comments (those without parentId)
    const response = await fetchComments(targetId, pageIndex, pageSize);
    return { ...response, requestedPageIndex: pageIndex };
  }
);

export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (data: {
    targetId: string;
    parentId?: string;
    pendingContent: string;
    filesUrl?: string[];
  }) => {
    const response = await createComment(data);
    return response;
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    incrementRefreshKey: (state) => {
      state.refreshKey += 1;
    },
    resetComments: (state) => {
      state.comments = [];
      state.pageIndex = 0;
      state.visibleReplies = [];
    },
    toggleRepliesVisibility: (state, action: PayloadAction<string>) => {
      const commentId = action.payload;
      const index = state.visibleReplies.indexOf(commentId);
      if (index > -1) {
        state.visibleReplies.splice(index, 1);
      } else {
        state.visibleReplies.push(commentId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action: PayloadAction<CommentResponse & { requestedPageIndex: number }>) => {
        const { data, requestedPageIndex } = action.payload;
        state.loading = false;

        // If it's the first page or a refresh, replace all comments
        if (requestedPageIndex === 0) {
          state.comments = data.comments;
          state.pageIndex = 0;
        } else {
          // For subsequent pages, append new top-level comments
          const newComments = data.comments.filter(
            newComment => !state.comments.some(
              existingComment => existingComment.id === newComment.id
            )
          );
          state.comments = [...state.comments, ...newComments];
          state.pageIndex = requestedPageIndex;
        }

        state.total = data.total;
        state.pageSize = data.pageSize;
      })
      .addCase(fetchCommentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(createCommentAsync.fulfilled, (state) => {
        state.refreshKey += 1;
      });
  },
});

export const { incrementRefreshKey, resetComments, toggleRepliesVisibility } = commentSlice.actions;
export default commentSlice.reducer;