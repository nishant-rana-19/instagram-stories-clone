import React from "react";

interface AvatarProps {
    imgUrl: string;
    altText: string;
    showOutline: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ imgUrl, altText, showOutline }) => {
    const containerClasses: string[] = [
        "flex",
        "w-[64px]",
        "h-[64px]",
        "place-content-center",
        "rounded-full",
        "p-0.5",
    ];
    if (showOutline) {
        containerClasses.push(
            ...["bg-linear-to-bl", "from-violet-500", "to-fuchsia-500"]
        );
    }
    const classes: string = containerClasses.join(" ");
    return (
        <div className={classes}>
            <img
                className="rounded-full bg-white object-cover w-full"
                src={imgUrl}
                alt={altText}
            ></img>
        </div>
    );
};

export default Avatar;
