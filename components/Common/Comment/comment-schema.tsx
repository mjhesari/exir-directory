"use client";

import { Comment } from "@/types/dataTypes";

interface CommentSchemaProps {
  comments: Comment[];
  targetUrl: string;
}

export function CommentSchema({ comments, targetUrl }: CommentSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "url": targetUrl,
    "comment": comments.map(comment => ({
      "@type": "Comment",
      "text": comment.content || comment.pendingContent,
      "dateCreated": new Date(parseInt(comment.createdAt) * 1000).toISOString(),
      "author": {
        "@type": "Person",
        "identifier": comment.createdBy
      },
      ...(comment.publishedBy && {
        "publishedBy": {
          "@type": "Person",
          "identifier": comment.publishedBy
        }
      })
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}