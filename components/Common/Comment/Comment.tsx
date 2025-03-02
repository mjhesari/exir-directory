import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Card, CardBody, CardHeader } from "@heroui/react";

export default function Comment({targetId}:{targetId:string}) {

  return (
    <Card
      shadow="none"
      radius="md"
      className="bg-background/60 bg-white border"
      classNames={{
        base: "!overflow-auto h-full",
      }}
    >
      <CardHeader>
        <h3 className="text-xl sm:text-2xl font-bold">Comments</h3>
      </CardHeader>
      <CardBody>
        <section aria-label="Comment Form" className="mb-6 sm:mb-8">
          <CommentForm targetId={targetId} />
        </section>
        <section aria-label="Comments List">
          <CommentList targetId={targetId} />
        </section>
      </CardBody>
    </Card>
  );
}
