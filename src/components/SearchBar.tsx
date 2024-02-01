import { useState } from "react";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue === "") return;
    onSearch(inputValue);
  };

  return (
    <>
      <div className="sticky bottom-0 left-0 right-0 w-full">
        <div className="w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
          <div className="text-center">
            <p className="mt-3 text-gray-600 dark:text-gray-400"></p>

            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <form>
                <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                  <div className="flex-[1_0_0%]">
                    <label className="block text-sm text-gray-700 font-medium dark:text-white">
                      <span className="sr-only">Search article</span>
                    </label>
                    <input
                      type="text"
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Search article"
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div className="flex-[0_0_auto]">
                    <a
                      className="w-[46px] h-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      onClick={handleSearch}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
