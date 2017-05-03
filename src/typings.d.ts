
declare module 'react-grid-system' {
  export const Container: any;
  export const Row: any;
  export const Col: any;
  export const Visible: any;
  export const Hidden: any;
  export const ScreenClassRender: any;
}

declare module 'universal-cookie' {
  class Cookies {
    constructor(cookieHeader?: string);
    set(name: string, value: any);
    get(name: string): any;
    getAll(): any;
  }

  namespace Cookies { }

  export = Cookies;
}
