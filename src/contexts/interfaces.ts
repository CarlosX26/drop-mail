import { ReactNode } from "react";

export interface IMailContext {
  currentSession: IIntroduceSession;
  currentEmail: string | undefined;
  getBoxEmails(): Promise<void>;
  boxEmails: IBoxEmails | undefined;
}

export interface IMailProviderProps {
  children: ReactNode;
}

export interface IIntroduceSession {
  id: string;
  expiresAt: string;
  addresses: {
    id: string;
    address: string;
  }[];
}

export interface IBoxEmails {
  mails: {
    id: string;
    headerFrom: string;
    headerSubject: string;
    text: string;
  }[];
  id: string;
  expiresAt: string;
  addresses: [
    {
      restoreKey: string;
      id: string;
      address: string;
    }
  ];
}
