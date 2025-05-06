export interface IUserStoriesListObject {
    uid: string;
    username: string;
    previewImg: string;
    stories: Array<IStoriesListObject>;
}

export interface IStoriesListObject {
    imageUrl: string;
    timestamp: number;
}
