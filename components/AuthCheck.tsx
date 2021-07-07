/** @format */

import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function AuthCheck(props: any) {
	const { username } = useContext(UserContext);
	return username
		? props.children
		: props.fallback || <Link href="/auth">You must be signed in</Link>;
}
