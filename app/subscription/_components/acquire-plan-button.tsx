"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripeCustomerPortalUrl =
  process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL;

export const AcquirePlanButton = () => {
  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!stripePublishableKey) {
      throw new Error("Stripe publishable key not found");
    }

    const stripe = await loadStripe(stripePublishableKey);
    if (!stripe) throw new Error("Stripe not found");

    await stripe.redirectToCheckout({ sessionId });
  };

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${stripeCustomerPortalUrl}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full font-bold"
    >
      Adquirir plano
    </Button>
  );
};
