import { Card, CardBody, Button } from "@nextui-org/react";

export default function PromptCard({ prompt }) {
  return (
    <>
      <Card className="mt-5">
        <CardBody>
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              radius="full"
              className="w-[20px] radius-[100%]"
            ></Button>
            <span className="font-medium">You:</span>
            <p className="font-normal text-sm">{prompt}</p>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
