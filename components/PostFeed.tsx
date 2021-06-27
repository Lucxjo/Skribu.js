/** @format */

import Link from 'next/link';
import Image from 'next/image';
import { post, PostProps } from '../lib/post';

export default function PostFeed({ posts, admin }: { posts: PostProps; admin?: boolean }) {
	return posts ? (
		posts.map(post => <PostItem post={post} key={post.slug} admin={admin || false} />)
	) : (
		<p></p>
	);
}

function PostItem({ post, key, admin }: { post: post; key: string; admin: boolean }) {
	const wordCount = post?.content.trim().split(/\s+/g).length;
	const minsToRead = (wordCount / 100 + 1).toFixed(0);

	return (
		<div className="card">
			<Link href={`/${post.username}`} passHref>
				<a>
					<strong>By @{post.username}</strong>
				</a>
			</Link>
			<Link href={`/${post.username}/${post.slug}`} passHref>
				<h2>
					<a>
						<strong>{post.title}</strong>
					</a>
				</h2>
			</Link>
			<footer>
				<span>
					{wordCount} words. {minsToRead} minutes to read.
				</span>
				<span className="push-left">
					{post.heartCount}
					{' 💗'}
				</span>
			</footer>
		</div>
	);
}
