export interface IShowEmailProps {
  headerSubject: string | undefined;
  text: string | undefined;
  showBoxEmailMobile: boolean;
  handleBoxEmailMobile(): void;
}
