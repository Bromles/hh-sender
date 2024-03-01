export type TokenResponse = {
  access_token: string;
  token_type: "bearer";
};

export type ResumeResponse = {
  found: number;
  items: Resume[];
};

export type Resume = {
  id: string;
};

export type VacanciesResponse = {
  found: number;
  items: Vacancy[];
};

export type Vacancy = {
  id: string;
};
