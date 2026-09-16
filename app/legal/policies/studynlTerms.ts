import { COMPANY, DETAIL_PENDING } from "@/lib/legal";
import type { Policy } from "./types";

// Supplied by StudyNL, September 2026. Reproduced verbatim — do not reword.
//
// BLOCKER BEFORE LAUNCH: section 31 identifies the trading company, and those
// details are not known yet. They are read from COMPANY in lib/legal.ts — fill
// them in there, once, and this section completes itself. Until then the page
// renders "[to be confirmed]" in their place rather than anything invented.
// EU e-commerce rules require a trader to identify itself before selling to
// consumers, so this must be closed before the checkout takes real money.

/** One labelled line of section 31; unknown details stay visibly unknown. */
function companyLine(label: string, value: string | null): string {
  return `${label}: ${value ?? DETAIL_PENDING}`;
}

export const studynlTerms: Policy = {
  slug: "terms",
  title: "StudyNL Terms & Conditions",
  summary:
    "The general terms covering use of the StudyNL website, content, tools and partner referrals.",
  lastUpdated: "September 2026",
  intro: [
    { p: "Welcome to StudyNL." },
    {
      p: "These Terms & Conditions (“Terms”) govern your access to and use of the StudyNL website, platform, services, content, tools and resources (“StudyNL”, “we”, “us” or “our”).",
    },
    {
      p: "By accessing or using StudyNL, creating an account, submitting an enquiry or purchasing or using one of our services, you agree to these Terms.",
    },
    {
      p: "Where you purchase a specific product or service, including a Hub Plus membership, additional terms may apply. If there is a conflict between these general Terms and specific terms applying to a particular paid service, the specific terms will apply to that service.",
    },
    {
      p: "These Terms should be read together with our Privacy Policy, Cookie Policy, and, where applicable, our Hub Plus Membership Terms & Conditions and Cancellation & Refund Policy.",
    },
  ],
  sections: [
    {
      heading: "1. About StudyNL",
      blocks: [
        {
          p: "StudyNL is a student information, guidance and support platform designed to help students and prospective students understand, prepare for and navigate studying and living in the Netherlands.",
        },
        { p: "StudyNL may provide information, resources and services relating to matters including:" },
        {
          ul: [
            "Dutch universities and educational institutions;",
            "university and course information;",
            "applications and admissions;",
            "scholarships and student finance;",
            "DUO and student funding information;",
            "visas, immigration and residency;",
            "accommodation and housing;",
            "cost of living;",
            "employment and working while studying;",
            "banking and financial services;",
            "insurance;",
            "mobile phone and internet services;",
            "transport;",
            "student discounts;",
            "student associations and communities;",
            "relocation and arrival guidance;",
            "downloadable guides, templates and planning tools;",
            "third-party products and services;",
            "Hub Plus membership; and",
            "other services relevant to students living or studying in the Netherlands.",
          ],
        },
        {
          p: "StudyNL may develop, expand, modify or introduce additional services and features from time to time.",
        },
      ],
    },
    {
      heading: "2. Information Provided by StudyNL",
      blocks: [
        { p: "We aim to provide useful, accurate and up-to-date information." },
        {
          p: "However, universities, government bodies, municipalities, immigration authorities, accommodation providers and other organisations may change their requirements, prices, policies, deadlines and procedures without notice.",
        },
        {
          p: "StudyNL therefore does not guarantee that every piece of information on the platform will remain accurate, complete or current at all times.",
        },
        {
          p: "Where a decision is important, you should verify the relevant information directly with the university, government authority, service provider or other organisation responsible for it.",
        },
      ],
    },
    {
      heading: "3. No Professional Advice",
      blocks: [
        {
          p: "Unless expressly stated otherwise, information provided through StudyNL is for general informational and educational purposes.",
        },
        {
          p: "It does not constitute legal, immigration, financial, tax, investment, medical or other regulated professional advice.",
        },
        {
          p: "You remain responsible for your own decisions and should obtain appropriate professional advice where necessary.",
        },
        {
          p: "StudyNL does not guarantee university admission, visa or residence permit approval, student finance, employment, accommodation or any other particular outcome.",
        },
      ],
    },
    {
      heading: "4. Third-Party Partners and Referral Services",
      blocks: [
        {
          p: "StudyNL works with third-party businesses and organisations that may provide products or services relevant to students.",
        },
        { p: "These may include, for example:" },
        {
          ul: [
            "accommodation and housing providers;",
            "insurance providers;",
            "banks and financial service providers;",
            "telecommunications providers;",
            "relocation services;",
            "employment and recruitment services;",
            "student organisations;",
            "educational service providers;",
            "travel and transport providers;",
            "discount providers;",
            "professional advisers; and",
            "other student-focused businesses and services.",
          ],
        },
        {
          p: "StudyNL may introduce you to these providers, display their products or services, provide links to their websites or applications, allow you to submit an enquiry or provide information that enables you to contact or use their services.",
        },
        {
          p: "Unless expressly stated otherwise, these third-party businesses are legally separate and independent from StudyNL.",
        },
      ],
    },
    {
      heading: "5. Commission and Referral Disclosure",
      blocks: [
        {
          p: "StudyNL is a commercial platform and may receive a commission, referral fee, introduction fee, advertising fee or other financial or non-financial benefit from third-party partners.",
        },
        { p: "This means that if you:" },
        {
          ul: [
            "click a partner link;",
            "request further information;",
            "submit an enquiry;",
            "register with a partner;",
            "purchase a product or service;",
            "enter into a tenancy or accommodation arrangement;",
            "take out an insurance, telecommunications or other service;",
            "use a promotional code or referral link; or",
            "otherwise become a customer of a business introduced through StudyNL,",
          ],
        },
        { p: "StudyNL may receive payment or another benefit from that third party." },
        {
          p: "Unless we expressly tell you otherwise, any such commission is paid to StudyNL by the third-party provider and is not an additional fee charged directly to you by StudyNL.",
        },
        {
          p: "The existence of a commercial relationship does not change your responsibility to decide whether a third-party product or service is suitable for you.",
        },
        {
          p: "Where reasonably appropriate, StudyNL may identify sponsored, promoted or commercially partnered content.",
        },
      ],
    },
    {
      heading: "6. How Commercial Relationships May Affect Recommendations",
      blocks: [
        {
          p: "Some products, services, listings, offers or providers displayed on StudyNL may be commercial partners of StudyNL.",
        },
        {
          p: "The fact that StudyNL receives or may receive commission from a provider may therefore be a factor in why that provider appears on the platform or is introduced to users.",
        },
        {
          p: "StudyNL does not claim that every partner displayed on the platform is necessarily the cheapest, best or most suitable provider available in the wider market.",
        },
        {
          p: "Unless expressly stated otherwise, StudyNL does not conduct a comprehensive comparison of every provider or product available in the Netherlands or European market.",
        },
        {
          p: "Users should consider their individual circumstances and, where appropriate, compare alternative providers before making a decision.",
        },
        {
          p: "Where content or placement constitutes paid advertising or sponsorship and applicable law requires this to be identified, we will take reasonable steps to identify the commercial nature of that content.",
        },
      ],
    },
    {
      heading: "7. Third-Party Services",
      blocks: [
        {
          p: "Where you choose to use a third-party product or service introduced or linked through StudyNL, the contract for that product or service will generally be between you and the third-party provider, unless we expressly state otherwise.",
        },
        { p: "The third party’s own:" },
        {
          ul: [
            "terms and conditions;",
            "privacy policy;",
            "cancellation terms;",
            "eligibility criteria;",
            "pricing;",
            "refund policy; and",
            "other contractual conditions",
          ],
        },
        { p: "may apply." },
        { p: "You should review those terms before entering into an agreement." },
        {
          p: "StudyNL is not responsible for the independent acts, omissions, products or services of a third-party provider except where StudyNL is legally responsible under applicable law.",
        },
      ],
    },
    {
      heading: "8. Accommodation and Housing",
      blocks: [
        {
          p: "StudyNL may provide housing guides, property listings, housing search tools, accommodation opportunities, introductions or referrals to accommodation providers.",
        },
        {
          p: "Unless expressly stated otherwise, StudyNL is not the landlord, property owner, letting agent, property manager or guarantor for independently provided accommodation.",
        },
        {
          p: "The availability of accommodation can change rapidly, and a property displayed on StudyNL may no longer be available by the time you make an enquiry.",
        },
        {
          p: "Where StudyNL describes accommodation or a provider as “verified”, this means that StudyNL has carried out the verification process applicable to that service at the relevant time. It does not constitute a guarantee against every possible issue or risk.",
        },
        {
          p: "Students remain responsible for reviewing accommodation information, contractual documentation and payment requirements before entering into an agreement.",
        },
        {
          p: "StudyNL may receive commission or referral remuneration from accommodation providers where a student is successfully introduced or enters into an accommodation arrangement.",
        },
      ],
    },
    {
      heading: "9. Universities and Educational Institutions",
      blocks: [
        { p: "StudyNL may provide information about universities, courses and educational institutions." },
        {
          p: "Unless expressly stated otherwise, StudyNL is independent from those universities and institutions and does not have authority to make admissions decisions on their behalf.",
        },
        {
          p: "References to a university or educational institution do not necessarily mean that StudyNL is formally affiliated with or endorsed by that institution.",
        },
        { p: "Admission decisions remain entirely with the relevant institution." },
      ],
    },
    {
      heading: "10. Visa, Immigration and Residency Information",
      blocks: [
        {
          p: "StudyNL may provide general information about visas, residence permits, registration and immigration procedures.",
        },
        {
          p: "Immigration rules vary according to nationality and individual circumstances and may change.",
        },
        {
          p: "StudyNL does not guarantee that a visa, residence permit or other immigration application will be successful.",
        },
        {
          p: "Users should verify applicable requirements with the relevant Dutch authorities or appropriately qualified immigration professionals before relying on information for an important immigration decision.",
        },
      ],
    },
    {
      heading: "11. Scholarships, DUO and Student Finance",
      blocks: [
        {
          p: "StudyNL may provide general information concerning scholarships, grants, DUO, student finance and other funding opportunities.",
        },
        {
          p: "Eligibility depends on the requirements imposed by the relevant authority, university or funding organisation.",
        },
        {
          p: "StudyNL cannot guarantee eligibility, approval, payment or continued availability of any particular funding arrangement.",
        },
      ],
    },
    {
      heading: "12. Employment Information",
      blocks: [
        {
          p: "StudyNL may provide information relating to working in the Netherlands, employment opportunities, CV preparation, recruitment or third-party employment platforms.",
        },
        {
          p: "StudyNL does not guarantee employment, interviews, salary levels or acceptance by an employer.",
        },
        {
          p: "Unless expressly stated otherwise, StudyNL is not the employer in relation to third-party vacancies displayed or referenced through the platform.",
        },
      ],
    },
    {
      heading: "13. Hub Plus",
      blocks: [
        { p: "StudyNL operates Hub Plus, its premium student membership service." },
        {
          p: "Hub Plus may provide members with additional benefits, including student discounts, planning tools, downloadable resources, CV and application templates, priority support, housing resources, partner guidance, student-association opportunities, ISIC-related benefits and other premium services.",
        },
        {
          p: "Hub Plus is subject to separate Hub Plus Membership Terms & Conditions and the applicable Cancellation & Refund Policy.",
        },
        {
          p: "Where Hub Plus is offered as a recurring subscription, the applicable price and renewal arrangements will be clearly presented before purchase.",
        },
      ],
    },
    {
      heading: "14. User Accounts",
      blocks: [
        { p: "Certain StudyNL services may require you to create an account." },
        {
          p: "You agree to provide accurate information and keep your account information reasonably current.",
        },
        { p: "You are responsible for maintaining the confidentiality of your login details." },
        {
          p: "You must not allow another person to impersonate you or use your account in a way that breaches these Terms.",
        },
        { p: "Please notify us promptly if you believe your account has been compromised." },
      ],
    },
    {
      heading: "15. User-Generated Content and Community Features",
      blocks: [
        {
          p: "StudyNL may provide forums, roommate-finding facilities, messaging, reviews, comments, community discussions or other interactive features.",
        },
        { p: "Users remain responsible for content they submit." },
        {
          p: "You must not submit content that is unlawful, fraudulent, threatening, abusive, discriminatory, defamatory, deliberately misleading, infringing, sexually exploitative, or otherwise contrary to applicable law.",
        },
        { p: "You must not use StudyNL community services to scam, harass or impersonate another person." },
        {
          p: "We may moderate, restrict or remove content where reasonably necessary to enforce these Terms, protect users, comply with legal obligations or maintain the safety and integrity of the platform.",
        },
      ],
    },
    {
      heading: "16. Roommate Finder",
      blocks: [
        {
          p: "Where StudyNL provides a roommate or housemate-finding service, StudyNL provides a platform to help users discover or communicate with potential roommates.",
        },
        {
          p: "StudyNL does not guarantee the identity, conduct, suitability or compatibility of another user unless expressly stated otherwise.",
        },
        {
          p: "Users should exercise appropriate care before sharing personal information, transferring money, meeting another user or agreeing to live with someone.",
        },
      ],
    },
    {
      heading: "17. Reviews and Recommendations",
      blocks: [
        {
          p: "StudyNL may publish reviews, ratings, recommendations or other information concerning third-party services.",
        },
        {
          p: "Where reviews are submitted by users, they represent the views of those users and not necessarily StudyNL.",
        },
        {
          p: "Where StudyNL publishes editorial recommendations, those recommendations represent our assessment at the relevant time but do not guarantee that the service will be suitable for every user.",
        },
        {
          p: "Commercial relationships or commissions may exist with businesses featured or recommended on StudyNL. Where required, we will disclose relevant commercial relationships appropriately.",
        },
      ],
    },
    {
      heading: "18. Links to External Websites",
      blocks: [
        { p: "StudyNL may contain links to third-party websites, applications or services." },
        { p: "A link does not automatically constitute an endorsement or guarantee by StudyNL." },
        {
          p: "Third-party websites operate independently and may have their own terms, privacy practices and security arrangements.",
        },
        {
          p: "StudyNL is not responsible for external website content or availability except where responsibility arises under applicable law.",
        },
      ],
    },
    {
      heading: "19. Acceptable Use",
      blocks: [
        { p: "You must not use StudyNL:" },
        {
          ul: [
            "for unlawful or fraudulent purposes;",
            "to mislead or impersonate another person;",
            "to distribute malware or harmful technology;",
            "to interfere with the security or operation of the platform;",
            "to attempt unauthorised access to StudyNL systems or another user’s account;",
            "to scrape, harvest or systematically extract data without permission;",
            "to send spam or unsolicited commercial communications;",
            "to infringe intellectual property rights;",
            "to commercially reproduce StudyNL content without permission; or",
            "in any manner that materially interferes with another person’s use of StudyNL.",
          ],
        },
      ],
    },
    {
      heading: "20. Intellectual Property",
      blocks: [
        {
          p: "Unless otherwise stated, StudyNL owns or licenses the intellectual property rights in its original website content, branding, graphics, guides, templates, databases, software and other proprietary materials.",
        },
        { p: "You may use StudyNL content for your personal, non-commercial purposes." },
        {
          p: "You must not reproduce, sell, commercially distribute, republish or exploit protected StudyNL material without our permission, except where permitted by law.",
        },
        {
          p: "Third-party trademarks, logos and intellectual property remain the property of their respective owners.",
        },
      ],
    },
    {
      heading: "21. Prices and Payments",
      blocks: [
        {
          p: "Where StudyNL charges directly for a product or service, the applicable price will be displayed before you complete the transaction.",
        },
        { p: "Where required, prices will identify or include applicable taxes such as VAT." },
        { p: "Recurring subscriptions will be clearly identified as recurring before purchase." },
        {
          p: "Where you purchase directly from a third party, that third party is responsible for its own pricing and payment terms unless expressly stated otherwise.",
        },
      ],
    },
    {
      heading: "22. Consumer Rights",
      blocks: [
        {
          p: "Nothing in these Terms is intended to exclude, restrict or override any mandatory consumer rights available to you.",
        },
        {
          p: "Where StudyNL enters directly into a consumer contract with you online, applicable European and national consumer protection laws may provide rights concerning pre-contract information, digital services, cancellation, withdrawal, refunds and remedies.",
        },
        {
          p: "Where applicable, specific cancellation and withdrawal rights will be provided in connection with the relevant paid StudyNL service.",
        },
      ],
    },
    {
      heading: "23. Privacy and Data Protection",
      blocks: [
        {
          p: "StudyNL processes personal information in accordance with its Privacy Policy and applicable data protection legislation, including the GDPR where applicable.",
        },
        {
          p: "Our Privacy Policy explains what information we collect, why and how it is processed, the applicable legal bases, how information may be shared, retention practices and your data protection rights.",
        },
        {
          p: "Where you request an introduction to a third-party provider, information may be shared with that provider where there is an appropriate legal basis for doing so.",
        },
        { p: "Where consent is required, we will seek that consent in accordance with applicable law." },
      ],
    },
    {
      heading: "24. Cookies, Analytics and Affiliate Tracking",
      blocks: [
        {
          p: "StudyNL may use cookies and similar technologies for essential website functionality, analytics, preferences and, where permitted, marketing and referral attribution.",
        },
        {
          p: "Where we use affiliate or referral links, tracking technology may allow StudyNL or a third-party partner to determine that you reached their service through StudyNL so that a commission or referral payment can be attributed.",
        },
        {
          p: "Where consent is legally required for non-essential cookies or similar technologies, those technologies will be used in accordance with your consent choices.",
        },
        { p: "Further information is provided in our Cookie Policy and Privacy Policy." },
      ],
    },
    {
      heading: "25. Availability of StudyNL",
      blocks: [
        {
          p: "We aim to keep StudyNL accessible and reliable but cannot guarantee that the platform will always operate without interruption or error.",
        },
        {
          p: "We may temporarily restrict access for maintenance, updates, security or circumstances outside our reasonable control.",
        },
        { p: "We may modify or discontinue individual free features where reasonably necessary." },
        {
          p: "Where a change affects a paid consumer service, any applicable statutory rights will remain unaffected.",
        },
      ],
    },
    {
      heading: "26. Liability",
      blocks: [
        { p: "Nothing in these Terms excludes or limits liability where doing so would be unlawful." },
        {
          p: "StudyNL does not exclude liability for matters that cannot legally be excluded under applicable consumer law.",
        },
        {
          p: "To the extent permitted by law, StudyNL is not responsible for losses caused solely by the independent acts or omissions of third-party businesses with whom a user separately contracts.",
        },
        {
          p: "StudyNL does not guarantee a particular academic, financial, immigration, housing, employment or commercial outcome from using the platform.",
        },
      ],
    },
    {
      heading: "27. Suspension or Termination",
      blocks: [
        {
          p: "We may restrict, suspend or terminate access to StudyNL where reasonably necessary because of serious or repeated breaches of these Terms, fraud, security risks, unlawful conduct, non-payment for a paid service or legal or regulatory requirements.",
        },
        {
          p: "Where appropriate and legally required, we will provide notice and information concerning the reason for the action.",
        },
      ],
    },
    {
      heading: "28. Changes to StudyNL",
      blocks: [
        { p: "StudyNL is continually developing." },
        { p: "We may introduce, modify, replace or discontinue features and services." },
        {
          p: "Where changes materially affect a paid service, we will provide any notice, cancellation rights or other remedies required by applicable consumer law.",
        },
      ],
    },
    {
      heading: "29. Changes to These Terms",
      blocks: [
        {
          p: "We may update these Terms from time to time to reflect changes to StudyNL, our commercial arrangements, applicable law, security requirements or our operations.",
        },
        {
          p: "The latest version will be published on StudyNL with the date of the most recent update.",
        },
        { p: "Where required by law, we will provide appropriate notice of material changes." },
      ],
    },
    {
      heading: "30. Governing Law",
      blocks: [
        {
          p: "These Terms are governed by the law applicable to the legal entity operating StudyNL, subject to mandatory consumer rights applicable in the country in which you are habitually resident.",
        },
        {
          p: "Nothing in these Terms deprives an EU consumer of mandatory protections available under applicable European Union or national consumer law.",
        },
      ],
    },
    {
      heading: "31. Contact and Legal Information",
      blocks: [
        { p: "StudyNL is operated by:" },
        {
          ul: [
            companyLine("Legal company name", COMPANY.legalName),
            companyLine("Registered company number", COMPANY.registrationNumber),
            companyLine("Registered address", COMPANY.registeredAddress),
            companyLine("Country of registration", COMPANY.countryOfRegistration),
            companyLine("Email", COMPANY.email),
          ],
        },
        {
          p: "Please contact us using the details above if you have questions about these Terms, StudyNL or your account.",
        },
      ],
    },
    {
      heading: "32. Entire Agreement",
      blocks: [
        {
          p: "These Terms, together with the Privacy Policy, Cookie Policy and any additional terms applying to a specific StudyNL product or service, constitute the applicable agreement between you and StudyNL concerning your use of the platform.",
        },
        {
          p: "If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue to apply to the fullest extent permitted by law.",
        },
        {
          p: "By continuing to use StudyNL, you acknowledge that you have read and understood these Terms & Conditions and agree to them where legally applicable.",
        },
      ],
    },
  ],
};
