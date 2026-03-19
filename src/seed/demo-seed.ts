import type { AiOutput } from "../schemas/company.js";

export const demoSeedData: AiOutput = {
  companyType: "SOLE_PROPRIETORSHIP",
  tradeTitleSuggestions: [
    {
      tradeTitle: "Mavi Kutu Danismanlik",
      rationale: "Descriptive title with a clear consultancy signal for registry usage."
    }
  ],
  brandNameSuggestions: [
    {
      brandName: "KurulusPilot",
      rationale: "Short brand-style name suitable for digital identity positioning."
    }
  ],
  domainSuggestions: [
    {
      domain: "kuruluspilot.com",
      availabilityGuaranteed: false,
      advisoryNote: "Availability changes frequently; verify with a registrar before use."
    }
  ],
  socialHandleSuggestions: [
    {
      platform: "instagram",
      handle: "@kuruluspilot",
      availabilityGuaranteed: false,
      advisoryNote: "Handle checks are advisory snapshots and must be re-verified."
    }
  ],
  legalDraft: {
    title: "Pre-Formation Service Scope Draft",
    body: "This draft outlines initial service scope and obligations and must be reviewed by a legal professional.",
    expertReview: {
      legalReviewRequired: true,
      accountingReviewRequired: true
    }
  },
  accountingDraft: {
    title: "Pre-Formation Accounting Intake Draft",
    body: "This draft summarizes accounting inputs and must be reviewed by a certified accountant before use.",
    expertReview: {
      legalReviewRequired: true,
      accountingReviewRequired: true
    }
  }
};
