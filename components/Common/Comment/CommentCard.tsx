'use client';

import { useState } from 'react';
import { Card, CardBody, CardFooter, Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { Comment } from '@/types/dataTypes';
import { CommentForm } from './CommentForm';
import { CommentReactions } from './CommentReactions';
import { toggleRepliesVisibility } from '@/redux/features/comment/comment-slice';
import { useAppDispatch } from '@/redux/app/hooks';
import Image from 'next/image';

interface CommentCardProps {
  comment: Comment & { replies?: Comment[]; parentComment?: Comment };
  targetId: string;
  hasReplies: boolean;
  isVisible: boolean;
  level: number;
}

export function CommentCard({ comment, targetId, hasReplies, isVisible}: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const dispatch = useAppDispatch();

  const handleReplySubmit = () => {
    setIsReplying(false);
    if (!hasReplies) {
      dispatch(toggleRepliesVisibility(comment.id));
    }
  };

  const isApproved = Boolean(comment.content);
  const formattedDate = format(new Date(parseInt(comment.createdAt) * 1000), 'PPp');

  return (
    <Card className="w-full border" radius='sm' shadow='none'>
      <CardBody className="p-3 sm:p-4">
        <div className="grid grid-cols-[auto_1fr_auto] gap-2 sm:gap-3 items-start">
          <div className="relative">
            <Avatar
              showFallback
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.createdBy}`}
              fallback={<Icon icon="solar:user-broken" width={20} />}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            {isApproved && (
              <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-0.5">
                <Icon icon="solar:check-circle-bold" className="text-white w-3 h-3" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold truncate">User {comment.createdBy}</h4>
                {comment.parentId && (
                  <span className="text-xs text-default-500">
                    replying to User {comment.parentComment?.createdBy}
                  </span>
                )}
              </div>
              <time className="text-xs text-default-500">{formattedDate}</time>
              {comment.rate && (
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon
                      key={star}
                      icon={star <= comment.rate! ? "solar:star-bold" : "solar:star-line-duotone"}
                      className={star <= comment.rate! ? "text-warning" : "text-default-400"}
                      width={12}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm mt-1.5">{comment.content || comment.pendingContent}</p>
            {comment.filesUrl && comment.filesUrl.length > 0 && (
              <div className="mt-2 grid grid-flow-col auto-cols-[80px] sm:auto-cols-[100px] gap-2 overflow-x-auto">
                {comment.filesUrl.map((url, index) => (
                  <Image
                  fill
                    key={index}
                    src={url??""}
                    alt={`Attachment ${index + 1}`}
                    className="w-full aspect-square object-cover rounded"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light" className="min-w-8 w-8 h-8">
                <Icon icon="solar:menu-dots-bold" width={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem startContent={<Icon icon="solar:flag-bold" width={16} />} key='report'>
                Report
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>

      <CardFooter className="px-3 sm:px-4 py-2 flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr] gap-2 w-full items-center">
          <CommentReactions commentId={comment.id} />
          <div className="grid grid-cols-2 gap-1 sm:gap-2 justify-end">
            <Button
              size="sm"
              variant="light"
              isIconOnly
              onPress={() => setIsReplying(!isReplying)}
              className="min-w-8 w-8 h-8 sm:w-auto sm:h-9"
            >
              <Icon icon="solar:chat-round-dots-bold" width={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Reply</span>
            </Button>
            {hasReplies && (
              <Button
                size="sm"
                variant="light"
                isIconOnly
                onPress={() => dispatch(toggleRepliesVisibility(comment.id))}
                className="min-w-8 w-8 h-8 sm:w-auto sm:h-9"
              >
                <div className="flex items-center">
                  <Icon 
                    icon={isVisible ? "solar:alt-arrow-up-bold" : "solar:alt-arrow-down-bold"} 
                    width={16} 
                    className="sm:mr-2"
                  />
                  <span className="text-xs sm:hidden">{comment.replies?.length}</span>
                  <span className="hidden sm:inline">
                    {isVisible ? 'Hide' : 'Show'} ({comment.replies?.length})
                  </span>
                </div>
              </Button>
            )}
          </div>
        </div>

        {isReplying && (
          <div className="w-full pt-1">
            <CommentForm 
              targetId={targetId} 
              parentId={comment.id} 
              onSuccess={handleReplySubmit}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}