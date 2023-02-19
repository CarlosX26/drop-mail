import { IShowEmail } from "../../App";

export interface BoxEmailsProps {
  showEmail(email: IShowEmail): void;
  handleBoxEmailMobile(): void;
}
