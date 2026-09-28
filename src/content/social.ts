import type { PreviewReel, SocialMediaChannel } from "@/types/social";

export const PREVIEW_REELS: PreviewReel[] = [
  {
    id: "reel-1",
    duration: "0:58",
    views: "42K",
    image: "/social/reel1.png",
  },
  {
    id: "reel-2",
    duration: "1:12",
    views: "68K",
    image: "/social/reel2.png",
  },
  {
    id: "reel-3",
    duration: "1:05",
    views: "35K",
    image: "/social/reel3.png",
  },
];

export const SOCIAL_MEDIA_CHANNELS: SocialMediaChannel[] = [
  {
    platform: "Instagram",
    handle: "@dr.mohamedgamil_pt",
    url: "https://instagram.com",
    followers: "48K+",
  },
  {
    platform: "YouTube",
    handle: "Dr. Mohamed Gamil — Movement Medicine",
    url: "https://youtube.com",
    followers: "22K+",
  },
  {
    platform: "LinkedIn",
    handle: "Dr. Mohamed Gamil, PT",
    url: "https://linkedin.com",
    followers: "12K+",
  },
  {
    platform: "WhatsApp",
    handle: "+20 102 345 6789",
    url: "https://whatsapp.com",
    followers: "24/7",
  },
];
