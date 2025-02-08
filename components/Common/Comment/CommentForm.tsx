'use client';

import { useState } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import {  useAppDispatch } from '@/redux/app/hooks';
import { createCommentAsync } from '@/redux/features/comment/comment-slice';
import { toast } from 'react-hot-toast';

interface CommentFormProps {
  targetId: string;
  parentId?: string;
  onSuccess?: () => void;
}

export function CommentForm({ targetId, parentId, onSuccess }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      await dispatch(createCommentAsync({
        targetId,
        parentId,
        pendingContent: content,
      })).unwrap();
      
      setContent('');
      toast.success('Comment submitted successfully');
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to submit comment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        label="Write your comment"
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        minRows={2}
        size="sm"
        classNames={{
          input: "text-sm",
          label: "text-sm"
        }}
        isDisabled={isLoading}
      />
      <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          onClick={() => toast('File upload coming soon', {
            icon: '📁',
          })}
          className="min-w-8 w-8 h-8"
        >
          <Icon icon="solar:gallery-add-bold" width={18} />
        </Button>
        <Button
          color="primary"
          size="sm"
          type="submit"
          isDisabled={isLoading || !content.trim()}
          className="justify-self-end min-w-8 w-8 h-8 sm:w-auto sm:h-9 sm:px-4"
          isIconOnly={true}
          startContent={
            <div className="flex items-center gap-2">
              <Icon icon="solar:send-bold" width={18} />
              <span className="hidden sm:inline">Submit</span>
            </div>
          }
        >
          <Icon icon="fluent:send-28-filled" width={18} className="sm:hidden" />
        </Button>
      </div>
    </form>
  );
}