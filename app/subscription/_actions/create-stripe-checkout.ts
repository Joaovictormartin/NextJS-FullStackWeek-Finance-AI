"use server";

import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const cancel_url = process.env.NEXT_PUBLIC_SITE_URL;
const success_url = process.env.NEXT_PUBLIC_SITE_URL;
const stipeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePremiumPlanPriceId = process.env.STRIPE_PREMIUM_PLAN_PRICE_ID;

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!stipeSecretKey) throw new Error("Stripe secret key not found");

  const stripe = new Stripe(stipeSecretKey, {
    apiVersion: "2024-10-28.acacia",
  });

  const session = await stripe.checkout.sessions.create({
    cancel_url,
    success_url,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ quantity: 1, price: stripePremiumPlanPriceId }],
    subscription_data: {
      metadata: { clerk_user_id: userId },
    },
  });

  return { sessionId: session.id };
};
