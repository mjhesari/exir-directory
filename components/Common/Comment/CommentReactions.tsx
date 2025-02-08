'use client';

import { useState, useEffect } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { fetchReactions, createOrUpdateReaction } from '@/utils/api/index';
import { ReactionType, Reaction } from '@/types/dataTypes';
import toast from 'react-hot-toast';

interface CommentReactionsProps {
  commentId: string;
}

export function CommentReactions({ commentId }: CommentReactionsProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [averageRate, setAverageRate] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [userReaction, setUserReaction] = useState<Reaction | null>(null);

  const loadReactions = async () => {
    try {
      const response = await fetchReactions(commentId);
      if (response.status === 200) {
        setReactions(response.data.reactions);
        setAverageRate(parseFloat(response.data.averageRate) || 0);
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

  const handleRating = async (rate: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await createOrUpdateReaction({
        commentId,
        rate,
      });
      await loadReactions();
      toast.success('Rating updated');
    } catch (error) {
      toast.error('Failed to update rating');
    } finally {
      setLoading(false);
    }
  };

  const likeCount = reactions.filter(r => r.type === ReactionType.LIKE).length;
  const dislikeCount = reactions.filter(r => r.type === ReactionType.DISLIKE).length;

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      <div className="flex items-center gap-1">
        <Button
          isIconOnly
          size="sm"
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

      <Popover placement="top">
        <PopoverTrigger>
          <Button 
            variant="light" 
            size="sm" 
            className="h-8 px-1.5 sm:px-2 min-w-[auto]"
          >
            <div className="flex items-center gap-0.5 sm:gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  icon={star <= averageRate ? "solar:star-bold" : "solar:star-line-duotone"}
                  className={star <= averageRate ? "text-warning" : "text-default-400"}
                  width={12}
                />
              ))}
              <span className="text-xs ml-1">{averageRate.toFixed(1)}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid grid-cols-5 gap-1 p-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                isIconOnly
                variant="light"
                size="sm"
                className="w-8 h-8"
                onPress={() => handleRating(star)}
                isDisabled={loading}
              >
                <Icon
                  icon={star <= (userReaction?.rate || 0) ? "solar:star-bold" : "solar:star-line-duotone"}
                  className={star <= (userReaction?.rate || 0) ? "text-warning" : "text-default-400"}
                  width={16}
                />
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}