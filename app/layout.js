import Logo from '@/app/_components/Logo';
import Navigation from '@/app/_components/Navigation';
import '@/app/_styles/globals.css';
import { Roboto_Flex } from 'next/font/google';
import Header from './_components/Header';
import { ReservationProvider } from './_components/ReservationProvider';

export const metadata = {
    // title: 'Booking App',
    title: {
        template: '%s: Booking App',
        default: 'Welcome: Booking App',
    },
    description: 'Generated by Booking App',
};

const roboto = Roboto_Flex({
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body
                className={`${roboto.className} antialiased bg-primary-900 text-primary-100 min-h-screen flex flex-col`}
            >
                <Header />

                <div className='flex-1 px-8 py-12 grid'>
                    <main className='max-w-7xl mx-auto w-full'>
                        <ReservationProvider>{children}</ReservationProvider>
                    </main>
                </div>
            </body>
        </html>
    );
}
