import { z } from "zod";
import { Frequency } from "@prisma/client";

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export const subscriptionSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  city: z
    .string({
      required_error: "'city' is required",
    })
    .min(3, "'city' should be at least 3 characters long"),
  frequency: z.enum(
    [Frequency.DAILY.toLowerCase(), Frequency.HOURLY.toLowerCase()],
    {
      errorMap: () => ({
        message: "'frequency' must be either 'daily' or 'hourly'",
      }),
    }
  ),
});
