import * as fs from 'fs';

describe(`Options 1:`, () => {
  test(`should compile`, async () => {
    const output = fs
      .readFileSync('test/docs/options-1/README.md', 'utf8')
      .toString();
    expect(output).toMatchSnapshot();
  });
});
