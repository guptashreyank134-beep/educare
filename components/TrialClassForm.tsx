import { ArrowRight, CalendarDays } from "lucide-react";
import { getAppointmentBooking } from "@/lib/appointmentBooking";

export function AppointmentBookingLink({ children }: { children: string }) {
  const booking = getAppointmentBooking();
  if (!booking) {
    return (
      <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        Online appointment booking is temporarily unavailable. Please try again shortly.
      </p>
    );
  }

  return (
    <a
      href={booking.url}
      className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {children}
      <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
    </a>
  );
}

const TrialClassForm = ({
  scope = "page",
  title = "Select Your Required Timeslot",
  buttonLabel = "Choose an Available Timeslot",
}: {
  redirectTo?: string | null;
  showAppointmentLink?: boolean;
  scope?: "page" | "shared";
  title?: string;
  buttonLabel?: string;
}) => {
  return (
    <div
      data-enquiry-form={scope}
      className="rounded-[24px] border border-[#F1F5F9] bg-white p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
    >
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-light text-primary">
          <CalendarDays className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="font-bricolage text-[24px] font-medium text-slate">
          {title}
        </p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate/75">
          A consultation is booked only after you select an available time and complete the
          Calendly form. Times already occupied in our connected calendars are unavailable.
        </p>

        <AppointmentBookingLink>{buttonLabel}</AppointmentBookingLink>
      </div>
    </div>
  );
};

export default TrialClassForm;
