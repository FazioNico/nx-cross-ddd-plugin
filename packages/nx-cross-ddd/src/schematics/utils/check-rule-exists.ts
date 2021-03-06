import { SchematicContext } from '@angular-devkit/schematics';

export function checkRuleExists(
  filePath: string,
  rule: string,
  rules: Record<string, unknown>,
  context: SchematicContext|undefined
) {
  if (!rules['rules']) {
    context?.logger?.info(`${filePath}: rules expected`);
    return false;
  }

  if (!(rules['rules'] as any)[rule]) {
    context?.logger?.info(`${filePath}: ${rule} expected`);
    return false;
  }

  if ((rules['rules'] as any)[rule]['length'] < 2) {
    context?.logger?.info(`${filePath}: ${rule}.1 unexpected`);
    return false;
  }

  if (!(rules['rules'] as any)[rule][1]['depConstraints']) {
    context?.logger?.info(`${filePath}: ${rule}.1.depConstraints expected.`);
    return false;
  }

  if (!Array.isArray((rules['rules'] as any)[rule][1]['depConstraints'])) {
    context?.logger?.info(
      `${filePath}: ${rule}.1.depConstraints expected to be an array.`
    );
    return false;
  }

  return true;
}