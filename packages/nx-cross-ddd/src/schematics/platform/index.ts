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
import { addDepsToPackageJson, libraryGenerator } from '@nrwl/workspace';
import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import { libraryGenerator as reactLibraryGenerator } from '@nrwl/react';
import { libraryGenerator as jsLibraryGenerator } from '@nrwl/js';
import { Schema } from './schema';

export async function mySchematicGenerator(tree: Tree, opts: Schema) {
  const nx = readJson(tree, 'nx.json');

  const libFolder = nx.workspaceLayout?.libsDir || 'libs';
  const framework = names(opts.framework||'angular');
  const name = names(opts.name);
  const domain = names(opts.domain||'');
  const directory = names(opts.directory||'');
  const workspace = names(opts.workspace||nx.npmScope);
  if (!framework) {
    throw new Error('You have to provide `--framework` options');
  }
  // build the path to the lib with custom directory if provided
  let folder = (opts.directory) 
    ? `${directory.fileName}`
    : '';
  // add domain to the path if it is provided
  folder = (opts.domain?.length||0) > 0
    ? `${folder}/${domain.fileName}`
    : folder;
  const path = `platform/${framework.fileName}${folder?.length > 0 ? `/` : ''}`;
  const importPath = `@${workspace.fileName}/platform-${framework.fileName}${folder.length > 0 ? `-${folder}` : ''}`;

  console.log(`Generating ${framework.fileName} platform in `,path);
  console.log(`Importing`, importPath);
  console.log(`Name: `, name.name);
  
  
  await formatFiles(tree);

  if (framework.name === 'angular' ) {

    addDepsToPackageJson('@angular/elements', null); 

    await angularLibraryGenerator(tree, {
      buildable: true,
      publishable: true,
      importPath,
      commonModule: true,
      name: name.name,
      directory: path,
      routing: true,
      strict: true,
      tags: `platform:${framework.name}:${name},type:platform-ui`,
      standaloneConfig: false
    });

  } 

  if (framework.name === 'react' ) {
    await reactLibraryGenerator(tree as any, <any>{
      buildable: true,
      publishable: true,
      importPath,
      name: name.name,
      directory: path,
      component: !!opts?.generateComponent,
      routing: true,
      strict: true,
      tags: `platform:${framework.name}:${name},type:platform-ui`,
      style: 'css',
      skipTsConfig: true,
      skipFormat: true,
      unitTestRunner: 'jest',
      linter: 'eslint',
      standaloneConfig: true,
    });
  }
   
  if (framework.name === 'js' ) {
    await libraryGenerator(tree, { 
      ...opts,
      name: name.name,
      directory: path,
      tags:  `platform:${framework.name}:${name},type:platform-ui`,
      buildable: true,
      importPath,
      standaloneConfig: true
    });
    
  }

  if (opts.generateComponent === true && framework.name === 'angular') {
    generateFiles(
      tree, 
      joinPathFragments(__dirname, './files-' + framework.name), 
      joinPathFragments(`${libFolder}/${path}/feature-${name.name}/src/lib`), 
      {
        className: name.className,
        workspace,
        domainName: domain.name,
        domain,
        path,
        framework,
        frameworkName: 'angular',
        name: name.name,
        tpl: ''
      }
    );
  }
  
  return () => {
    installPackagesTask(tree);
  };
}

export const mySchematic = convertNxGenerator(mySchematicGenerator);
