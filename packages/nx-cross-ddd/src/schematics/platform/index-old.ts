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
import { addDepsToPackageJson } from '@nrwl/workspace';
import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import { libraryGenerator as reactLibraryGenerator } from '@nrwl/react';
import { Schema } from './schema';

export async function mySchematicGenerator(tree: Tree, opts: Schema) {
  const nx = readJson(tree, 'nx.json');

  const libFolder = nx.workspaceLayout?.libsDir || 'libs';
  const {className: frameworkName, fileName: framework} = names(opts.framework||'angular');
  const { className, fileName } = names(opts.name);
  const { fileName: domain, className: domainName } = names(opts.domain||'');
  const { fileName: directory } = names(opts.directory||'');
  const { fileName: workspace } = names(opts.workspace||nx.npmScope);
  if (!domain && !directory) {
    throw new Error('You have to provide `--domain` or `--directory` options');
  }
  const folder = (directory) ? `${directory}${domain ? '/' + domain  : ''}` : domain;
  const path = `platform/${framework}/${folder}`;

  await formatFiles(tree);

  if (framework === 'angular' ) {

    addDepsToPackageJson('@angular/elements', null); 

    await angularLibraryGenerator(tree, {
      buildable: true,
      publishable: true,
      importPath: `@${workspace}/platform-${framework}-${domain}-feature-${fileName}`,
      commonModule: true,
      name: `feature-${fileName}`,
      directory: path,
      routing: true,
      strict: true,
      tags: `platform:${framework}:${fileName},type:platform-ui`,
      standaloneConfig: false
    });
  } 
  if (framework === 'react' ) {
    await reactLibraryGenerator(tree as any, <any>{
      buildable: true,
      publishable: true,
      importPath: `@${workspace}/platform-${framework}-${domain}-feature-${fileName}`,
      name: `feature-${fileName}`,
      directory: path,
      component: !!opts?.generateComponent,
      routing: true,
      strict: true,
      tags: `platform:${framework}:${fileName},type:platform-ui`,
      style: 'css',
      skipTsConfig: true,
      skipFormat: true,
      unitTestRunner: 'jest',
      linter: 'eslint',
      // standaloneConfig: true,
    });
  }
   
  // else {
  //   await libraryGenerator(tree, { 
  //     ...opts,
  //     name: `feature-${fileName}`,
  //     directory: path,
  //     tags: `platform:${uiName.toLowerCase()}:${fileName},type:platform-ui`,
  //     buildable: true,
  //     importPath: `@${workspace}/platform-web-${domain}-feature-${fileName}`,
  //     // publishable: true,
  //   });
    
  // }
  if (opts.generateComponent === true) {
    generateFiles(
      tree, 
      joinPathFragments(__dirname, './files-' + framework), 
      joinPathFragments(`${libFolder}/${path}/feature-${fileName}/src/lib`), 
      {
        className,
        workspace,
        domainName,
        domain,
        path,
        framework,
        frameworkName,
        name: fileName,
        tpl: ''
      }
    );
  }
  return () => {
    installPackagesTask(tree);
  };
}

export const mySchematic = convertNxGenerator(mySchematicGenerator);
