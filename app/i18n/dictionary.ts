export type LangCode =
  | "en"
  | "de"
  | "fr"
  | "it"
  | "nl"
  | "ro"
  | "tr"
  | "zh"
  | "ar";

export type Language = { code: LangCode; label: string; short: string };

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "ro", label: "Română", short: "RO" },
  { code: "tr", label: "Türkçe", short: "TR" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "ar", label: "العربية", short: "AR" },
];

export const RTL_LANGS: LangCode[] = ["ar"];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.startHere": "Start Here",
  "nav.about": "About",
  "nav.guides": "Guides",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "Help Centre",
  "nav.forum": "Forum",
  "nav.startMove": "Start your move",
  "nav.changeLanguage": "Change language",
  "nav.menu": "Menu",
  "nav.close": "Close",

  "search.trigger": "Search",
  "search.placeholder": "Search guides, help topics and pages…",
  "search.hint": "Start typing to search StudyNL.",
  "search.empty": "No results found.",

  "notfound.badge": "404",
  "notfound.title": "We can't find that page.",
  "notfound.subtitle":
    "The page you're looking for may have moved, or doesn't exist yet.",
  "notfound.home": "Back to home",
  "notfound.guides": "Browse guides",

  "forum.badge": "Community",
  "forum.title": "Ask students who've already made the move.",
  "forum.subtitle":
    "Get answers on housing, enrolment, money and arrival from students who've been there.",
  "forum.note":
    "The forum is launching soon. In the meantime, our guides and help centre cover the most common questions.",
  "forum.cta": "Explore guides",

  "forum.tabs.discussion": "Discussion",
  "forum.tabs.members": "Members",
  "forum.tabs.about": "About",
  "forum.tabs.admin": "Admin",

  "forum.role.member": "Member",
  "forum.role.moderator": "Moderator",
  "forum.role.admin": "Admin",

  "forum.moderation.hide": "Hide",
  "forum.moderation.approve": "Approve",
  "forum.moderation.delete": "Delete",
  "forum.moderation.hiddenBadge": "Hidden",
  "forum.moderation.confirmDeletePost": "Delete this post permanently? This can't be undone.",
  "forum.moderation.confirmDeleteComment": "Delete this comment permanently? This can't be undone.",

  "forum.compose.placeholder": "Share something…",
  "forum.compose.button": "Create a Post",
  "forum.compose.loginPrompt": "Log in to share something with the community.",
  "forum.compose.addImage": "Photo",
  "forum.compose.removeImage": "Remove image",
  "forum.compose.uploading": "Uploading image…",
  "forum.compose.postError": "Couldn't post that — please try again.",
  "forum.compose.uploadError": "Couldn't upload that image — please try again.",

  "forum.post.like": "Like",
  "forum.post.liked": "Liked",
  "forum.post.comments": "Comments",
  "forum.post.views": "Views",
  "forum.post.commentPlaceholder": "Write a comment…",
  "forum.post.commentButton": "Post",
  "forum.post.noComments": "No comments yet — be the first to reply.",
  "forum.post.loginToComment": "Log in to leave a comment.",
  "forum.post.imageAlt": "Image attached to this post",

  "forum.empty.title": "No posts yet",
  "forum.empty.subtitle": "Be the first to start a conversation.",
  "forum.loadError": "Couldn't load the forum — please refresh the page.",

  "forum.members.title": "Members",
  "forum.members.since": "Member since",
  "forum.members.empty": "No members yet.",

  "forum.about.title": "About this forum",
  "forum.about.description":
    "A friendly spot for students to connect, ask questions and share what they've learned about moving to and studying in the Netherlands.",
  "forum.about.activity": "Activity — last 30 days",
  "forum.about.newPosts": "New posts",
  "forum.about.newMembers": "New members",
  "forum.about.totalMembers": "Members",

  "auth.login.title": "Log in",
  "auth.login.subtitle": "Welcome back to the StudyNL community.",
  "auth.login.submit": "Log in",
  "auth.login.submitting": "Logging in…",
  "auth.login.switchPrompt": "Don't have an account?",
  "auth.login.switchAction": "Sign up",
  "auth.signup.title": "Create your account",
  "auth.signup.subtitle": "Join the StudyNL community forum.",
  "auth.signup.submit": "Sign up",
  "auth.signup.submitting": "Creating account…",
  "auth.signup.switchPrompt": "Already have an account?",
  "auth.signup.switchAction": "Log in",
  "auth.field.name": "Name",
  "auth.field.email": "Email",
  "auth.field.password": "Password",
  "auth.logout": "Log out",
  "auth.loggedInAs": "Logged in as",

  "admin.users.role": "Role",
  "admin.users.status": "Status",
  "admin.users.joined": "Joined",
  "admin.users.you": "(you)",
  "admin.users.statusActive": "Active",
  "admin.users.statusSuspended": "Suspended",
  "admin.users.suspend": "Suspend",
  "admin.users.reactivate": "Reactivate",
  "admin.users.delete": "Delete",
  "admin.users.confirmDelete": "Delete this member and everything they've posted? This can't be undone.",
  "admin.users.loadError": "Couldn't load members.",

  "guide.back": "All guides",
  "guide.note":
    "We're expanding this guide with detailed steps, deadlines and checks. Explore related guides below or build your personalised move plan.",
  "guide.related": "Related guides",
  "guide.cta": "Build my move plan",
  "nav.tagline.prefix": "POWERED BY GRADUATES",
  "nav.tagline.suffix": "FOR STUDENTS",

  "footer.copyright": "© 2035 StudyNL. Static HTML redesign preview.",
  "footer.l.studyNL": "Study in the Netherlands",
  "footer.l.scholarships": "Scholarships & Funding",
  "footer.l.cost": "Cost of living",
  "footer.l.work": "Working while studying",
  "footer.l.arrival": "Arrival checklist",
  "footer.l.enrolment": "Enrolment",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "Forum",
  "footer.l.universities": "Universities",
  "footer.l.fraternities": "Student Associations",
  "footer.l.visa": "Visa & residency",
  "footer.l.scams": "Avoid scams",
  "footer.l.cities": "City guides",
  "footer.l.finance": "Finance & loans",
  "footer.l.accommodation": "Accommodation",
  "footer.l.partners": "Partner with us",
  "footer.l.about": "About",
  "footer.l.contact": "Contact",
  "footer.l.legal": "Legal",
  "footer.l.help": "Help centre",

  "hero.badge": "+ Your guide to studying in NL",
  "hero.title": "Your clear route to studying in the Netherlands.",
  "hero.subtitle":
    "Make the big decisions in the right order: study route, enrolment, housing, money, work rules and arrival tasks.",
  "hero.cta_primary": "Start your move",
  "hero.cta_secondary": "Browse guides",
  "hero.chip_enrolment": "Enrolment explained",
  "hero.chip_housing": "Housing safety",
  "hero.chip_arrival": "Arrival planning",
  "hero.card1_label": "Scholarship deadlines",
  "hero.card1_value": "12 open",
  "hero.card2_label": "Housing scam check",
  "hero.card2_value": "Safe first",
  "hero.card3_label": "Arrival checklist",
  "hero.card3_value": "30 days",
  "hero.tag_startready": "Start-ready",

  "popular.badge": "Most visited decisions",
  "popular.title_line1": "Our Most Popular",
  "popular.title_line2": "Topics",
  "popular.subtitle":
    "Explore the topics students need most before moving to the Netherlands. Each topic opens a direct guide with the steps, deadlines and checks students usually search for first.",
  "popular.t1.title": "Study in the Netherlands",
  "popular.t1.blurb":
    "Understand the Dutch university system, degrees, admissions and timelines.",
  "popular.t2.title": "Working While Studying",
  "popular.t2.blurb":
    "Work hours, BSN, taxes, contracts and what students should avoid.",
  "popular.t3.title": "Scholarships & Funding",
  "popular.t3.blurb":
    "Find grants, tuition support, budgeting routes and scholarship deadlines.",
  "popular.t4.title": "Arrival Checklist",
  "popular.t4.blurb":
    "Step-by-step tasks for your first 30 days after landing.",
  "popular.t5.title": "Accommodation",
  "popular.t5.blurb":
    "Housing platforms, red flags, contracts and verified partner options.",
  "popular.t6.title": "Open Days & Enrolling",
  "popular.t6.blurb":
    "Visit days, application documents, Studielink and enrolment milestones.",

  "moveplan.tag1": "Move plan",
  "moveplan.title": "5 steps to arrive ready",
  "moveplan.subtitle":
    "We organize every important student decision into one clear path, from choosing a study route to settling in safely.",
  "moveplan.cta": "Build my checklist",
  "moveplan.badge": "Guided path",
  "moveplan.heading": "A guided path, not a pile of links.",
  "moveplan.heading_blurb":
    "Students usually arrive with anxiety: which university, where to live, how much money, what documents and what to do first. This turns the website into a sequence.",
  "moveplan.s1.title": "Study route",
  "moveplan.s1.blurb":
    "Choose the right degree type, university path and application window before comparing cities.",
  "moveplan.s2.title": "Money & deadlines",
  "moveplan.s2.blurb":
    "Plan tuition, scholarships, monthly costs and the dates that can block your move.",
  "moveplan.s3.title": "Housing safety",
  "moveplan.s3.blurb":
    "Check rental red flags, deposits, contracts and safe next steps before you pay.",
  "moveplan.s4.title": "Documents",
  "moveplan.s4.blurb":
    "Prepare enrolment, visa, BSN, insurance and arrival documents in the right order.",

  "partners.badge": "Approved partners",
  "partners.title": "We're Approved Partners",
  "partners.subtitle":
    "Trusted partners that support different parts of the student journey.",

  "help.badge": "Find answers faster",
  "help.title": "Search by topic, city or question",
  "help.subtitle":
    "Students do not only browse categories. They search things like BSN, rent deposit, DUO, visa, September intake and city names.",
  "help.placeholder": "Try: housing contract before arrival",
  "help.tag1": "Visa deadline",
  "help.tag2": "Cheap housing",
  "help.tag3": "Can I work?",
  "help.tag4": "Monthly budget",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "Rent deposit",

  "about.badge": "About StudyNL",
  "about.title": "A trusted student support network, not just a blog.",
  "about.subtitle":
    "StudyNL helps international students prepare for studying in the Netherlands with practical guidance around housing, money, documents, arrival and safety.",
  "about.v1.cat": "Promise",
  "about.v1.title": "Advice written for international students",
  "about.v1.blurb": "Plain language, real decisions and clear next steps.",
  "about.v2.cat": "Safety",
  "about.v2.title": "Clear warnings around housing and payments",
  "about.v2.blurb":
    "Students see risks before they send money or documents.",
  "about.v3.cat": "Trust",
  "about.v3.title": "Partner offers labelled clearly",
  "about.v3.blurb": "Support options are presented with transparency.",

  "guides.badge1": "Guides Page",
  "guides.badge2": "Guides",
  "guides.title": "Everything students look for before moving.",
  "guides.subtitle":
    "Searchable guide library for applications, money, housing, legal tasks, arrival and student life.",
  "guides.tab1": "Before applying",
  "guides.tab2": "Money",
  "guides.tab3": "Housing",
  "guides.tab4": "Legal",
  "guides.tab5": "Arrival",
  "guides.tab6": "Student life",
  "guides.g1.cat": "Start",
  "guides.g1.title": "Study in the Netherlands",
  "guides.g1.blurb":
    "Dutch university system, degrees, admissions and timelines.",
  "guides.g2.cat": "Money",
  "guides.g2.title": "Scholarships & Funding",
  "guides.g2.blurb": "Funding routes, tuition support and deadlines.",
  "guides.g3.cat": "Budget",
  "guides.g3.title": "Cost of living",
  "guides.g3.blurb": "Monthly costs by city, tuition and transport planning.",
  "guides.g4.cat": "Work",
  "guides.g4.title": "Working while studying",
  "guides.g4.blurb": "Contracts, taxes, BSN and permitted student work.",
  "guides.g5.cat": "Arrival",
  "guides.g5.title": "Arrival checklist",
  "guides.g5.blurb": "Tasks for your first month in the Netherlands.",
  "guides.g6.cat": "Admissions",
  "guides.g6.title": "Enrolment",
  "guides.g6.blurb": "Documents, Studielink and enrolment milestones.",
  "guides.g7.cat": "Housing",
  "guides.g7.title": "Accommodation",
  "guides.g7.blurb": "Find housing and avoid unsafe rental situations.",
  "guides.g8.cat": "Legal",
  "guides.g8.title": "Visa & residency",
  "guides.g8.blurb": "Residence permits, MVV basics and document order.",
  "guides.g9.cat": "Safety",
  "guides.g9.title": "Avoid scams",
  "guides.g9.blurb": "Spot rental scams and unsafe payment requests.",
  "guides.g10.cat": "Student Life",
  "guides.g10.title": "Student Associations",
  "guides.g10.blurb": "Join a Dutch studentenvereniging for sports, socials or your study field.",
  "guides.g11.cat": "Money",
  "guides.g11.title": "Student Finance & Loans (DUO)",
  "guides.g11.blurb": "Who can apply for DUO student finance, and what to do if you can't.",
  "guides.g12.cat": "Admissions",
  "guides.g12.title": "Open Days & Institution Visits",
  "guides.g12.blurb": "Make the most of a campus visit or virtual open day before you apply.",

  "guide.answer.label": "In short",
  "guide.sources.label": "Official sources",

  "guide.study-route.answer":
    "Choosing how to study in the Netherlands starts with picking between a research university (WO) or a university of applied sciences (HBO), then matching a specific programme to your goals.",
  "guide.study-route.s1.heading": "WO or HBO?",
  "guide.study-route.s1.body":
    "Research universities (WO) focus on academic, theory-led education and are the usual route into research or further academic study. Universities of applied sciences (HBO) focus on practical, professionally oriented training with more work placements. Neither is objectively \"better\" — the right choice depends on whether you prefer theory-first or practice-first learning.",
  "guide.study-route.s2.heading": "How to shortlist a programme",
  "guide.study-route.s2.b1": "Check the programme is accredited in the Dutch CROHO register before applying.",
  "guide.study-route.s2.b2": "Compare the language of instruction — many programmes are fully in English, but not all.",
  "guide.study-route.s2.b3": "Look at graduate outcomes and whether the programme leads where you want to go next.",
  "guide.study-route.s3.heading": "Before you apply",
  "guide.study-route.s3.b1": "Confirm the English (or Dutch) proficiency test your programme requires, such as IELTS or TOEFL.",
  "guide.study-route.s3.b2": "Check whether the programme uses numerus fixus (capped, selective admission) — these often close earlier.",
  "guide.study-route.s3.b3": "Application deadlines are set by each institution individually, not nationally, so check the specific programme page.",

  "guide.scholarships.answer":
    "Most funding for international students comes through the NL Scholarship, institution-specific awards, or support from your home country — Dutch government student finance (DUO) is generally only available to eligible EU/EEA students, not international students broadly.",
  "guide.scholarships.s1.heading": "Where to look first",
  "guide.scholarships.s1.b1": "The NL Scholarship (formerly known as the Holland Scholarship) — for non-EEA students at participating institutions.",
  "guide.scholarships.s1.b2": "Institution and faculty-specific scholarships — check your target university's own funding page.",
  "guide.scholarships.s1.b3": "The Orange Tulip Scholarship, available in a number of home countries.",
  "guide.scholarships.s1.b4": "Your home country's government or study-abroad grant schemes — often overlooked, sometimes more generous than Dutch options.",
  "guide.scholarships.s2.heading": "What EU/EEA students can access",
  "guide.scholarships.s2.body":
    "Dutch student finance from DUO is possible for eligible EU/EEA/Swiss students, but it isn't automatic — it typically depends on factors like working a minimum number of hours and holding a BSN. Check your own eligibility directly with DUO rather than assuming it applies.",
  "guide.scholarships.s3.heading": "Good to know",
  "guide.scholarships.s3.b1": "Apply early — many scholarships close six months or more before the academic year starts.",
  "guide.scholarships.s3.b2": "Funding rarely covers your full living costs, so budget for a gap even if you're awarded something.",
  "guide.scholarships.s3.b3": "Scholarship names, amounts and eligibility change yearly — always check the current official page before relying on a figure.",

  "guide.cost-of-living.answer":
    "Monthly costs for international students vary hugely by city — rent is usually the biggest line item, followed by health insurance, groceries and transport, so budget by city rather than a single national number.",
  "guide.cost-of-living.s1.heading": "What to budget for",
  "guide.cost-of-living.s1.b1": "Rent — by far the biggest cost, and the one that varies most between cities.",
  "guide.cost-of-living.s1.b2": "Health insurance — mandatory in some circumstances, optional in others (see below).",
  "guide.cost-of-living.s1.b3": "Groceries and daily living costs.",
  "guide.cost-of-living.s1.b4": "Public transport, phone and internet.",
  "guide.cost-of-living.s1.b5": "One-off setup costs: deposit, furniture, registration and agency fees.",
  "guide.cost-of-living.s2.heading": "Why health insurance isn't one-size-fits-all",
  "guide.cost-of-living.s2.body":
    "Whether you need Dutch basic health insurance depends mainly on whether — and how much — you work, not simply on being a student. Don't assume either way: check your specific situation against the current rules before you arrive.",
  "guide.cost-of-living.s3.heading": "City makes a big difference",
  "guide.cost-of-living.s3.body":
    "The same budget stretches very differently in Amsterdam versus Groningen or Eindhoven. See our city guides for a side-by-side comparison of rent pressure and scale before you commit to a location.",

  "guide.working-while-studying.answer":
    "Whether — and how much — you can work alongside your studies depends mainly on your nationality: EU/EEA/Swiss students can generally work freely, while most non-EU students need a work permit and are capped on hours.",
  "guide.working-while-studying.s1.heading": "EU/EEA/Swiss students",
  "guide.working-while-studying.s1.body":
    "You can generally work under the same conditions as Dutch nationals, with no separate work permit required.",
  "guide.working-while-studying.s2.heading": "Non-EU/EEA students",
  "guide.working-while-studying.s2.b1": "Your employer usually needs a work permit (TWV) to hire you during term-time.",
  "guide.working-while-studying.s2.b2": "Hour limits typically apply during term-time, with more flexibility in the summer months — check the current limits.",
  "guide.working-while-studying.s2.b3": "Your residence permit conditions govern what's allowed, so check them before accepting a job.",
  "guide.working-while-studying.s3.heading": "Practical steps",
  "guide.working-while-studying.s3.b1": "Get your BSN before you start paid work — most employers will ask for it immediately.",
  "guide.working-while-studying.s3.b2": "Make sure payroll tax is registered correctly from your first payslip.",
  "guide.working-while-studying.s3.b3": "Confirm your specific hour limits with your institution or the IND before you accept an offer.",

  "guide.arrival-checklist.answer":
    "Your first month centres on a handful of official steps — municipal registration, your BSN, a bank account and your residence permit card if you have one — plus everyday basics like a SIM card and transport pass.",
  "guide.arrival-checklist.s1.heading": "Official steps",
  "guide.arrival-checklist.s1.b1": "Register with your municipality (gemeente) within the required timeframe after arrival.",
  "guide.arrival-checklist.s1.b2": "Receive your BSN (citizen service number) — you'll need it for almost everything else.",
  "guide.arrival-checklist.s1.b3": "Collect your residence permit card from the IND if you arrived on an MVV or already-approved permit.",
  "guide.arrival-checklist.s1.b4": "Register for Dutch health insurance if your situation requires it.",
  "guide.arrival-checklist.s2.heading": "Everyday setup",
  "guide.arrival-checklist.s2.b1": "Open a Dutch bank account — most banks will ask for your BSN first.",
  "guide.arrival-checklist.s2.b2": "Get an OV-chipkaart for public transport.",
  "guide.arrival-checklist.s2.b3": "Get a local SIM card or mobile plan.",
  "guide.arrival-checklist.s2.b4": "Register your new address with your institution and insurer.",
  "guide.arrival-checklist.s3.heading": "Timing tips",
  "guide.arrival-checklist.s3.body":
    "Some steps depend on each other — you often need an address to register, and a BSN to open a bank account — so book your municipal appointment as early as your institution allows.",

  "guide.enrolment.answer":
    "Enrolment in a Dutch programme almost always runs through Studielink, alongside institution-specific document uploads and any language or selection requirements your programme sets.",
  "guide.enrolment.s1.heading": "The Studielink route",
  "guide.enrolment.s1.body":
    "Studielink is the national portal that most Bachelor's and Master's applications go through. Your institution will also ask you to upload its own supporting documents directly through its own portal — the two processes run in parallel, not instead of each other.",
  "guide.enrolment.s2.heading": "What to prepare",
  "guide.enrolment.s2.b1": "Certified transcripts and diploma.",
  "guide.enrolment.s2.b2": "Language test results (IELTS/TOEFL or equivalent), if your programme requires them.",
  "guide.enrolment.s2.b3": "A copy of your passport or national ID.",
  "guide.enrolment.s2.b4": "A motivation letter or CV, for programmes with selective admission.",
  "guide.enrolment.s2.b5": "Proof of prior education recognition, where your programme asks for it.",
  "guide.enrolment.s3.heading": "Deadlines vary",
  "guide.enrolment.s3.body":
    "Numerus fixus (capped) programmes usually close earlier than open-admission programmes. Always check your specific programme's page rather than a general deadline you've seen elsewhere.",

  "guide.accommodation.answer":
    "Start your housing search as early as you can — many Dutch student cities have far more students than available rooms, so a cautious, documented approach matters more than speed.",
  "guide.accommodation.s1.heading": "Where to look",
  "guide.accommodation.s1.b1": "Your institution's housing office — often the safest and most direct starting point.",
  "guide.accommodation.s1.b2": "Recognised student housing providers for your city (for example SSH, DUWO or Woonstad, depending on where you're studying).",
  "guide.accommodation.s1.b3": "Established listing platforms — be cautious of one-off offers on social media with no verifiable history.",
  "guide.accommodation.s2.heading": "Before you pay anything",
  "guide.accommodation.s2.b1": "Never transfer a deposit before viewing the room, in person or by a verified video call.",
  "guide.accommodation.s2.b2": "Always get a written contract before you pay anything.",
  "guide.accommodation.s2.b3": "Check whether the room is registered for municipal registration (inschrijving) — not all rooms are.",
  "guide.accommodation.s2.b4": "Confirm who the actual landlord is, and that they have the right to rent out the property.",
  "guide.accommodation.s3.heading": "Registration matters",
  "guide.accommodation.s3.body":
    "Without a valid, registrable rental address, you often can't complete municipal registration or get a BSN — so confirm registration is actually possible before you sign anything.",

  "guide.visa-residency.answer":
    "Whether you need a visa (MVV) and/or a residence permit depends on your nationality and how long you'll stay — EU/EEA/Swiss citizens need neither, most other nationalities need both, usually arranged through your institution.",
  "guide.visa-residency.s1.heading": "Who needs what",
  "guide.visa-residency.s1.b1": "EU/EEA/Swiss nationals — no visa or residence permit needed; just register locally after you arrive.",
  "guide.visa-residency.s1.b2": "Most non-EU/EEA nationals — need an MVV (entry visa) and a residence permit, usually applied for by your institution as a recognised sponsor.",
  "guide.visa-residency.s1.b3": "Some nationalities can enter visa-free but still need a residence permit for stays over 90 days — check your specific case.",
  "guide.visa-residency.s2.heading": "The institution-sponsored route",
  "guide.visa-residency.s2.body":
    "Most Dutch universities are recognised IND sponsors and will submit the residence permit application on your behalf once you've accepted your offer. Confirm this directly with your admissions office rather than assuming it's automatic.",
  "guide.visa-residency.s3.heading": "Before you travel",
  "guide.visa-residency.s3.b1": "Don't book irreversible travel until your MVV or permit is confirmed.",
  "guide.visa-residency.s3.b2": "Bring original documents, not just copies, to collect your residence permit card.",
  "guide.visa-residency.s3.b3": "Know your permit's validity period and renewal conditions before it becomes urgent.",

  "guide.avoid-scams.answer":
    "Most student scams in the Netherlands centre on housing — requests for a deposit before any viewing, landlords who won't meet in person, and listings that resurface across cities under different names.",
  "guide.avoid-scams.s1.heading": "Common warning signs",
  "guide.avoid-scams.s1.b1": "You're asked to pay before viewing the room, in person or by a verified video call.",
  "guide.avoid-scams.s1.b2": "The landlord claims to be \"abroad\" and will only communicate by chat or email.",
  "guide.avoid-scams.s1.b3": "The price is unusually low for the area and the room shown.",
  "guide.avoid-scams.s1.b4": "You're pressured to decide within hours.",
  "guide.avoid-scams.s1.b5": "No written contract is offered before payment.",
  "guide.avoid-scams.s2.heading": "How to protect yourself",
  "guide.avoid-scams.s2.b1": "Always view the room — in person or by live video, not just photos.",
  "guide.avoid-scams.s2.b2": "Pay only through traceable methods, and get a receipt.",
  "guide.avoid-scams.s2.b3": "Verify the landlord's identity and that they actually own or manage the property.",
  "guide.avoid-scams.s2.b4": "Ask your institution's housing office if a listing looks legitimate — they've often seen the same scam before.",
  "guide.avoid-scams.s3.heading": "If something feels wrong",
  "guide.avoid-scams.s3.body":
    "Report suspected rental scams to the platform it was posted on, and — if money was already sent — to your bank and local police. The earlier you act, the more likely a payment can still be reversed.",

  "guide.student-associations.answer":
    "Dutch student associations (studentenverenigingen) are social, sports or study-focused clubs — joining one is a common way to build a social circle, not a requirement of student life.",
  "guide.student-associations.s1.heading": "What they actually are",
  "guide.student-associations.s1.body":
    "Unlike US-style fraternities and sororities, Dutch student associations are typically open, non-residential social, sports or interest clubs. Many are tied to a specific city or institution, and membership fees usually fund shared activities and sometimes a clubhouse (sociëteit).",
  "guide.student-associations.s2.heading": "Types you'll encounter",
  "guide.student-associations.s2.b1": "General student associations — broad social membership, often the largest in a city.",
  "guide.student-associations.s2.b2": "Sports associations, built around a specific sport or activity.",
  "guide.student-associations.s2.b3": "Study or faculty associations tied to your own programme.",
  "guide.student-associations.s2.b4": "International student associations, often the easiest entry point if you're arriving from abroad.",
  "guide.student-associations.s3.heading": "Joining safely",
  "guide.student-associations.s3.b1": "Attend an introduction or open week (kennismakingsweek) before committing to anything.",
  "guide.student-associations.s3.b2": "Ask current members directly about initiation practices and your right to opt out.",
  "guide.student-associations.s3.b3": "Check membership fees and exactly what they cover before you pay.",
  "guide.student-associations.s3.b4": "Remember joining any association is entirely optional — plenty of students build a social life without one.",

  "guide.student-finance.answer":
    "DUO is the Dutch government body that administers student finance — most non-EU students aren't eligible for it, and even eligible EU/EEA students need to meet specific work and residency conditions, so check eligibility before assuming it applies to you.",
  "guide.student-finance.s1.heading": "Who can generally apply",
  "guide.student-finance.s1.b1": "Dutch nationals, in most cases.",
  "guide.student-finance.s1.b2":
    "EU/EEA/Swiss nationals who meet specific conditions — commonly a minimum number of working hours alongside study and holding a BSN — but exact thresholds are set by DUO and can change, so confirm directly rather than relying on a fixed number you've read elsewhere.",
  "guide.student-finance.s2.heading": "What it can include",
  "guide.student-finance.s2.b1": "A basic grant or loan toward tuition and living costs.",
  "guide.student-finance.s2.b2": "A public transport product for eligible students.",
  "guide.student-finance.s2.b3": "A supplementary grant for some eligible groups, depending on parental income.",
  "guide.student-finance.s3.heading": "If you're not DUO-eligible",
  "guide.student-finance.s3.body":
    "Most non-EU students fund their studies through personal savings, home-country loans or grants, scholarships (see our Scholarships & Funding guide) or part-time work where their permit allows it. DUO simply isn't designed as a funding route for most international students, so don't build a budget around it without confirming eligibility first.",

  "guide.open-days.answer":
    "Open days (open dagen) let you visit a Dutch institution, sit in on sample classes and talk to current students and staff before you apply — most institutions run at least one general open day a year, plus programme-specific info sessions.",
  "guide.open-days.s1.heading": "What to expect",
  "guide.open-days.s1.b1": "Campus tours and a look at teaching facilities.",
  "guide.open-days.s1.b2": "Sample lectures, workshops or taster classes.",
  "guide.open-days.s1.b3": "One-on-one conversations with admissions staff and current students.",
  "guide.open-days.s1.b4": "Increasingly, online or virtual formats aimed specifically at international visitors.",
  "guide.open-days.s2.heading": "Getting the most out of a visit",
  "guide.open-days.s2.b1": "Prepare specific questions about your target programme, not just general ones.",
  "guide.open-days.s2.b2": "Ask about class sizes and teaching style to get a feel for WO versus HBO.",
  "guide.open-days.s2.b3": "Ask current international students directly about housing and city life.",
  "guide.open-days.s2.b4": "Check whether attending affects application priority — usually it doesn't, but confirm with the institution.",
  "guide.open-days.s3.heading": "Can't travel?",
  "guide.open-days.s3.body":
    "Most institutions also run virtual open days, webinars and one-on-one video calls with admissions officers for applicants who can't visit in person — check your target institution's own admissions page for the current schedule.",

  "cities.badge": "Cities",
  "cities.title": "Find the city that fits how you want to study.",
  "cities.subtitle":
    "Compare Dutch student cities by scale, transport, institutions and housing pressure before you commit to one.",
  "cities.viewProfile": "View profile",
  "cities.back": "All cities",
  "cities.related": "Other cities",
  "cities.bestFor.heading": "Why it may fit",
  "cities.institutions.heading": "Institutions to check",
  "cities.institutions.note":
    "This isn't a complete directory. Confirm programme availability and official naming directly with each institution.",
  "cities.official.heading": "Official starting point",
  "cities.fact.scale": "Scale",
  "cities.fact.housing": "Housing pressure",
  "cities.fact.province": "Province",
  "cities.pressure.veryHigh": "Very high",
  "cities.pressure.high": "High",
  "cities.pressure.moderate": "Moderate",
  "cities.cta.title": "Let your plan factor in the city questions that matter.",
  "cities.cta.subtitle": "Build a personalised plan that adds city choice to your visa, housing and budget tasks.",
  "cities.cta.button": "Build my plan",
  "cities.detailCta.title": "Could this be your city?",
  "cities.detailCta.subtitle": "Add this city to your plan and see which practical questions come next.",
  "cities.detailCta.button": "Build my plan",

  "city.amsterdam.name": "Amsterdam",
  "city.amsterdam.positioning": "Big-city energy with an international academic network",
  "city.amsterdam.summary":
    "A dense, well-connected capital with major cultural access — and some of the most competitive student housing in the country.",
  "city.amsterdam.b1": "International networks",
  "city.amsterdam.b2": "Arts and culture",
  "city.amsterdam.b3": "Urban mobility",
  "city.amsterdam.scale": "Large, international city",

  "city.rotterdam.name": "Rotterdam",
  "city.rotterdam.positioning": "Architecture, enterprise and a globally connected port city",
  "city.rotterdam.summary":
    "A diverse, modern city with strong business, design and applied-learning programmes, and distinct neighbourhood identities.",
  "city.rotterdam.b1": "Business and trade",
  "city.rotterdam.b2": "Architecture and design",
  "city.rotterdam.b3": "Modern city life",
  "city.rotterdam.scale": "Large, metropolitan city",

  "city.groningen.name": "Groningen",
  "city.groningen.positioning": "A compact northern city shaped by student life",
  "city.groningen.summary":
    "A cycle-friendly university city where a large student population keeps the centre active and closely connected.",
  "city.groningen.b1": "Compact city life",
  "city.groningen.b2": "Strong student community",
  "city.groningen.b3": "Cycling",
  "city.groningen.scale": "Compact student city",

  "city.eindhoven.name": "Eindhoven",
  "city.eindhoven.positioning": "Technology, design and an inventive regional ecosystem",
  "city.eindhoven.summary":
    "A fast-changing city with strong links between education, engineering, design and the surrounding technology sector.",
  "city.eindhoven.b1": "Technology",
  "city.eindhoven.b2": "Engineering",
  "city.eindhoven.b3": "Design and innovation",
  "city.eindhoven.scale": "Mid-sized innovation city",

  "universities.badge": "Universities",
  "universities.title": "Dutch universities and institutions, at a glance.",
  "universities.subtitle":
    "The Netherlands has two parallel higher-education tracks. Compare them, then check each institution's official site for programmes, fees and deadlines.",
  "universities.explainer.title": "WO or HBO — what's the difference?",
  "universities.explainer.body":
    "Research universities (WO) focus on academic, theory-led education. Universities of applied sciences (HBO) focus on practical, professionally oriented training with more work placements. Both award recognised bachelor's and master's degrees.",
  "universities.explainer.link": "Read our full WO vs HBO guide",
  "universities.wo.heading": "Research universities (WO)",
  "universities.wo.note": "The main publicly funded research universities in the Netherlands.",
  "universities.hbo.heading": "Universities of applied sciences (HBO)",
  "universities.hbo.note": "A selection of the larger universities of applied sciences — not a complete list.",
  "universities.disclaimer":
    "This is a starting directory, not a complete list of every Dutch institution. Always confirm programme availability, accreditation and current admissions details directly with the institution.",
  "universities.cta.title": "Not sure which route fits you?",
  "universities.cta.subtitle": "Build a personalised plan and we'll help you work through programme, city and application questions in order.",
  "universities.cta.button": "Build my plan",

  "partnersPage.badge": "Partners",
  "partnersPage.title": "The services and tools we point students toward.",
  "partnersPage.subtitle":
    "We link to a small set of services that come up often in student planning. Here's what each one is, and how we currently relate to it.",
  "partnersPage.studielink.cat": "Official application portal",
  "partnersPage.studielink.desc":
    "The Dutch government's national portal that most Bachelor's and Master's applications go through. Not a commercial partner — listed here as an essential official resource.",
  "partnersPage.feather.cat": "Insurance",
  "partnersPage.feather.desc":
    "An insurance provider some international students and expats use for health and liability cover.",
  "partnersPage.hays.cat": "Recruitment",
  "partnersPage.hays.desc": "A recruitment agency some graduates use when looking for work in the Netherlands.",
  "partnersPage.babbel.cat": "Language learning",
  "partnersPage.babbel.desc": "A language-learning app some students use to pick up conversational Dutch.",
  "partnersPage.revolut.cat": "Banking",
  "partnersPage.revolut.desc":
    "A digital banking app some students use for everyday spending while they wait to open a Dutch account.",
  "partnersPage.utility.cat": "Utilities setup",
  "partnersPage.utility.desc": "A service some students use to set up household utilities when moving into a new address.",
  "partnersPage.disclosure.title": "What \"partner\" means on our site today",
  "partnersPage.disclosure.body":
    "None of the names above are formally audited, commissioned or verified by StudyNL yet. We link to them because students frequently ask about these categories of service, not because we've assessed or endorsed a specific provider. If we move to a formal partner programme with verification, commercial disclosure and a review date, we'll update this page and label it clearly.",
  "partnersPage.cta.title": "Want to become a partner?",
  "partnersPage.cta.subtitle": "Tell us about your service and how it could help students moving to the Netherlands.",
  "partnersPage.cta.button": "Get in touch",

  "contactPage.badge": "Contact",
  "contactPage.title": "Get in touch.",
  "contactPage.subtitle":
    "Questions about a guide, a partnership enquiry, or something we got wrong? Send us a message and we'll get back to you.",
  "contactPage.field.message": "Message",
  "contactPage.submit": "Send message",
  "contactPage.submitting": "Sending…",
  "contactPage.error": "Couldn't send that. Please try again.",
  "contactPage.success.title": "Message sent.",
  "contactPage.success.body": "Thanks for reaching out — we'll get back to you at the email address you provided.",
  "contactPage.success.again": "Send another message",
  "contactPage.privacyNote": "We only use the details you submit here to respond to your message. See our Privacy Policy for more.",

  "legalPage.badge": "Legal",
  "legalPage.title": "Privacy & Terms",
  "legalPage.subtitle": "How we handle your data, and the terms that apply when you use this site.",
  "legalPage.nav.privacy": "Privacy Policy",
  "legalPage.nav.terms": "Terms of Service",

  "startPlan.badge": "Start your move",
  "startPlan.title": "Build your Netherlands study plan.",
  "startPlan.subtitle": "Answer four short questions and we'll turn them into an ordered list of what to do next.",
  "startPlan.step1": "Step 1 of 4",
  "startPlan.step2": "Step 2 of 4",
  "startPlan.step3": "Step 3 of 4",
  "startPlan.step4": "Step 4 of 4",
  "startPlan.back": "Back",
  "startPlan.continue": "Continue",
  "startPlan.createPlan": "Create my plan",
  "startPlan.startAgain": "Start again",

  "startPlan.q1.heading": "Where are you right now?",
  "startPlan.q1.exploring.label": "I'm exploring my options",
  "startPlan.q1.exploring.desc": "Comparing routes, cities and likely costs.",
  "startPlan.q1.applying.label": "I'm preparing an application",
  "startPlan.q1.applying.desc": "Working through requirements and deadlines.",
  "startPlan.q1.accepted.label": "I've been accepted",
  "startPlan.q1.accepted.desc": "Getting housing, visa and documents in order.",
  "startPlan.q1.here.label": "I'm already in the Netherlands",
  "startPlan.q1.here.desc": "Settling in and catching up on anything unfinished.",

  "startPlan.q2.heading": "What's your status?",
  "startPlan.q2.eu.label": "EU / EEA / Swiss",
  "startPlan.q2.nonEu.label": "Outside the EU/EEA",
  "startPlan.q2.unsure.label": "Not sure yet",

  "startPlan.q3.heading": "What are you studying?",
  "startPlan.q3.bachelor.label": "Bachelor's",
  "startPlan.q3.master.label": "Master's",
  "startPlan.q3.exchange.label": "Exchange",
  "startPlan.q3.other.label": "Other / not decided",

  "startPlan.q4.heading": "How settled is your city choice?",
  "startPlan.q4.chosen.label": "I've chosen a city",
  "startPlan.q4.shortlist.label": "I have a shortlist",
  "startPlan.q4.open.label": "Still open",

  "startPlan.result.heading": "Your starting plan",
  "startPlan.result.subtitle": "This is a planning aid, not a decision — confirm final requirements with the official source linked on each guide.",
  "startPlan.result.taskDone": "Done",
  "startPlan.result.taskUndo": "Mark not done",
  "startPlan.result.privacyNote": "Your answers are saved only in this browser, not on our servers.",

  "startPlan.task.study-route.title": "Verify your programme route",
  "startPlan.task.study-route.desc": "Confirm WO vs HBO and shortlist accredited programmes.",
  "startPlan.task.visa.title": "Check visa and residence steps",
  "startPlan.task.visa.desc": "Confirm what your nationality requires before you travel.",
  "startPlan.task.funding.title": "Plan tuition and funding",
  "startPlan.task.funding.desc": "Separate confirmed fees from estimates and check scholarships.",
  "startPlan.task.housing.title": "Search for housing safely",
  "startPlan.task.housing.desc": "Start early and know the warning signs before you pay.",
  "startPlan.task.cities.title": "Compare cities",
  "startPlan.task.cities.desc": "Look beyond first impressions at scale, housing pressure and transport.",
  "startPlan.task.arrival.title": "Prepare your first weeks",
  "startPlan.task.arrival.desc": "Registration, BSN, banking and the rest of the arrival checklist.",

  "helpc.badge": "Help Centre",
  "helpc.title": "How can we help?",
  "helpc.placeholder": "Search enrolment, housing, visa, work, money...",
  "helpc.q1": "I need help with Studielink",
  "helpc.q2": "I found a rental, is it safe?",
  "helpc.q3": "Can I work as a student?",
  "helpc.q4": "What should I do after arrival?",
  "helpc.q5": "How much money do I need per month?",
  "helpc.q6": "What documents do I need before arrival?",
  "helpc.noResults": "No results. Try a different keyword.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title":
    "Premium support for students who want fewer unknowns.",
  "hubplus.subtitle":
    "Get verified resources, priority support, arrival templates and partner guidance in one place.",
  "hubplus.f1.title": "Verified housing route",
  "hubplus.f1.blurb": "Reduce the risk around your housing search.",
  "hubplus.f2.title": "Priority Q&A",
  "hubplus.f2.blurb": "Ask specific questions and get guided support.",
  "hubplus.f3.title": "Arrival templates",
  "hubplus.f3.blurb": "Use ready-made checklists and planning tools.",

  "start.badge": "Start Here",
  "start.title": "Get your personal move plan.",
  "start.subtitle":
    "Choose where you are in the process and get the right checklist, deadlines and guides.",
  "start.s1.title": "I'm exploring programs",
  "start.s1.blurb": "Understand routes, universities and application windows.",
  "start.s2.title": "I'm applying now",
  "start.s2.blurb": "Plan documents, Studielink and enrolment deadlines.",
  "start.s3.title": "I've been accepted",
  "start.s3.blurb": "Handle housing, money, visa and insurance tasks.",
  "start.s4.title": "I'm arriving soon",
  "start.s4.blurb": "Prepare BSN, city registration and arrival week.",
};

const de: Dict = {
  "nav.home": "Startseite",
  "nav.startHere": "Hier starten",
  "nav.about": "Über uns",
  "nav.guides": "Ratgeber",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "Hilfe-Center",
  "nav.forum": "Forum",
  "nav.startMove": "Umzug starten",
  "nav.changeLanguage": "Sprache ändern",
  "nav.menu": "Menü",
  "nav.close": "Schließen",

  "search.trigger": "Suchen",
  "search.placeholder": "Leitfäden, Hilfethemen und Seiten durchsuchen…",
  "search.hint": "Tippe, um StudyNL zu durchsuchen.",
  "search.empty": "Keine Ergebnisse gefunden.",

  "notfound.badge": "404",
  "notfound.title": "Diese Seite finden wir nicht.",
  "notfound.subtitle":
    "Die gesuchte Seite wurde vielleicht verschoben oder existiert noch nicht.",
  "notfound.home": "Zurück zur Startseite",
  "notfound.guides": "Leitfäden ansehen",

  "forum.badge": "Community",
  "forum.title": "Frag Studierende, die den Umzug schon gemacht haben.",
  "forum.subtitle":
    "Antworten zu Wohnen, Einschreibung, Geld und Ankunft von Studierenden mit Erfahrung.",
  "forum.note":
    "Das Forum startet bald. In der Zwischenzeit beantworten unsere Leitfäden und das Hilfecenter die häufigsten Fragen.",
  "forum.cta": "Leitfäden entdecken",

  "forum.tabs.discussion": "Diskussion",
  "forum.tabs.members": "Mitglieder",
  "forum.tabs.about": "Über",
  "forum.tabs.admin": "Admin",

  "forum.role.member": "Mitglied",
  "forum.role.moderator": "Moderator",
  "forum.role.admin": "Admin",

  "forum.moderation.hide": "Verbergen",
  "forum.moderation.approve": "Freigeben",
  "forum.moderation.delete": "Löschen",
  "forum.moderation.hiddenBadge": "Verborgen",
  "forum.moderation.confirmDeletePost": "Diesen Beitrag endgültig löschen? Das kann nicht rückgängig gemacht werden.",
  "forum.moderation.confirmDeleteComment": "Diesen Kommentar endgültig löschen? Das kann nicht rückgängig gemacht werden.",

  "forum.compose.placeholder": "Teile etwas…",
  "forum.compose.button": "Beitrag erstellen",
  "forum.compose.loginPrompt": "Melde dich an, um etwas mit der Community zu teilen.",
  "forum.compose.addImage": "Foto",
  "forum.compose.removeImage": "Bild entfernen",
  "forum.compose.uploading": "Bild wird hochgeladen…",
  "forum.compose.postError": "Das hat nicht geklappt — bitte versuche es noch einmal.",
  "forum.compose.uploadError": "Das Bild konnte nicht hochgeladen werden — bitte versuche es noch einmal.",

  "forum.post.like": "Gefällt mir",
  "forum.post.liked": "Gefällt mir",
  "forum.post.comments": "Kommentare",
  "forum.post.views": "Aufrufe",
  "forum.post.commentPlaceholder": "Schreib einen Kommentar…",
  "forum.post.commentButton": "Senden",
  "forum.post.noComments": "Noch keine Kommentare — sei der Erste, der antwortet.",
  "forum.post.loginToComment": "Melde dich an, um einen Kommentar zu hinterlassen.",
  "forum.post.imageAlt": "Bild zu diesem Beitrag",

  "forum.empty.title": "Noch keine Beiträge",
  "forum.empty.subtitle": "Sei der Erste, der ein Gespräch startet.",
  "forum.loadError": "Das Forum konnte nicht geladen werden — bitte lade die Seite neu.",

  "forum.members.title": "Mitglieder",
  "forum.members.since": "Mitglied seit",
  "forum.members.empty": "Noch keine Mitglieder.",

  "forum.about.title": "Über dieses Forum",
  "forum.about.description":
    "Ein freundlicher Ort für Studierende, um sich zu vernetzen, Fragen zu stellen und zu teilen, was sie über den Umzug und das Studium in den Niederlanden gelernt haben.",
  "forum.about.activity": "Aktivität — letzte 30 Tage",
  "forum.about.newPosts": "Neue Beiträge",
  "forum.about.newMembers": "Neue Mitglieder",
  "forum.about.totalMembers": "Mitglieder",

  "auth.login.title": "Anmelden",
  "auth.login.subtitle": "Willkommen zurück in der StudyNL-Community.",
  "auth.login.submit": "Anmelden",
  "auth.login.submitting": "Anmeldung läuft…",
  "auth.login.switchPrompt": "Noch keinen Account?",
  "auth.login.switchAction": "Registrieren",
  "auth.signup.title": "Erstelle deinen Account",
  "auth.signup.subtitle": "Werde Teil des StudyNL-Community-Forums.",
  "auth.signup.submit": "Registrieren",
  "auth.signup.submitting": "Account wird erstellt…",
  "auth.signup.switchPrompt": "Schon einen Account?",
  "auth.signup.switchAction": "Anmelden",
  "auth.field.name": "Name",
  "auth.field.email": "E-Mail",
  "auth.field.password": "Passwort",
  "auth.logout": "Abmelden",
  "auth.loggedInAs": "Angemeldet als",

  "admin.users.role": "Rolle",
  "admin.users.status": "Status",
  "admin.users.joined": "Beigetreten",
  "admin.users.you": "(du)",
  "admin.users.statusActive": "Aktiv",
  "admin.users.statusSuspended": "Gesperrt",
  "admin.users.suspend": "Sperren",
  "admin.users.reactivate": "Entsperren",
  "admin.users.delete": "Löschen",
  "admin.users.confirmDelete": "Dieses Mitglied und alle seine Beiträge löschen? Das kann nicht rückgängig gemacht werden.",
  "admin.users.loadError": "Mitglieder konnten nicht geladen werden.",

  "guide.back": "Alle Leitfäden",
  "guide.note":
    "Wir erweitern diesen Leitfaden mit Schritten, Fristen und Checks. Sieh dir unten verwandte Leitfäden an oder erstelle deinen persönlichen Umzugsplan.",
  "guide.related": "Verwandte Leitfäden",
  "guide.cta": "Meinen Umzugsplan erstellen",
  "nav.tagline.prefix": "BEREITGESTELLT VON ABSOLVENTEN",
  "nav.tagline.suffix": "FÜR STUDIERENDE",

  "footer.copyright": "© 2035 StudyNL. Vorschau des HTML-Redesigns.",
  "footer.l.studyNL": "Studieren in den Niederlanden",
  "footer.l.scholarships": "Stipendien & Finanzierung",
  "footer.l.cost": "Lebenshaltungskosten",
  "footer.l.work": "Arbeiten neben dem Studium",
  "footer.l.arrival": "Ankunfts-Checkliste",
  "footer.l.enrolment": "Einschreibung",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "Forum",
  "footer.l.universities": "Universitäten",
  "footer.l.fraternities": "Studentenvereinigungen",
  "footer.l.visa": "Visum & Aufenthalt",
  "footer.l.scams": "Betrug vermeiden",
  "footer.l.cities": "Städte-Guides",
  "footer.l.finance": "Finanzen & Kredite",
  "footer.l.accommodation": "Unterkunft",
  "footer.l.partners": "Partner werden",
  "footer.l.about": "Über uns",
  "footer.l.contact": "Kontakt",
  "footer.l.legal": "Rechtliches",
  "footer.l.help": "Hilfe-Center",

  "hero.badge": "+ Dein Leitfaden zum Studium in NL",
  "hero.title": "Dein klarer Weg zum Studium in den Niederlanden.",
  "hero.subtitle":
    "Triff die wichtigen Entscheidungen in der richtigen Reihenfolge: Studienweg, Einschreibung, Wohnen, Geld, Arbeitsregeln und Ankunftsaufgaben.",
  "hero.cta_primary": "Umzug starten",
  "hero.cta_secondary": "Ratgeber ansehen",
  "hero.chip_enrolment": "Einschreibung erklärt",
  "hero.chip_housing": "Wohnsicherheit",
  "hero.chip_arrival": "Ankunftsplanung",
  "hero.card1_label": "Stipendienfristen",
  "hero.card1_value": "12 offen",
  "hero.card2_label": "Wohnungsbetrugs-Check",
  "hero.card2_value": "Sicher zuerst",
  "hero.card3_label": "Ankunfts-Checkliste",
  "hero.card3_value": "30 Tage",
  "hero.tag_startready": "Startbereit",

  "popular.badge": "Meistgesuchte Entscheidungen",
  "popular.title_line1": "Unsere beliebtesten",
  "popular.title_line2": "Themen",
  "popular.subtitle":
    "Entdecke die Themen, die Studierende vor dem Umzug in die Niederlande am häufigsten brauchen. Jedes Thema führt zu einem klaren Leitfaden mit Schritten, Fristen und Checks.",
  "popular.t1.title": "Studieren in den Niederlanden",
  "popular.t1.blurb":
    "Verstehe das niederländische Universitätssystem, Abschlüsse, Zulassung und Zeitpläne.",
  "popular.t2.title": "Arbeiten neben dem Studium",
  "popular.t2.blurb":
    "Arbeitszeit, BSN, Steuern, Verträge und worauf Studierende achten sollten.",
  "popular.t3.title": "Stipendien & Finanzierung",
  "popular.t3.blurb":
    "Finde Stipendien, Studiengebührenhilfen, Budgetwege und Fristen.",
  "popular.t4.title": "Ankunfts-Checkliste",
  "popular.t4.blurb":
    "Schritt-für-Schritt-Aufgaben für deine ersten 30 Tage nach der Ankunft.",
  "popular.t5.title": "Unterkunft",
  "popular.t5.blurb":
    "Wohnungsplattformen, Warnsignale, Verträge und geprüfte Partner.",
  "popular.t6.title": "Open Days & Einschreibung",
  "popular.t6.blurb":
    "Besuchstage, Bewerbungsdokumente, Studielink und Einschreibungs-Meilensteine.",

  "moveplan.tag1": "Umzugsplan",
  "moveplan.title": "5 Schritte zur Ankunft",
  "moveplan.subtitle":
    "Wir ordnen jede wichtige Studierenden-Entscheidung in einen klaren Pfad – vom Studienweg bis zum sicheren Einleben.",
  "moveplan.cta": "Meine Checkliste erstellen",
  "moveplan.badge": "Geführter Weg",
  "moveplan.heading": "Ein geführter Weg, keine Linksammlung.",
  "moveplan.heading_blurb":
    "Studierende kommen oft mit Sorgen an: welche Universität, wo wohnen, wie viel Geld, welche Dokumente und was zuerst tun. Wir machen daraus eine klare Reihenfolge.",
  "moveplan.s1.title": "Studienweg",
  "moveplan.s1.blurb":
    "Wähle den richtigen Abschluss, Universitätsweg und Bewerbungszeitraum, bevor du Städte vergleichst.",
  "moveplan.s2.title": "Geld & Fristen",
  "moveplan.s2.blurb":
    "Plane Studiengebühren, Stipendien, monatliche Kosten und Termine, die deinen Umzug blockieren können.",
  "moveplan.s3.title": "Wohnsicherheit",
  "moveplan.s3.blurb":
    "Prüfe Warnsignale, Kautionen, Verträge und sichere Schritte, bevor du zahlst.",
  "moveplan.s4.title": "Dokumente",
  "moveplan.s4.blurb":
    "Bereite Einschreibung, Visum, BSN, Versicherung und Ankunftsdokumente in der richtigen Reihenfolge vor.",

  "partners.badge": "Geprüfte Partner",
  "partners.title": "Wir sind geprüfte Partner",
  "partners.subtitle":
    "Vertrauenswürdige Partner für verschiedene Teile der Studienreise.",

  "help.badge": "Antworten schneller finden",
  "help.title": "Nach Thema, Stadt oder Frage suchen",
  "help.subtitle":
    "Studierende stöbern nicht nur in Kategorien. Sie suchen Begriffe wie BSN, Mietkaution, DUO, Visum, Septembereinschreibung und Städte.",
  "help.placeholder": "Versuche: Mietvertrag vor der Ankunft",
  "help.tag1": "Visumsfrist",
  "help.tag2": "Günstige Unterkunft",
  "help.tag3": "Darf ich arbeiten?",
  "help.tag4": "Monatsbudget",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "Mietkaution",

  "about.badge": "Über StudyNL",
  "about.title": "Ein vertrauenswürdiges Netzwerk, kein Blog.",
  "about.subtitle":
    "StudyNL hilft internationalen Studierenden mit praktischen Tipps zu Wohnen, Geld, Dokumenten, Ankunft und Sicherheit.",
  "about.v1.cat": "Versprechen",
  "about.v1.title": "Ratschläge für internationale Studierende",
  "about.v1.blurb":
    "Klare Sprache, echte Entscheidungen und klare nächste Schritte.",
  "about.v2.cat": "Sicherheit",
  "about.v2.title": "Klare Warnungen zu Wohnen und Zahlungen",
  "about.v2.blurb":
    "Studierende sehen Risiken, bevor sie Geld oder Dokumente senden.",
  "about.v3.cat": "Vertrauen",
  "about.v3.title": "Partnerangebote klar gekennzeichnet",
  "about.v3.blurb": "Unterstützungsoptionen werden transparent vorgestellt.",

  "guides.badge1": "Ratgeber-Seite",
  "guides.badge2": "Ratgeber",
  "guides.title": "Alles, was Studierende vor dem Umzug suchen.",
  "guides.subtitle":
    "Durchsuchbare Bibliothek für Bewerbungen, Geld, Wohnen, Recht, Ankunft und Studierendenleben.",
  "guides.tab1": "Vor der Bewerbung",
  "guides.tab2": "Geld",
  "guides.tab3": "Wohnen",
  "guides.tab4": "Recht",
  "guides.tab5": "Ankunft",
  "guides.tab6": "Studierendenleben",
  "guides.g1.cat": "Start",
  "guides.g1.title": "Studieren in den Niederlanden",
  "guides.g1.blurb":
    "Niederländisches Universitätssystem, Abschlüsse, Zulassung und Termine.",
  "guides.g2.cat": "Geld",
  "guides.g2.title": "Stipendien & Finanzierung",
  "guides.g2.blurb":
    "Finanzierungswege, Studiengebührenhilfen und Fristen.",
  "guides.g3.cat": "Budget",
  "guides.g3.title": "Lebenshaltungskosten",
  "guides.g3.blurb":
    "Monatliche Kosten nach Stadt, Studiengebühren und Verkehr.",
  "guides.g4.cat": "Arbeit",
  "guides.g4.title": "Arbeiten neben dem Studium",
  "guides.g4.blurb": "Verträge, Steuern, BSN und erlaubte Studierendenarbeit.",
  "guides.g5.cat": "Ankunft",
  "guides.g5.title": "Ankunfts-Checkliste",
  "guides.g5.blurb": "Aufgaben für deinen ersten Monat in den Niederlanden.",
  "guides.g6.cat": "Zulassung",
  "guides.g6.title": "Einschreibung",
  "guides.g6.blurb":
    "Dokumente, Studielink und Einschreibungs-Meilensteine.",
  "guides.g7.cat": "Wohnen",
  "guides.g7.title": "Unterkunft",
  "guides.g7.blurb": "Finde Wohnungen und vermeide unsichere Mietsituationen.",
  "guides.g8.cat": "Recht",
  "guides.g8.title": "Visum & Aufenthalt",
  "guides.g8.blurb":
    "Aufenthaltstitel, MVV-Grundlagen und Dokumentenreihenfolge.",
  "guides.g9.cat": "Sicherheit",
  "guides.g9.title": "Betrug vermeiden",
  "guides.g9.blurb":
    "Erkenne Mietbetrug und unsichere Zahlungsaufforderungen.",

  "helpc.badge": "Hilfe-Center",
  "helpc.title": "Wie können wir helfen?",
  "helpc.placeholder":
    "Suche Einschreibung, Wohnen, Visum, Arbeit, Geld...",
  "helpc.q1": "Ich brauche Hilfe mit Studielink",
  "helpc.q2": "Ich habe eine Wohnung gefunden – ist sie sicher?",
  "helpc.q3": "Darf ich als Studierender arbeiten?",
  "helpc.q4": "Was soll ich nach der Ankunft tun?",
  "helpc.q5": "Wie viel Geld brauche ich pro Monat?",
  "helpc.q6": "Welche Dokumente brauche ich vor der Ankunft?",
  "helpc.noResults":
    "Keine Ergebnisse. Versuche ein anderes Stichwort.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title":
    "Premium-Unterstützung für Studierende mit weniger Unbekannten.",
  "hubplus.subtitle":
    "Geprüfte Ressourcen, vorrangiger Support, Ankunftsvorlagen und Partnerberatung an einem Ort.",
  "hubplus.f1.title": "Geprüfter Wohnungsweg",
  "hubplus.f1.blurb": "Reduziere das Risiko bei deiner Wohnungssuche.",
  "hubplus.f2.title": "Vorrangiges Q&A",
  "hubplus.f2.blurb": "Stelle konkrete Fragen und erhalte begleitete Hilfe.",
  "hubplus.f3.title": "Ankunftsvorlagen",
  "hubplus.f3.blurb": "Nutze fertige Checklisten und Planungstools.",

  "start.badge": "Hier starten",
  "start.title": "Hol dir deinen persönlichen Umzugsplan.",
  "start.subtitle":
    "Wähle deinen aktuellen Schritt und erhalte die passende Checkliste, Fristen und Ratgeber.",
  "start.s1.title": "Ich erkunde Studiengänge",
  "start.s1.blurb":
    "Verstehe Wege, Universitäten und Bewerbungsfenster.",
  "start.s2.title": "Ich bewerbe mich gerade",
  "start.s2.blurb":
    "Plane Dokumente, Studielink und Einschreibungsfristen.",
  "start.s3.title": "Ich wurde angenommen",
  "start.s3.blurb": "Wohnen, Geld, Visum und Versicherung erledigen.",
  "start.s4.title": "Ich komme bald an",
  "start.s4.blurb":
    "Bereite BSN, Stadtanmeldung und Ankunftswoche vor.",
};

const fr: Dict = {
  "nav.home": "Accueil",
  "nav.startHere": "Commencer",
  "nav.about": "À propos",
  "nav.guides": "Guides",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "Centre d'aide",
  "nav.forum": "Forum",
  "nav.startMove": "Lancer mon départ",
  "nav.changeLanguage": "Changer de langue",
  "nav.menu": "Menu",
  "nav.close": "Fermer",

  "search.trigger": "Rechercher",
  "search.placeholder": "Rechercher des guides, sujets d'aide et pages…",
  "search.hint": "Commencez à taper pour rechercher sur StudyNL.",
  "search.empty": "Aucun résultat trouvé.",

  "notfound.badge": "404",
  "notfound.title": "Nous ne trouvons pas cette page.",
  "notfound.subtitle":
    "La page recherchée a peut-être été déplacée ou n'existe pas encore.",
  "notfound.home": "Retour à l'accueil",
  "notfound.guides": "Voir les guides",

  "forum.badge": "Communauté",
  "forum.title": "Posez vos questions aux étudiants déjà installés.",
  "forum.subtitle":
    "Des réponses sur le logement, l'inscription, l'argent et l'arrivée par ceux qui l'ont vécu.",
  "forum.note":
    "Le forum arrive bientôt. En attendant, nos guides et le centre d'aide couvrent les questions les plus fréquentes.",
  "forum.cta": "Explorer les guides",

  "forum.tabs.discussion": "Discussion",
  "forum.tabs.members": "Membres",
  "forum.tabs.about": "À propos",
  "forum.tabs.admin": "Admin",

  "forum.role.member": "Membre",
  "forum.role.moderator": "Modérateur",
  "forum.role.admin": "Admin",

  "forum.moderation.hide": "Masquer",
  "forum.moderation.approve": "Approuver",
  "forum.moderation.delete": "Supprimer",
  "forum.moderation.hiddenBadge": "Masqué",
  "forum.moderation.confirmDeletePost": "Supprimer définitivement cette publication ? Cette action est irréversible.",
  "forum.moderation.confirmDeleteComment": "Supprimer définitivement ce commentaire ? Cette action est irréversible.",

  "forum.compose.placeholder": "Partagez quelque chose…",
  "forum.compose.button": "Créer une publication",
  "forum.compose.loginPrompt": "Connectez-vous pour partager quelque chose avec la communauté.",
  "forum.compose.addImage": "Photo",
  "forum.compose.removeImage": "Supprimer l'image",
  "forum.compose.uploading": "Envoi de l'image…",
  "forum.compose.postError": "Impossible de publier — merci de réessayer.",
  "forum.compose.uploadError": "Impossible d'envoyer cette image — merci de réessayer.",

  "forum.post.like": "J'aime",
  "forum.post.liked": "Aimé",
  "forum.post.comments": "Commentaires",
  "forum.post.views": "Vues",
  "forum.post.commentPlaceholder": "Écrivez un commentaire…",
  "forum.post.commentButton": "Publier",
  "forum.post.noComments": "Pas encore de commentaires — soyez le premier à répondre.",
  "forum.post.loginToComment": "Connectez-vous pour laisser un commentaire.",
  "forum.post.imageAlt": "Image jointe à cette publication",

  "forum.empty.title": "Pas encore de publications",
  "forum.empty.subtitle": "Soyez le premier à lancer une conversation.",
  "forum.loadError": "Impossible de charger le forum — merci de rafraîchir la page.",

  "forum.members.title": "Membres",
  "forum.members.since": "Membre depuis",
  "forum.members.empty": "Pas encore de membres.",

  "forum.about.title": "À propos de ce forum",
  "forum.about.description":
    "Un espace convivial où les étudiants se rencontrent, posent leurs questions et partagent ce qu'ils ont appris sur l'installation et les études aux Pays-Bas.",
  "forum.about.activity": "Activité — 30 derniers jours",
  "forum.about.newPosts": "Nouvelles publications",
  "forum.about.newMembers": "Nouveaux membres",
  "forum.about.totalMembers": "Membres",

  "auth.login.title": "Connexion",
  "auth.login.subtitle": "Ravis de vous revoir sur la communauté StudyNL.",
  "auth.login.submit": "Se connecter",
  "auth.login.submitting": "Connexion…",
  "auth.login.switchPrompt": "Pas encore de compte ?",
  "auth.login.switchAction": "Inscrivez-vous",
  "auth.signup.title": "Créez votre compte",
  "auth.signup.subtitle": "Rejoignez le forum de la communauté StudyNL.",
  "auth.signup.submit": "S'inscrire",
  "auth.signup.submitting": "Création du compte…",
  "auth.signup.switchPrompt": "Vous avez déjà un compte ?",
  "auth.signup.switchAction": "Connectez-vous",
  "auth.field.name": "Nom",
  "auth.field.email": "E-mail",
  "auth.field.password": "Mot de passe",
  "auth.logout": "Déconnexion",
  "auth.loggedInAs": "Connecté en tant que",

  "admin.users.role": "Rôle",
  "admin.users.status": "Statut",
  "admin.users.joined": "Inscrit",
  "admin.users.you": "(vous)",
  "admin.users.statusActive": "Actif",
  "admin.users.statusSuspended": "Suspendu",
  "admin.users.suspend": "Suspendre",
  "admin.users.reactivate": "Réactiver",
  "admin.users.delete": "Supprimer",
  "admin.users.confirmDelete": "Supprimer ce membre et tout ce qu'il a publié ? Cette action est irréversible.",
  "admin.users.loadError": "Impossible de charger les membres.",

  "guide.back": "Tous les guides",
  "guide.note":
    "Nous enrichissons ce guide avec des étapes, des échéances et des vérifications. Découvrez les guides liés ci-dessous ou créez votre plan de déménagement personnalisé.",
  "guide.related": "Guides liés",
  "guide.cta": "Créer mon plan",
  "nav.tagline.prefix": "PROPULSÉ PAR DES DIPLÔMÉS",
  "nav.tagline.suffix": "POUR LES ÉTUDIANTS",

  "footer.copyright":
    "© 2035 StudyNL. Aperçu de la refonte HTML statique.",
  "footer.l.studyNL": "Étudier aux Pays-Bas",
  "footer.l.scholarships": "Bourses & financement",
  "footer.l.cost": "Coût de la vie",
  "footer.l.work": "Travailler pendant les études",
  "footer.l.arrival": "Checklist d'arrivée",
  "footer.l.enrolment": "Inscription",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "Forum",
  "footer.l.universities": "Universités",
  "footer.l.fraternities": "Associations étudiantes",
  "footer.l.visa": "Visa & résidence",
  "footer.l.scams": "Éviter les arnaques",
  "footer.l.cities": "Guides des villes",
  "footer.l.finance": "Finance & prêts",
  "footer.l.accommodation": "Logement",
  "footer.l.partners": "Devenir partenaire",
  "footer.l.about": "À propos",
  "footer.l.contact": "Contact",
  "footer.l.legal": "Mentions légales",
  "footer.l.help": "Centre d'aide",

  "hero.badge": "+ Ton guide pour étudier aux Pays-Bas",
  "hero.title": "Ton parcours clair pour étudier aux Pays-Bas.",
  "hero.subtitle":
    "Prends les bonnes décisions dans le bon ordre : parcours d'études, inscription, logement, argent, règles de travail et tâches d'arrivée.",
  "hero.cta_primary": "Lancer mon départ",
  "hero.cta_secondary": "Voir les guides",
  "hero.chip_enrolment": "Inscription expliquée",
  "hero.chip_housing": "Sécurité du logement",
  "hero.chip_arrival": "Plan d'arrivée",
  "hero.card1_label": "Dates limites des bourses",
  "hero.card1_value": "12 ouvertes",
  "hero.card2_label": "Vérification d'arnaque",
  "hero.card2_value": "Sécurité d'abord",
  "hero.card3_label": "Checklist d'arrivée",
  "hero.card3_value": "30 jours",
  "hero.tag_startready": "Prêt à partir",

  "popular.badge": "Décisions les plus consultées",
  "popular.title_line1": "Nos sujets les plus",
  "popular.title_line2": "populaires",
  "popular.subtitle":
    "Explore les sujets dont les étudiants ont le plus besoin avant de partir aux Pays-Bas. Chaque sujet ouvre un guide direct avec les étapes, les dates et les vérifications utiles.",
  "popular.t1.title": "Étudier aux Pays-Bas",
  "popular.t1.blurb":
    "Comprends le système universitaire néerlandais, les diplômes, l'admission et le calendrier.",
  "popular.t2.title": "Travailler pendant les études",
  "popular.t2.blurb":
    "Heures de travail, BSN, impôts, contrats et ce qu'il faut éviter.",
  "popular.t3.title": "Bourses & financement",
  "popular.t3.blurb":
    "Bourses, aide aux frais, budgets et dates limites.",
  "popular.t4.title": "Checklist d'arrivée",
  "popular.t4.blurb":
    "Tâches pas à pas pour tes 30 premiers jours après l'arrivée.",
  "popular.t5.title": "Logement",
  "popular.t5.blurb":
    "Plateformes, signaux d'alerte, contrats et partenaires vérifiés.",
  "popular.t6.title": "Journées portes ouvertes & inscription",
  "popular.t6.blurb":
    "Journées de visite, dossiers, Studielink et étapes d'inscription.",

  "moveplan.tag1": "Plan de départ",
  "moveplan.title": "5 étapes pour être prêt",
  "moveplan.subtitle":
    "Nous organisons chaque décision étudiante importante en un parcours clair, du choix d'études à l'installation en sécurité.",
  "moveplan.cta": "Créer ma checklist",
  "moveplan.badge": "Parcours guidé",
  "moveplan.heading": "Un parcours guidé, pas une liste de liens.",
  "moveplan.heading_blurb":
    "Les étudiants arrivent souvent stressés : quelle université, où vivre, combien d'argent, quels documents et par où commencer. Nous transformons cela en une séquence claire.",
  "moveplan.s1.title": "Parcours d'études",
  "moveplan.s1.blurb":
    "Choisis le bon diplôme, l'université et la période d'inscription avant de comparer les villes.",
  "moveplan.s2.title": "Argent & dates limites",
  "moveplan.s2.blurb":
    "Planifie frais, bourses, coûts mensuels et dates qui peuvent bloquer ton départ.",
  "moveplan.s3.title": "Sécurité du logement",
  "moveplan.s3.blurb":
    "Vérifie les signaux d'alerte, cautions, contrats et étapes sûres avant de payer.",
  "moveplan.s4.title": "Documents",
  "moveplan.s4.blurb":
    "Prépare inscription, visa, BSN, assurance et documents d'arrivée dans le bon ordre.",

  "partners.badge": "Partenaires approuvés",
  "partners.title": "Nous sommes partenaires approuvés",
  "partners.subtitle":
    "Des partenaires de confiance qui accompagnent différents moments du parcours étudiant.",

  "help.badge": "Trouver des réponses plus vite",
  "help.title": "Recherche par sujet, ville ou question",
  "help.subtitle":
    "Les étudiants ne se contentent pas de catégories. Ils cherchent BSN, caution, DUO, visa, rentrée de septembre et noms de villes.",
  "help.placeholder": "Essaie : contrat de logement avant l'arrivée",
  "help.tag1": "Date limite visa",
  "help.tag2": "Logement pas cher",
  "help.tag3": "Puis-je travailler ?",
  "help.tag4": "Budget mensuel",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "Caution",

  "about.badge": "À propos de StudyNL",
  "about.title":
    "Un réseau de soutien étudiant fiable, pas juste un blog.",
  "about.subtitle":
    "StudyNL aide les étudiants internationaux à se préparer à étudier aux Pays-Bas avec des conseils pratiques sur logement, argent, documents, arrivée et sécurité.",
  "about.v1.cat": "Promesse",
  "about.v1.title": "Des conseils écrits pour les étudiants internationaux",
  "about.v1.blurb":
    "Langage clair, vraies décisions et prochaines étapes nettes.",
  "about.v2.cat": "Sécurité",
  "about.v2.title": "Avertissements clairs sur logement et paiements",
  "about.v2.blurb":
    "Les étudiants voient les risques avant d'envoyer argent ou documents.",
  "about.v3.cat": "Confiance",
  "about.v3.title": "Offres partenaires clairement étiquetées",
  "about.v3.blurb":
    "Les options de soutien sont présentées en toute transparence.",

  "guides.badge1": "Page Guides",
  "guides.badge2": "Guides",
  "guides.title": "Tout ce que les étudiants cherchent avant le départ.",
  "guides.subtitle":
    "Bibliothèque de guides pour candidatures, argent, logement, démarches légales, arrivée et vie étudiante.",
  "guides.tab1": "Avant la candidature",
  "guides.tab2": "Argent",
  "guides.tab3": "Logement",
  "guides.tab4": "Juridique",
  "guides.tab5": "Arrivée",
  "guides.tab6": "Vie étudiante",
  "guides.g1.cat": "Démarrer",
  "guides.g1.title": "Étudier aux Pays-Bas",
  "guides.g1.blurb":
    "Système universitaire néerlandais, diplômes, admission et calendrier.",
  "guides.g2.cat": "Argent",
  "guides.g2.title": "Bourses & financement",
  "guides.g2.blurb":
    "Voies de financement, aides aux frais et dates limites.",
  "guides.g3.cat": "Budget",
  "guides.g3.title": "Coût de la vie",
  "guides.g3.blurb": "Coûts mensuels par ville, frais et transports.",
  "guides.g4.cat": "Travail",
  "guides.g4.title": "Travailler pendant les études",
  "guides.g4.blurb": "Contrats, impôts, BSN et travail étudiant autorisé.",
  "guides.g5.cat": "Arrivée",
  "guides.g5.title": "Checklist d'arrivée",
  "guides.g5.blurb": "Tâches pour ton premier mois aux Pays-Bas.",
  "guides.g6.cat": "Admission",
  "guides.g6.title": "Inscription",
  "guides.g6.blurb": "Documents, Studielink et étapes d'inscription.",
  "guides.g7.cat": "Logement",
  "guides.g7.title": "Logement",
  "guides.g7.blurb":
    "Trouve un logement et évite les situations à risque.",
  "guides.g8.cat": "Juridique",
  "guides.g8.title": "Visa & résidence",
  "guides.g8.blurb":
    "Titres de séjour, bases du MVV et ordre des documents.",
  "guides.g9.cat": "Sécurité",
  "guides.g9.title": "Éviter les arnaques",
  "guides.g9.blurb":
    "Repère les arnaques au logement et les demandes de paiement suspectes.",

  "helpc.badge": "Centre d'aide",
  "helpc.title": "Comment pouvons-nous aider ?",
  "helpc.placeholder":
    "Recherche inscription, logement, visa, travail, argent...",
  "helpc.q1": "J'ai besoin d'aide avec Studielink",
  "helpc.q2": "J'ai trouvé un logement, est-il sûr ?",
  "helpc.q3": "Puis-je travailler comme étudiant ?",
  "helpc.q4": "Que faire après mon arrivée ?",
  "helpc.q5": "De combien d'argent ai-je besoin par mois ?",
  "helpc.q6": "Quels documents avant l'arrivée ?",
  "helpc.noResults": "Aucun résultat. Essaie un autre mot-clé.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title":
    "Soutien premium pour les étudiants qui veulent moins d'inconnues.",
  "hubplus.subtitle":
    "Ressources vérifiées, support prioritaire, modèles d'arrivée et conseils partenaires en un seul endroit.",
  "hubplus.f1.title": "Parcours logement vérifié",
  "hubplus.f1.blurb": "Réduis le risque dans ta recherche de logement.",
  "hubplus.f2.title": "Q&A prioritaire",
  "hubplus.f2.blurb": "Pose des questions précises et reçois un soutien guidé.",
  "hubplus.f3.title": "Modèles d'arrivée",
  "hubplus.f3.blurb":
    "Utilise des checklists et outils de planification prêts à l'emploi.",

  "start.badge": "Commencer",
  "start.title": "Obtiens ton plan de départ personnalisé.",
  "start.subtitle":
    "Choisis où tu en es et reçois la bonne checklist, les dates limites et les guides.",
  "start.s1.title": "J'explore les programmes",
  "start.s1.blurb":
    "Comprends les voies, universités et périodes de candidature.",
  "start.s2.title": "Je postule maintenant",
  "start.s2.blurb":
    "Planifie documents, Studielink et dates d'inscription.",
  "start.s3.title": "J'ai été accepté(e)",
  "start.s3.blurb": "Gère logement, argent, visa et assurance.",
  "start.s4.title": "J'arrive bientôt",
  "start.s4.blurb":
    "Prépare BSN, enregistrement en ville et semaine d'arrivée.",
};

const it: Dict = {
  "nav.home": "Home",
  "nav.startHere": "Inizia qui",
  "nav.about": "Chi siamo",
  "nav.guides": "Guide",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "Centro assistenza",
  "nav.forum": "Forum",
  "nav.startMove": "Inizia il trasferimento",
  "nav.changeLanguage": "Cambia lingua",
  "nav.menu": "Menu",
  "nav.close": "Chiudi",

  "search.trigger": "Cerca",
  "search.placeholder": "Cerca guide, argomenti di aiuto e pagine…",
  "search.hint": "Inizia a digitare per cercare in StudyNL.",
  "search.empty": "Nessun risultato trovato.",

  "notfound.badge": "404",
  "notfound.title": "Non troviamo questa pagina.",
  "notfound.subtitle":
    "La pagina che cerchi potrebbe essere stata spostata o non esistere ancora.",
  "notfound.home": "Torna alla home",
  "notfound.guides": "Sfoglia le guide",

  "forum.badge": "Comunità",
  "forum.title": "Chiedi agli studenti che si sono già trasferiti.",
  "forum.subtitle":
    "Risposte su alloggio, iscrizione, soldi e arrivo da chi c'è già passato.",
  "forum.note":
    "Il forum arriverà presto. Nel frattempo, le nostre guide e il centro assistenza coprono le domande più comuni.",
  "forum.cta": "Esplora le guide",

  "forum.tabs.discussion": "Discussioni",
  "forum.tabs.members": "Membri",
  "forum.tabs.about": "Informazioni",
  "forum.tabs.admin": "Admin",

  "forum.role.member": "Membro",
  "forum.role.moderator": "Moderatore",
  "forum.role.admin": "Admin",

  "forum.moderation.hide": "Nascondi",
  "forum.moderation.approve": "Approva",
  "forum.moderation.delete": "Elimina",
  "forum.moderation.hiddenBadge": "Nascosto",
  "forum.moderation.confirmDeletePost": "Eliminare definitivamente questo post? Questa azione non può essere annullata.",
  "forum.moderation.confirmDeleteComment": "Eliminare definitivamente questo commento? Questa azione non può essere annullata.",

  "forum.compose.placeholder": "Condividi qualcosa…",
  "forum.compose.button": "Crea un post",
  "forum.compose.loginPrompt": "Accedi per condividere qualcosa con la community.",
  "forum.compose.addImage": "Foto",
  "forum.compose.removeImage": "Rimuovi immagine",
  "forum.compose.uploading": "Caricamento immagine…",
  "forum.compose.postError": "Non è stato possibile pubblicarlo — riprova.",
  "forum.compose.uploadError": "Non è stato possibile caricare l'immagine — riprova.",

  "forum.post.like": "Mi piace",
  "forum.post.liked": "Piaciuto",
  "forum.post.comments": "Commenti",
  "forum.post.views": "Visualizzazioni",
  "forum.post.commentPlaceholder": "Scrivi un commento…",
  "forum.post.commentButton": "Pubblica",
  "forum.post.noComments": "Ancora nessun commento — sii il primo a rispondere.",
  "forum.post.loginToComment": "Accedi per lasciare un commento.",
  "forum.post.imageAlt": "Immagine allegata a questo post",

  "forum.empty.title": "Ancora nessun post",
  "forum.empty.subtitle": "Sii il primo a iniziare una conversazione.",
  "forum.loadError": "Non è stato possibile caricare il forum — aggiorna la pagina.",

  "forum.members.title": "Membri",
  "forum.members.since": "Membro dal",
  "forum.members.empty": "Ancora nessun membro.",

  "forum.about.title": "Informazioni su questo forum",
  "forum.about.description":
    "Uno spazio accogliente dove gli studenti possono conoscersi, farsi domande e condividere quello che hanno imparato su come trasferirsi e studiare nei Paesi Bassi.",
  "forum.about.activity": "Attività — ultimi 30 giorni",
  "forum.about.newPosts": "Nuovi post",
  "forum.about.newMembers": "Nuovi membri",
  "forum.about.totalMembers": "Membri",

  "auth.login.title": "Accedi",
  "auth.login.subtitle": "Bentornato nella community di StudyNL.",
  "auth.login.submit": "Accedi",
  "auth.login.submitting": "Accesso in corso…",
  "auth.login.switchPrompt": "Non hai un account?",
  "auth.login.switchAction": "Registrati",
  "auth.signup.title": "Crea il tuo account",
  "auth.signup.subtitle": "Unisciti al forum della community di StudyNL.",
  "auth.signup.submit": "Registrati",
  "auth.signup.submitting": "Creazione account…",
  "auth.signup.switchPrompt": "Hai già un account?",
  "auth.signup.switchAction": "Accedi",
  "auth.field.name": "Nome",
  "auth.field.email": "Email",
  "auth.field.password": "Password",
  "auth.logout": "Esci",
  "auth.loggedInAs": "Accesso effettuato come",

  "admin.users.role": "Ruolo",
  "admin.users.status": "Stato",
  "admin.users.joined": "Iscritto il",
  "admin.users.you": "(tu)",
  "admin.users.statusActive": "Attivo",
  "admin.users.statusSuspended": "Sospeso",
  "admin.users.suspend": "Sospendi",
  "admin.users.reactivate": "Riattiva",
  "admin.users.delete": "Elimina",
  "admin.users.confirmDelete": "Eliminare questo membro e tutto ciò che ha pubblicato? Questa azione non può essere annullata.",
  "admin.users.loadError": "Non è stato possibile caricare i membri.",

  "guide.back": "Tutte le guide",
  "guide.note":
    "Stiamo ampliando questa guida con passaggi, scadenze e controlli. Esplora le guide correlate qui sotto o crea il tuo piano di trasferimento.",
  "guide.related": "Guide correlate",
  "guide.cta": "Crea il mio piano",
  "nav.tagline.prefix": "REALIZZATO DA LAUREATI",
  "nav.tagline.suffix": "PER GLI STUDENTI",

  "footer.copyright":
    "© 2035 StudyNL. Anteprima del redesign HTML statico.",
  "footer.l.studyNL": "Studiare nei Paesi Bassi",
  "footer.l.scholarships": "Borse di studio & finanziamenti",
  "footer.l.cost": "Costo della vita",
  "footer.l.work": "Lavorare durante gli studi",
  "footer.l.arrival": "Checklist di arrivo",
  "footer.l.enrolment": "Iscrizione",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "Forum",
  "footer.l.universities": "Università",
  "footer.l.fraternities": "Associazioni studentesche",
  "footer.l.visa": "Visto & residenza",
  "footer.l.scams": "Evita truffe",
  "footer.l.cities": "Guide alle città",
  "footer.l.finance": "Finanza & prestiti",
  "footer.l.accommodation": "Alloggio",
  "footer.l.partners": "Diventa partner",
  "footer.l.about": "Chi siamo",
  "footer.l.contact": "Contatti",
  "footer.l.legal": "Legale",
  "footer.l.help": "Centro assistenza",

  "hero.badge": "+ La tua guida per studiare nei Paesi Bassi",
  "hero.title": "Il tuo percorso chiaro per studiare nei Paesi Bassi.",
  "hero.subtitle":
    "Prendi le decisioni importanti nell'ordine giusto: percorso di studi, iscrizione, alloggio, denaro, regole di lavoro e arrivo.",
  "hero.cta_primary": "Inizia il trasferimento",
  "hero.cta_secondary": "Sfoglia le guide",
  "hero.chip_enrolment": "Iscrizione spiegata",
  "hero.chip_housing": "Sicurezza alloggio",
  "hero.chip_arrival": "Pianificazione arrivo",
  "hero.card1_label": "Scadenze borse",
  "hero.card1_value": "12 aperte",
  "hero.card2_label": "Controllo truffe alloggi",
  "hero.card2_value": "Prima la sicurezza",
  "hero.card3_label": "Checklist di arrivo",
  "hero.card3_value": "30 giorni",
  "hero.tag_startready": "Pronto a partire",

  "popular.badge": "Decisioni più consultate",
  "popular.title_line1": "I nostri argomenti",
  "popular.title_line2": "più popolari",
  "popular.subtitle":
    "Esplora gli argomenti più cercati dagli studenti prima di trasferirsi nei Paesi Bassi. Ogni argomento apre una guida diretta con i passaggi e le scadenze.",
  "popular.t1.title": "Studiare nei Paesi Bassi",
  "popular.t1.blurb":
    "Capisci il sistema universitario olandese, titoli, ammissioni e tempistiche.",
  "popular.t2.title": "Lavorare durante gli studi",
  "popular.t2.blurb":
    "Ore di lavoro, BSN, tasse, contratti e cosa evitare.",
  "popular.t3.title": "Borse di studio & finanziamenti",
  "popular.t3.blurb":
    "Trova borse, supporto alle tasse, percorsi di budget e scadenze.",
  "popular.t4.title": "Checklist di arrivo",
  "popular.t4.blurb":
    "Compiti passo dopo passo per i tuoi primi 30 giorni.",
  "popular.t5.title": "Alloggio",
  "popular.t5.blurb":
    "Piattaforme, segnali d'allarme, contratti e partner verificati.",
  "popular.t6.title": "Open Day & iscrizione",
  "popular.t6.blurb":
    "Giornate aperte, documenti, Studielink e tappe dell'iscrizione.",

  "moveplan.tag1": "Piano di trasferimento",
  "moveplan.title": "5 passi per arrivare pronto",
  "moveplan.subtitle":
    "Organizziamo ogni decisione importante in un percorso chiaro, dalla scelta degli studi a un arrivo sicuro.",
  "moveplan.cta": "Crea la mia checklist",
  "moveplan.badge": "Percorso guidato",
  "moveplan.heading": "Un percorso guidato, non un elenco di link.",
  "moveplan.heading_blurb":
    "Gli studenti arrivano spesso con ansia: quale università, dove vivere, quanti soldi, quali documenti e da dove iniziare. Trasformiamo tutto in una sequenza.",
  "moveplan.s1.title": "Percorso di studi",
  "moveplan.s1.blurb":
    "Scegli il titolo giusto, l'università e la finestra di candidatura prima di confrontare città.",
  "moveplan.s2.title": "Soldi & scadenze",
  "moveplan.s2.blurb":
    "Pianifica tasse, borse, costi mensili e date che possono bloccare il trasferimento.",
  "moveplan.s3.title": "Sicurezza alloggio",
  "moveplan.s3.blurb":
    "Verifica segnali, depositi, contratti e passi sicuri prima di pagare.",
  "moveplan.s4.title": "Documenti",
  "moveplan.s4.blurb":
    "Prepara iscrizione, visto, BSN, assicurazione e documenti nell'ordine giusto.",

  "partners.badge": "Partner approvati",
  "partners.title": "Siamo partner approvati",
  "partners.subtitle":
    "Partner affidabili che supportano diversi momenti del percorso studentesco.",

  "help.badge": "Trova risposte più veloci",
  "help.title": "Cerca per argomento, città o domanda",
  "help.subtitle":
    "Gli studenti non navigano solo per categorie. Cercano BSN, deposito, DUO, visto, immatricolazione di settembre e città.",
  "help.placeholder": "Prova: contratto di alloggio prima dell'arrivo",
  "help.tag1": "Scadenza visto",
  "help.tag2": "Alloggio economico",
  "help.tag3": "Posso lavorare?",
  "help.tag4": "Budget mensile",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "Deposito affitto",

  "about.badge": "Chi siamo - StudyNL",
  "about.title":
    "Una rete di supporto affidabile, non solo un blog.",
  "about.subtitle":
    "StudyNL aiuta gli studenti internazionali a prepararsi a studiare nei Paesi Bassi con consigli pratici su alloggio, denaro, documenti, arrivo e sicurezza.",
  "about.v1.cat": "Promessa",
  "about.v1.title": "Consigli scritti per studenti internazionali",
  "about.v1.blurb": "Linguaggio chiaro, decisioni reali e prossimi passi.",
  "about.v2.cat": "Sicurezza",
  "about.v2.title": "Avvisi chiari su alloggio e pagamenti",
  "about.v2.blurb":
    "Gli studenti vedono i rischi prima di inviare denaro o documenti.",
  "about.v3.cat": "Fiducia",
  "about.v3.title": "Offerte partner chiaramente etichettate",
  "about.v3.blurb":
    "Le opzioni di supporto sono presentate con trasparenza.",

  "guides.badge1": "Pagina guide",
  "guides.badge2": "Guide",
  "guides.title":
    "Tutto ciò che gli studenti cercano prima del trasferimento.",
  "guides.subtitle":
    "Libreria di guide per candidature, denaro, alloggio, pratiche legali, arrivo e vita studentesca.",
  "guides.tab1": "Prima della candidatura",
  "guides.tab2": "Denaro",
  "guides.tab3": "Alloggio",
  "guides.tab4": "Legale",
  "guides.tab5": "Arrivo",
  "guides.tab6": "Vita studentesca",
  "guides.g1.cat": "Inizio",
  "guides.g1.title": "Studiare nei Paesi Bassi",
  "guides.g1.blurb":
    "Sistema universitario olandese, titoli, ammissioni e tempistiche.",
  "guides.g2.cat": "Denaro",
  "guides.g2.title": "Borse di studio & finanziamenti",
  "guides.g2.blurb":
    "Vie di finanziamento, supporto alle tasse e scadenze.",
  "guides.g3.cat": "Budget",
  "guides.g3.title": "Costo della vita",
  "guides.g3.blurb": "Costi mensili per città, tasse e trasporti.",
  "guides.g4.cat": "Lavoro",
  "guides.g4.title": "Lavorare durante gli studi",
  "guides.g4.blurb":
    "Contratti, tasse, BSN e lavoro studentesco permesso.",
  "guides.g5.cat": "Arrivo",
  "guides.g5.title": "Checklist di arrivo",
  "guides.g5.blurb": "Compiti per il tuo primo mese nei Paesi Bassi.",
  "guides.g6.cat": "Ammissioni",
  "guides.g6.title": "Iscrizione",
  "guides.g6.blurb": "Documenti, Studielink e tappe dell'iscrizione.",
  "guides.g7.cat": "Alloggio",
  "guides.g7.title": "Alloggio",
  "guides.g7.blurb":
    "Trova alloggio ed evita affitti non sicuri.",
  "guides.g8.cat": "Legale",
  "guides.g8.title": "Visto & residenza",
  "guides.g8.blurb":
    "Permessi di soggiorno, basi MVV e ordine dei documenti.",
  "guides.g9.cat": "Sicurezza",
  "guides.g9.title": "Evita truffe",
  "guides.g9.blurb":
    "Riconosci truffe di affitto e richieste di pagamento non sicure.",

  "helpc.badge": "Centro assistenza",
  "helpc.title": "Come possiamo aiutare?",
  "helpc.placeholder":
    "Cerca iscrizione, alloggio, visto, lavoro, denaro...",
  "helpc.q1": "Ho bisogno di aiuto con Studielink",
  "helpc.q2": "Ho trovato un affitto, è sicuro?",
  "helpc.q3": "Posso lavorare come studente?",
  "helpc.q4": "Cosa devo fare dopo l'arrivo?",
  "helpc.q5": "Quanti soldi servono al mese?",
  "helpc.q6": "Quali documenti prima dell'arrivo?",
  "helpc.noResults":
    "Nessun risultato. Prova un'altra parola chiave.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title":
    "Supporto premium per studenti che vogliono meno incognite.",
  "hubplus.subtitle":
    "Risorse verificate, supporto prioritario, modelli di arrivo e guida partner in un solo posto.",
  "hubplus.f1.title": "Percorso alloggio verificato",
  "hubplus.f1.blurb": "Riduci il rischio nella ricerca dell'alloggio.",
  "hubplus.f2.title": "Q&A prioritario",
  "hubplus.f2.blurb": "Fai domande specifiche e ricevi supporto guidato.",
  "hubplus.f3.title": "Modelli di arrivo",
  "hubplus.f3.blurb":
    "Usa checklist e strumenti di pianificazione già pronti.",

  "start.badge": "Inizia qui",
  "start.title": "Ottieni il tuo piano personale.",
  "start.subtitle":
    "Scegli a che punto sei e ricevi la checklist, le scadenze e le guide giuste.",
  "start.s1.title": "Sto esplorando i programmi",
  "start.s1.blurb":
    "Capisci percorsi, università e finestre di candidatura.",
  "start.s2.title": "Sto facendo domanda ora",
  "start.s2.blurb":
    "Pianifica documenti, Studielink e scadenze.",
  "start.s3.title": "Sono stato accettato",
  "start.s3.blurb": "Gestisci alloggio, denaro, visto e assicurazione.",
  "start.s4.title": "Sto per arrivare",
  "start.s4.blurb":
    "Prepara BSN, registrazione in città e settimana di arrivo.",
};

const nl: Dict = {
  "nav.home": "Home",
  "nav.startHere": "Start hier",
  "nav.about": "Over ons",
  "nav.guides": "Gidsen",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "Helpcentrum",
  "nav.forum": "Forum",
  "nav.startMove": "Start je verhuizing",
  "nav.changeLanguage": "Taal wijzigen",
  "nav.menu": "Menu",
  "nav.close": "Sluiten",

  "search.trigger": "Zoeken",
  "search.placeholder": "Zoek gidsen, hulponderwerpen en pagina's…",
  "search.hint": "Begin te typen om StudyNL te doorzoeken.",
  "search.empty": "Geen resultaten gevonden.",

  "notfound.badge": "404",
  "notfound.title": "We kunnen die pagina niet vinden.",
  "notfound.subtitle":
    "De pagina die je zoekt is misschien verplaatst of bestaat nog niet.",
  "notfound.home": "Terug naar home",
  "notfound.guides": "Bekijk gidsen",

  "forum.badge": "Community",
  "forum.title": "Vraag studenten die de stap al hebben gezet.",
  "forum.subtitle":
    "Antwoorden over huisvesting, inschrijving, geld en aankomst van studenten met ervaring.",
  "forum.note":
    "Het forum komt binnenkort. Ondertussen behandelen onze gidsen en het helpcentrum de meestgestelde vragen.",
  "forum.cta": "Ontdek gidsen",

  "forum.tabs.discussion": "Discussie",
  "forum.tabs.members": "Leden",
  "forum.tabs.about": "Over",
  "forum.tabs.admin": "Beheer",

  "forum.role.member": "Lid",
  "forum.role.moderator": "Moderator",
  "forum.role.admin": "Beheerder",

  "forum.moderation.hide": "Verbergen",
  "forum.moderation.approve": "Goedkeuren",
  "forum.moderation.delete": "Verwijderen",
  "forum.moderation.hiddenBadge": "Verborgen",
  "forum.moderation.confirmDeletePost": "Dit bericht definitief verwijderen? Dit kan niet ongedaan worden gemaakt.",
  "forum.moderation.confirmDeleteComment": "Deze reactie definitief verwijderen? Dit kan niet ongedaan worden gemaakt.",

  "forum.compose.placeholder": "Deel iets…",
  "forum.compose.button": "Bericht plaatsen",
  "forum.compose.loginPrompt": "Log in om iets te delen met de community.",
  "forum.compose.addImage": "Foto",
  "forum.compose.removeImage": "Afbeelding verwijderen",
  "forum.compose.uploading": "Afbeelding uploaden…",
  "forum.compose.postError": "Dat plaatsen lukte niet — probeer het opnieuw.",
  "forum.compose.uploadError": "Die afbeelding uploaden lukte niet — probeer het opnieuw.",

  "forum.post.like": "Leuk",
  "forum.post.liked": "Leuk gevonden",
  "forum.post.comments": "Reacties",
  "forum.post.views": "Weergaven",
  "forum.post.commentPlaceholder": "Schrijf een reactie…",
  "forum.post.commentButton": "Plaatsen",
  "forum.post.noComments": "Nog geen reacties — reageer als eerste.",
  "forum.post.loginToComment": "Log in om een reactie achter te laten.",
  "forum.post.imageAlt": "Afbeelding bij dit bericht",

  "forum.empty.title": "Nog geen berichten",
  "forum.empty.subtitle": "Start als eerste een gesprek.",
  "forum.loadError": "Het forum laden lukte niet — ververs de pagina.",

  "forum.members.title": "Leden",
  "forum.members.since": "Lid sinds",
  "forum.members.empty": "Nog geen leden.",

  "forum.about.title": "Over dit forum",
  "forum.about.description":
    "Een fijne plek waar studenten elkaar ontmoeten, vragen stellen en delen wat ze hebben geleerd over verhuizen naar en studeren in Nederland.",
  "forum.about.activity": "Activiteit — afgelopen 30 dagen",
  "forum.about.newPosts": "Nieuwe berichten",
  "forum.about.newMembers": "Nieuwe leden",
  "forum.about.totalMembers": "Leden",

  "auth.login.title": "Inloggen",
  "auth.login.subtitle": "Welkom terug bij de StudyNL-community.",
  "auth.login.submit": "Inloggen",
  "auth.login.submitting": "Bezig met inloggen…",
  "auth.login.switchPrompt": "Nog geen account?",
  "auth.login.switchAction": "Registreren",
  "auth.signup.title": "Maak je account aan",
  "auth.signup.subtitle": "Word lid van het StudyNL-communityforum.",
  "auth.signup.submit": "Registreren",
  "auth.signup.submitting": "Account aanmaken…",
  "auth.signup.switchPrompt": "Heb je al een account?",
  "auth.signup.switchAction": "Inloggen",
  "auth.field.name": "Naam",
  "auth.field.email": "E-mail",
  "auth.field.password": "Wachtwoord",
  "auth.logout": "Uitloggen",
  "auth.loggedInAs": "Ingelogd als",

  "admin.users.role": "Rol",
  "admin.users.status": "Status",
  "admin.users.joined": "Lid sinds",
  "admin.users.you": "(jij)",
  "admin.users.statusActive": "Actief",
  "admin.users.statusSuspended": "Geschorst",
  "admin.users.suspend": "Schorsen",
  "admin.users.reactivate": "Herstellen",
  "admin.users.delete": "Verwijderen",
  "admin.users.confirmDelete": "Dit lid en alles wat diegene heeft geplaatst verwijderen? Dit kan niet ongedaan worden gemaakt.",
  "admin.users.loadError": "Leden laden lukte niet.",

  "guide.back": "Alle gidsen",
  "guide.note":
    "We breiden deze gids uit met stappen, deadlines en checks. Bekijk hieronder gerelateerde gidsen of stel je persoonlijke verhuisplan samen.",
  "guide.related": "Gerelateerde gidsen",
  "guide.cta": "Mijn verhuisplan maken",
  "nav.tagline.prefix": "GEMAAKT DOOR AFGESTUDEERDEN",
  "nav.tagline.suffix": "VOOR STUDENTEN",

  "footer.copyright":
    "© 2035 StudyNL. Voorbeeld van de statische HTML-redesign.",
  "footer.l.studyNL": "Studeren in Nederland",
  "footer.l.scholarships": "Beurzen & financiering",
  "footer.l.cost": "Kosten van levensonderhoud",
  "footer.l.work": "Werken tijdens je studie",
  "footer.l.arrival": "Aankomstchecklist",
  "footer.l.enrolment": "Inschrijving",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "Forum",
  "footer.l.universities": "Universiteiten",
  "footer.l.fraternities": "Studentenverenigingen",
  "footer.l.visa": "Visum & verblijf",
  "footer.l.scams": "Vermijd oplichting",
  "footer.l.cities": "Stadsgidsen",
  "footer.l.finance": "Financiën & leningen",
  "footer.l.accommodation": "Huisvesting",
  "footer.l.partners": "Word partner",
  "footer.l.about": "Over ons",
  "footer.l.contact": "Contact",
  "footer.l.legal": "Juridisch",
  "footer.l.help": "Helpcentrum",

  "hero.badge": "+ Jouw gids voor studeren in NL",
  "hero.title": "Jouw duidelijke route om in Nederland te studeren.",
  "hero.subtitle":
    "Neem de belangrijke beslissingen in de juiste volgorde: studieroute, inschrijving, huisvesting, geld, werkregels en aankomst.",
  "hero.cta_primary": "Start je verhuizing",
  "hero.cta_secondary": "Bekijk gidsen",
  "hero.chip_enrolment": "Inschrijving uitgelegd",
  "hero.chip_housing": "Veilig huren",
  "hero.chip_arrival": "Aankomstplanning",
  "hero.card1_label": "Beursdeadlines",
  "hero.card1_value": "12 open",
  "hero.card2_label": "Huurfraudecheck",
  "hero.card2_value": "Eerst veilig",
  "hero.card3_label": "Aankomstchecklist",
  "hero.card3_value": "30 dagen",
  "hero.tag_startready": "Klaar om te starten",

  "popular.badge": "Meest bezochte beslissingen",
  "popular.title_line1": "Onze meest populaire",
  "popular.title_line2": "onderwerpen",
  "popular.subtitle":
    "Ontdek de onderwerpen die studenten het meest nodig hebben voor de verhuizing naar Nederland. Elk onderwerp opent een directe gids met stappen, deadlines en controles.",
  "popular.t1.title": "Studeren in Nederland",
  "popular.t1.blurb":
    "Begrijp het Nederlandse universitair systeem, opleidingen, toelating en planning.",
  "popular.t2.title": "Werken tijdens je studie",
  "popular.t2.blurb":
    "Werkuren, BSN, belastingen, contracten en wat je moet vermijden.",
  "popular.t3.title": "Beurzen & financiering",
  "popular.t3.blurb":
    "Vind beurzen, collegegeldhulp, budgetroutes en deadlines.",
  "popular.t4.title": "Aankomstchecklist",
  "popular.t4.blurb":
    "Stap-voor-stap taken voor je eerste 30 dagen.",
  "popular.t5.title": "Huisvesting",
  "popular.t5.blurb":
    "Platforms, waarschuwingen, contracten en geverifieerde partners.",
  "popular.t6.title": "Open dagen & inschrijven",
  "popular.t6.blurb":
    "Bezoekdagen, documenten, Studielink en inschrijvingsmijlpalen.",

  "moveplan.tag1": "Verhuisplan",
  "moveplan.title": "5 stappen naar een goede start",
  "moveplan.subtitle":
    "We brengen elke belangrijke studentenbeslissing in één duidelijk pad, van studiekeuze tot veilig settelen.",
  "moveplan.cta": "Maak mijn checklist",
  "moveplan.badge": "Begeleid pad",
  "moveplan.heading": "Een begeleid pad, geen lijst met links.",
  "moveplan.heading_blurb":
    "Studenten komen vaak met zorgen aan: welke universiteit, waar wonen, hoeveel geld, welke documenten en wat eerst. Wij maken er een heldere volgorde van.",
  "moveplan.s1.title": "Studieroute",
  "moveplan.s1.blurb":
    "Kies het juiste diploma, de universiteit en inschrijfperiode voordat je steden vergelijkt.",
  "moveplan.s2.title": "Geld & deadlines",
  "moveplan.s2.blurb":
    "Plan collegegeld, beurzen, maandkosten en datums die je verhuizing kunnen blokkeren.",
  "moveplan.s3.title": "Veilig huren",
  "moveplan.s3.blurb":
    "Check waarschuwingen, borg, contracten en veilige stappen voordat je betaalt.",
  "moveplan.s4.title": "Documenten",
  "moveplan.s4.blurb":
    "Regel inschrijving, visum, BSN, verzekering en aankomstdocumenten in de juiste volgorde.",

  "partners.badge": "Erkende partners",
  "partners.title": "Wij zijn erkende partners",
  "partners.subtitle":
    "Vertrouwde partners die verschillende delen van de studentenreis ondersteunen.",

  "help.badge": "Vind sneller antwoorden",
  "help.title": "Zoek op onderwerp, stad of vraag",
  "help.subtitle":
    "Studenten bladeren niet alleen door categorieën. Ze zoeken BSN, borg, DUO, visum, septemberinstroom en steden.",
  "help.placeholder": "Probeer: huurcontract voor aankomst",
  "help.tag1": "Visumdeadline",
  "help.tag2": "Goedkope huisvesting",
  "help.tag3": "Mag ik werken?",
  "help.tag4": "Maandbudget",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "Borg",

  "about.badge": "Over StudyNL",
  "about.title":
    "Een betrouwbaar studentennetwerk, geen blog.",
  "about.subtitle":
    "StudyNL helpt internationale studenten zich voor te bereiden op studeren in Nederland met praktische tips over huisvesting, geld, documenten, aankomst en veiligheid.",
  "about.v1.cat": "Belofte",
  "about.v1.title": "Advies geschreven voor internationale studenten",
  "about.v1.blurb": "Duidelijke taal, echte beslissingen en heldere stappen.",
  "about.v2.cat": "Veiligheid",
  "about.v2.title": "Duidelijke waarschuwingen over huren en betalen",
  "about.v2.blurb":
    "Studenten zien risico's voordat ze geld of documenten sturen.",
  "about.v3.cat": "Vertrouwen",
  "about.v3.title": "Partneraanbod duidelijk gelabeld",
  "about.v3.blurb": "Ondersteuningsopties worden transparant gepresenteerd.",

  "guides.badge1": "Gidsenpagina",
  "guides.badge2": "Gidsen",
  "guides.title": "Alles wat studenten zoeken voor de verhuizing.",
  "guides.subtitle":
    "Doorzoekbare bibliotheek voor aanmelding, geld, huren, juridisch, aankomst en studentenleven.",
  "guides.tab1": "Voor de aanmelding",
  "guides.tab2": "Geld",
  "guides.tab3": "Huisvesting",
  "guides.tab4": "Juridisch",
  "guides.tab5": "Aankomst",
  "guides.tab6": "Studentenleven",
  "guides.g1.cat": "Start",
  "guides.g1.title": "Studeren in Nederland",
  "guides.g1.blurb":
    "Nederlands universitair systeem, opleidingen, toelating en planning.",
  "guides.g2.cat": "Geld",
  "guides.g2.title": "Beurzen & financiering",
  "guides.g2.blurb": "Financieringsroutes, collegegeldhulp en deadlines.",
  "guides.g3.cat": "Budget",
  "guides.g3.title": "Kosten van levensonderhoud",
  "guides.g3.blurb": "Maandkosten per stad, collegegeld en vervoer.",
  "guides.g4.cat": "Werk",
  "guides.g4.title": "Werken tijdens je studie",
  "guides.g4.blurb":
    "Contracten, belastingen, BSN en toegestaan studentenwerk.",
  "guides.g5.cat": "Aankomst",
  "guides.g5.title": "Aankomstchecklist",
  "guides.g5.blurb": "Taken voor je eerste maand in Nederland.",
  "guides.g6.cat": "Toelating",
  "guides.g6.title": "Inschrijving",
  "guides.g6.blurb": "Documenten, Studielink en mijlpalen.",
  "guides.g7.cat": "Huisvesting",
  "guides.g7.title": "Huisvesting",
  "guides.g7.blurb":
    "Vind huisvesting en vermijd onveilige huursituaties.",
  "guides.g8.cat": "Juridisch",
  "guides.g8.title": "Visum & verblijf",
  "guides.g8.blurb":
    "Verblijfsvergunningen, MVV-basis en documentvolgorde.",
  "guides.g9.cat": "Veiligheid",
  "guides.g9.title": "Vermijd oplichting",
  "guides.g9.blurb":
    "Herken huurfraude en onveilige betaalverzoeken.",

  "helpc.badge": "Helpcentrum",
  "helpc.title": "Hoe kunnen we helpen?",
  "helpc.placeholder":
    "Zoek inschrijving, huisvesting, visum, werk, geld...",
  "helpc.q1": "Ik heb hulp nodig met Studielink",
  "helpc.q2": "Ik vond een huurwoning, is het veilig?",
  "helpc.q3": "Mag ik werken als student?",
  "helpc.q4": "Wat moet ik na aankomst doen?",
  "helpc.q5": "Hoeveel geld heb ik per maand nodig?",
  "helpc.q6": "Welke documenten voor aankomst?",
  "helpc.noResults":
    "Geen resultaten. Probeer een ander zoekwoord.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title":
    "Premium ondersteuning voor studenten met minder onbekenden.",
  "hubplus.subtitle":
    "Geverifieerde bronnen, prioriteitsondersteuning, aankomstsjablonen en partnerbegeleiding op één plek.",
  "hubplus.f1.title": "Geverifieerde huisvestingsroute",
  "hubplus.f1.blurb":
    "Verminder het risico bij je zoektocht naar huisvesting.",
  "hubplus.f2.title": "Prioriteits-Q&A",
  "hubplus.f2.blurb":
    "Stel specifieke vragen en krijg begeleide ondersteuning.",
  "hubplus.f3.title": "Aankomstsjablonen",
  "hubplus.f3.blurb":
    "Gebruik kant-en-klare checklists en planningstools.",

  "start.badge": "Start hier",
  "start.title": "Krijg je persoonlijke verhuisplan.",
  "start.subtitle":
    "Kies waar je in het proces bent en krijg de juiste checklist, deadlines en gidsen.",
  "start.s1.title": "Ik verken opleidingen",
  "start.s1.blurb":
    "Begrijp routes, universiteiten en aanmeldingsperiodes.",
  "start.s2.title": "Ik meld me nu aan",
  "start.s2.blurb":
    "Plan documenten, Studielink en inschrijfdeadlines.",
  "start.s3.title": "Ik ben aangenomen",
  "start.s3.blurb": "Regel huisvesting, geld, visum en verzekering.",
  "start.s4.title": "Ik kom binnenkort aan",
  "start.s4.blurb":
    "Regel BSN, stadsinschrijving en aankomstweek.",
};

const ro: Dict = {
  "nav.home": "Acasă",
  "nav.startHere": "Începe aici",
  "nav.about": "Despre",
  "nav.guides": "Ghiduri",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "Centru de ajutor",
  "nav.forum": "Forum",
  "nav.startMove": "Începe mutarea",
  "nav.changeLanguage": "Schimbă limba",
  "nav.menu": "Meniu",
  "nav.close": "Închide",

  "search.trigger": "Caută",
  "search.placeholder": "Caută ghiduri, subiecte de ajutor și pagini…",
  "search.hint": "Începe să scrii pentru a căuta pe StudyNL.",
  "search.empty": "Niciun rezultat găsit.",

  "notfound.badge": "404",
  "notfound.title": "Nu găsim această pagină.",
  "notfound.subtitle":
    "Pagina căutată poate a fost mutată sau nu există încă.",
  "notfound.home": "Înapoi la pagina principală",
  "notfound.guides": "Vezi ghidurile",

  "forum.badge": "Comunitate",
  "forum.title": "Întreabă studenții care s-au mutat deja.",
  "forum.subtitle":
    "Răspunsuri despre cazare, înscriere, bani și sosire de la cei care au trecut prin asta.",
  "forum.note":
    "Forumul se lansează în curând. Între timp, ghidurile și centrul de ajutor acoperă cele mai frecvente întrebări.",
  "forum.cta": "Explorează ghidurile",

  "forum.tabs.discussion": "Discuții",
  "forum.tabs.members": "Membri",
  "forum.tabs.about": "Despre",
  "forum.tabs.admin": "Admin",

  "forum.role.member": "Membru",
  "forum.role.moderator": "Moderator",
  "forum.role.admin": "Admin",

  "forum.moderation.hide": "Ascunde",
  "forum.moderation.approve": "Aprobă",
  "forum.moderation.delete": "Șterge",
  "forum.moderation.hiddenBadge": "Ascuns",
  "forum.moderation.confirmDeletePost": "Ștergi definitiv această postare? Această acțiune nu poate fi anulată.",
  "forum.moderation.confirmDeleteComment": "Ștergi definitiv acest comentariu? Această acțiune nu poate fi anulată.",

  "forum.compose.placeholder": "Distribuie ceva…",
  "forum.compose.button": "Creează o postare",
  "forum.compose.loginPrompt": "Conectează-te pentru a distribui ceva cu comunitatea.",
  "forum.compose.addImage": "Poză",
  "forum.compose.removeImage": "Elimină imaginea",
  "forum.compose.uploading": "Se încarcă imaginea…",
  "forum.compose.postError": "Nu am putut publica asta — încearcă din nou.",
  "forum.compose.uploadError": "Nu am putut încărca imaginea — încearcă din nou.",

  "forum.post.like": "Apreciază",
  "forum.post.liked": "Apreciat",
  "forum.post.comments": "Comentarii",
  "forum.post.views": "Vizualizări",
  "forum.post.commentPlaceholder": "Scrie un comentariu…",
  "forum.post.commentButton": "Postează",
  "forum.post.noComments": "Niciun comentariu încă — fii primul care răspunde.",
  "forum.post.loginToComment": "Conectează-te pentru a lăsa un comentariu.",
  "forum.post.imageAlt": "Imagine atașată acestei postări",

  "forum.empty.title": "Nicio postare încă",
  "forum.empty.subtitle": "Fii primul care începe o conversație.",
  "forum.loadError": "Nu am putut încărca forumul — reîmprospătează pagina.",

  "forum.members.title": "Membri",
  "forum.members.since": "Membru din",
  "forum.members.empty": "Niciun membru încă.",

  "forum.about.title": "Despre acest forum",
  "forum.about.description":
    "Un loc prietenos în care studenții se pot conecta, pot pune întrebări și pot împărtăși ce au învățat despre mutarea și studiul în Olanda.",
  "forum.about.activity": "Activitate — ultimele 30 de zile",
  "forum.about.newPosts": "Postări noi",
  "forum.about.newMembers": "Membri noi",
  "forum.about.totalMembers": "Membri",

  "auth.login.title": "Conectare",
  "auth.login.subtitle": "Bine ai revenit în comunitatea StudyNL.",
  "auth.login.submit": "Conectează-te",
  "auth.login.submitting": "Se conectează…",
  "auth.login.switchPrompt": "Nu ai cont?",
  "auth.login.switchAction": "Înregistrează-te",
  "auth.signup.title": "Creează-ți contul",
  "auth.signup.subtitle": "Alătură-te forumului comunității StudyNL.",
  "auth.signup.submit": "Înregistrează-te",
  "auth.signup.submitting": "Se creează contul…",
  "auth.signup.switchPrompt": "Ai deja un cont?",
  "auth.signup.switchAction": "Conectează-te",
  "auth.field.name": "Nume",
  "auth.field.email": "Email",
  "auth.field.password": "Parolă",
  "auth.logout": "Deconectare",
  "auth.loggedInAs": "Conectat ca",

  "admin.users.role": "Rol",
  "admin.users.status": "Stare",
  "admin.users.joined": "Membru din",
  "admin.users.you": "(tu)",
  "admin.users.statusActive": "Activ",
  "admin.users.statusSuspended": "Suspendat",
  "admin.users.suspend": "Suspendă",
  "admin.users.reactivate": "Reactivează",
  "admin.users.delete": "Șterge",
  "admin.users.confirmDelete": "Ștergi acest membru și tot ce a postat? Această acțiune nu poate fi anulată.",
  "admin.users.loadError": "Nu am putut încărca membrii.",

  "guide.back": "Toate ghidurile",
  "guide.note":
    "Extindem acest ghid cu pași, termene și verificări. Explorează ghidurile similare de mai jos sau creează-ți planul personalizat de mutare.",
  "guide.related": "Ghiduri similare",
  "guide.cta": "Creează-mi planul",
  "nav.tagline.prefix": "REALIZAT DE ABSOLVENȚI",
  "nav.tagline.suffix": "PENTRU STUDENȚI",

  "footer.copyright":
    "© 2035 StudyNL. Previzualizare a redesign-ului HTML.",
  "footer.l.studyNL": "Studii în Olanda",
  "footer.l.scholarships": "Burse & finanțare",
  "footer.l.cost": "Costul vieții",
  "footer.l.work": "Lucru în timpul studiilor",
  "footer.l.arrival": "Listă de sosire",
  "footer.l.enrolment": "Înscriere",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "Forum",
  "footer.l.universities": "Universități",
  "footer.l.fraternities": "Asociații studențești",
  "footer.l.visa": "Viză & rezidență",
  "footer.l.scams": "Evită escrocheriile",
  "footer.l.cities": "Ghiduri de oraș",
  "footer.l.finance": "Finanțe & împrumuturi",
  "footer.l.accommodation": "Cazare",
  "footer.l.partners": "Devino partener",
  "footer.l.about": "Despre",
  "footer.l.contact": "Contact",
  "footer.l.legal": "Legal",
  "footer.l.help": "Centru de ajutor",

  "hero.badge": "+ Ghidul tău pentru studii în NL",
  "hero.title": "Traseul tău clar pentru studii în Olanda.",
  "hero.subtitle":
    "Ia deciziile importante în ordinea corectă: traseu de studiu, înscriere, cazare, bani, reguli de muncă și sarcini de sosire.",
  "hero.cta_primary": "Începe mutarea",
  "hero.cta_secondary": "Răsfoiește ghidurile",
  "hero.chip_enrolment": "Înscriere explicată",
  "hero.chip_housing": "Siguranța cazării",
  "hero.chip_arrival": "Planificare sosire",
  "hero.card1_label": "Termene burse",
  "hero.card1_value": "12 deschise",
  "hero.card2_label": "Verificare escrocherii",
  "hero.card2_value": "Siguranța întâi",
  "hero.card3_label": "Listă de sosire",
  "hero.card3_value": "30 de zile",
  "hero.tag_startready": "Gata de plecare",

  "popular.badge": "Cele mai vizitate decizii",
  "popular.title_line1": "Cele mai populare",
  "popular.title_line2": "subiecte",
  "popular.subtitle":
    "Explorează subiectele de care studenții au cea mai mare nevoie înainte de mutare. Fiecare subiect deschide un ghid clar cu pași, termene și verificări.",
  "popular.t1.title": "Studii în Olanda",
  "popular.t1.blurb":
    "Înțelege sistemul universitar olandez, diplomele, admiterea și calendarul.",
  "popular.t2.title": "Lucru în timpul studiilor",
  "popular.t2.blurb":
    "Ore de lucru, BSN, taxe, contracte și ce să eviți.",
  "popular.t3.title": "Burse & finanțare",
  "popular.t3.blurb":
    "Găsește burse, ajutoare la taxe, planuri și termene.",
  "popular.t4.title": "Listă de sosire",
  "popular.t4.blurb":
    "Sarcini pas cu pas pentru primele 30 de zile.",
  "popular.t5.title": "Cazare",
  "popular.t5.blurb":
    "Platforme, semnale de alarmă, contracte și parteneri verificați.",
  "popular.t6.title": "Zile deschise & înscriere",
  "popular.t6.blurb":
    "Vizite, documente, Studielink și etape de înscriere.",

  "moveplan.tag1": "Plan de mutare",
  "moveplan.title": "5 pași pentru a ajunge pregătit",
  "moveplan.subtitle":
    "Organizăm fiecare decizie importantă într-un parcurs clar, de la alegerea studiilor la o instalare sigură.",
  "moveplan.cta": "Creează lista mea",
  "moveplan.badge": "Parcurs ghidat",
  "moveplan.heading": "Un parcurs ghidat, nu o listă de linkuri.",
  "moveplan.heading_blurb":
    "Studenții vin cu anxietate: care universitate, unde să locuiască, câți bani, ce documente și de unde să înceapă. Transformăm totul într-o secvență clară.",
  "moveplan.s1.title": "Traseu de studiu",
  "moveplan.s1.blurb":
    "Alege diploma potrivită, universitatea și perioada de aplicare înainte să compari orașe.",
  "moveplan.s2.title": "Bani & termene",
  "moveplan.s2.blurb":
    "Planifică taxe, burse, costuri lunare și date care îți pot bloca mutarea.",
  "moveplan.s3.title": "Siguranța cazării",
  "moveplan.s3.blurb":
    "Verifică semnalele, garanțiile, contractele și pașii siguri înainte să plătești.",
  "moveplan.s4.title": "Documente",
  "moveplan.s4.blurb":
    "Pregătește înscrierea, viza, BSN, asigurarea și documentele de sosire în ordinea corectă.",

  "partners.badge": "Parteneri aprobați",
  "partners.title": "Suntem parteneri aprobați",
  "partners.subtitle":
    "Parteneri de încredere care susțin diferite etape ale parcursului studențesc.",

  "help.badge": "Găsește răspunsuri mai repede",
  "help.title": "Caută după subiect, oraș sau întrebare",
  "help.subtitle":
    "Studenții nu navighează doar pe categorii. Caută BSN, garanție, DUO, viză, admitere de septembrie și orașe.",
  "help.placeholder": "Încearcă: contract de cazare înainte de sosire",
  "help.tag1": "Termen viză",
  "help.tag2": "Cazare ieftină",
  "help.tag3": "Pot să lucrez?",
  "help.tag4": "Buget lunar",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "Garanție",

  "about.badge": "Despre StudyNL",
  "about.title":
    "O rețea de sprijin de încredere, nu doar un blog.",
  "about.subtitle":
    "StudyNL ajută studenții internaționali să se pregătească pentru studii în Olanda cu sfaturi practice despre cazare, bani, documente, sosire și siguranță.",
  "about.v1.cat": "Promisiune",
  "about.v1.title": "Sfaturi scrise pentru studenți internaționali",
  "about.v1.blurb": "Limbaj clar, decizii reale și pași următori clari.",
  "about.v2.cat": "Siguranță",
  "about.v2.title": "Avertismente clare despre cazare și plăți",
  "about.v2.blurb":
    "Studenții văd riscurile înainte să trimită bani sau documente.",
  "about.v3.cat": "Încredere",
  "about.v3.title": "Ofertele partenerilor clar etichetate",
  "about.v3.blurb": "Opțiunile de sprijin sunt prezentate cu transparență.",

  "guides.badge1": "Pagina ghidurilor",
  "guides.badge2": "Ghiduri",
  "guides.title": "Tot ce caută studenții înainte de mutare.",
  "guides.subtitle":
    "Bibliotecă de ghiduri pentru aplicații, bani, cazare, sarcini legale, sosire și viață studențească.",
  "guides.tab1": "Înainte de aplicare",
  "guides.tab2": "Bani",
  "guides.tab3": "Cazare",
  "guides.tab4": "Legal",
  "guides.tab5": "Sosire",
  "guides.tab6": "Viață studențească",
  "guides.g1.cat": "Start",
  "guides.g1.title": "Studii în Olanda",
  "guides.g1.blurb":
    "Sistem universitar olandez, diplome, admitere și calendar.",
  "guides.g2.cat": "Bani",
  "guides.g2.title": "Burse & finanțare",
  "guides.g2.blurb": "Surse de finanțare, ajutoare și termene.",
  "guides.g3.cat": "Buget",
  "guides.g3.title": "Costul vieții",
  "guides.g3.blurb": "Costuri lunare pe oraș, taxe și transport.",
  "guides.g4.cat": "Muncă",
  "guides.g4.title": "Lucru în timpul studiilor",
  "guides.g4.blurb":
    "Contracte, taxe, BSN și munca studențească permisă.",
  "guides.g5.cat": "Sosire",
  "guides.g5.title": "Listă de sosire",
  "guides.g5.blurb": "Sarcini pentru prima lună în Olanda.",
  "guides.g6.cat": "Admitere",
  "guides.g6.title": "Înscriere",
  "guides.g6.blurb": "Documente, Studielink și etape de înscriere.",
  "guides.g7.cat": "Cazare",
  "guides.g7.title": "Cazare",
  "guides.g7.blurb":
    "Găsește cazare și evită situațiile nesigure.",
  "guides.g8.cat": "Legal",
  "guides.g8.title": "Viză & rezidență",
  "guides.g8.blurb":
    "Permise de ședere, baze MVV și ordinea documentelor.",
  "guides.g9.cat": "Siguranță",
  "guides.g9.title": "Evită escrocheriile",
  "guides.g9.blurb":
    "Recunoaște escrocheriile și cererile de plată nesigure.",

  "helpc.badge": "Centru de ajutor",
  "helpc.title": "Cu ce te putem ajuta?",
  "helpc.placeholder":
    "Caută înscriere, cazare, viză, muncă, bani...",
  "helpc.q1": "Am nevoie de ajutor cu Studielink",
  "helpc.q2": "Am găsit o chirie, e sigură?",
  "helpc.q3": "Pot lucra ca student?",
  "helpc.q4": "Ce să fac după sosire?",
  "helpc.q5": "De câți bani am nevoie pe lună?",
  "helpc.q6": "Ce documente înainte de sosire?",
  "helpc.noResults":
    "Niciun rezultat. Încearcă alt cuvânt cheie.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title":
    "Sprijin premium pentru studenți care vor mai puține necunoscute.",
  "hubplus.subtitle":
    "Resurse verificate, suport prioritar, șabloane de sosire și ghidare partener într-un singur loc.",
  "hubplus.f1.title": "Traseu de cazare verificat",
  "hubplus.f1.blurb": "Redu riscul căutării unei locuințe.",
  "hubplus.f2.title": "Q&A prioritar",
  "hubplus.f2.blurb":
    "Pune întrebări concrete și primește sprijin ghidat.",
  "hubplus.f3.title": "Șabloane de sosire",
  "hubplus.f3.blurb":
    "Folosește liste și unelte de planificare gata făcute.",

  "start.badge": "Începe aici",
  "start.title": "Obține planul tău personal de mutare.",
  "start.subtitle":
    "Alege unde ești în proces și primește lista, termenele și ghidurile potrivite.",
  "start.s1.title": "Explorez programe",
  "start.s1.blurb":
    "Înțelege rutele, universitățile și ferestrele de aplicare.",
  "start.s2.title": "Aplic acum",
  "start.s2.blurb": "Planifică documente, Studielink și termene.",
  "start.s3.title": "Am fost acceptat",
  "start.s3.blurb": "Gestionează cazare, bani, viză și asigurare.",
  "start.s4.title": "Sosesc curând",
  "start.s4.blurb":
    "Pregătește BSN, înregistrare oraș și săptămâna de sosire.",
};

const tr: Dict = {
  "nav.home": "Ana sayfa",
  "nav.startHere": "Buradan başla",
  "nav.about": "Hakkımızda",
  "nav.guides": "Rehberler",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "Yardım merkezi",
  "nav.forum": "Forum",
  "nav.startMove": "Taşınmaya başla",
  "nav.changeLanguage": "Dili değiştir",
  "nav.menu": "Menü",
  "nav.close": "Kapat",

  "search.trigger": "Ara",
  "search.placeholder": "Rehberlerde, yardım konularında ve sayfalarda ara…",
  "search.hint": "StudyNL'de aramak için yazmaya başla.",
  "search.empty": "Sonuç bulunamadı.",

  "notfound.badge": "404",
  "notfound.title": "Bu sayfayı bulamıyoruz.",
  "notfound.subtitle":
    "Aradığınız sayfa taşınmış olabilir veya henüz mevcut değil.",
  "notfound.home": "Ana sayfaya dön",
  "notfound.guides": "Rehberlere göz at",

  "forum.badge": "Topluluk",
  "forum.title": "Taşınmayı çoktan yapmış öğrencilere sor.",
  "forum.subtitle":
    "Konaklama, kayıt, para ve varış hakkında deneyimli öğrencilerden yanıtlar.",
  "forum.note":
    "Forum yakında açılıyor. Bu arada rehberlerimiz ve yardım merkezimiz en sık sorulan soruları kapsıyor.",
  "forum.cta": "Rehberleri keşfet",

  "forum.tabs.discussion": "Tartışma",
  "forum.tabs.members": "Üyeler",
  "forum.tabs.about": "Hakkında",
  "forum.tabs.admin": "Yönetim",

  "forum.role.member": "Üye",
  "forum.role.moderator": "Moderatör",
  "forum.role.admin": "Yönetici",

  "forum.moderation.hide": "Gizle",
  "forum.moderation.approve": "Onayla",
  "forum.moderation.delete": "Sil",
  "forum.moderation.hiddenBadge": "Gizli",
  "forum.moderation.confirmDeletePost": "Bu gönderi kalıcı olarak silinsin mi? Bu işlem geri alınamaz.",
  "forum.moderation.confirmDeleteComment": "Bu yorum kalıcı olarak silinsin mi? Bu işlem geri alınamaz.",

  "forum.compose.placeholder": "Bir şeyler paylaş…",
  "forum.compose.button": "Gönderi Oluştur",
  "forum.compose.loginPrompt": "Toplulukla bir şeyler paylaşmak için giriş yap.",
  "forum.compose.addImage": "Fotoğraf",
  "forum.compose.removeImage": "Görseli kaldır",
  "forum.compose.uploading": "Görsel yükleniyor…",
  "forum.compose.postError": "Gönderi paylaşılamadı — lütfen tekrar dene.",
  "forum.compose.uploadError": "Görsel yüklenemedi — lütfen tekrar dene.",

  "forum.post.like": "Beğen",
  "forum.post.liked": "Beğenildi",
  "forum.post.comments": "Yorumlar",
  "forum.post.views": "Görüntülenme",
  "forum.post.commentPlaceholder": "Bir yorum yaz…",
  "forum.post.commentButton": "Gönder",
  "forum.post.noComments": "Henüz yorum yok — ilk yanıtı sen yaz.",
  "forum.post.loginToComment": "Yorum yapmak için giriş yap.",
  "forum.post.imageAlt": "Bu gönderiye eklenen görsel",

  "forum.empty.title": "Henüz gönderi yok",
  "forum.empty.subtitle": "İlk konuşmayı sen başlat.",
  "forum.loadError": "Forum yüklenemedi — lütfen sayfayı yenile.",

  "forum.members.title": "Üyeler",
  "forum.members.since": "Üyelik tarihi",
  "forum.members.empty": "Henüz üye yok.",

  "forum.about.title": "Bu forum hakkında",
  "forum.about.description":
    "Öğrencilerin birbiriyle tanıştığı, soru sorduğu ve Hollanda'ya taşınma ile burada okumak üzerine öğrendiklerini paylaştığı samimi bir köşe.",
  "forum.about.activity": "Etkinlik — son 30 gün",
  "forum.about.newPosts": "Yeni gönderiler",
  "forum.about.newMembers": "Yeni üyeler",
  "forum.about.totalMembers": "Üyeler",

  "auth.login.title": "Giriş yap",
  "auth.login.subtitle": "StudyNL topluluğuna tekrar hoş geldin.",
  "auth.login.submit": "Giriş yap",
  "auth.login.submitting": "Giriş yapılıyor…",
  "auth.login.switchPrompt": "Hesabın yok mu?",
  "auth.login.switchAction": "Kayıt ol",
  "auth.signup.title": "Hesabını oluştur",
  "auth.signup.subtitle": "StudyNL topluluk forumuna katıl.",
  "auth.signup.submit": "Kayıt ol",
  "auth.signup.submitting": "Hesap oluşturuluyor…",
  "auth.signup.switchPrompt": "Zaten bir hesabın var mı?",
  "auth.signup.switchAction": "Giriş yap",
  "auth.field.name": "Ad",
  "auth.field.email": "E-posta",
  "auth.field.password": "Şifre",
  "auth.logout": "Çıkış yap",
  "auth.loggedInAs": "Giriş yapan",

  "admin.users.role": "Rol",
  "admin.users.status": "Durum",
  "admin.users.joined": "Katılma tarihi",
  "admin.users.you": "(sen)",
  "admin.users.statusActive": "Aktif",
  "admin.users.statusSuspended": "Askıya alındı",
  "admin.users.suspend": "Askıya al",
  "admin.users.reactivate": "Yeniden etkinleştir",
  "admin.users.delete": "Sil",
  "admin.users.confirmDelete": "Bu üye ve paylaştığı her şey silinsin mi? Bu işlem geri alınamaz.",
  "admin.users.loadError": "Üyeler yüklenemedi.",

  "guide.back": "Tüm rehberler",
  "guide.note":
    "Bu rehberi ayrıntılı adımlar, son tarihler ve kontrollerle genişletiyoruz. Aşağıdaki ilgili rehberlere göz atın veya kişisel taşınma planınızı oluşturun.",
  "guide.related": "İlgili rehberler",
  "guide.cta": "Taşınma planımı oluştur",
  "nav.tagline.prefix": "MEZUNLAR TARAFINDAN",
  "nav.tagline.suffix": "ÖĞRENCİLER İÇİN",

  "footer.copyright":
    "© 2035 StudyNL. Statik HTML yeniden tasarım önizlemesi.",
  "footer.l.studyNL": "Hollanda'da eğitim",
  "footer.l.scholarships": "Burs & finansman",
  "footer.l.cost": "Yaşam maliyeti",
  "footer.l.work": "Okurken çalışmak",
  "footer.l.arrival": "Varış listesi",
  "footer.l.enrolment": "Kayıt",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "Forum",
  "footer.l.universities": "Üniversiteler",
  "footer.l.fraternities": "Öğrenci dernekleri",
  "footer.l.visa": "Vize & ikamet",
  "footer.l.scams": "Dolandırıcılıktan kaçın",
  "footer.l.cities": "Şehir rehberleri",
  "footer.l.finance": "Finans & krediler",
  "footer.l.accommodation": "Konaklama",
  "footer.l.partners": "Partner ol",
  "footer.l.about": "Hakkımızda",
  "footer.l.contact": "İletişim",
  "footer.l.legal": "Yasal",
  "footer.l.help": "Yardım merkezi",

  "hero.badge": "+ Hollanda'da eğitim rehberin",
  "hero.title": "Hollanda'da eğitim için net rotanız.",
  "hero.subtitle":
    "Önemli kararları doğru sırada al: eğitim rotası, kayıt, konaklama, para, çalışma kuralları ve varış görevleri.",
  "hero.cta_primary": "Taşınmaya başla",
  "hero.cta_secondary": "Rehberlere bak",
  "hero.chip_enrolment": "Kayıt açıklandı",
  "hero.chip_housing": "Konaklama güvenliği",
  "hero.chip_arrival": "Varış planı",
  "hero.card1_label": "Burs son tarihleri",
  "hero.card1_value": "12 açık",
  "hero.card2_label": "Konaklama dolandırıcılık kontrolü",
  "hero.card2_value": "Önce güvenlik",
  "hero.card3_label": "Varış listesi",
  "hero.card3_value": "30 gün",
  "hero.tag_startready": "Hazır",

  "popular.badge": "En çok ziyaret edilen kararlar",
  "popular.title_line1": "En popüler",
  "popular.title_line2": "konularımız",
  "popular.subtitle":
    "Öğrencilerin Hollanda'ya taşınmadan önce en çok ihtiyaç duyduğu konuları keşfet. Her konu adım adım bir rehber açar.",
  "popular.t1.title": "Hollanda'da eğitim",
  "popular.t1.blurb":
    "Hollanda üniversite sistemini, dereceleri, kabulleri ve takvimi anla.",
  "popular.t2.title": "Okurken çalışmak",
  "popular.t2.blurb":
    "Çalışma saatleri, BSN, vergi, sözleşmeler ve kaçınılması gerekenler.",
  "popular.t3.title": "Burs & finansman",
  "popular.t3.blurb":
    "Burs, harç desteği, bütçe yolları ve son tarihler.",
  "popular.t4.title": "Varış listesi",
  "popular.t4.blurb":
    "İlk 30 gün için adım adım görevler.",
  "popular.t5.title": "Konaklama",
  "popular.t5.blurb":
    "Platformlar, uyarı işaretleri, sözleşmeler ve onaylı partnerler.",
  "popular.t6.title": "Açık günler & kayıt",
  "popular.t6.blurb":
    "Ziyaret günleri, başvuru belgeleri, Studielink ve kayıt aşamaları.",

  "moveplan.tag1": "Taşınma planı",
  "moveplan.title": "Hazır gelmek için 5 adım",
  "moveplan.subtitle":
    "Her önemli öğrenci kararını net bir yola döküyoruz, eğitim seçiminden güvenli yerleşmeye kadar.",
  "moveplan.cta": "Listemi oluştur",
  "moveplan.badge": "Yönlendirmeli yol",
  "moveplan.heading": "Yönlendirmeli bir yol, link yığını değil.",
  "moveplan.heading_blurb":
    "Öğrenciler genellikle endişeyle gelir: hangi üniversite, nerede yaşamalı, ne kadar para, hangi belgeler ve önce ne yapmalı. Biz bunu bir sıralamaya dönüştürüyoruz.",
  "moveplan.s1.title": "Eğitim rotası",
  "moveplan.s1.blurb":
    "Şehirleri karşılaştırmadan önce doğru dereceyi, üniversiteyi ve başvuru dönemini seç.",
  "moveplan.s2.title": "Para & son tarihler",
  "moveplan.s2.blurb":
    "Harç, burs, aylık masraflar ve taşınmayı engelleyebilecek tarihleri planla.",
  "moveplan.s3.title": "Konaklama güvenliği",
  "moveplan.s3.blurb":
    "Ödeme yapmadan önce uyarıları, depozitoyu, sözleşmeleri ve güvenli adımları kontrol et.",
  "moveplan.s4.title": "Belgeler",
  "moveplan.s4.blurb":
    "Kayıt, vize, BSN, sigorta ve varış belgelerini doğru sırada hazırla.",

  "partners.badge": "Onaylı partnerler",
  "partners.title": "Onaylı partnerleriz",
  "partners.subtitle":
    "Öğrenci yolculuğunun farklı kısımlarını destekleyen güvenilir partnerler.",

  "help.badge": "Cevapları daha hızlı bul",
  "help.title": "Konu, şehir veya soruya göre ara",
  "help.subtitle":
    "Öğrenciler sadece kategorilere bakmaz. BSN, depozito, DUO, vize, Eylül girişi ve şehir adları gibi şeyler arar.",
  "help.placeholder": "Dene: varıştan önce konaklama sözleşmesi",
  "help.tag1": "Vize son tarihi",
  "help.tag2": "Uygun konaklama",
  "help.tag3": "Çalışabilir miyim?",
  "help.tag4": "Aylık bütçe",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "Kira depozitosu",

  "about.badge": "StudyNL hakkında",
  "about.title":
    "Güvenilir bir öğrenci destek ağı, sadece bir blog değil.",
  "about.subtitle":
    "StudyNL uluslararası öğrencilere Hollanda'da eğitime hazırlanmaları için konaklama, para, belgeler, varış ve güvenlik konusunda pratik rehberlik sunar.",
  "about.v1.cat": "Söz",
  "about.v1.title": "Uluslararası öğrenciler için yazılmış tavsiyeler",
  "about.v1.blurb":
    "Açık dil, gerçek kararlar ve net sonraki adımlar.",
  "about.v2.cat": "Güvenlik",
  "about.v2.title": "Konaklama ve ödemeler için net uyarılar",
  "about.v2.blurb":
    "Öğrenciler para veya belge göndermeden önce riskleri görür.",
  "about.v3.cat": "Güven",
  "about.v3.title": "Partner teklifleri açıkça etiketlenmiştir",
  "about.v3.blurb": "Destek seçenekleri şeffaflıkla sunulur.",

  "guides.badge1": "Rehberler sayfası",
  "guides.badge2": "Rehberler",
  "guides.title": "Öğrencilerin taşınmadan önce aradığı her şey.",
  "guides.subtitle":
    "Başvurular, para, konaklama, hukuki işler, varış ve öğrenci yaşamı için aranabilir rehber kütüphanesi.",
  "guides.tab1": "Başvurudan önce",
  "guides.tab2": "Para",
  "guides.tab3": "Konaklama",
  "guides.tab4": "Hukuki",
  "guides.tab5": "Varış",
  "guides.tab6": "Öğrenci yaşamı",
  "guides.g1.cat": "Başlangıç",
  "guides.g1.title": "Hollanda'da eğitim",
  "guides.g1.blurb":
    "Hollanda üniversite sistemi, dereceler, kabuller ve takvim.",
  "guides.g2.cat": "Para",
  "guides.g2.title": "Burs & finansman",
  "guides.g2.blurb": "Finansman yolları, harç desteği ve son tarihler.",
  "guides.g3.cat": "Bütçe",
  "guides.g3.title": "Yaşam maliyeti",
  "guides.g3.blurb": "Şehre göre aylık maliyetler, harç ve ulaşım.",
  "guides.g4.cat": "İş",
  "guides.g4.title": "Okurken çalışmak",
  "guides.g4.blurb":
    "Sözleşmeler, vergi, BSN ve izin verilen öğrenci işi.",
  "guides.g5.cat": "Varış",
  "guides.g5.title": "Varış listesi",
  "guides.g5.blurb": "Hollanda'da ilk ayın için görevler.",
  "guides.g6.cat": "Kabul",
  "guides.g6.title": "Kayıt",
  "guides.g6.blurb": "Belgeler, Studielink ve kayıt aşamaları.",
  "guides.g7.cat": "Konaklama",
  "guides.g7.title": "Konaklama",
  "guides.g7.blurb":
    "Konaklama bul ve güvenli olmayan kira durumlarından kaçın.",
  "guides.g8.cat": "Hukuki",
  "guides.g8.title": "Vize & ikamet",
  "guides.g8.blurb":
    "Oturma izinleri, MVV temelleri ve belge sırası.",
  "guides.g9.cat": "Güvenlik",
  "guides.g9.title": "Dolandırıcılıktan kaçın",
  "guides.g9.blurb":
    "Kira dolandırıcılıklarını ve güvensiz ödeme taleplerini tanı.",

  "helpc.badge": "Yardım merkezi",
  "helpc.title": "Nasıl yardımcı olabiliriz?",
  "helpc.placeholder":
    "Kayıt, konaklama, vize, iş, para ara...",
  "helpc.q1": "Studielink konusunda yardım gerek",
  "helpc.q2": "Bir kiralık buldum, güvenli mi?",
  "helpc.q3": "Öğrenci olarak çalışabilir miyim?",
  "helpc.q4": "Vardıktan sonra ne yapmalıyım?",
  "helpc.q5": "Ayda ne kadar paraya ihtiyacım var?",
  "helpc.q6": "Vardan önce hangi belgeler?",
  "helpc.noResults": "Sonuç yok. Başka bir anahtar kelime dene.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title":
    "Daha az bilinmeyen isteyen öğrenciler için premium destek.",
  "hubplus.subtitle":
    "Onaylı kaynaklar, öncelikli destek, varış şablonları ve partner rehberliği tek yerde.",
  "hubplus.f1.title": "Onaylı konaklama yolu",
  "hubplus.f1.blurb": "Konaklama arayışındaki riski azalt.",
  "hubplus.f2.title": "Öncelikli Soru-Cevap",
  "hubplus.f2.blurb": "Spesifik sorular sor ve yönlendirmeli destek al.",
  "hubplus.f3.title": "Varış şablonları",
  "hubplus.f3.blurb":
    "Hazır listeler ve planlama araçlarını kullan.",

  "start.badge": "Buradan başla",
  "start.title": "Kişisel taşınma planını al.",
  "start.subtitle":
    "Süreçte nerede olduğunu seç, doğru liste, son tarihler ve rehberleri al.",
  "start.s1.title": "Program araştırıyorum",
  "start.s1.blurb":
    "Yolları, üniversiteleri ve başvuru dönemlerini anla.",
  "start.s2.title": "Şu an başvuruyorum",
  "start.s2.blurb":
    "Belgeleri, Studielink ve son tarihleri planla.",
  "start.s3.title": "Kabul edildim",
  "start.s3.blurb": "Konaklama, para, vize ve sigortayı hallet.",
  "start.s4.title": "Yakında varıyorum",
  "start.s4.blurb":
    "BSN, şehir kaydı ve varış haftasını hazırla.",
};

const zh: Dict = {
  "nav.home": "首页",
  "nav.startHere": "从这里开始",
  "nav.about": "关于我们",
  "nav.guides": "指南",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "帮助中心",
  "nav.forum": "论坛",
  "nav.startMove": "开始搬迁",
  "nav.changeLanguage": "切换语言",
  "nav.menu": "菜单",
  "nav.close": "关闭",

  "search.trigger": "搜索",
  "search.placeholder": "搜索指南、帮助主题和页面…",
  "search.hint": "开始输入以搜索 StudyNL。",
  "search.empty": "未找到结果。",

  "notfound.badge": "404",
  "notfound.title": "找不到该页面。",
  "notfound.subtitle": "您查找的页面可能已移动，或尚不存在。",
  "notfound.home": "返回首页",
  "notfound.guides": "浏览指南",

  "forum.badge": "社区",
  "forum.title": "向已经完成搬迁的学生提问。",
  "forum.subtitle": "从过来人那里获得关于住宿、注册、资金和到达的解答。",
  "forum.note":
    "论坛即将上线。在此期间，我们的指南和帮助中心涵盖了最常见的问题。",
  "forum.cta": "探索指南",

  "forum.tabs.discussion": "讨论",
  "forum.tabs.members": "成员",
  "forum.tabs.about": "关于",
  "forum.tabs.admin": "管理",

  "forum.role.member": "成员",
  "forum.role.moderator": "版主",
  "forum.role.admin": "管理员",

  "forum.moderation.hide": "隐藏",
  "forum.moderation.approve": "通过",
  "forum.moderation.delete": "删除",
  "forum.moderation.hiddenBadge": "已隐藏",
  "forum.moderation.confirmDeletePost": "确定要永久删除这条帖子吗？此操作无法撤销。",
  "forum.moderation.confirmDeleteComment": "确定要永久删除这条评论吗？此操作无法撤销。",

  "forum.compose.placeholder": "分享点什么…",
  "forum.compose.button": "发帖",
  "forum.compose.loginPrompt": "登录后即可与大家分享。",
  "forum.compose.addImage": "照片",
  "forum.compose.removeImage": "删除图片",
  "forum.compose.uploading": "图片上传中…",
  "forum.compose.postError": "发布失败—请重试。",
  "forum.compose.uploadError": "图片上传失败—请重试。",

  "forum.post.like": "赞",
  "forum.post.liked": "已赞",
  "forum.post.comments": "评论",
  "forum.post.views": "浏览",
  "forum.post.commentPlaceholder": "写下你的评论…",
  "forum.post.commentButton": "发布",
  "forum.post.noComments": "还没有评论—抢个沙发吧。",
  "forum.post.loginToComment": "登录后即可发表评论。",
  "forum.post.imageAlt": "帖子中的图片",

  "forum.empty.title": "还没有帖子",
  "forum.empty.subtitle": "来发第一条帖子吧。",
  "forum.loadError": "论坛加载失败—请刷新页面。",

  "forum.members.title": "成员",
  "forum.members.since": "加入于",
  "forum.members.empty": "还没有成员。",

  "forum.about.title": "关于本论坛",
  "forum.about.description": "这里是同学们交流提问、分享荷兰留学生活经验的温暖角落。",
  "forum.about.activity": "活跃情况—最近30天",
  "forum.about.newPosts": "新帖子",
  "forum.about.newMembers": "新成员",
  "forum.about.totalMembers": "成员总数",

  "auth.login.title": "登录",
  "auth.login.subtitle": "欢迎回到 StudyNL 社区。",
  "auth.login.submit": "登录",
  "auth.login.submitting": "登录中…",
  "auth.login.switchPrompt": "还没有账号？",
  "auth.login.switchAction": "注册",
  "auth.signup.title": "创建账号",
  "auth.signup.subtitle": "加入 StudyNL 社区论坛。",
  "auth.signup.submit": "注册",
  "auth.signup.submitting": "创建账号中…",
  "auth.signup.switchPrompt": "已经有账号了？",
  "auth.signup.switchAction": "登录",
  "auth.field.name": "姓名",
  "auth.field.email": "邮箱",
  "auth.field.password": "密码",
  "auth.logout": "退出登录",
  "auth.loggedInAs": "已登录为",

  "admin.users.role": "角色",
  "admin.users.status": "状态",
  "admin.users.joined": "加入时间",
  "admin.users.you": "（你）",
  "admin.users.statusActive": "正常",
  "admin.users.statusSuspended": "已封禁",
  "admin.users.suspend": "封禁",
  "admin.users.reactivate": "解封",
  "admin.users.delete": "删除",
  "admin.users.confirmDelete": "删除该成员及其发布的所有内容？此操作无法撤销。",
  "admin.users.loadError": "成员加载失败。",

  "guide.back": "所有指南",
  "guide.note":
    "我们正在为本指南补充详细步骤、截止日期和检查清单。请浏览下方的相关指南，或制定您的个性化搬迁计划。",
  "guide.related": "相关指南",
  "guide.cta": "制定我的搬迁计划",
  "nav.tagline.prefix": "由毕业生打造",
  "nav.tagline.suffix": "服务学生",

  "footer.copyright": "© 2035 StudyNL。静态 HTML 重设计预览。",
  "footer.l.studyNL": "在荷兰留学",
  "footer.l.scholarships": "奖学金与资助",
  "footer.l.cost": "生活成本",
  "footer.l.work": "在校期间工作",
  "footer.l.arrival": "抵达清单",
  "footer.l.enrolment": "注册",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "论坛",
  "footer.l.universities": "大学",
  "footer.l.fraternities": "学生社团",
  "footer.l.visa": "签证与居留",
  "footer.l.scams": "防范欺诈",
  "footer.l.cities": "城市指南",
  "footer.l.finance": "金融与贷款",
  "footer.l.accommodation": "住宿",
  "footer.l.partners": "成为合作伙伴",
  "footer.l.about": "关于我们",
  "footer.l.contact": "联系方式",
  "footer.l.legal": "法律信息",
  "footer.l.help": "帮助中心",

  "hero.badge": "+ 你的荷兰留学指南",
  "hero.title": "清晰的荷兰留学之路。",
  "hero.subtitle":
    "按正确顺序做出重要决定：学业路径、注册、住宿、资金、工作规定与抵达事项。",
  "hero.cta_primary": "开始搬迁",
  "hero.cta_secondary": "浏览指南",
  "hero.chip_enrolment": "注册说明",
  "hero.chip_housing": "住宿安全",
  "hero.chip_arrival": "抵达规划",
  "hero.card1_label": "奖学金截止日",
  "hero.card1_value": "12 项开放",
  "hero.card2_label": "住宿欺诈检查",
  "hero.card2_value": "安全优先",
  "hero.card3_label": "抵达清单",
  "hero.card3_value": "30 天",
  "hero.tag_startready": "准备就绪",

  "popular.badge": "最受关注的决定",
  "popular.title_line1": "最受欢迎的",
  "popular.title_line2": "主题",
  "popular.subtitle":
    "探索学生在搬到荷兰之前最需要的话题。每个话题都会打开一份直接的指南，包含步骤、截止日期和核对清单。",
  "popular.t1.title": "在荷兰留学",
  "popular.t1.blurb": "了解荷兰的大学体系、学位、招生与时间表。",
  "popular.t2.title": "在校期间工作",
  "popular.t2.blurb": "工时、BSN、税务、合同以及应避免的事项。",
  "popular.t3.title": "奖学金与资助",
  "popular.t3.blurb": "查找助学金、学费补助、预算路径与截止日期。",
  "popular.t4.title": "抵达清单",
  "popular.t4.blurb": "落地后前 30 天的逐步任务。",
  "popular.t5.title": "住宿",
  "popular.t5.blurb": "住房平台、警示信号、合同与认证合作伙伴。",
  "popular.t6.title": "开放日与注册",
  "popular.t6.blurb": "参观日、申请文件、Studielink 与注册要点。",

  "moveplan.tag1": "搬迁计划",
  "moveplan.title": "做好准备的 5 步",
  "moveplan.subtitle":
    "我们将每一项重要的学生决定整理为一条清晰路径，从选专业到安全安顿。",
  "moveplan.cta": "生成我的清单",
  "moveplan.badge": "引导式路径",
  "moveplan.heading": "一条引导式路径，而不是一堆链接。",
  "moveplan.heading_blurb":
    "学生抵达时通常充满焦虑：选哪所大学、住在哪里、需要多少钱、需要哪些文件、先做什么。我们把这些变成一个清晰的顺序。",
  "moveplan.s1.title": "学业路径",
  "moveplan.s1.blurb": "在比较城市之前，选择合适的学位、大学路径和申请窗口。",
  "moveplan.s2.title": "资金与截止日",
  "moveplan.s2.blurb": "规划学费、奖学金、月度开销以及可能延误搬迁的日期。",
  "moveplan.s3.title": "住宿安全",
  "moveplan.s3.blurb": "付款前检查警示信号、押金、合同与安全步骤。",
  "moveplan.s4.title": "文件",
  "moveplan.s4.blurb": "按正确顺序准备注册、签证、BSN、保险与抵达文件。",

  "partners.badge": "认证合作伙伴",
  "partners.title": "我们是认证合作伙伴",
  "partners.subtitle": "在学生旅程不同阶段提供支持的可信合作伙伴。",

  "help.badge": "更快找到答案",
  "help.title": "按主题、城市或问题搜索",
  "help.subtitle":
    "学生不仅按类别浏览。他们还会搜索 BSN、租房押金、DUO、签证、九月入学和城市名。",
  "help.placeholder": "试试：抵达前的住房合同",
  "help.tag1": "签证截止日",
  "help.tag2": "便宜住宿",
  "help.tag3": "我可以工作吗？",
  "help.tag4": "月度预算",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "租房押金",

  "about.badge": "关于 StudyNL",
  "about.title": "一个可信赖的学生支持网络，而非博客。",
  "about.subtitle":
    "StudyNL 为国际学生在荷兰留学提供实用指导，涵盖住宿、资金、文件、抵达与安全。",
  "about.v1.cat": "承诺",
  "about.v1.title": "为国际学生撰写的建议",
  "about.v1.blurb": "通俗的语言、真实的决定与清晰的下一步。",
  "about.v2.cat": "安全",
  "about.v2.title": "围绕住宿与付款的清晰警示",
  "about.v2.blurb": "学生在汇款或寄送文件前能看到风险。",
  "about.v3.cat": "信任",
  "about.v3.title": "合作伙伴信息清晰标注",
  "about.v3.blurb": "支持选项以透明方式呈现。",

  "guides.badge1": "指南页面",
  "guides.badge2": "指南",
  "guides.title": "学生在搬迁前所需要的一切。",
  "guides.subtitle":
    "可搜索的指南库，涵盖申请、资金、住宿、法律事务、抵达与学生生活。",
  "guides.tab1": "申请前",
  "guides.tab2": "资金",
  "guides.tab3": "住宿",
  "guides.tab4": "法律",
  "guides.tab5": "抵达",
  "guides.tab6": "学生生活",
  "guides.g1.cat": "开始",
  "guides.g1.title": "在荷兰留学",
  "guides.g1.blurb": "荷兰大学体系、学位、招生与时间表。",
  "guides.g2.cat": "资金",
  "guides.g2.title": "奖学金与资助",
  "guides.g2.blurb": "资金来源、学费支持与截止日期。",
  "guides.g3.cat": "预算",
  "guides.g3.title": "生活成本",
  "guides.g3.blurb": "按城市的月度开销、学费与交通。",
  "guides.g4.cat": "工作",
  "guides.g4.title": "在校期间工作",
  "guides.g4.blurb": "合同、税务、BSN 与允许的学生工作。",
  "guides.g5.cat": "抵达",
  "guides.g5.title": "抵达清单",
  "guides.g5.blurb": "你在荷兰第一个月的任务。",
  "guides.g6.cat": "招生",
  "guides.g6.title": "注册",
  "guides.g6.blurb": "文件、Studielink 与注册节点。",
  "guides.g7.cat": "住宿",
  "guides.g7.title": "住宿",
  "guides.g7.blurb": "找到住房并避免不安全的租房情况。",
  "guides.g8.cat": "法律",
  "guides.g8.title": "签证与居留",
  "guides.g8.blurb": "居留许可、MVV 基础与文件顺序。",
  "guides.g9.cat": "安全",
  "guides.g9.title": "防范欺诈",
  "guides.g9.blurb": "识别租房欺诈与不安全的付款请求。",

  "helpc.badge": "帮助中心",
  "helpc.title": "我们能帮你什么？",
  "helpc.placeholder": "搜索注册、住宿、签证、工作、资金……",
  "helpc.q1": "Studielink 需要帮助",
  "helpc.q2": "我找到一个出租房，安全吗？",
  "helpc.q3": "学生可以工作吗？",
  "helpc.q4": "抵达后我该做什么？",
  "helpc.q5": "每月需要多少钱？",
  "helpc.q6": "抵达前需要哪些文件？",
  "helpc.noResults": "无结果。请尝试其他关键词。",

  "hubplus.badge": "Hub Plus",
  "hubplus.title": "为想要减少未知的学生提供高级支持。",
  "hubplus.subtitle":
    "经验证的资源、优先支持、抵达模板与合作伙伴指导，集中一处。",
  "hubplus.f1.title": "经验证的住房路径",
  "hubplus.f1.blurb": "降低住房搜索中的风险。",
  "hubplus.f2.title": "优先问答",
  "hubplus.f2.blurb": "提出具体问题并获得引导式支持。",
  "hubplus.f3.title": "抵达模板",
  "hubplus.f3.blurb": "使用现成的清单与计划工具。",

  "start.badge": "从这里开始",
  "start.title": "获取你的个人搬迁计划。",
  "start.subtitle": "选择你所处的阶段，获取相应的清单、截止日期与指南。",
  "start.s1.title": "我在了解项目",
  "start.s1.blurb": "了解路径、大学与申请窗口。",
  "start.s2.title": "我正在申请",
  "start.s2.blurb": "规划文件、Studielink 与截止日期。",
  "start.s3.title": "我已被录取",
  "start.s3.blurb": "处理住宿、资金、签证与保险。",
  "start.s4.title": "我即将抵达",
  "start.s4.blurb": "准备 BSN、城市登记与抵达周。",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.startHere": "ابدأ هنا",
  "nav.about": "من نحن",
  "nav.guides": "أدلة",
  "nav.hubPlus": "Hub Plus",
  "nav.helpCentre": "مركز المساعدة",
  "nav.forum": "المنتدى",
  "nav.startMove": "ابدأ انتقالك",
  "nav.changeLanguage": "تغيير اللغة",
  "nav.menu": "القائمة",
  "nav.close": "إغلاق",

  "search.trigger": "بحث",
  "search.placeholder": "ابحث في الأدلة ومواضيع المساعدة والصفحات…",
  "search.hint": "ابدأ الكتابة للبحث في StudyNL.",
  "search.empty": "لا توجد نتائج.",

  "notfound.badge": "404",
  "notfound.title": "لا يمكننا العثور على هذه الصفحة.",
  "notfound.subtitle":
    "قد تكون الصفحة التي تبحث عنها قد نُقلت أو لم تُنشأ بعد.",
  "notfound.home": "العودة إلى الرئيسية",
  "notfound.guides": "تصفّح الأدلة",

  "forum.badge": "المجتمع",
  "forum.title": "اسأل الطلاب الذين انتقلوا بالفعل.",
  "forum.subtitle":
    "احصل على إجابات حول السكن والتسجيل والمال والوصول ممن مرّوا بالتجربة.",
  "forum.note":
    "المنتدى قيد الإطلاق قريبًا. في هذه الأثناء، تغطي أدلتنا ومركز المساعدة أكثر الأسئلة شيوعًا.",
  "forum.cta": "استكشف الأدلة",

  "forum.tabs.discussion": "النقاش",
  "forum.tabs.members": "الأعضاء",
  "forum.tabs.about": "نبذة",
  "forum.tabs.admin": "الإدارة",

  "forum.role.member": "عضو",
  "forum.role.moderator": "مشرف",
  "forum.role.admin": "مسؤول",

  "forum.moderation.hide": "إخفاء",
  "forum.moderation.approve": "الموافقة",
  "forum.moderation.delete": "حذف",
  "forum.moderation.hiddenBadge": "مخفي",
  "forum.moderation.confirmDeletePost": "هل تريد حذف هذا المنشور نهائيًا؟ لا يمكن التراجع عن هذا الإجراء.",
  "forum.moderation.confirmDeleteComment": "هل تريد حذف هذا التعليق نهائيًا؟ لا يمكن التراجع عن هذا الإجراء.",

  "forum.compose.placeholder": "شارك شيئًا…",
  "forum.compose.button": "إنشاء منشور",
  "forum.compose.loginPrompt": "سجّل الدخول لتشارك شيئًا مع المجتمع.",
  "forum.compose.addImage": "صورة",
  "forum.compose.removeImage": "إزالة الصورة",
  "forum.compose.uploading": "جارٍ رفع الصورة…",
  "forum.compose.postError": "تعذّر نشر ذلك — يرجى المحاولة مرة أخرى.",
  "forum.compose.uploadError": "تعذّر رفع الصورة — يرجى المحاولة مرة أخرى.",

  "forum.post.like": "إعجاب",
  "forum.post.liked": "أعجبني",
  "forum.post.comments": "التعليقات",
  "forum.post.views": "المشاهدات",
  "forum.post.commentPlaceholder": "اكتب تعليقًا…",
  "forum.post.commentButton": "نشر",
  "forum.post.noComments": "لا توجد تعليقات بعد — كن أول من يرد.",
  "forum.post.loginToComment": "سجّل الدخول لإضافة تعليق.",
  "forum.post.imageAlt": "صورة مرفقة بهذا المنشور",

  "forum.empty.title": "لا توجد منشورات بعد",
  "forum.empty.subtitle": "كن أول من يبدأ نقاشًا.",
  "forum.loadError": "تعذّر تحميل المنتدى — يرجى تحديث الصفحة.",

  "forum.members.title": "الأعضاء",
  "forum.members.since": "عضو منذ",
  "forum.members.empty": "لا يوجد أعضاء بعد.",

  "forum.about.title": "عن هذا المنتدى",
  "forum.about.description":
    "مكان ودود يلتقي فيه الطلاب، يطرحون أسئلتهم، ويشاركون ما تعلّموه عن الانتقال إلى هولندا والدراسة فيها.",
  "forum.about.activity": "النشاط — آخر 30 يومًا",
  "forum.about.newPosts": "منشورات جديدة",
  "forum.about.newMembers": "أعضاء جدد",
  "forum.about.totalMembers": "الأعضاء",

  "auth.login.title": "تسجيل الدخول",
  "auth.login.subtitle": "أهلًا بعودتك إلى مجتمع StudyNL.",
  "auth.login.submit": "تسجيل الدخول",
  "auth.login.submitting": "جارٍ تسجيل الدخول…",
  "auth.login.switchPrompt": "ليس لديك حساب؟",
  "auth.login.switchAction": "إنشاء حساب",
  "auth.signup.title": "أنشئ حسابك",
  "auth.signup.subtitle": "انضم إلى منتدى مجتمع StudyNL.",
  "auth.signup.submit": "إنشاء حساب",
  "auth.signup.submitting": "جارٍ إنشاء الحساب…",
  "auth.signup.switchPrompt": "لديك حساب بالفعل؟",
  "auth.signup.switchAction": "تسجيل الدخول",
  "auth.field.name": "الاسم",
  "auth.field.email": "البريد الإلكتروني",
  "auth.field.password": "كلمة المرور",
  "auth.logout": "تسجيل الخروج",
  "auth.loggedInAs": "مسجّل الدخول باسم",

  "admin.users.role": "الدور",
  "admin.users.status": "الحالة",
  "admin.users.joined": "تاريخ الانضمام",
  "admin.users.you": "(أنت)",
  "admin.users.statusActive": "نشط",
  "admin.users.statusSuspended": "موقوف",
  "admin.users.suspend": "إيقاف",
  "admin.users.reactivate": "إعادة التفعيل",
  "admin.users.delete": "حذف",
  "admin.users.confirmDelete": "هل تريد حذف هذا العضو وكل ما نشره؟ لا يمكن التراجع عن هذا الإجراء.",
  "admin.users.loadError": "تعذّر تحميل الأعضاء.",

  "guide.back": "كل الأدلة",
  "guide.note":
    "نعمل على توسيع هذا الدليل بخطوات ومواعيد وقوائم تحقق. تصفّح الأدلة ذات الصلة أدناه أو أنشئ خطة انتقالك الشخصية.",
  "guide.related": "أدلة ذات صلة",
  "guide.cta": "أنشئ خطة انتقالي",
  "nav.tagline.prefix": "من إعداد الخريجين",
  "nav.tagline.suffix": "للطلاب",

  "footer.copyright":
    "© 2035 StudyNL. معاينة لإعادة تصميم HTML الثابت.",
  "footer.l.studyNL": "الدراسة في هولندا",
  "footer.l.scholarships": "المنح والتمويل",
  "footer.l.cost": "تكاليف المعيشة",
  "footer.l.work": "العمل أثناء الدراسة",
  "footer.l.arrival": "قائمة الوصول",
  "footer.l.enrolment": "التسجيل",
  "footer.l.hubPlus": "Hub Plus",
  "footer.l.forum": "المنتدى",
  "footer.l.universities": "الجامعات",
  "footer.l.fraternities": "الاتحادات الطلابية",
  "footer.l.visa": "التأشيرة والإقامة",
  "footer.l.scams": "تجنّب الاحتيال",
  "footer.l.cities": "أدلة المدن",
  "footer.l.finance": "التمويل والقروض",
  "footer.l.accommodation": "السكن",
  "footer.l.partners": "كن شريكًا",
  "footer.l.about": "من نحن",
  "footer.l.contact": "التواصل",
  "footer.l.legal": "قانوني",
  "footer.l.help": "مركز المساعدة",

  "hero.badge": "+ دليلك للدراسة في هولندا",
  "hero.title": "مسارك الواضح للدراسة في هولندا.",
  "hero.subtitle":
    "اتخذ القرارات المهمة بالترتيب الصحيح: مسار الدراسة، التسجيل، السكن، المال، قواعد العمل ومهام الوصول.",
  "hero.cta_primary": "ابدأ انتقالك",
  "hero.cta_secondary": "تصفح الأدلة",
  "hero.chip_enrolment": "شرح التسجيل",
  "hero.chip_housing": "أمان السكن",
  "hero.chip_arrival": "خطة الوصول",
  "hero.card1_label": "مواعيد المنح",
  "hero.card1_value": "12 مفتوحة",
  "hero.card2_label": "فحص احتيال السكن",
  "hero.card2_value": "الأمان أولاً",
  "hero.card3_label": "قائمة الوصول",
  "hero.card3_value": "30 يومًا",
  "hero.tag_startready": "جاهز للانطلاق",

  "popular.badge": "أكثر القرارات زيارة",
  "popular.title_line1": "أكثر المواضيع",
  "popular.title_line2": "شعبية",
  "popular.subtitle":
    "اكتشف المواضيع التي يحتاجها الطلاب أكثر قبل الانتقال إلى هولندا. كل موضوع يفتح دليلًا واضحًا بالخطوات والمواعيد.",
  "popular.t1.title": "الدراسة في هولندا",
  "popular.t1.blurb":
    "افهم النظام الجامعي الهولندي والشهادات والقبول والمواعيد.",
  "popular.t2.title": "العمل أثناء الدراسة",
  "popular.t2.blurb":
    "ساعات العمل وBSN والضرائب والعقود وما يجب تجنّبه.",
  "popular.t3.title": "المنح والتمويل",
  "popular.t3.blurb":
    "ابحث عن المنح ودعم الرسوم وخيارات الميزانية والمواعيد.",
  "popular.t4.title": "قائمة الوصول",
  "popular.t4.blurb":
    "مهام خطوة بخطوة لأول 30 يومًا بعد الوصول.",
  "popular.t5.title": "السكن",
  "popular.t5.blurb":
    "منصات السكن وعلامات التحذير والعقود وشركاء موثوقون.",
  "popular.t6.title": "الأيام المفتوحة والتسجيل",
  "popular.t6.blurb":
    "أيام الزيارة، الوثائق، Studielink ومراحل التسجيل.",

  "moveplan.tag1": "خطة الانتقال",
  "moveplan.title": "5 خطوات للوصول جاهزًا",
  "moveplan.subtitle":
    "نُنظّم كل قرار طلابي مهم في مسار واحد واضح، من اختيار الدراسة إلى الاستقرار الآمن.",
  "moveplan.cta": "أنشئ قائمتي",
  "moveplan.badge": "مسار موجَّه",
  "moveplan.heading": "مسار موجَّه، وليس قائمة روابط.",
  "moveplan.heading_blurb":
    "يصل الطلاب عادةً وهم قلقون: أي جامعة، أين يسكنون، كم من المال، أي وثائق وماذا أولاً. نُحوّل ذلك إلى تسلسل واضح.",
  "moveplan.s1.title": "مسار الدراسة",
  "moveplan.s1.blurb":
    "اختر الشهادة المناسبة والجامعة وفترة التقديم قبل مقارنة المدن.",
  "moveplan.s2.title": "المال والمواعيد",
  "moveplan.s2.blurb":
    "خطط للرسوم والمنح والتكاليف الشهرية والمواعيد التي قد تؤخّر انتقالك.",
  "moveplan.s3.title": "أمان السكن",
  "moveplan.s3.blurb":
    "افحص علامات التحذير والودائع والعقود قبل الدفع.",
  "moveplan.s4.title": "الوثائق",
  "moveplan.s4.blurb":
    "جهّز التسجيل والتأشيرة وBSN والتأمين ووثائق الوصول بالترتيب الصحيح.",

  "partners.badge": "شركاء معتمدون",
  "partners.title": "نحن شركاء معتمدون",
  "partners.subtitle":
    "شركاء موثوقون يدعمون مراحل مختلفة من رحلة الطالب.",

  "help.badge": "اعثر على إجابات أسرع",
  "help.title": "ابحث بالموضوع أو المدينة أو السؤال",
  "help.subtitle":
    "لا يكتفي الطلاب بتصفّح الفئات. يبحثون عن BSN والوديعة وDUO والتأشيرة وقبول سبتمبر وأسماء المدن.",
  "help.placeholder": "جرّب: عقد السكن قبل الوصول",
  "help.tag1": "موعد التأشيرة",
  "help.tag2": "سكن اقتصادي",
  "help.tag3": "هل يمكنني العمل؟",
  "help.tag4": "الميزانية الشهرية",
  "help.tag5": "Studielink",
  "help.tag6": "BSN",
  "help.tag7": "وديعة الإيجار",

  "about.badge": "حول StudyNL",
  "about.title": "شبكة دعم طلابية موثوقة، وليست مجرد مدونة.",
  "about.subtitle":
    "تساعد StudyNL الطلاب الدوليين في الاستعداد للدراسة في هولندا بإرشاد عملي حول السكن والمال والوثائق والوصول والأمان.",
  "about.v1.cat": "وعد",
  "about.v1.title": "نصائح مكتوبة للطلاب الدوليين",
  "about.v1.blurb": "لغة بسيطة وقرارات حقيقية وخطوات تالية واضحة.",
  "about.v2.cat": "أمان",
  "about.v2.title": "تحذيرات واضحة حول السكن والمدفوعات",
  "about.v2.blurb":
    "يرى الطلاب المخاطر قبل إرسال الأموال أو الوثائق.",
  "about.v3.cat": "ثقة",
  "about.v3.title": "عروض الشركاء موسومة بوضوح",
  "about.v3.blurb": "تُقدَّم خيارات الدعم بشفافية.",

  "guides.badge1": "صفحة الأدلة",
  "guides.badge2": "الأدلة",
  "guides.title": "كل ما يبحث عنه الطلاب قبل الانتقال.",
  "guides.subtitle":
    "مكتبة أدلة قابلة للبحث للتقديم والمال والسكن والقانون والوصول وحياة الطالب.",
  "guides.tab1": "قبل التقديم",
  "guides.tab2": "المال",
  "guides.tab3": "السكن",
  "guides.tab4": "قانوني",
  "guides.tab5": "الوصول",
  "guides.tab6": "حياة الطالب",
  "guides.g1.cat": "البداية",
  "guides.g1.title": "الدراسة في هولندا",
  "guides.g1.blurb":
    "النظام الجامعي الهولندي والشهادات والقبول والمواعيد.",
  "guides.g2.cat": "المال",
  "guides.g2.title": "المنح والتمويل",
  "guides.g2.blurb": "مسارات التمويل ودعم الرسوم والمواعيد.",
  "guides.g3.cat": "ميزانية",
  "guides.g3.title": "تكاليف المعيشة",
  "guides.g3.blurb":
    "التكاليف الشهرية حسب المدينة والرسوم والمواصلات.",
  "guides.g4.cat": "العمل",
  "guides.g4.title": "العمل أثناء الدراسة",
  "guides.g4.blurb":
    "العقود والضرائب وBSN والعمل الطلابي المسموح.",
  "guides.g5.cat": "الوصول",
  "guides.g5.title": "قائمة الوصول",
  "guides.g5.blurb": "مهام لأول شهر لك في هولندا.",
  "guides.g6.cat": "قبول",
  "guides.g6.title": "التسجيل",
  "guides.g6.blurb": "الوثائق وStudielink ومراحل التسجيل.",
  "guides.g7.cat": "السكن",
  "guides.g7.title": "السكن",
  "guides.g7.blurb":
    "ابحث عن سكن وتجنّب مواقف الإيجار غير الآمنة.",
  "guides.g8.cat": "قانوني",
  "guides.g8.title": "التأشيرة والإقامة",
  "guides.g8.blurb":
    "تصاريح الإقامة وأساسيات MVV وترتيب الوثائق.",
  "guides.g9.cat": "أمان",
  "guides.g9.title": "تجنّب الاحتيال",
  "guides.g9.blurb":
    "تعرّف على عمليات احتيال الإيجار وطلبات الدفع غير الآمنة.",

  "helpc.badge": "مركز المساعدة",
  "helpc.title": "كيف يمكننا المساعدة؟",
  "helpc.placeholder":
    "ابحث عن التسجيل أو السكن أو التأشيرة أو العمل أو المال...",
  "helpc.q1": "أحتاج مساعدة في Studielink",
  "helpc.q2": "وجدت سكنًا للإيجار، هل هو آمن؟",
  "helpc.q3": "هل يمكنني العمل كطالب؟",
  "helpc.q4": "ماذا أفعل بعد الوصول؟",
  "helpc.q5": "كم من المال أحتاج شهريًا؟",
  "helpc.q6": "أي وثائق أحتاج قبل الوصول؟",
  "helpc.noResults": "لا توجد نتائج. جرّب كلمة مفتاحية أخرى.",

  "hubplus.badge": "Hub Plus",
  "hubplus.title": "دعم مميّز للطلاب الذين يريدون مفاجآت أقل.",
  "hubplus.subtitle":
    "موارد موثوقة ودعم ذو أولوية وقوالب وصول وإرشاد شركاء في مكان واحد.",
  "hubplus.f1.title": "مسار سكن موثوق",
  "hubplus.f1.blurb": "قلّل المخاطر في بحثك عن السكن.",
  "hubplus.f2.title": "أسئلة وأجوبة ذات أولوية",
  "hubplus.f2.blurb": "اطرح أسئلة محددة واحصل على دعم موجَّه.",
  "hubplus.f3.title": "قوالب الوصول",
  "hubplus.f3.blurb":
    "استخدم قوائم وأدوات تخطيط جاهزة.",

  "start.badge": "ابدأ هنا",
  "start.title": "احصل على خطة انتقالك الشخصية.",
  "start.subtitle":
    "اختر مرحلتك في العملية واحصل على القائمة والمواعيد والأدلة المناسبة.",
  "start.s1.title": "أستكشف البرامج",
  "start.s1.blurb": "افهم المسارات والجامعات وفترات التقديم.",
  "start.s2.title": "أتقدّم الآن",
  "start.s2.blurb":
    "خطّط للوثائق وStudielink ومواعيد التسجيل.",
  "start.s3.title": "تم قبولي",
  "start.s3.blurb":
    "تعامل مع السكن والمال والتأشيرة والتأمين.",
  "start.s4.title": "أصل قريبًا",
  "start.s4.blurb":
    "جهّز BSN وتسجيل المدينة وأسبوع الوصول.",
};

export const TRANSLATIONS: Record<LangCode, Dict> = {
  en,
  de,
  fr,
  it,
  nl,
  ro,
  tr,
  zh,
  ar,
};

export function translate(lang: LangCode, key: string): string {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}
