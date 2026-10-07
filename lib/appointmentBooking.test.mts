import test from "node:test";
import assert from "node:assert/strict";
import { parseAppointmentBooking } from "./appointmentBooking.ts";

test("only supported public booking URLs can enable scheduling", () => {
  assert.equal(parseAppointmentBooking("https://calendly.com/educare/consultation")?.provider, "Calendly");
  assert.equal(parseAppointmentBooking("https://calendar.google.com/calendar/appointments/schedules/abc123")?.embedUrl,
    "https://calendar.google.com/calendar/appointments/schedules/abc123?gv=true");
  for (const value of [undefined, "", "not a URL", "javascript:alert(1)", "http://calendly.com/a/b",
    "https://calendly.com.evil.test/a/b", "https://calendar.google.com/calendar/u/0/r", "https://calendly.com/a",
    "https://user:password@calendly.com/a/b", "https://calendly.com:8080/a/b"]) {
    assert.equal(parseAppointmentBooking(value), null, String(value));
  }
});

test("configuration does not forward prefilled personal data to the booking embed", () => {
  assert.equal(parseAppointmentBooking("https://calendly.com/educare/consultation?email=private@example.com#secret")?.url,
    "https://calendly.com/educare/consultation");
});
