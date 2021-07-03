/** @format */

import Head from 'next/head';

export default function MetaTags({ title, description, image }: { title: string, description: string, image: string }) {
    return (
			<Head>
				<title key="title">{title}</title>
				<meta name="twitter:card" content="summary" key="twcard" />
				<meta name="twitter:site" content="@Ludoviko_" key="twsite" />
				<meta name="twitter:title" content={title} key="twtitle" />
				<meta name="twitter:description" content={description} key="twdesc" />
				<meta name="twitter:image" content={image} key="twimg" />

				<meta property="og:title" content={title} key="ogtitle" />
				<meta property="og:description" content={description} key="ogdesc" />
				<meta property="og:image" content={image} key="ogimg" />
			</Head>
		);
}
