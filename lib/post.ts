import { ReactElement } from "react";

export interface PostProps {
	map(fun: (post: post) => JSX.Element): ReactElement<any, any>;
	posts: post[];
}

export interface post {
    slug: string
    content:string
    username: string
    title: string
    createdAt: Date
    heartCount: number
    published: boolean
    uid: string
    updatedAt: Date
}