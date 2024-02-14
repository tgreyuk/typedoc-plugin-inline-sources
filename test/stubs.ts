/**
 * Comments for variable
 *
 * @source source tag comment?
 */
export const message = 'Hello World!';

/**
 * Comments for two variables defined together
 *
 * @source
 */
export const variableListItem1 = "1", variableListItem2 = "2";

/**
 * @source Type Alias source
 */
export type ID = number | string;

/**
 * Function comments
 * @source Function source
 */
export function doSomething(x: string | null) {
  if (x === null) {
    /* do nothing */
  } else {
    // do something
    console.log('Hello, ' + x.toUpperCase());
  }
}

/**
 * @source Class source
 */
export class GoodGreeter {
  name: string;

  constructor() {
    this.name = 'hello';
  }
}

export class Rectangle {
  height: number;
  width: number;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
  /**
   * @source Class getter source
   */
  get area() {
    return this.calcArea();
  }

  /**
   * @source Class method source
   */
  calcArea() {
    return this.height * this.width;
  }
}

/**
 * @source Interface source
 */
export interface Person {
  name: string;
  age: number;
}
