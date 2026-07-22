// Shared city catalogue, the source of truth for both the cities index
// (`app/cities/page.tsx`) and the city detail route (`app/cities/[slug]/page.tsx`).

export type CityHousingPressure = "very-high" | "high" | "moderate";

export type CityOfficialLink = {
  label: string;
  href: string;
  org: string;
};

export type City = {
  /** URL slug under /cities. */
  slug: string;
  /** Proper noun, not translated. */
  name: string;
  /** Proper noun, not translated. */
  province: string;
  positioningKey: string;
  summaryKey: string;
  bestForKeys: string[];
  housingPressure: CityHousingPressure;
  scaleLabelKey: string;
  /** Institution names, proper nouns, not translated. */
  institutions: string[];
  officialLink: CityOfficialLink;
};

export const CITIES: City[] = [
  {
    slug: "amsterdam",
    name: "Amsterdam",
    province: "North Holland",
    positioningKey: "city.amsterdam.positioning",
    summaryKey: "city.amsterdam.summary",
    bestForKeys: ["city.amsterdam.b1", "city.amsterdam.b2", "city.amsterdam.b3"],
    housingPressure: "very-high",
    scaleLabelKey: "city.amsterdam.scale",
    institutions: [
      "University of Amsterdam",
      "Vrije Universiteit Amsterdam",
      "Amsterdam University of Applied Sciences",
    ],
    officialLink: {
      label: "Studying in Amsterdam",
      href: "https://www.iamsterdam.com/en/live-work-study/studying-in-amsterdam",
      org: "Amsterdam & Partners",
    },
  },
  {
    slug: "rotterdam",
    name: "Rotterdam",
    province: "South Holland",
    positioningKey: "city.rotterdam.positioning",
    summaryKey: "city.rotterdam.summary",
    bestForKeys: ["city.rotterdam.b1", "city.rotterdam.b2", "city.rotterdam.b3"],
    housingPressure: "high",
    scaleLabelKey: "city.rotterdam.scale",
    institutions: [
      "Erasmus University Rotterdam",
      "Rotterdam University of Applied Sciences",
      "Codarts Rotterdam",
    ],
    officialLink: {
      label: "City of Rotterdam",
      href: "https://www.rotterdam.nl/en",
      org: "Municipality of Rotterdam",
    },
  },
  {
    slug: "groningen",
    name: "Groningen",
    province: "Groningen",
    positioningKey: "city.groningen.positioning",
    summaryKey: "city.groningen.summary",
    bestForKeys: ["city.groningen.b1", "city.groningen.b2", "city.groningen.b3"],
    housingPressure: "high",
    scaleLabelKey: "city.groningen.scale",
    institutions: ["University of Groningen", "Hanze University of Applied Sciences"],
    officialLink: {
      label: "Municipality of Groningen in English",
      href: "https://gemeente.groningen.nl/english",
      org: "Municipality of Groningen",
    },
  },
  {
    slug: "eindhoven",
    name: "Eindhoven",
    province: "North Brabant",
    positioningKey: "city.eindhoven.positioning",
    summaryKey: "city.eindhoven.summary",
    bestForKeys: ["city.eindhoven.b1", "city.eindhoven.b2", "city.eindhoven.b3"],
    housingPressure: "high",
    scaleLabelKey: "city.eindhoven.scale",
    institutions: [
      "Eindhoven University of Technology",
      "Fontys University of Applied Sciences",
      "Design Academy Eindhoven",
    ],
    officialLink: {
      label: "City of Eindhoven",
      href: "https://www.eindhoven.nl/en",
      org: "Municipality of Eindhoven",
    },
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export const CITY_SLUGS = CITIES.map((c) => c.slug);
