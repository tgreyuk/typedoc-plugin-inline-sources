/**
 * Variable
 *
 * @source
 *
 * Some source comments
 *
 * Some more source comments
 */
export const someVariable = /*ok*/ 'hello'; // someVariable comment;

/**
 * Variable list
 *
 * @source
 */
export const multipleVariable1 = 'hello-1',
  multipleVariable2 = 'hello-2';

/** @source */
export let someLet = 'hello';
someLet = 'goodbye';

/**
 * Type alias
 *
 * @source
 */
export type SomeType = number;

/**
 * Function
 *
 * @source
 */
export function someFunction(x: number, y: number) {
  return x + y;
}

/**
 * Const function
 *
 * @source
 */
export const someConstFunction = (x: string) => x;

/**
 * Combine function overload 1
 *
 * @source
 */
export function combineFunction(a: string, b: string): string;
/**
 * Combine function overload 2
 *
 * @source
 */
export function combineFunction(a: number, b: number): number;

/**
 * Combine function main
 *
 * @source
 */
export function combineFunction(
  a: string | number,
  b: string | number,
): string | number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b; // Concatenate strings
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a + b; // Sum numbers
  }
  throw new Error(
    'Invalid arguments. Both arguments must be of the same type.',
  );
}
/**
 * Class
 *
 * @source
 */
export class SomeClass {
  /**
   * Some prop comments
   */
  someProp: string;

  // Class method source
  someMethod() {
    return 'hello';
  }
}

export class SomeClassMethodWithMemberSources {
  /**
   * Some prop comments
   *
   * @source
   */
  someProp: string;

  /**
   *
   * @source
   */
  someMethod() {
    return 'hello';
  }
}

/**
 * Interface
 *
 * @source
 */
export interface SomeInterface {
  /**
   * Comments for prop1
   */
  prop1: string;

  // Comments for prop2
  prop2: number;
}

/**
 * Enum
 *
 * @source
 */
export enum SomeEnum {
  /**
   * Comments for prop
   */
  Item1 = 'item1',
}

/**
 * Logs a greeting message to the console.
 *
 * @source Optional source comments
 */
export function greet(): void {
  console.log('Hello, welcome to TypeScript!');
}
