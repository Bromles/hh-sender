import { ResumeResponse, TokenResponse, VacanciesResponse } from "./types.js";
import { fetchHh, fetchHhData } from "./utils.js";

const hhBaseUrl = process.env.HH_BASE_URL!;
const hhClientId = process.env.HH_CLIENT_ID!;
const hhClientSecret = process.env.HH_CLIENT_SECRET!;

export const getHhToken = async (): Promise<TokenResponse> => {
  const res = await fetchHh(hhBaseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: hhClientId,
      client_secret: hhClientSecret,
      grant_type: "client_credentials",
    }),
  });

  const data: TokenResponse = await res.json();

  return data;
};

export const getResumeList = async (): Promise<ResumeResponse> => {
  const res = await fetchHhData(`${hhBaseUrl}/resumes/mine`);
  const data: ResumeResponse = await res.json();

  return data;
};

export const getVacancyList = async (
  resume_id: string
): Promise<VacanciesResponse> => {
  const res = await fetchHhData(
    `${hhBaseUrl}/resumes/${resume_id}/similar_vacancies`
  );
  const data: VacanciesResponse = await res.json();

  return data;
};

export const applyToVacancy = async (resume_id: string, vacancy_id: string) => {
  const res = await fetchHhData(`${hhBaseUrl}/negotiations`, {
    method: "POST",
    body: new URLSearchParams({
      resume_id,
      vacancy_id,
    }),
  });
};
