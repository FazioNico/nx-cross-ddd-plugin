
import { initLintingRules } from '../rules/init-linting-rules';
import { Tree, convertNxGenerator, installPackagesTask } from '@nrwl/devkit';

export async function mySchematicGenerator(tree: Tree) {
  
  initLintingRules(tree);
  return () => {
    installPackagesTask(tree);
  };

}

export const mySchematic = convertNxGenerator(mySchematicGenerator);
