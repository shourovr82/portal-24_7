import { addDays } from "date-fns";

export const predefinedRanges = [
  {
    label: "Next Sunday",
    value: () => {
      const currentDate = new Date();
      const daysUntilNextSunday = 7 - currentDate.getDay(); // Calculate days until next Sunday
      const nextSunday = addDays(currentDate, daysUntilNextSunday);
      return [nextSunday, addDays(nextSunday, 1)]; // Set the date range from next Sunday to next Monday
    },
  },
  {
    label: "Next 30 days",
    value: [new Date(), addDays(new Date(), 30)],
  },
];


// 
export const ProblemReportIssues = [
  { label: "Trouble logging in", value: "troubleLoggingIn" },
  { label: "Forgot Email", value: "forgotEmail" },
  { label: "Forgot Password", value: "forgotPassword" },
  { label: "Loading Issues", value: "loadingIssues" },
  { label: "Account Deactivation Request", value: "accountDeactivation" },
  { label: "Security Concerns", value: "securityConcerns" },
  { label: "Technical Glitches", value: "technicalGlitches" },
  { label: "Feature Request", value: "featureRequest" },
  { label: "Payment Issues", value: "paymentIssue" },
  { label: "User Interface Feedback", value: "uiFeedback" },
  { label: "Account Recovery Assistance", value: "accountRecovery" },
  { label: "Other", value: "other" },
].map((item) => ({ label: item.label, value: item.value }));

