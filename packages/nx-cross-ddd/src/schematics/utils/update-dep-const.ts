import { SchematicContext } from '@angular-devkit/schematics';
import { Tree } from '@nrwl/devkit';
import { checkRuleExists } from './check-rule-exists';

export function updateDepConst(
  host: Tree,
  context: SchematicContext|undefined,
  update: (depConst: Array<Record<string, unknown>>) => void
) {
  let filePath = 'tslint.json';
  let rule = 'nx-enforce-module-boundaries';

  if (!host) {
    throw new Error('updateDepConst: host are required');
  }

  if (!host.exists('tslint.json')) {
    if (host.exists('.eslintrc.json')) {
      filePath = '.eslintrc.json';
      rule = '@nrwl/nx/enforce-module-boundaries';
      context?.logger?.info(
        'Found .eslintrc.json'
      );
    } else if (host.exists('.eslintrc')) {
      filePath = '.eslintrc';
      rule = '@nrwl/nx/enforce-module-boundaries';
      context?.logger?.info(
        'Did not find .eslintrc.json but found .eslintrc'
      );
    } else {
      context?.logger?.info(
        'Cannot add linting rules: linting config file does not exist'
      );
      return;
    }
  }
  const text = (host as any).read(filePath).toString();
  const json = JSON.parse(text);
  let rules = json;
  if (rules['overrides']) {
    const overrides = rules['overrides'];
    rules = overrides.find(
      (e: any) => e.rules && e.rules['@nrwl/nx/enforce-module-boundaries']
    );
  }

  if (!checkRuleExists(filePath, rule, rules, context)) return;

  const depConst = rules['rules'][rule][1]['depConstraints'] as Array<Record<string, unknown>>;
  update(depConst);

  const newText = JSON.stringify(json, undefined, 2);
  host.write(filePath, newText);
}