import { 
  Tree, 
  convertNxGenerator, 
  generateFiles, 
  joinPathFragments, 
  names, 
  installPackagesTask, 
  formatFiles, 
  readJson
} from '@nrwl/devkit';
// import { libraryGenerator } from '@nrwl/workspace/generators';
import { libraryGenerator as nodeLibraryGenerator } from '@nrwl/node';
// import { libraryGenerator as ngLibraryGenerator } from '@nrwl/angular/generators';

export async function mySchematicGenerator(tree: Tree, opts: any) {
  const nx = readJson(tree, 'nx.json');
  if (!opts.workspace) {
    opts.workspace = nx.npmScope;
  }
  if (!opts.domain) {
    throw new Error('You have to provide --domain option');
  }
  const libFolder = nx.workspaceLayout?.libsDir || 'libs'
  const { className, fileName } = names(opts.name);
  const { fileName: domain, className: domainName } = names(opts.domain);
  const { fileName: workspace } = names(opts.workspace);
  if (opts.path === undefined) {
    // opts.path = `${project.sourceRoot}/${projectType}`;
    opts.path = `${libFolder}/${domain}/feature-${fileName}/src/lib`;
  }
  // console.log('>>>', `@${workspace}/${domain}-feature-${fileName}`);
  await formatFiles(tree);
  await nodeLibraryGenerator(tree, { 
    ...opts,
    name: 'feature-' + fileName,
    directory: domain,
    tags: `feature:${fileName},type:feature-logic`,
    publishable: true,
    buildable: true, 
    importPath: `@${workspace}/${domain}-feature-${fileName}`,
    strict: true
  });
  generateFiles(
    tree, 
    joinPathFragments(__dirname, './files'), 
    joinPathFragments(opts.path), 
    {
      className,
      workspace,
      domainName,
      domain,
      name: fileName,
      tpl: ''
    }
  );
  return () => {
    installPackagesTask(tree);
  };
}

export const mySchematic = convertNxGenerator(mySchematicGenerator);
