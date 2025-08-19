import Stripe from "stripe";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const stipeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (request: Request) => {
  if (!stipeSecretKey || !stripeWebhookSecret) return NextResponse.error();

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.error();

  const text = await request.text();
  const stripe = new Stripe(stipeSecretKey, {
    apiVersion: "2024-10-28.acacia",
  });

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    stripeWebhookSecret,
  );

  switch (event.type) {
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;

      if (!invoice.subscription) break;

      // Recupera assinatura pra acessar metadata
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
      );

      const clerkUserId = subscription.metadata?.clerk_user_id;
      if (clerkUserId) {
        (await clerkClient()).users.updateUser(clerkUserId, {
          privateMetadata: {
            stripeCustomerId: invoice.customer as string,
            stripeSubscriptionId: subscription.id,
          },
          publicMetadata: { subscriptionPlan: "premium" },
        });
      } else {
        console.warn("erro");
      }

      break;
    }
    case "customer.subscription.deleted": {
      // Remover plano premium do usuário
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );

      const clerkUserId = subscription.metadata.clerk_user_id;
      if (!clerkUserId) return NextResponse.error();

      await (
        await clerkClient()
      ).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: { subscriptionPlan: null },
      });
    }
  }
  return NextResponse.json({ received: true });
};
