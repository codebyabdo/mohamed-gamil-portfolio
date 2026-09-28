export type SocialPlatform =
  | "Instagram"
  | "YouTube"
  | "LinkedIn"
  | "WhatsApp";

export interface PreviewReel {
  id: string;
  image: string;
  duration: string;
  views: string;
}

export interface SocialMediaChannel {
  platform: SocialPlatform;
  handle: string;
  url: string;
  followers: string;
}