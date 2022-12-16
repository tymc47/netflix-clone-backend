export interface ShowBase {
  backdrop_path: string;
  poster_path: string;
  id: number;
  overview: string;
  logo?: Logo;
  video?: Video;
}

export interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Movie extends ShowBase {
  type: "movie";
  title: string;
}

export interface TvShow extends ShowBase {
  type: "tv";
  name: string;
}

export type Show = Movie | TvShow;

export interface User {
  username: string;
  passwordHash: string;
  phone: string;
  list: Show[];
}
