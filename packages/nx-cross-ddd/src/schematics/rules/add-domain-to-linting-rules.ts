import { updateDepConst } from '../utils/update-dep-const';
import { Tree } from '@nrwl/devkit';

/**
 * addDomainToLintingRules
 * @param domainName name of the domain that is being included in the lintingfile
 * @param host Virtual file system tree.
 */
export function addDomainToLintingRules(domainName: string, host: Tree) {

  updateDepConst(host, undefined, (depConst) => {
    depConst.push({
      sourceTag: `domain:${domainName}`,
      onlyDependOnLibsWithTags: [`domain:${domainName}`, 'domain:shared'],
    });
  });

}