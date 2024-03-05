import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchPropmpt, setSearchPrompt] = useState("");

  const handleSearch = () => {
    console.log(searchPropmpt);
    onSearch(searchPropmpt);
  };

  return (
    <div className="flex justify-center mt-3">
      <Input
        size="md"
        onChange={(e) => setSearchPrompt(e.target.value)}
        endContent={
          <Button onClick={handleSearch} color="primary" variant="flat">
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
