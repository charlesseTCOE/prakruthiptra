export type JobPosting = {
  id: string;
  title: string;
  category: string;
  source: string;
  description: string;
  url: string;
  buttonLabel: string;
  active: boolean;
};

// Copy an entry to add another homepage card. Use a unique id and a real HTTPS URL.
// Set active to false to hide an expired posting, then redeploy the website.
// No Google Drive configuration is required for this list.
export const jobPostings: JobPosting[] = [
  {
    id: "janai-engineering-interns",
    title: "JanAI Engineering Interns Program",
    category: "Engineering internships",
    source: "LinkedIn post shared by Madan Padaki",
    description: "Read the original hiring announcement for eligibility, application steps and the latest availability.",
    url: "https://www.linkedin.com/posts/madanpadaki_hiring-alert-janai-engineering-interns-program-share-7508457194854506496-9G5k",
    buttonLabel: "View LinkedIn post",
    active: true,
  },
];
