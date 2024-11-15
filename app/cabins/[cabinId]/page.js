import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import TextExpander from '@/app/_components/TextExpander';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinId);
    return { title: `${name}` };
}

export async function generateStaticParams() {
    const cabin = await getCabins();

    const ids = cabin.map((cabin) => String({ cabinId: cabin.id }));

    return ids;
}

export default async function Page({ params }) {
    const cabin = await getCabin(params.cabinId);

    return (
        <div className='max-w-6xl mx-auto mt-8'>
            <div>
                <Cabin cabin={cabin} />

                <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
