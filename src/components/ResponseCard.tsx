import { Card, CardBody, CardHeader } from "@nextui-org/react";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@nextui-org/react";

const ResponseCard = ({
  response = "",
  isLoading = false,
  isError = false,
}) => {
  console.log(response);

  return (
    <Card className="w-full mt-5">
      <CardHeader className="font-medium">ChatGpt</CardHeader>
      <CardBody className="text-md text-gray-200">
        {isLoading ? (
          <>
            <div className="space-y-3">
              <Skeleton isLoaded={false} className="w-3/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-primary-300"></div>
              </Skeleton>
              <Skeleton
                isLoaded={false}
                className="w-2/5 rounded-lg bg-primary-300"
              >
                <div className="h-3 w-full rounded-lg bg-primary-200"></div>
              </Skeleton>
              <Skeleton isLoaded={false} className="w-1/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-primary-100"></div>
              </Skeleton>
            </div>
          </>
        ) : isError ? (
          <p className="text-danger-500 font-bold">
            Something went wrong please try again
          </p>
        ) : (
          <ReactMarkdown children={response}></ReactMarkdown>
        )}
      </CardBody>
    </Card>
  );
};

export default ResponseCard;
