import { FunctionComponent, ComponentClass } from 'react';



export type HgsSystem<Props> = {
  path: string;
  Component: FunctionComponent<any> | ComponentClass<any, any>;
  ComponentProps: Props;
};

export type user = {
  id?: string;
  phoneNumber: string;
  email: string;
  fullName:string;
  password:string;
  jobTitle:string;
};

export type IconProps = {
  className?: string;
  width?: string;
  height?: string;
};
