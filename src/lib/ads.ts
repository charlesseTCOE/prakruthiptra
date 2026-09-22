export type CommunityAd = {
  id: string;
  title: string;
  category: "Housing" | "Services" | "Jobs" | "Events" | "Community" | "Partners";
  description: string;
  contact: string;
  posted: string;
  featured?: boolean;
};

export const adCategories = ["All", "Housing", "Services", "Jobs", "Events", "Community", "Partners"] as const;

/** Live listings. Keep empty until the committee publishes a real ad. */
export const communityAds: CommunityAd[] = [];

export const sponsorSlots = [
  {
    id: "sponsor-a",
    label: "Featured partner",
    headline: "Your local business here",
    body: "Banner on the township site for a quarter. Write to prakruthiptra@gmail.com.",
  },
  {
    id: "sponsor-b",
    label: "Community sponsor",
    headline: "Support a drive",
    body: "Sports kits, festival lights, maintenance days — partner with PTRA.",
  },
];
