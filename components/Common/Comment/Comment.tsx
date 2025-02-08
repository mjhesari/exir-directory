import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Comment() {
  const targetId = "df6e1c49-bbd4-43ca-abb3-946af7362fa1";

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
