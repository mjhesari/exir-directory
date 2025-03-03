'use client';

import { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { fetchReactions, createOrUpdateReaction } from '@/utils/api/index';
import { ReactionType, Reaction } from '@/types/dataTypes';
import { toast } from 'react-hot-toast';

interface CommentReactionsProps {
  commentId: string;
}

export function CommentReactions({ commentId }: CommentReactionsProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [userReaction, setUserReaction] = useState<Reaction | null>(null);

  const loadReactions = async () => {
    try {
      const response = await fetchReactions(commentId);
      if (response.status === 200) {
        setReactions(response.data.reactions);
        // Find current user's reaction (using userId: "2" as per the token)
        const currentUserReaction = response.data.reactions.find(r => r.userId === "2");
        setUserReaction(currentUserReaction || null);
      }
    } catch (error) {
      console.error('Failed to load reactions:', error);
    }
  };

  useEffect(() => {
    loadReactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId]);

  const handleReaction = async (type: ReactionType) => {
    if (loading) return;
    setLoading(true);
    try {
      await createOrUpdateReaction({
        commentId,
        type,
      });
      await loadReactions();
      toast.success('Reaction updated');
    } catch (error) {
      toast.error('Failed to update reaction');
    } finally {
      setLoading(false);
    }
  };

  const likeCount = reactions.filter(r => r.type === ReactionType.LIKE).length;
  const dislikeCount = reactions.filter(r => r.type === ReactionType.DISLIKE).length;

  return (
    <div className="flex items-center gap-1">
      <Button
        isIconOnly
        size="md"
        variant={userReaction?.type === ReactionType.LIKE ? "solid" : "light"}
        onPress={() => handleReaction(ReactionType.LIKE)}
        isDisabled={loading}
        className="min-w-8 w-8 h-8"
      >
        <div className="flex items-center gap-1">
          <Icon icon="solar:like-bold" width={14} />
          <span className="text-xs">{likeCount}</span>
        </div>
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant={userReaction?.type === ReactionType.DISLIKE ? "solid" : "light"}
        onPress={() => handleReaction(ReactionType.DISLIKE)}
        isDisabled={loading}
        className="min-w-8 w-8 h-8"
      >
        <div className="flex items-center gap-1">
          <Icon icon="solar:dislike-bold" width={14} />
          <span className="text-xs">{dislikeCount}</span>
        </div>
      </Button>
    </div>
  );
}