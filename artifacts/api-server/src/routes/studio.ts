import { Router, type IRouter } from "express";
import { randomUUID } from "node:crypto";
import { db, appointmentRequests } from "@workspace/db";
import { CreateAppointmentRequestBody, CreateAppointmentRequestResponse, ListServicesResponse } from "@workspace/api-zod";
import { services } from "../lib/services";

const router: IRouter = Router();
router.get("/services", (_req, res) => {
  res.json(ListServicesResponse.parse(services));
});

router.post("/appointment-requests", async (req, res): Promise<void> => {
  const parsed = CreateAppointmentRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please complete all required fields with valid details." });
    return;
  }
  const data = parsed.data;
  const selectedDate = new Date(`${data.preferredDate}T12:00:00Z`);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (!data.consent || data.name.trim().length < 2 ||
      !services.some(service => service.id === data.serviceId) ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.toISOString().slice(0, 10) !== data.preferredDate ||
      data.preferredDate < today ||
      selectedDate.getTime() > Date.now() + 180 * 86400000) {
    res.status(400).json({ error: "Choose a valid service and a date within the next 180 days, and agree to the request notice." });
    return;
  }
  const reference = randomUUID();
  try {
    await db.insert(appointmentRequests).values({
      ...data, reference, name: data.name.trim(), email: data.email.trim().toLowerCase(),
      source: data.source?.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || "direct",
    });
    res.status(201).json(CreateAppointmentRequestResponse.parse({
      reference, status: "preview_request",
      message: "Your preview request has been saved. This is not a confirmed appointment. No email has been sent and no time has been reserved.",
    }));
  } catch {
    req.log.error("Could not save appointment request");
    res.status(503).json({ error: "We couldn't save your request. Please try again." });
  }
});
export default router;
