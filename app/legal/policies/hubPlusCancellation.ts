import type { Policy } from "./types";

// Supplied by StudyNL, September 2026. Reproduced verbatim — do not reword,
// summarise or "tidy" this text: it is the operative policy, and the checkout
// consent tick refers to it.
//
// NOTE FOR THE TEAM: section 4 promises cancellation from inside the Hub Plus
// account. That facility is implemented (app/hub-plus/dashboard/membership);
// the cancellation confirmation email it also promises is NOT — no email
// provider is connected yet.

export const hubPlusCancellation: Policy = {
  slug: "hub-plus-cancellation",
  title: "Hub Plus Cancellation & Refund Policy",
  summary:
    "Your right to cancel Hub Plus, how monthly cancellation works, and when a refund is due.",
  lastUpdated: "September 2026",
  intro: [
    {
      p: "We want Hub Plus membership to be simple, transparent and flexible. This Cancellation & Refund Policy explains your rights to cancel your Hub Plus subscription, including your statutory rights under applicable European consumer protection law.",
    },
  ],
  sections: [
    {
      heading: "1. 14-Day Right to Cancel",
      blocks: [
        {
          p: "When you purchase a Hub Plus subscription online, you have the right to change your mind and cancel your subscription within 14 calendar days of entering into the subscription, without having to provide a reason.",
        },
        {
          p: "This is your statutory 14-day right of withdrawal under applicable European consumer protection legislation.",
        },
        {
          p: "To exercise your right to cancel during this period, you must clearly inform us that you wish to cancel your Hub Plus subscription before the 14-day period expires.",
        },
        {
          p: "You can do this through the cancellation facility within your Hub Plus account or by contacting us using the contact details provided on our website.",
        },
        {
          p: "Where applicable, any refund due following the valid exercise of your statutory right of withdrawal will be processed in accordance with applicable consumer law and returned using the original payment method, unless otherwise agreed.",
        },
        {
          p: "If you expressly request or agree that Hub Plus services should begin immediately during the 14-day withdrawal period, your refund may, where permitted by applicable law, be reduced to reflect services already provided before you notified us of your cancellation.",
        },
        {
          p: "Nothing in this policy limits or excludes any statutory rights you may have under applicable consumer protection law.",
        },
      ],
    },
    {
      heading: "2. Cancelling After the 14-Day Period",
      blocks: [
        {
          p: "After the initial 14-day cancellation period, you may cancel your Hub Plus subscription at any time.",
        },
        {
          p: "Hub Plus operates on a monthly subscription basis. If you cancel after the 14-day period, your cancellation will take effect at the end of your current monthly billing period.",
        },
        {
          p: "You will continue to have access to Hub Plus and its membership benefits until the end of the period for which you have already paid.",
        },
        { p: "You will not be charged for another month after your cancellation takes effect." },
        {
          p: "For example, if your monthly membership renews on the 15th of each month and you cancel on the 20th, you will continue to have access until the 14th of the following month. Your subscription will then end and no further monthly payment will be taken.",
        },
      ],
    },
    {
      heading: "3. Monthly Renewals",
      blocks: [
        {
          p: "Unless you cancel, your Hub Plus subscription will automatically renew each month, and the applicable monthly membership fee will be charged using your selected payment method.",
        },
        { p: "There is no minimum subscription period beyond the current monthly billing period." },
        { p: "You may prevent the next monthly renewal by cancelling before your next renewal date." },
      ],
    },
    {
      heading: "4. How to Cancel",
      blocks: [
        {
          p: "You can cancel your Hub Plus subscription at any time through the Hub Plus account or membership area by selecting the cancellation option and following the instructions provided.",
        },
        {
          p: "Where available, you may also contact Hub Plus customer support to request cancellation.",
        },
        {
          p: "Once your cancellation has been successfully submitted, we will provide confirmation of your cancellation and the date on which your Hub Plus access will end.",
        },
        { p: "You do not need to provide a reason for cancelling." },
      ],
    },
    {
      heading: "5. Refunds After the 14-Day Period",
      blocks: [
        {
          p: "Except where required by applicable law, subscription fees already paid are generally non-refundable after the statutory 14-day withdrawal period.",
        },
        {
          p: "Where you cancel your monthly membership after the 14-day period, you will retain access to Hub Plus until the end of your current paid billing period.",
        },
        {
          p: "This does not affect your statutory rights where Hub Plus has not been provided as described, where there has been a failure to provide the service, or where you otherwise have a legal right to a refund or other remedy.",
        },
      ],
    },
    {
      heading: "6. Changes to Subscription Prices",
      blocks: [
        {
          p: "If we change the price of Hub Plus, we will provide reasonable advance notice before the new price applies to your subscription.",
        },
        {
          p: "Where required by applicable law, we will obtain your consent before implementing a change.",
        },
        {
          p: "If you do not wish to continue at the new price, you may cancel your subscription before the change takes effect.",
        },
      ],
    },
    {
      heading: "7. Our Commitment",
      blocks: [
        {
          p: "Hub Plus is designed to provide students with useful ongoing benefits without unnecessarily restrictive membership terms.",
        },
        { p: "You can:" },
        {
          ul: [
            "exercise your statutory 14-day right of withdrawal where applicable;",
            "cancel your monthly membership at any time;",
            "continue using Hub Plus until the end of your current paid billing period when cancelling outside the withdrawal period; and",
            "avoid any further monthly charges once your cancellation becomes effective.",
          ],
        },
        {
          p: "Nothing in this Cancellation & Refund Policy is intended to exclude, restrict or otherwise affect any mandatory consumer rights available to you under applicable European or national consumer protection law.",
        },
        {
          p: "This policy should be read together with the Hub Plus Terms & Conditions and Privacy Policy.",
        },
      ],
    },
  ],
};
