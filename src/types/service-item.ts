export interface ServiceItem {
  id: string;
  slug: string;
  num: string;
  image?: string;
}


export interface ServiceCardProps {
  slug: string;
  index: number;
  title: string;
  description: string;
  keyFocus: string;
  exploreLabel: string;
}