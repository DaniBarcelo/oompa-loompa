// src/declarations.d.ts
declare module 'redux-persist-transform-expire' {
    import { Transform } from 'redux-persist';
  
    interface ExpireOptions {
      expireSeconds: number;
      expiredState: any;
      autoExpire?: boolean;
    }
  
    export default function expireReducer(
      reducerKey: string,
      options: ExpireOptions
    ): Transform<any, any>;
  }