export const LEAD_STATUSES = ["New", "Contacted", "Quoted", "Won", "Lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
