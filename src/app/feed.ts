export interface Feed {
  rss: Rss;
}

export interface Rss {
  version: string;
  channel: FeedInfo;
}

export interface FeedImage {
  link: string;
  title: string;
  url: string;
}

export interface FeedInfo {
  title: string;
  image: FeedImage;
  link: string;
  description: string;
  pubDate: Date;
  item: FeedEntry[];
}

export interface FeedEntry {
  title: string;
  link: string;
  guid: string;
  pubDate: Date;
  category: string;
  description: string;
  content: string;
}