export const issueFilterableFields: string[] = ['issueName', 'problemStatus', 'searchTerm'];

export const issueSearchableFields: string[] = ['emailAddress', 'description'];

export const ZodIssueNames = [
  'troubleLoggingIn',
  'forgotEmail',
  'forgotPassword',
  'loadingIssues',
  'accountDeactivation',
  'securityConcerns',
  'technicalGlitches',
  'featureRequest',
  'paymentIssue',
  'uiFeedback',
  'accountRecovery',
  'other'
];
export const ZodIssueStatus = ['Solved', 'Working', 'NotPossible', 'Hold', 'New', 'AlreadyFixed'];
