import { baseUrl } from "./../api/ApiConfig";

export const userEndpoint = `${baseUrl}user`;
export const assignmentsEndpoint = `${baseUrl}assignments`;
export const subjectsEndpoint = `${baseUrl}subjects`;
export const assignmentsAvailForReviewEndpoint = `${baseUrl}assignments?immediately_available_for_review=true`;
export const assignmentsAvailForLessonsEndpoint = `${baseUrl}assignments?immediately_available_for_lessons=true`;
