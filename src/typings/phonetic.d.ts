declare module "phonetic" {
  export interface PhoneticOptions {
    phoneticSimplicity: number;
    compoundSimplicity: number;
    capFirst: boolean;
    syllables: number;
  }

  export function generate(options: PhoneticOptions): string;
}
