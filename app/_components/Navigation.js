import Link from 'next/link';

export default function Navigation() {
    return (
        <div>
            <ul>
                <ol>
                    {' '}
                    <Link href={'/'}>Home</Link>
                </ol>
                <ol>
                    {' '}
                    <Link href={'/cabins'}>Cabins</Link>
                </ol>
                <ol>
                    {' '}
                    <Link href={'/account'}>Account</Link>
                </ol>
                <ol>
                    {' '}
                    <Link href={'/about'}>About</Link>
                </ol>
            </ul>
        </div>
    );
}
