import { spawn } from 'child_process';
import { consola } from 'consola';

const timeStart = new Date().getTime();

consola.start(`Building test fixtures...`);

const fixtures = ['typedoc.json'];

// write fixtures
fixtures.forEach((fixture) => {
  writeMarkdown(fixture);
});

function writeMarkdown(fixture: any) {
  spawn('typedoc', [...['-options', `./test/${fixture}`]], {
    stdio: 'inherit',
  });
}
process.on('exit', () => {
  consola.success(
    `Finished building fixtures in ${(
      (new Date().getTime() - timeStart) /
      1000
    ).toFixed(2)} seconds`,
  );
});
