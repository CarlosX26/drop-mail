import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import {
  IBoxEmails,
  IIntroduceSession,
  IMailContext,
  IMailProviderProps,
} from "./interfaces";

const mailContext = createContext({} as IMailContext);

const MailProvider = ({ children }: IMailProviderProps) => {
  const [currentSession, setCurrentSession] = useState({} as IIntroduceSession);
  const [currentEmail, setCurrentEmail] = useState<string | undefined>();
  const [boxEmails, setBoxEmails] = useState<IBoxEmails>();

  const checkExpirationDate = (date: string): boolean => {
    const expirationDate = new Date(date);
    const currentDate = new Date();

    const dateExp = expirationDate.getDate();
    const monthExp = expirationDate.getMonth() + 1;
    const fullYearExp = expirationDate.getFullYear();
    const hoursExp = expirationDate.getHours();
    const minutesExp = expirationDate.getMinutes();

    const dateNow = currentDate.getDate();
    const monthNow = currentDate.getMonth() + 1;
    const fullYearNow = currentDate.getFullYear();
    const hoursNow = currentDate.getHours();
    const minutesNow = currentDate.getMinutes();

    const expirationDateTimes = [
      dateExp,
      monthExp,
      fullYearExp,
      hoursExp,
      minutesExp,
    ];
    const currentDateTimes = [
      dateNow,
      monthNow,
      fullYearNow,
      hoursNow,
      minutesNow,
    ];

    return !currentDateTimes.every(
      (time, index) => time <= expirationDateTimes[index]
    );
  };

  const getSession = async (): Promise<void> => {
    try {
      const response = await api.get(
        "?query=mutation{introduceSession{id, expiresAt, addresses{id, address}}}"
      );
      const introduceSession: IIntroduceSession =
        response.data.data.introduceSession;

      localStorage.setItem(
        "@dropmail:session",
        JSON.stringify(introduceSession)
      );

      setCurrentSession(introduceSession);
      setCurrentEmail(introduceSession.addresses[0].address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const sessionInStorage = localStorage.getItem("@dropmail:session");
      if (sessionInStorage) {
        const session: IIntroduceSession = JSON.parse(sessionInStorage);

        const sessionExpired = checkExpirationDate(session.expiresAt);

        if (sessionExpired) {
          return await getSession();
        }

        const boxEmailInStorage = localStorage.getItem("@dropmail:boxEmails")
        
        if(boxEmailInStorage){
          setBoxEmails(JSON.parse(boxEmailInStorage))
        }

        setCurrentSession(session);
        setCurrentEmail(session.addresses[0].address);
      } else {
        await getSession();
      }
    })();
  }, []);

  const getBoxEmails = async (): Promise<void> => {
    try {
      const response = await api.get(
        `?query=query ($id: ID!) {session(id:$id) {id, expiresAt, mails{id, rawSize, raw, fromAddr, toAddr, receivedAt, downloadUrl, toAddrOrig, decodeStatus, text, headerFrom, headerSubject, html}, addresses{id, address, restoreKey} }}&variables={"id":"${currentSession.id}"}`
      );

      const boxEMails: IBoxEmails = response.data.data.session;

      setBoxEmails(boxEMails);
      
      localStorage.setItem(
        "@dropmail:boxEmails",
        JSON.stringify(boxEMails)
      );


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <mailContext.Provider
      value={{ currentSession, currentEmail, boxEmails, getBoxEmails }}
    >
      {children}
    </mailContext.Provider>
  );
};

const useMailContext = (): IMailContext => useContext(mailContext);

export { MailProvider, useMailContext };
