export interface IEpisodeInfo {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface IEpisodeResponse {
  info: IEpisodeInfo;
  results: IEpisode[];
}
