'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import supabase from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';
import { revalidate } from '../about/page';

export async function updateGuest(formData) {
    const session = await auth();

    if (!session) throw new Error('You must be logged in.');

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error('Please provide a valid national ID');

    const updatedFields = { nationalID, nationality, countryFlag };

    const { error } = await supabase
        .from('guests')
        .update(updatedFields)
        .eq('id', session.user.guestId);

    if (error) throw new Error('Guest could not be updated');

    revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
    const session = await auth();

    if (!session) throw new Error('You must be logged in.');

    const guestBookings = await getBookings(session.user.guestId);
    const bookingIds = guestBookings.map((booking) => booking.id);

    if (!bookingIds.includes(bookingId))
        throw new Error('You cannot delete this booking!');

    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) throw new Error('Booking could not be deleted');

    revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
    const bookingId = Number(formData.get('bookingId'));
    console.log(bookingId);

    // 1 Authentication
    const session = await auth();
    if (!session) throw new Error('You must be logged in.');

    // 2 Authorization
    const guestBookings = await getBookings(session.user.guestId);
    const bookingIds = guestBookings.map((booking) => booking.id);

    console.log(bookingIds.includes(bookingId));

    if (!bookingIds.includes(bookingId)) {
        throw new Error('You cannot update this booking!');
    }

    // 3 Data Fetching
    const updatedFields = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 100),
    };

    // 4 Mutation
    const { error } = await supabase
        .from('bookings')
        .update(updatedFields)
        .eq('id', bookingId)
        .select()
        .single();

    if (error) {
        console.log(error);
        throw new Error('Guest could not be updated');
    }

    if (error) throw new Error('Guest could not be updated');

    // 5 Revalidating
    revalidatePath(`/account/reservations/edit/${bookingId}`);
    revalidatePath('/account/reservations');

    // 6 Redirecting
    redirect('/account/reservations');
}

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}
