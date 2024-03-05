import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchPropmpt, setSearchPrompt] = useState("");

  const handleSearch = () => {
    if (searchPropmpt !== "") {
      onSearch(searchPropmpt);
      setSearchPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center mt-3">
      <Input
        size="md"
        value={searchPropmpt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
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
