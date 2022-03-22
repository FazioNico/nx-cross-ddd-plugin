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
import { libraryGenerator } from '@nrwl/node';
import { addDomainToLintingRules } from '../rules/add-domain-to-linting-rules';
import { DomainSchema } from './schema';

export async function mySchematicGenerator(tree: Tree, opts: DomainSchema) {
  
  const dddType = 'domain';
  const nx = readJson(tree, 'nx.json');
  const { className, fileName } = names(opts.name);
  const libFolder = nx.workspaceLayout?.libsDir || 'libs'
  const tags = `${dddType}:${fileName},type:${dddType}-logic`;
  const libDirectory = (opts?.directory === undefined) 
    ? `${libFolder}/${fileName}/${dddType}/src/lib`
    : `${libFolder}/${opts.directory}/${fileName}`;
  const  installDirectory =  (opts?.directory === undefined)
    ? fileName
    : `${opts.directory}/${fileName}`;
  const generateService = opts.generateService || false;
  const generateRepository = opts.generateRepository || false;
  const { fileName: workspace } = names(nx.npmScope);
  // format file tree
  await formatFiles(tree);
  await libraryGenerator(tree, { 
    name: dddType,
    directory: installDirectory,
    tags,
    buildable: true,
    publishable: true,
    importPath: `@${workspace}/${fileName}-domain`,
    strict: true,
    compiler: 'tsc',
  });
  generateFiles(
    tree, 
    joinPathFragments(__dirname, './files/base'), 
    joinPathFragments(libDirectory), 
    {
      generateService,
      generateRepository,
      className,
      name: fileName,
      tpl: ''
    }
  );
  generateFiles(
    tree, 
    joinPathFragments(__dirname, './files/entities'), 
    joinPathFragments(libDirectory + '/entities'), 
    {
      className,
      name: fileName,
      tpl: ''
    }
  );
  if (generateService) {
    generateFiles(
      tree, 
      joinPathFragments(__dirname, './files/data-access/service'), 
      joinPathFragments(libDirectory + '/data-access'), 
      {
        generateService,
        className,
        name: fileName,
        tpl: ''
      }
    );
  }
  if (generateRepository) {
    generateFiles(
      tree, 
      joinPathFragments(__dirname, './files/data-access/repository'), 
      joinPathFragments(libDirectory + '/data-access'), 
      {
        generateRepository,
        className,
        name: fileName,
        tpl: ''
      }
    );
  }
  addDomainToLintingRules(fileName, tree);
  return () => {
    installPackagesTask(tree);
  };
}

export const mySchematic = convertNxGenerator(mySchematicGenerator);
