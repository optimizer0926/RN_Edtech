interface User {
  name: string;
  plans: Plans[];
}

interface Plans {
  title: string;
  id: number;
  description: string;
  length: string;
  imgUrl: NodeRequire | any;
  colorUrl: NodeRequire | any;
  saved: boolean;
}

export default User;
