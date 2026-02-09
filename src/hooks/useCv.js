import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createSubscriptionApi,
  cvBuilderApi,
  generateCvPdf,
  getCvCountApi,
  getCvProfileApi,
  getSubscriptionPlanApi,
  incrementCvCountApi,
} from "../services/cv.service";
import { formatMY } from "../utils/helpers";

export const useSubscriptionPlan = () =>
  useQuery({
    queryKey: ["subscription-plan"],
    queryFn: getSubscriptionPlanApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export const useCvCount = () =>
  useQuery({
    queryKey: ["cv-count"],
    queryFn: getCvCountApi,
  });

export const useCvProfile = (uuid) =>
  useQuery({
    queryKey: ["cv-profile", uuid],
    queryFn: () => getCvProfileApi(uuid),
    enabled: !!uuid,
  });

/* -------------------- MUTATIONS -------------------- */

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscriptionApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["subscription-plan"]);
    },
  });
};

export const useIncrementCvCount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incrementCvCountApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["cv-count"]);
    },
  });
};

export function useCVBuilder(applicantId) {
  return useQuery({
    queryKey: ["cv-builder", applicantId],
    queryFn: () => cvBuilderApi(applicantId),
    enabled: !!applicantId,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    retry: 1,
  });
}

export function useCVNormalized(payload) {
  // HELPERS

  function normalizeBulletText(t = "") {
    return t.replace(/^•\s*/, "").trim();
  }

  function splitLines(text = "") {
    return text
      .split("\n")
      .map((t) => normalizeBulletText(t))
      .filter(Boolean);
  }

  // CV DATA
  const address = payload?.address || [];

  const phone = payload?.phone?.phone_number || "";

  const objective = payload?.objective?.objective || "";

  const educations = payload?.education || [];

  const referees = payload?.referees || [];

  const experiences = payload?.experience || [];

  const training = payload?.training || [];

  const language = payload?.language || [];

  const profile = payload?.applicant_profile?.[0] || {};

  const culture = payload?.culture || [];

  const tools = payload?.tools || [];

  const personalities = payload?.applicant_personality || [];

  const knowledges = payload?.knowledge || [];

  const software = payload?.software || [];

  const proficiencies = payload?.proficiency || [];

  const summary = payload?.careers?.[0]?.career || "";

  const marital_status = payload?.marital_status || "";

  const current_position = payload?.current_position || "";

  const email = payload?.user?.[0]?.email || "";

  return {
    location: address?.[0]
      ? `${address[0]?.sub_location || ""}, ${address[0]?.region_name || ""}, ${address[0].name || ""}`
      : "",
    phone,
    email,
    current_position,
    marital_status,
    summary,
    profile,
    objective,
    fullName:
      `${profile.first_name || ""} ${profile.middle_name || ""} ${
        profile.last_name || ""
      }`
        .replace(/\s+/g, " ")
        .trim() || "—",

    trainings: training.map((t) => ({
      name: t?.name,
      institution: t?.institution,
      dates: `${formatMY(t?.started)} - ${formatMY(t?.ended)}`,
    })),

    languages: language.map((l) => ({
      name: l?.language?.language_name,
    })),

    cultures: culture.map((c) => ({
      name: c?.culture?.culture_name,
    })),

    tools: tools.map((t) => ({
      name: t?.tool?.tool_name,
    })),

    personalities: personalities.map((p) => ({
      name: p?.personality?.personality_name?.trim(),
    })),

    knowledges: knowledges.map((k) => ({
      name: k?.knowledge?.knowledge_name,
    })),

    softwares: software.map((s) => ({
      name: s?.software?.software_name,
    })),

    referees: referees.map((ref) => ({
      fullName: `${ref?.first_name} ${ref?.middle_name} ${ref?.last_name}`,
      company: ref?.employer,
      position: ref?.referee_position,
      email: ref?.email,
      phone: ref?.phone,
    })),

    proficiencies: proficiencies.map((prof) => ({
      dates: `${formatMY(prof?.started)} - ${formatMY(prof?.ended)}`,
      award: prof?.award || "-",
      organization: prof?.organization?.organization_name || "-",
      proficiency: prof?.proficiency?.proficiency_name || "-",
    })),

    educations: educations.map((edu) => ({
      dates: `${formatMY(edu?.started)} - ${formatMY(edu?.ended)}`,
      level: edu?.level?.education_level || "-",
      college: edu?.college?.college_name || "-",
      course: edu?.course?.course_name || "-",
      major: edu?.major?.name || "-",
    })),

    experiences: experiences.map((exp) => ({
      organization: exp?.employer?.employer_name || "-",
      dates: `${formatMY(exp?.start_date)} - ${formatMY(exp?.end_date) || "Present"}`,
      position: exp?.position?.position_name || "-",
      level: exp?.level?.position_name || "-",
      industry: exp?.industry?.industry_name || "-",
      responsibility: splitLines(exp?.responsibility || "-"),
      location: `${exp.sub_location}`,
    })),
  };
}

export const useDownloadCv = () => {
  return useMutation({
    mutationFn: generateCvPdf,
  });
};
