'use client';

import React from 'react';
import ReservationCard from './ReservationCard';
import { deleteReservation } from '../_lib/actions';
import { useOptimistic } from 'react';

export default function ReservationLists({ bookings }) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings,
        (currentBooking, bookingId) => {
            return currentBooking.filter((booking) => booking.id !== bookingId);
        }
    );

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }

    return (
        <ul className='space-y-6'>
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    booking={booking}
                    key={booking.id}
                    onDelete={handleDelete}
                />
            ))}
        </ul>
    );
}
