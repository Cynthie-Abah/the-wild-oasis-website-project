"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// actions are for mutations
// FORM DATA ALWAYS NEEDS TO BE LAST WHEN USING THE JAVASCRIPT BIND() METHOD!
export async function createBookings(bookingData,formData) {
    const session = await auth()
   if(!session) throw new Error('you must be logged in')

    // Object.entries(formData.entries()) - creates an object of the formData key and values

    const newBooking = {
      ...bookingData,
      guestId: session.user.guestId,
      numGuests: Number(formData.get('numGuests')),
      observations: formData.get('observations')?.slice(0, 1000),
      extrasPrice: 0,
      totalPrice: bookingData.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: 'uncomfirmed',
    }

    const { error } = await supabase
    .from('bookings')
    .insert([newBooking])

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
  revalidatePath(`cabins/${bookingData.cabinId}`)
  redirect('/cabins/thankyou')
}

export async function updateProfile( formData) {
   
   const session = await auth()
   if(!session) throw new Error('you must be logged in')

   const nationalID = formData.get('nationalID');
   const [nationality, countryFlag] = formData.get('nationality').split('%')

   if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('National ID is invalid')
   
const updateData = {nationalID, nationality, countryFlag}

const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)

  if (error) {

    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile')
   
}

export async function updateReservation(formData) {
   // check
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  const bookingId = Number(formData.get('id'))

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingsId = guestBookings.map(booking => booking.id)

  if (!guestBookingsId.includes(bookingId)) {
    console.log(`Unauthorized update attempt `)
    throw new Error('You shouldn’t update this cabin')
  }

  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations')?.slice(0, 1000),
  }

  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }

  revalidatePath('/account/reservations') // ✅ This runs now
  revalidatePath(`/account/reservations/edit/${bookingId}`) // ✅ This runs now
  redirect('/account/reservations')       // ✅ Then this takes over
}

export async function deleteReservation(bookingId) {
   const session = await auth()
   if(!session) throw new Error('you must be logged in')

      const guestBookings = await getBookings(session.user.guestId)
      const guestBookingsId = guestBookings.map((booking)=> booking.id)

      if (!guestBookingsId.includes(bookingId)) 
         throw new Error('Invalid booking Id');

      const {error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations')
}

export async function signInAction() {
   await signIn("google", { callbackUrl: "/ " })
}

export async function signOutAction() {
   await signOut("google", { callbackUrl: "/ " })
}