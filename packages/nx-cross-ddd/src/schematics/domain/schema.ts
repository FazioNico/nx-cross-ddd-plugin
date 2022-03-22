export interface DomainSchema {
  // The name of the service.
  name: string;

  // The path to create the service.
  directory?: string;

  // The type of the library [builable, publishable].
  type?: string;

  generateService?: boolean;
  
  generateRepository?: boolean;
}
