import { useState } from "react";
import sampleData from "../../data/testdata.json";

import StoryCircle from "../../components/StoryCircle/StoryCircle";
import StoryPage from "../StoryPage/StoryPage";

import "./homePage.css";

const HomePage = () => {
    const [showStory, setShowStory] = useState(false); // Default: false
    const [clickedUserIndex, setClickedUserIndex] = useState(0);

    const userStoryData: Array<any> = sampleData.storiesList;

    const handleOnClickStory = (userId: string) => {
        const userIndex = userStoryData.findIndex(
            (item) => item.uid === userId
        );

        setShowStory(true);
        setClickedUserIndex(userIndex);
    };

    const handleCloseStory = () => {
        setShowStory(false);
        setClickedUserIndex(0);
    };

    return (
        <>
            <div className="flex w-100 h-full outline-1 overflow-hidden">
                {!showStory && (
                    <div className="flex gap-4 p-1 overflow-x-auto">
                        {userStoryData.map((userStory) => (
                            <StoryCircle
                                key={userStory.uid}
                                userId={userStory.uid}
                                userName={userStory.username}
                                imageUrl={userStory.previewImg}
                                clickHandler={handleOnClickStory}
                            />
                        ))}
                    </div>
                )}
                {showStory && (
                    <StoryPage
                        storiesData={userStoryData}
                        openStoryUserIndex={clickedUserIndex}
                        handleClose={handleCloseStory}
                    />
                )}
            </div>
        </>
    );
};

export default HomePage;
