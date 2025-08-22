// webhooks
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (request: Request) => {
  if (!stripeSecretKey || !webhookSecret) return NextResponse.error();

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.error();

  const text = await request.text();
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-02-24.acacia",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(text, signature, webhookSecret);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }

  switch (event.type) {
    case "invoice.paid": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invoice = event.data.object as Stripe.Invoice & { parent?: any };
      let subscriptionId = invoice.subscription as string | null;
      if (!subscriptionId && invoice?.parent.type === "subscription_details") {
        subscriptionId = invoice?.parent.subscription_details?.subscription;
      }

      if (!subscriptionId) break;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      const clerkUserId = subscription.metadata?.clerk_user_id;
      if (!clerkUserId) break;

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: invoice.customer as string,
        },
        publicMetadata: { subscriptionPlan: "premium" },
      });

      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      const clerkUserId = subscription.metadata?.clerk_user_id;
      if (!clerkUserId) break;

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });

      break;
    }
  }

  return NextResponse.json({ received: true });
};
