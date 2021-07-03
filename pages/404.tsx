import Link from "next/link";

export default function Custom404() {
    return (
			<main>
				<h1>4-oh-4 &#x2014; That page doesn&apos;t exist... </h1>
				<iframe
					src="https://giphy.com/embed/23jenQx7fcyLSoslFi"
					width="480"
					height="270"
					frameBorder="0"
					allowFullScreen></iframe>
				<p>
					<a href="https://giphy.com/gifs/jenny-lorenzo-maruchi-laritza-23jenQx7fcyLSoslFi">
						via GIPHY
					</a>
				</p>
				<Link href="/" passHref>
					<button className="btn-blue">Go home</button>
				</Link>
			</main>
		);
}