import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  runCommand,
  runCommandAsync,
  uniq,
  
} from '@nrwl/nx-plugin/testing';
describe('nx-cross-ddd e2e', () => {

  describe('[workspace]', () => {
    it('should create nx-cross-ddd', async () => {
      const plugin = uniq('nx-cross-ddd');
      ensureNxProject('@fazio/nx-cross-ddd', 'dist/packages/nx-cross-ddd');
      await runNxCommandAsync(
        `generate @fazio/nx-cross-ddd:nx-cross-ddd ${plugin}`
      );
  
      const result = await runNxCommandAsync(`build ${plugin}`);
      expect(result.stdout).toContain('Executor ran');
    }, 120000);

    describe('--directory', () => {
      it('should create src in the specified directory', async () => {
        const plugin = uniq('nx-cross-ddd');
        ensureNxProject('@fazio/nx-cross-ddd', 'dist/packages/nx-cross-ddd');
        await runNxCommandAsync(
          `generate @fazio/nx-cross-ddd:nx-cross-ddd ${plugin} --directory subdir`
        );
        expect(() =>
          checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
        ).not.toThrow();
      }, 120000);
    });
  
    describe('--tags', () => {
      it('should add tags to nx.json', async () => {
        const plugin = uniq('nx-cross-ddd');
        ensureNxProject('@fazio/nx-cross-ddd', 'dist/packages/nx-cross-ddd');
        await runNxCommandAsync(
          `generate @fazio/nx-cross-ddd:nx-cross-ddd ${plugin} --tags e2etag,e2ePackage`
        );
        const nxJson = readJson('nx.json');
        expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      }, 120000);
    });

  });

  describe('[schematics]', () => {
    it('should create Domain library', async () => {
      const plugin = uniq('nx-cross-ddd');
      ensureNxProject('@fazio/nx-cross-ddd', 'dist/packages/nx-cross-ddd');
      await runNxCommandAsync(
        `generate @fazio/nx-cross-ddd:nx-cross-ddd ${plugin}`
      );
      const result = await runNxCommandAsync(`generate domain Demo`);
      expect(result.stdout).toContain('Executor ran');
    }, 120000);
  });
});
