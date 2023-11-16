import { baseUrl } from "./../api/ApiConfig";

export const userEndpoint = `${baseUrl}user`;
export const assignmentsEndpoint = `${baseUrl}assignments`;
export const subjectsEndpoint = `${baseUrl}subjects`;
export const assignmentsAvailForReviewEndpoint = `${baseUrl}assignments?immediately_available_for_review=true`;
export const assignmentsAvailForLessonsEndpoint = `${baseUrl}assignments?immediately_available_for_lessons=true`;

export const AVAIL_REVIEWS = "immediately_available_for_review=true";
export const AVAIL_LESSONS = "immediately_available_for_lessons=true";

export const SUBJECT_SUBJ_TYPES = "types";
export const ASSIGNMENT_SUBJ_TYPES = "subject_types";
export const LEVELS_PARAM = "levels";
export const SRS_STAGES = "srs_stages";
