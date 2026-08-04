export interface SocialLink {
  name: string;
  url: string;
  icon: string; // We will map this to Lucide icons in the component
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "#", // TODO: Add actual link
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "#", // TODO: Add actual link
    icon: "github",
  },
  {
    name: "Instagram",
    url: "#", // TODO: Add actual link
    icon: "instagram",
  },
];
