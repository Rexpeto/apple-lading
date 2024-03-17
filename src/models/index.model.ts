export interface Highlight {
  id: number;
  textLists: string[];
  video: string;
  videoDuration: number;
}

export interface Model {
  id: number;
  title: string;
  color: string[];
  img: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface Sizes {
  label: string;
  value: string;
}
