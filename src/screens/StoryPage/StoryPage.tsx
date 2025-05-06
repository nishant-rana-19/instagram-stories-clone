import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../components/Avatar/Avatar";
import Loader from "../../components/Loader/Loader";
import "./storyPage.css";
import useInterval from "../../hooks/useInterval";

// Importing Types
import { IUserStoriesListObject } from "../../data/data.types";

interface StoryPageProps {
    storiesData: Array<IUserStoriesListObject>;
    openStoryUserIndex: number;
    handleClose: () => void;
}

const StoryPage: React.FC<StoryPageProps> = ({
    storiesData,
    openStoryUserIndex,
    handleClose,
}) => {
    const timeToNextStoryInSeconds = 5;
    const storySwipeContainerRef = useRef<HTMLOListElement>(null);
    const [currUserStoryIndex, setCurrUserStoryIndex] = useState(0);
    const [currUserIndex, setCurrUserIndex] = useState(openStoryUserIndex);
    const [loading, setLoading] = useState(true);
    const currUserData = storiesData[currUserIndex];
    const currStoryData = currUserData?.stories || [];

    useEffect(() => {
        handleSwipe(currUserIndex, true);
    }, []);
    useEffect(() => {
        console.log(
            "StoryPage: useEffect(): currUserStoryIndex:",
            currUserStoryIndex
        );
        console.log("StoryPage: useEffect(): currUserIndex:", currUserIndex);
        if (currUserStoryIndex < 0) {
            if (currUserIndex - 1 < 0) {
                handleClose();
                return;
            }
            // setActiveUserIndex((prevState) => prevState - 1);
            let updatedActiveStoryIndex = 0;
            if (storiesData[currUserIndex - 1]) {
                updatedActiveStoryIndex =
                    storiesData[currUserIndex - 1].stories.length - 1;
            }
            handleSwipe(currUserIndex - 1);
            setCurrUserIndex((prevState) => prevState - 1);
            setCurrUserStoryIndex(updatedActiveStoryIndex);
        }
        if (currUserStoryIndex >= currStoryData.length) {
            if (currUserIndex + 1 >= storiesData.length) {
                handleClose();
                return;
            }
            handleSwipe(currUserIndex + 1);
            setCurrUserStoryIndex(0);
            setCurrUserIndex((prevState) => prevState + 1);
        }
        setTimeout(() => setLoading(false), 0);
    }, [currUserStoryIndex]);

    useInterval(() => {
        setLoading(true);
        setCurrUserStoryIndex((prevState) => prevState + 1);
    }, timeToNextStoryInSeconds * 1000);

    const handleSwipe = (navigateToIndex: number, instant = false) => {
        if (
            storySwipeContainerRef !== null &&
            storySwipeContainerRef?.current
        ) {
            const scrollToValue = Math.floor(
                storySwipeContainerRef.current?.scrollWidth *
                    (navigateToIndex / storiesData.length)
            );
            if (instant) {
                storySwipeContainerRef.current.scroll({
                    left: scrollToValue,
                    behavior: "instant",
                });
            } else {
                storySwipeContainerRef.current.scroll({
                    left: scrollToValue,
                    behavior: "smooth",
                });
            }
            setLoading(false);
        }
    };

    const handleNext = () => {
        setLoading(true);
        setCurrUserStoryIndex((prevState) => prevState + 1);
    };

    const handlePrevious = () => {
        setLoading(true);
        setCurrUserStoryIndex((prevState) => prevState - 1);
    };

    // const handleHorizontalScroll = () => {
    //     let ticking = false;
    //     let lastScrollLeft = storySwipeContainerRef.current;

    //     return (e: React.UIEvent<HTMLElement>) => {
    //         if (!ticking) {
    //             window.requestAnimationFrame(function () {
    //                 const documentScrollLeft = e.target.scrollLeft;
    //                 console.log("lastScrollLeft:", lastScrollLeft);
    //                 console.log("currentLeft:", documentScrollLeft);
    //                 if (lastScrollLeft != documentScrollLeft) {
    //                     const navigateToIndexValue = Math.floor(
    //                         storiesData.length /
    //                             (currUserIndex * lastScrollLeft)
    //                     );
    //                     lastScrollLeft = documentScrollLeft;
    //                     console.log(
    //                         "navigateScrolLindedx:",
    //                         navigateToIndexValue
    //                     );
    //                     handleSwipe(navigateToIndexValue);
    //                 }
    //                 ticking = false;
    //             });
    //             ticking = true;
    //         }
    //     };
    // };

    return (
        <div className="relative w-100 overflow-hidden">
            <ol
                data-id="user's list"
                className="swipe-container relative"
                ref={storySwipeContainerRef}
                // onScroll={handleHorizontalScroll}
            >
                {storiesData.map((userItem, userIndex) => (
                    <li
                        key={userItem?.uid}
                        data-index={userIndex}
                        className="h-full relative"
                    >
                        <div className="swipe-card">
                            {loading && (
                                <div className="size-full h-full bg-black flex justify-center items-center">
                                    <Loader />
                                </div>
                            )}
                            {/* Stories */}
                            <ol
                                data-id="stories-list"
                                className="absolute size-full"
                            >
                                {userItem.stories.map(
                                    (storyItem, storyIndex) => (
                                        <li
                                            key={`${userItem.uid}_${storyIndex}`}
                                            className={
                                                currUserStoryIndex ===
                                                storyIndex
                                                    ? "h-full"
                                                    : "hidden"
                                            }
                                        >
                                            <img
                                                className="inset-0 size-full object-cover"
                                                src={
                                                    import.meta.env.MODE ===
                                                    "development"
                                                        ? `/..${storyItem?.imageUrl}`
                                                        : `${
                                                              import.meta.env
                                                                  .BASE_URL
                                                          }${
                                                              storyItem?.imageUrl
                                                          }`
                                                }
                                                loading="lazy"
                                            />
                                        </li>
                                    )
                                )}
                            </ol>
                            <div className="absolute inset-0 pt-2 px-2 flex flex-col p-1 bg-gradient-to-b from-black to-transparent to-10%">
                                <div className="flex flex-row pl-1 pb-1">
                                    <ul className="list-none flex flex-row gap-2 w-full">
                                        {userItem.stories.map((item, index) => {
                                            const classes = [
                                                "relative",
                                                "inline-block",
                                                "bg-gray-600",
                                                "rounded-full",
                                                "h-[4px]",
                                                "grow",
                                            ];
                                            if (index < currUserStoryIndex) {
                                                classes.push(
                                                    "progress-bar",
                                                    "completed"
                                                );
                                            }
                                            if (
                                                index === currUserStoryIndex &&
                                                userIndex === currUserIndex &&
                                                !loading
                                            ) {
                                                classes.push(
                                                    "progress-bar",
                                                    "active"
                                                );
                                            }
                                            const styleClasses =
                                                classes.join(" ");
                                            return (
                                                <li
                                                    key={`${item}_${index}`}
                                                    className={styleClasses}
                                                >
                                                    &nbsp;
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-[64px]">
                                        <Avatar
                                            imgUrl={userItem?.previewImg}
                                            altText={`${userItem?.username} profile picture`}
                                            showOutline={false}
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-50 truncate">
                                        {userItem?.username}
                                    </p>
                                    <button
                                        type="button"
                                        className="ml-auto mr-4 text-gray-100"
                                        onClick={() => handleClose()}
                                    >
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18 17.94 6M18 18 6.06 6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
            {!loading && (
                <>
                    <button
                        className="absolute h-9/10 w-[48px] bottom-0 right-0 outline-red-400"
                        onClick={handleNext}
                        type="button"
                    >
                        <span className="sr-only">Next</span>
                    </button>
                    <button
                        className="absolute h-9/10 w-[48px] bottom-0 left-0 outline-green-400"
                        onClick={handlePrevious}
                        type="button"
                    >
                        <span className="sr-only">Previous</span>
                    </button>
                </>
            )}
        </div>
    );
};

export default StoryPage;
