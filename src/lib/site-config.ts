// Edit this file to update social links and contact details across the whole site.
// Nothing else in the codebase needs to change when these are updated.

export const siteConfig = {
  name: "Prakruthi Township Residents Association",
  shortName: "PTRA",
  tagline: "Welcome to Prakruthi Township Residents Association",
  description:
    "News, updates and community links for residents of Prakruthi Township — maintained by the Residents Association.",
  url: "https://prakruthitownshipresidentsassociation.co.in",

  social: {
    facebook: "https://www.facebook.com/Prakruthiptra",
    instagram: "https://instagram.com/prakruthiptra",
    twitter: "https://x.com/PTRAOfficialAcc",
    twitterHandle: "PTRAOfficialAcc", // no leading @, used by the embedded feed widget
    youtube: "https://www.youtube.com/@prakruthiptra",
  },

  // Official civic authority accounts shown alongside PTRA's own feed —
  // not PTRA's channels, just useful public info sources for residents.
  civicFeeds: {
    gba: {
      label: "Greater Bengaluru Authority",
      twitterHandle: "GBA_office",
      url: "https://x.com/GBA_office",
    },
    bescom: {
      label: "BESCOM — power outages & updates",
      twitterHandle: "NammaBESCOM",
      url: "https://x.com/NammaBESCOM",
    },
  },

  contact: {
    email: "prakruthiptra@gmail.com",
    phone: "REPLACE_WITH_PHONE_NUMBER",
    whatsapp: "REPLACE_WITH_WHATSAPP_NUMBER", // digits only, with country code, e.g. 91XXXXXXXXXX
    address: "REPLACE_WITH_ASSOCIATION_ADDRESS",
  },
};

export type SiteConfig = typeof siteConfig;
