import { getAppointmentBooking } from "@/lib/appointmentBooking";
import BookingCalendarFrame from "@/components/BookingCalendarFrame";

export default function AppointmentBooking() {
  const booking = getAppointmentBooking();
  if (!booking) {
    return (
      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        Online appointment booking is temporarily unavailable. Please try again shortly.
      </p>
    );
  }

  return (
    <section aria-label="Appointment scheduler" data-enquiry-form="page">
      <p className="mb-4 text-sm text-slate/80">
        Select an available time to continue. Your consultation is confirmed only after you
        complete the {booking.provider} booking form. Check the displayed time zone before booking.
      </p>
      <BookingCalendarFrame booking={booking} />
      <p className="mt-4 text-sm">
        Having trouble with the calendar?{" "}
        <a href={booking.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
          Open the booking page in a new tab
        </a>.
      </p>
    </section>
  );
}
