import React from "react";
import Avatar from "../Avatar/Avatar";

interface StoryCircleProps {
    userId: string;
    userName: string;
    imageUrl: string;
    clickHandler: (userId: string) => void;
}

const StoryCircle: React.FC<StoryCircleProps> = ({
    userId,
    userName,
    imageUrl,
    clickHandler,
}) => {
    return (
        <button className="btn" onClick={() => clickHandler(userId)}>
            <div className="flex flex-col justify-center-safe w-[64px]">
                <Avatar
                    imgUrl={
                        import.meta.env.MODE === "development"
                            ? `/..${imageUrl}`
                            : `/${import.meta.env.BASE_URL}${imageUrl}`
                    }
                    altText={`${userName} profile picture`}
                    showOutline={true}
                />
                <p className="text-center text-sm text-gray-800 overflow-hidden truncate">
                    {userName}
                </p>
            </div>
        </button>
    );
};

export default StoryCircle;
