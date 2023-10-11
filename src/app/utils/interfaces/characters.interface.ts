export interface IInformation {
  count: number;
  next: string;
  pages: number;
  prev: string | null;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICharactersResponse {
  info: IInformation;
  results: ICharacter[];
}
