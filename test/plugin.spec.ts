import { Application, ProjectReflection, TSConfigReader } from 'typedoc';

describe(`Plugin:`, () => {
  let app: Application;
  let project: ProjectReflection;

  beforeAll(() => {
    app = new Application();
    app.options.addReader(new TSConfigReader());
    app.bootstrap({
      tsconfig: '../tsconfig.test.json',
    });
    project = app.convert() as ProjectReflection;
  });

  test(`should inject variable source`, async () => {
    const reflection = project.findReflectionByName('message');
    expect(reflection?.comment?.tags).toMatchSnapshot();
  });

  test(`should inject type alias source`, async () => {
    const reflection = project.findReflectionByName('ID');
    expect(reflection?.comment?.tags).toMatchSnapshot();
  });

  test(`should inject function source`, async () => {
    const reflection = project.findReflectionByName('doSomething') as any;
    expect(reflection.signatures[0].comment?.tags).toMatchSnapshot();
  });

  test(`should inject class source`, async () => {
    const reflection = project.findReflectionByName('GoodGreeter') as any;
    expect(reflection.comment?.tags).toMatchSnapshot();
  });

  test(`should inject class method source`, async () => {
    const reflection = project
      ?.findReflectionByName('Rectangle')
      ?.findReflectionByName('calcArea') as any;
    expect(reflection.signatures[0].comment?.tags).toMatchSnapshot();
  });

  test(`should inject class accessor source`, async () => {
    const reflection = project
      ?.findReflectionByName('Rectangle')
      ?.findReflectionByName('area') as any;
    expect(reflection.comment?.tags).toMatchSnapshot();
  });

  test(`should inject interface source`, async () => {
    const reflection = project?.findReflectionByName('Person') as any;
    expect(reflection.comment?.tags).toMatchSnapshot();
  });
});
