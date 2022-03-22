export interface Schema {
  // The name of Feature Library.
  name: string;

  // The name of workspace
  workspace?: string;

  // The name of linked Domain.
  domain?: string;
  
  // The name of Feature linked library.
  feature?: string;

  // The name of linked Domain.
  directory?: string;

  // The name of Desired framework to build Platform UI layer.
  framework?: string;

  // Genereate default component extending feature domain logic class
  generateComponent?: boolean;
}
