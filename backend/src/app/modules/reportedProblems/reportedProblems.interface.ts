import { IssueLists, IssueStatus } from '@prisma/client';

export type IIssueFilterRequest = {
  searchTerm?: string | undefined;
  issueName?: string | undefined;
  problemStatus?: string | undefined;
};
export type IIssueCreateRequest = {
  issueName: IssueLists;
  emailAddress: string;
  description: string;
};

export type IIssueUpdateRequest = {
  problemStatus: IssueStatus;
};
