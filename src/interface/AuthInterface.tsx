export interface ContextProps {
  userInfo: userInfo;
  splashLoading: boolean;
}

export interface AppContextInterface {
  userInfo: string | userInfo;
  isLoading: boolean;
  splashLoading: boolean;
  register: (
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
    confirmPassword: string
  ) => void;
  login: (emailAddress: string, password: string) => void;
  logout: () => void;
  editSubmit: (firstName: string, lastName: string) => Promise<void>;
}

export interface userInfoProps {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  token: string;
}

export interface userInfo {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  token?: string;
}
