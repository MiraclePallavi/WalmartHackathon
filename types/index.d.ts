/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  
  
  declare interface CreateUserParams {
  
   firstName: string;
   lastName: string;
  
    phone:string;
    email:string;
   password:string;
   
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  declare interface LoginParams{
    email: string;
    password: string;
  }

  
 
  
