import { SchematicContext } from '@angular-devkit/schematics';
import { updateDepConst } from '../utils/update-dep-const';
import { Tree } from '@nrwl/devkit';

/**
 * initLintingRules
 * initialize the linting rules to enforce dependency constraints inside linting file
 */
export function initLintingRules(host: Tree) { 

    updateDepConst(host, undefined, (depConst) => {
      const index = depConst.findIndex(
        (entry) =>
          entry['sourceTag'] &&
          entry['sourceTag'] === '*' &&
          entry['onlyDependOnLibsWithTags'] &&
          Array.isArray(entry['onlyDependOnLibsWithTags']) &&
          entry['onlyDependOnLibsWithTags'].length > 0 &&
          entry['onlyDependOnLibsWithTags'][0] === '*'
      );

      if (index !== -1) {
        depConst.splice(index, 1);
      }

      depConst.push({
        sourceTag: 'type:app',
        onlyDependOnLibsWithTags: [
          'type:platform-ui',
          'type:util',
        ],
      });

      depConst.push({
        sourceTag: 'type:api',
        onlyDependOnLibsWithTags: [
          'type:domain-logic', 
          'type:util'
        ],
      });

      depConst.push({
        sourceTag: 'type:domain-logic',
        onlyDependOnLibsWithTags: [
          'type:util'
        ],
      });

      depConst.push({
        sourceTag: 'type:feature-logic',
        onlyDependOnLibsWithTags: [
          'type:domain-logic', 
          'type:util'
        ],
      });

      depConst.push({
        sourceTag: 'type:platform-ui',
        onlyDependOnLibsWithTags: [
          'type:feature-logic', 
          'type:util'
        ],
      });

    });
}