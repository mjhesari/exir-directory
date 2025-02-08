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
}

export function CommentList({ targetId }: CommentListProps) {
  const dispatch = useAppDispatch();
  const { comments, loading, error, pageIndex, pageSize, total, refreshKey, visibleReplies } = useAppSelector(
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

    // Second pass: Organize into tree structure
    flatComments.forEach(comment => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.replies.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    // Sort by creation date (newest first)
    const sortByDate = (a: Comment, b: Comment) => 
      parseInt(a.createdAt) - parseInt(b.createdAt);

    rootComments.sort(sortByDate);
    
    // Sort replies recursively (oldest first for replies)
    const sortReplies = (comments: CommentWithReplies[]) => {
      comments.forEach(comment => {
        if (comment.replies.length > 0) {
          comment.replies.sort(sortByDate);
          sortReplies(comment.replies);
        }
      });
    };

    sortReplies(rootComments);
    return rootComments;
  };

  const handleLoadMore = () => {
    if (!loading && comments.length < total) {
      const nextPage = pageIndex + 1;
      dispatch(fetchCommentsAsync({
        targetId,
        pageIndex: nextPage,
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
    const marginClass = level > 0 ? `ml-${Math.min(level * 4, 12)}` : '';
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isVisible = visibleReplies.includes(comment.id);

    return (
      <div key={comment.id} className={`relative ${marginClass}`}>
        <div className={level > 0 ? 'border-l-2 border-default-200 ml-4 pl-4' : ''}>
          <CommentCard 
            comment={comment} 
            targetId={targetId}
            hasReplies={hasReplies}
            isVisible={isVisible}
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
  const hasMoreTopLevelComments = comments.filter(c => !c.parentId).length < total;

  return (
    <div className="space-y-4">
      {organizedComments.map(comment => renderComment(comment))}
      
      {hasMoreTopLevelComments && (
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
              `Load More Comments (${total - comments.filter(c => !c.parentId).length} remaining)`
            )}
          </Button>
        </div>
      )}
      
      {total > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Showing {totalCommentsShown} comments ({comments.filter(c => !c.parentId).length} top-level)
        </div>
      )}
    </div>
  );
}