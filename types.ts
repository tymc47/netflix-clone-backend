export interface Show {
  id: string;
  title: string;
}

export interface User {
  username: string;
  passwordHash: string;
  list: Show[];
}

export interface userRequest {
  username: string;
  password: string;
}
