import { Application, DeclarationReflection, ProjectReflection } from 'typedoc';
import { load } from "../src"

describe(`Plugin:`, () => {
  let app: Application;
  let project: ProjectReflection;

  beforeAll(async () => {
    app = await Application.bootstrap({
      tsconfig: './tsconfig.test.json',
    })
    load(app)
    project = await app.convert() as ProjectReflection;
  });

  test(`should inject variable source`, async () => {
    const reflection = project.getChildByName("message")
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject type alias source`, async () => {
    const reflection = project.getChildByName("ID")
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject function source`, async () => {
    const reflection = project.getChildByName("doSomething") as DeclarationReflection
    expect(reflection.signatures![0].comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject class source`, async () => {
    const reflection = project.getChildByName("GoodGreeter")
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject class method source`, async () => {
    const reflection = project.getChildByName("Rectangle")?.getChildByName("calcArea") as DeclarationReflection
    expect(reflection.signatures![0].comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject interface source`, async () => {
    const reflection = project?.getChildByName('Person');
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });
});
