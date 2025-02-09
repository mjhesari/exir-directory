'use client';

import { useEffect } from 'react';
import { fetchCommentsAsync } from '@/redux/features/comment/comment-slice';
import { Button, Spinner } from '@nextui-org/react';
import { CommentCard } from './CommentCard';
import { Comment } from '@/types/dataTypes';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';

interface CommentListProps {
  targetId: string;
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[];
  parentComment?: Comment;
}

export function CommentList({ targetId }: CommentListProps) {
  const dispatch = useAppDispatch();
  const { comments, loading, error, pageSize, pageIndex, total, refreshKey, visibleReplies } = useAppSelector(
    (state) => state.comments
  );

  useEffect(() => {
    dispatch(fetchCommentsAsync({ targetId, pageIndex: 0, pageSize }));
  }, [dispatch, targetId, pageSize, refreshKey]);

  const organizeCommentsIntoTree = (flatComments: Comment[]): CommentWithReplies[] => {
    const commentMap = new Map<string, CommentWithReplies>();
    const rootComments: CommentWithReplies[] = [];

    // First pass: Create all comment objects with empty replies array
    flatComments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: Organize into tree structure and add parent comment reference
    flatComments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          commentWithReplies.parentComment = parent;
          parent.replies.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    // Sort root comments by creation date (newest first)
    rootComments.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt));
    
    // Sort replies chronologically (oldest first for better conversation flow)
    const sortReplies = (comments: CommentWithReplies[]) => {
      comments.forEach(comment => {
        if (comment.replies.length > 0) {
          comment.replies.sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt));
          sortReplies(comment.replies);
        }
      });
    };

    sortReplies(rootComments);
    return rootComments;
  };

  const handleLoadMore = () => {
    if (!loading) {
      dispatch(fetchCommentsAsync({
        targetId,
        pageIndex: pageIndex + 1,
        pageSize
      }));
    }
  };

  const countAllComments = (comments: CommentWithReplies[]): number => {
    return comments.reduce((count, comment) => {
      return count + 1 + countAllComments(comment.replies);
    }, 0);
  };

  const renderComment = (comment: CommentWithReplies, level: number = 0) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isVisible = visibleReplies.includes(comment.id);

    return (
      <div key={comment.id} className="space-y-4">
        <div className={level === 1 ? 'ml-8' : ''}>
          <CommentCard 
            comment={comment} 
            targetId={targetId}
            hasReplies={hasReplies}
            isVisible={isVisible}
            level={level}
          />
          
          {hasReplies && isVisible && (
            <div className="mt-4 space-y-4">
              {comment.replies.map(reply => renderComment(reply, level + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading && pageIndex === 0) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger p-4">
        {error}
      </div>
    );
  }

  if (!comments?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  const organizedComments = organizeCommentsIntoTree(comments);
  const totalCommentsShown = countAllComments(organizedComments);
  const topLevelComments = comments.filter(c => !c.parentId);
  const hasMoreComments = topLevelComments.length < total;

  return (
    <div className="space-y-2">
      {organizedComments.map(comment => renderComment(comment))}
      
      {hasMoreComments && !loading && (
        <div className="text-center mt-4">
          <Button
            variant="flat"
            onPress={handleLoadMore}
            isDisabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>Loading...</span>
              </div>
            ) : (
              'Load More Comments'
            )}
          </Button>
        </div>
      )}
      
      {total > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Showing {totalCommentsShown} comments
        </div>
      )}
    </div>
  );
}