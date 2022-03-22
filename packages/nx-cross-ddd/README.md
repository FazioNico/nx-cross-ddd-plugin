<h1 align="center">
  @fazio/nx-cross-ddd-plugin<br/>
  <small>Typescript Cross platform DDD Plugin for Nx</small>
</h1>

<div align="center">

  > This plugin allow you to build cross platform sorftware with typescript, supporting architecture for different platform/framework combinations. Nx Cross DDD Plugin is an added value pack for [Nx Workspace](https://nx.dev/) which provides additional schematics which automate slicing your Nx workspace into domains, feature layers and platforms UI layers according to Nrwl's best practices and about DDD and SOLID programming software pattern.

  ![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)
  <a href="https://www.repostatus.org/#wip"><img src="https://www.repostatus.org/badges/latest/wip.svg" alt="Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public." /></a>
  [![License](https://img.shields.io/npm/l/@fazio/nx-cross-ddd-plugin?style=square)]()
  [![npm version](https://badge.fury.io/js/%40fazio%2Fnx-cross-ddd-plugin.svg)](https://badge.fury.io/js/%40fazio%2Fnx-cross-ddd-plugin)
</div>
<hr>

<img src="https://raw.githubusercontent.com/FazioNico/nx-cross-ddd-plugin/master/packages/nx-cross-ddd/assets/ddd-library-architecture-003.png" />


## Overview
- [Introduction Slides](https://raw.githubusercontent.com/FazioNico/nx-cross-ddd-plugin/master/packages/nx-cross-ddd/assets/Nx-Cross-DDD-Plugin.pdf)
- [Example Application](https://github.com/FazioNico/demo-nx-cross-ddd-plugin)


## Features
- ✅ Architect, test, and build software at any scale according DDD and SOLID programming sorftware pattern best practices 
- ✅ Create domains with `domain` libraries including models and data services
- ✅ Create features with `domain feature` libraries including facades, models, and data services
- ✅ Create platforms UI with `platform feature` libraries including feature components build with multi framework available
- ✅ Share libraries of a Monorepo
- ✅ Add linting rules for access restrictions between `domains` as proposed by Nrwl
- ✅ Add linting rules for access restrictions between `domain features layers` and `platforms UI layers` as proposed by Nrwl
- ✅ Support for many frontend and backend technologies
- ✅ Add tooling for build and publish registery librairies automation


## Install
Add this plugin to an existing Nx workspace
- Run from Nx Project root folder: `npm i -D @fazio/nx-cross-ddd-plugin`

Or create new Nx Workspace. Run the following command:
- `npx create-nx-workspace@latest`
- `npm i -D @fazio/nx-cross-ddd-plugin`


## Usage
You can genetate libraries with [Nx Editor Plugins](https://nx.dev/latest/angular/getting-started/console) or run following commandes: 

<hr/>

### Generate Domain 
```bash
nx g @fazio/nx-cross-ddd-plugin:domain MyDomain --generateService
```
- *--generateService (optional)*: Generate client service file.
- *--generateRepository (optional)*: Generate backend service file.

<hr/>

### Generate Domain feature
```bash
nx g @fazio/nx-cross-ddd-plugin:feature MyFeature --domain MyDomain
```
- *--domain (required)*: Name of Domain.

<hr/>

### Generate Platform UI feature 
```bash
nx g @fazio/nx-cross-ddd-plugin:platform MyPlatformUI --domain MyDomain --feature MyFeature --generateComponent
```
- *--domain (optional)*:  Name of Domain.
- *--feature (optional)*:  Name of Domain Feature to extend.
- *--directory (optional)*: The folder directory to generate library. By default will be created inside `--ui` parameter. Usefull to generate `shared library` or library for different framework.
- *--framework (optional)*:  Name of framework to build UI Component. If not provided, will use by default `Angular`.
- *--generateComponent (optional)*: Genereate default component extended with feature domain logic class

<hr/>

### Generate Linting Rules for workspace 
```bash
ng add @fazio/nx-cross-ddd-plugin
```

<hr/>

## Architecture Overview
<img src="https://raw.githubusercontent.com/FazioNico/nx-cross-ddd-plugin/master/packages/nx-cross-ddd/assets/ddd-library-architecture-001.png" />
<img src="https://raw.githubusercontent.com/FazioNico/nx-cross-ddd-plugin/master/packages/nx-cross-ddd/assets/ddd-library-architecture-002.png" />
<img src="https://raw.githubusercontent.com/FazioNico/nx-cross-ddd-plugin/master/packages/nx-cross-ddd/assets/ddd-library-architecture-004.png" />


<!-- ## Generated Structure
### Generated Structure for Domain Library
- entities: Client-side data model including logic operating on it (like validations).
- data-access: Services for communicating with the backend.

### Generated Structure for Domain Feature Library
### Generated Structure for Platform UI Library -->

## Recommended extra tooling
- [VS Code](https://code.visualstudio.com/)
- [Nx Console for VS Code](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)


## Credits
- [Nx Workspace](https://nx.dev/)
- [Nrwl's eBooks](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book)
- [xPlat](https://github.com/nstudio/xplat)
- [xPlat design doc](https://docs.google.com/document/d/1gUcPuHWjyO6nI3FLWCCfj-7rgAkcHUewdMYj_Izlm9U/edit)
- [Why it’s Hard to Decide on Technologies by Adam Klein](https://adamklein500.medium.com/why-its-hard-to-decide-on-technologies-9d67b6adf157)
- [@angular-architects/ddd -- DDD Plugin for Nx](https://github.com/angular-architects/nx-ddd-plugin)
- [Design a DDD-oriented microservice](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)
- [DDD By Example - Paul Rayner - DDD Europe 2020 -  Youtube Video](https://www.youtube.com/watch?v=p1Nl2k9ZZf0)
- [Javascript fatigue & Domain-driven design by Bastien Duret - Youtube Video](https://www.youtube.com/watch?v=_f-KL715Gcc)

## Contribution
see [CONTRIBUTING.md](./CONTRIBUTING.md)

## About author
Hi, i'm Nicolas Fazio, a Senior Typescript Software Architect & teacher, living in Geneva Switzerland 🇨🇭. I build software architecture and cross platform application for almost 15 years. 
You can follow me on Twitter @FazioNico or checkout my own website [https://nicolasfazio.ch](https://nicolasfazio.ch)

## Angular Trainings, Workshops, and Consulting
- [NgxMasterClass](https://www.ngxmasterclass.com/)
- [Nicolas Fazio](https://nicolasfazio.ch)