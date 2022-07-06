import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import Image from "../components/image";
import useFetchImage from "../utils/hooks/useFetchImage";
import { AnimateSharedLayout, motion } from "framer-motion";
import CircleLoader from "./CircularLoader";
import AppContext from "../store/AppContext";
let newSearchText = null;
export default function Images() {
  const [page, setPage] = useState(1);
  const [, , , likedImages, setLikedImages] = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState(null);
  const [Images, setImages, errors, isLoading] = useFetchImage(
    page,
    searchTerm
  );
  const inputRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    console.log("in useeffect errors");
    console.log(errors);
  }, [errors]);

  // handle remove with context

  function handleRemove(url) {
    setLikedImages(likedImages.filter((image, i) => image !== url));
  }
  /////////////////////////////////////
  function ShowImage() {
    return (
      <div className="flex flex-wrap mx-auto p-2">
        <AnimateSharedLayout type="switch" className="w-full rounded">
          {Images?.map((image, index) => (
            <motion.div
              className="border-1 border-gray-300 rounded-xl p-1 bg-black-100"
              key={index}
              layoutId={index}
            >
              <Image
                imageId={image.id}
                createdAt={image.created_at}
                description={image.description}
                show={() => setShowPreview(index)}
                image={image.urls.small}
                handleRemove={handleRemove}
                imageLarge={image.urls.regular}
                index={index}
              />
            </motion.div>
          ))}
          {!Images.length && "No images found"}
        </AnimateSharedLayout>
      </div>
    );
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToBottom() {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  }

  function handleInputChange(e) {
    newSearchText = e.target.value;
  }

  function handleSearch() {
    console.log(newSearchText);
    setPage(1);
    setSearchTerm(newSearchText);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSearchTerm(newSearchText);
    }
  }
  return (
    <section>
      <div className="flex justify-between my-5 mx-3">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div class="relative w-full">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="inputBox"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type something..."
            required
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* <div className='w-full'>
              <input
              autoComplete='off'
              placeholder='Enter Query'
              className='p-2 border-gray-800 shadow rounded bg-black w-full text-center'
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}></input>
          </div>
          <div>
              <button className='p-1 bg-green-600 text-white'  onClick={handleSearch}>Search</button>
          </div> */}
      </div>
      <ShowImage />
      {isLoading ? (
        <CircleLoader />
      ) : (
        <div>
          <div className="w-7 h-7  fab-con-top ">
            <i
              className="align-middle  rounded-2xl  fa fa-arrow-up text-2xl cursor-pointer"
              onClick={scrollToTop}
            ></i>
            <i
              className="align-middle  rounded-2xl  fa fa-arrow-down text-2xl cursor-pointer"
              onClick={scrollToBottom}
            ></i>
          </div>

          {!!Images.length && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setPage(page + 1)}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </section>
  );
}
