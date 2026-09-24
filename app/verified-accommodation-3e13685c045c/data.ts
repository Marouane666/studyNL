// Verified Accommodation: listing model + sample data for the preview.
//
// The shape follows the brief ("Verified Accommodation & Hub Plus Premium
// Listings Brief", September 2026) field for field, so it can become the
// database table later without the pages changing. Every listing below is
// SAMPLE DATA: invented properties, invented contacts (example.com), for
// reviewing the experience only.

export type Tier = "verified" | "hubplus";

export type PropertyType =
  | "room"
  | "studio"
  | "apartment"
  | "sharedApartment"
  | "sharedHouse"
  | "studentResidence"
  | "entireHouse";

export type Furnished = "furnished" | "part" | "unfurnished";
export type Utilities = "included" | "excluded" | "partial";
/** "let" covers both "Let" and "No Longer Available" in the brief. */
export type Status = "available" | "reserved" | "let";

export type UniversityDistance = {
  university: string;
  km: number;
  /** Estimated public transport time, in minutes. */
  transitMin: number;
};

export type Listing = {
  id: string;
  tier: Tier;
  title: string;
  city: string;
  area: string;
  /** Postcode area only (e.g. "1091"), never the full address. */
  postcode: string;
  /** Map centre. For approximate listings this is deliberately off the building. */
  lat: number;
  lng: number;
  approximateLocation: boolean;

  type: PropertyType;
  /** 0 = studio. */
  bedrooms: number;
  bathrooms: number;
  bathroom: "private" | "shared";
  kitchen: "private" | "shared";
  sizeM2: number;
  furnished: Furnished;

  // Costs, kept apart so the headline rent never hides a mandatory extra.
  rent: number;
  utilities: Utilities;
  /** Monthly utilities cost when not (fully) included. */
  utilitiesCost: number | null;
  serviceCharges: number | null;
  deposit: number;
  /** One-off administration or other fees. */
  adminFees: number | null;

  status: Status;
  /** ISO date; null = available now. */
  availableFrom: string | null;
  minTenancyMonths: number;
  registrationPossible: boolean;
  guarantorRequired: boolean;

  rules: {
    couples?: boolean;
    studentsOnly?: boolean;
    pets?: boolean;
    smoking?: boolean;
    energyLabel?: string;
    maxOccupancy?: number;
    incomeRequirement?: string;
  };

  universities: UniversityDistance[];
  transport: string[];
  /** Short, scannable description blocks (the brief asks for no walls of text). */
  description: { heading: string; points: string[] }[];

  photos: number;
  floorPlan: boolean;
  videoTour: boolean;
  virtualTour: boolean;

  contact: { name: string; email: string; phone: string };
  /** ISO date the listing went live, for "Newest". */
  listedAt: string;
};

export const TYPE_LABEL: Record<PropertyType, string> = {
  room: "Room",
  studio: "Studio",
  apartment: "Apartment",
  sharedApartment: "Shared apartment",
  sharedHouse: "Shared house",
  studentResidence: "Student residence",
  entireHouse: "Entire house",
};

export const FURNISHED_LABEL: Record<Furnished, string> = {
  furnished: "Furnished",
  part: "Part-furnished",
  unfurnished: "Unfurnished",
};

export const UTILITIES_LABEL: Record<Utilities, string> = {
  included: "Utilities included",
  excluded: "Utilities not included",
  partial: "Utilities partially included",
};

export const UNIVERSITIES = [
  "University of Amsterdam",
  "Vrije Universiteit Amsterdam",
  "Delft University of Technology",
  "Erasmus University Rotterdam",
  "Leiden University",
  "Utrecht University",
  "University of Groningen",
  "Maastricht University",
  "Eindhoven University of Technology",
  "Tilburg University",
];

export const LISTINGS: Listing[] = [
  {
    id: "plantage-studio",
    tier: "verified",
    title: "Bright studio near Artis",
    city: "Amsterdam",
    area: "Plantage",
    postcode: "1018",
    lat: 52.3664,
    lng: 4.9165,
    approximateLocation: true,
    type: "studio",
    bedrooms: 0,
    bathrooms: 1,
    bathroom: "private",
    kitchen: "private",
    sizeM2: 28,
    furnished: "furnished",
    rent: 1295,
    utilities: "partial",
    utilitiesCost: 60,
    serviceCharges: 35,
    deposit: 2590,
    adminFees: 150,
    status: "available",
    availableFrom: null,
    minTenancyMonths: 12,
    registrationPossible: true,
    guarantorRequired: false,
    rules: { couples: false, studentsOnly: true, pets: false, smoking: false, energyLabel: "B", maxOccupancy: 1 },
    universities: [
      { university: "University of Amsterdam", km: 1.4, transitMin: 9 },
      { university: "Vrije Universiteit Amsterdam", km: 7.8, transitMin: 28 },
    ],
    transport: ["Tram 14 — 2 min walk", "Weesperplein metro — 8 min walk"],
    description: [
      { heading: "The property", points: ["Self-contained studio on the second floor of a renovated canal-side building", "Large south-facing window, lots of daylight"] },
      { heading: "Layout", points: ["Living/sleeping area with double bed", "Private kitchenette with two-ring hob and combi oven", "Private shower room with toilet"] },
      { heading: "Condition & furnishing", points: ["Renovated 2024, new flooring throughout", "Bed, desk, chair, wardrobe and sofa included"] },
      { heading: "Local area", points: ["Quiet residential street beside the Artis zoo gardens", "Supermarket and cafés within 5 minutes"] },
    ],
    photos: 6,
    floorPlan: true,
    videoTour: false,
    virtualTour: false,
    contact: { name: "Canal Student Homes", email: "lettings@canalstudenthomes.example.com", phone: "+31 20 000 0101" },
    listedAt: "2026-09-18",
  },
  {
    id: "delft-room",
    tier: "verified",
    title: "Room in student house, TU Delft campus side",
    city: "Delft",
    area: "Wippolder",
    postcode: "2613",
    lat: 52.0035,
    lng: 4.3698,
    approximateLocation: true,
    type: "room",
    bedrooms: 1,
    bathrooms: 1,
    bathroom: "shared",
    kitchen: "shared",
    sizeM2: 14,
    furnished: "part",
    rent: 545,
    utilities: "included",
    utilitiesCost: null,
    serviceCharges: 20,
    deposit: 545,
    adminFees: null,
    status: "available",
    availableFrom: "2026-11-01",
    minTenancyMonths: 6,
    registrationPossible: true,
    guarantorRequired: false,
    rules: { couples: false, studentsOnly: true, pets: false, smoking: false, energyLabel: "C", maxOccupancy: 1 },
    universities: [{ university: "Delft University of Technology", km: 0.9, transitMin: 6 }],
    transport: ["Bus 69 — 3 min walk", "Delft Campus station — 12 min walk"],
    description: [
      { heading: "The property", points: ["One of five rooms in a friendly student house", "Bike shed and small garden"] },
      { heading: "Layout", points: ["Your own lockable room", "Shared kitchen, bathroom and living room"] },
      { heading: "Furnishing", points: ["Bed and desk included; bring your own extras"] },
    ],
    photos: 4,
    floorPlan: false,
    videoTour: false,
    virtualTour: false,
    contact: { name: "Delft Rooms BV", email: "rooms@delftrooms.example.com", phone: "+31 15 000 0202" },
    listedAt: "2026-09-12",
  },
  {
    id: "rotterdam-residence",
    tier: "verified",
    title: "Studio in modern student residence",
    city: "Rotterdam",
    area: "Kralingen",
    postcode: "3062",
    lat: 51.9178,
    lng: 4.5245,
    approximateLocation: false,
    type: "studentResidence",
    bedrooms: 0,
    bathrooms: 1,
    bathroom: "private",
    kitchen: "private",
    sizeM2: 22,
    furnished: "furnished",
    rent: 875,
    utilities: "included",
    utilitiesCost: null,
    serviceCharges: 45,
    deposit: 875,
    adminFees: 100,
    status: "available",
    availableFrom: null,
    minTenancyMonths: 10,
    registrationPossible: true,
    guarantorRequired: true,
    rules: { couples: false, studentsOnly: true, pets: false, smoking: false, energyLabel: "A", maxOccupancy: 1 },
    universities: [{ university: "Erasmus University Rotterdam", km: 0.6, transitMin: 5 }],
    transport: ["Kralingse Zoom metro — 7 min walk"],
    description: [
      { heading: "The property", points: ["Purpose-built residence with 24/7 reception", "Gym, study rooms and bike storage"] },
      { heading: "Layout", points: ["Private studio with kitchenette and en-suite bathroom"] },
    ],
    photos: 5,
    floorPlan: true,
    videoTour: true,
    virtualTour: false,
    contact: { name: "Kralingen Student Living", email: "hello@kralingenliving.example.com", phone: "+31 10 000 0303" },
    listedAt: "2026-09-20",
  },
  {
    id: "groningen-shared",
    tier: "verified",
    title: "Room in shared apartment near Zernike",
    city: "Groningen",
    area: "Paddepoel",
    postcode: "9742",
    lat: 53.2355,
    lng: 6.5496,
    approximateLocation: true,
    type: "sharedApartment",
    bedrooms: 1,
    bathrooms: 1,
    bathroom: "shared",
    kitchen: "shared",
    sizeM2: 16,
    furnished: "unfurnished",
    rent: 455,
    utilities: "excluded",
    utilitiesCost: 75,
    serviceCharges: null,
    deposit: 910,
    adminFees: null,
    status: "reserved",
    availableFrom: "2026-10-15",
    minTenancyMonths: 12,
    registrationPossible: false,
    guarantorRequired: false,
    rules: { couples: false, studentsOnly: true, pets: false, smoking: false, energyLabel: "D" },
    universities: [{ university: "University of Groningen", km: 1.8, transitMin: 10 }],
    transport: ["Bus 15 — 2 min walk"],
    description: [
      { heading: "The property", points: ["Room in a three-bedroom apartment shared with two students"] },
      { heading: "Good to know", points: ["Municipal registration is not possible at this address — check before you commit"] },
    ],
    photos: 3,
    floorPlan: false,
    videoTour: false,
    virtualTour: false,
    contact: { name: "Noord Kamers", email: "info@noordkamers.example.com", phone: "+31 50 000 0404" },
    listedAt: "2026-09-02",
  },
  {
    id: "utrecht-apartment",
    tier: "verified",
    title: "One-bedroom apartment by the Singel",
    city: "Utrecht",
    area: "Binnenstad",
    postcode: "3511",
    lat: 52.0907,
    lng: 5.1214,
    approximateLocation: true,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    bathroom: "private",
    kitchen: "private",
    sizeM2: 42,
    furnished: "part",
    rent: 1450,
    utilities: "excluded",
    utilitiesCost: 140,
    serviceCharges: 40,
    deposit: 2900,
    adminFees: 250,
    status: "available",
    availableFrom: "2026-10-01",
    minTenancyMonths: 12,
    registrationPossible: true,
    guarantorRequired: true,
    rules: { couples: true, studentsOnly: false, pets: false, smoking: false, energyLabel: "C", maxOccupancy: 2, incomeRequirement: "Gross income or guarantor of 3× the monthly rent" },
    universities: [{ university: "Utrecht University", km: 3.1, transitMin: 14 }],
    transport: ["Utrecht Centraal — 10 min walk", "Bus 28 to De Uithof — 3 min walk"],
    description: [
      { heading: "The property", points: ["Top-floor apartment in a historic building on the canal ring"] },
      { heading: "Layout", points: ["Separate bedroom, living room with open kitchen, bathroom with bath"] },
    ],
    photos: 7,
    floorPlan: true,
    videoTour: false,
    virtualTour: true,
    contact: { name: "Singel Verhuur", email: "verhuur@singel.example.com", phone: "+31 30 000 0505" },
    listedAt: "2026-09-15",
  },
  {
    id: "maastricht-let",
    tier: "verified",
    title: "Studio in Wyck, close to the station",
    city: "Maastricht",
    area: "Wyck",
    postcode: "6221",
    lat: 50.849,
    lng: 5.7003,
    approximateLocation: true,
    type: "studio",
    bedrooms: 0,
    bathrooms: 1,
    bathroom: "private",
    kitchen: "private",
    sizeM2: 25,
    furnished: "furnished",
    rent: 780,
    utilities: "included",
    utilitiesCost: null,
    serviceCharges: null,
    deposit: 1560,
    adminFees: null,
    status: "let",
    availableFrom: null,
    minTenancyMonths: 12,
    registrationPossible: true,
    guarantorRequired: false,
    rules: { studentsOnly: true, energyLabel: "B" },
    universities: [{ university: "Maastricht University", km: 1.2, transitMin: 8 }],
    transport: ["Maastricht station — 4 min walk"],
    description: [{ heading: "The property", points: ["Compact studio above a café street"] }],
    photos: 3,
    floorPlan: false,
    videoTour: false,
    virtualTour: false,
    contact: { name: "Wyck Wonen", email: "info@wyckwonen.example.com", phone: "+31 43 000 0606" },
    listedAt: "2026-08-20",
  },
  {
    id: "zuid-penthouse",
    tier: "hubplus",
    title: "Designer two-bedroom in Amsterdam-Zuid",
    city: "Amsterdam",
    area: "Zuid",
    postcode: "1077",
    lat: 52.3448,
    lng: 4.8686,
    approximateLocation: false,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    bathroom: "private",
    kitchen: "private",
    sizeM2: 74,
    furnished: "furnished",
    rent: 2350,
    utilities: "partial",
    utilitiesCost: 90,
    serviceCharges: 60,
    deposit: 4700,
    adminFees: 200,
    status: "available",
    availableFrom: "2026-10-15",
    minTenancyMonths: 12,
    registrationPossible: true,
    guarantorRequired: true,
    rules: { couples: true, studentsOnly: false, pets: false, smoking: false, energyLabel: "A", maxOccupancy: 3, incomeRequirement: "Guarantor or proof of funds for 12 months" },
    universities: [
      { university: "Vrije Universiteit Amsterdam", km: 1.6, transitMin: 8 },
      { university: "University of Amsterdam", km: 4.2, transitMin: 18 },
    ],
    transport: ["Amsterdam Zuid station — 6 min walk", "Tram 5 — 1 min walk"],
    description: [
      { heading: "The property", points: ["Newly finished apartment with balcony and lift", "Ideal to share with a friend: two equal double bedrooms"] },
      { heading: "Layout", points: ["Two double bedrooms, each with its own bathroom", "Open-plan living and kitchen with dishwasher"] },
      { heading: "Condition & furnishing", points: ["Designer furniture, washer-dryer, fibre internet ready"] },
      { heading: "Local area", points: ["Next to the Zuidas business district and Beatrixpark"] },
    ],
    photos: 9,
    floorPlan: true,
    videoTour: true,
    virtualTour: true,
    contact: { name: "Zuidas Residences", email: "members@zuidasresidences.example.com", phone: "+31 20 000 0707" },
    listedAt: "2026-09-22",
  },
  {
    id: "leiden-canal-house",
    tier: "hubplus",
    title: "Room in restored canal house, Leiden centre",
    city: "Leiden",
    area: "Binnenstad",
    postcode: "2311",
    lat: 52.1583,
    lng: 4.4893,
    approximateLocation: true,
    type: "sharedHouse",
    bedrooms: 1,
    bathrooms: 1,
    bathroom: "private",
    kitchen: "shared",
    sizeM2: 20,
    furnished: "furnished",
    rent: 795,
    utilities: "included",
    utilitiesCost: null,
    serviceCharges: 25,
    deposit: 1590,
    adminFees: null,
    status: "available",
    availableFrom: null,
    minTenancyMonths: 10,
    registrationPossible: true,
    guarantorRequired: false,
    rules: { couples: false, studentsOnly: true, pets: false, smoking: false, energyLabel: "C", maxOccupancy: 1 },
    universities: [{ university: "Leiden University", km: 0.7, transitMin: 5 }],
    transport: ["Leiden Centraal — 12 min walk"],
    description: [
      { heading: "The property", points: ["Room with private en-suite in a listed 17th-century canal house", "Four residents, all Leiden students"] },
      { heading: "Layout", points: ["Your own room and bathroom", "Shared kitchen and garden room"] },
    ],
    photos: 8,
    floorPlan: true,
    videoTour: false,
    virtualTour: false,
    contact: { name: "Rapenburg Rooms", email: "hubplus@rapenburgrooms.example.com", phone: "+31 71 000 0808" },
    listedAt: "2026-09-21",
  },
  {
    id: "eindhoven-house",
    tier: "hubplus",
    title: "Entire three-bedroom house for friends",
    city: "Eindhoven",
    area: "Strijp",
    postcode: "5616",
    lat: 51.4478,
    lng: 5.4561,
    approximateLocation: true,
    type: "entireHouse",
    bedrooms: 3,
    bathrooms: 2,
    bathroom: "private",
    kitchen: "private",
    sizeM2: 96,
    furnished: "part",
    rent: 1890,
    utilities: "excluded",
    utilitiesCost: 210,
    serviceCharges: null,
    deposit: 3780,
    adminFees: 250,
    status: "available",
    availableFrom: "2026-11-15",
    minTenancyMonths: 12,
    registrationPossible: true,
    guarantorRequired: true,
    rules: { couples: true, studentsOnly: false, pets: true, smoking: false, energyLabel: "B", maxOccupancy: 4 },
    universities: [{ university: "Eindhoven University of Technology", km: 3.4, transitMin: 15 }],
    transport: ["Bus 401 — 5 min walk", "Eindhoven Strijp-S station — 8 min walk"],
    description: [
      { heading: "The property", points: ["Terraced family house with garden, let as a whole", "Suits three or four students sharing"] },
      { heading: "Layout", points: ["Three bedrooms upstairs, two bathrooms", "Large living room and kitchen downstairs"] },
    ],
    photos: 7,
    floorPlan: true,
    videoTour: true,
    virtualTour: false,
    contact: { name: "Strijp Homes", email: "members@strijphomes.example.com", phone: "+31 40 000 0909" },
    listedAt: "2026-09-10",
  },
];

export function getListing(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}

const EUR = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const euro = (n: number) => EUR.format(n);

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function bedroomsLabel(l: Pick<Listing, "bedrooms">) {
  return l.bedrooms === 0 ? "Studio" : `${l.bedrooms} bedroom${l.bedrooms > 1 ? "s" : ""}`;
}

/** "Available now" / "Available from 01/11/2026" / "Reserved" / "No longer available". */
export function statusLabel(l: Pick<Listing, "status" | "availableFrom">) {
  if (l.status === "let") return "No longer available";
  if (l.status === "reserved") return "Reserved";
  if (!l.availableFrom || l.availableFrom <= new Date().toISOString().slice(0, 10)) return "Available now";
  return `Available from ${formatDate(l.availableFrom)}`;
}

export function nearestUniversity(l: Listing, preferred?: string): UniversityDistance | undefined {
  if (preferred) {
    const match = l.universities.find((u) => u.university === preferred);
    if (match) return match;
  }
  return [...l.universities].sort((a, b) => a.km - b.km)[0];
}
