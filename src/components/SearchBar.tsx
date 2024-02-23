import { Button, Input } from "@nextui-org/react";

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-3">
      <Input
        size="md"
        endContent={
          <Button color="primary" variant="flat">
            Search
          </Button>
        }
        className="w-[1000px] pb-3"
        classNames={{
          mainWrapper: "w-[1000px] flex items-center",
        }}
        placeholder="Message Ai..."
      />
    </div>
  );
};

export default SearchBar;
