import * as path from 'path';
import { Application, DeclarationReflection, ProjectReflection } from 'typedoc';

describe(`Options 1:`, () => {
  let app: Application;
  let project: ProjectReflection;

  beforeAll(async () => {
    app = await Application.bootstrapWithPlugins({
      options: path.join(__dirname, '../typedoc.json'),
    });
    project = (await app.convert()) as ProjectReflection;
    console.log(project.children?.length);
  });

  test(`should inject variable source`, async () => {
    const reflection = project.getChildByName('someVariable');
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject variable source for variable list (1)`, async () => {
    const reflection1 = project.getChildByName('multipleVariable1');
    expect(reflection1?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject variable source for variable list (2)`, async () => {
    const reflection2 = project.getChildByName('multipleVariable2');
    expect(reflection2?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject type alias source`, async () => {
    const reflection = project.getChildByName('SomeType');
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject function source`, async () => {
    const reflection = project.getChildByName(
      'someFunction',
    ) as DeclarationReflection;
    expect(reflection.signatures![0].comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject class source`, async () => {
    const reflection = project.getChildByName('SomeClass');
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });

  test(`should inject interface source`, async () => {
    const reflection = project?.getChildByName('SomeInterface');
    expect(reflection?.comment?.blockTags).toMatchSnapshot();
  });
});
