import { Card, CardBody, CardHeader } from "@nextui-org/react";
import ReactMarkdown from "react-markdown";

const ResponseCard = ({ response }) => {
  return (
    <Card className="w-full mt-5">
      <CardHeader className="font-medium">ChatGpt</CardHeader>
      <CardBody className="text-md text-gray-200">
        <ReactMarkdown children={response}></ReactMarkdown>
      </CardBody>
    </Card>
  );
};

export default ResponseCard;
