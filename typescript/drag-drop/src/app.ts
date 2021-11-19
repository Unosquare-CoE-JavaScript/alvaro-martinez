/// <reference path="models/drag-and-drop-interfaces.ts"/>
/// <reference path="models/project-model.ts"/>
/// <reference path="state/project-state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorators/autobind-decorator.ts"/>
/// <reference path="components/project-input.ts"/>
/// <reference path="components/project-list.ts"/>
/// <reference path="components/project-item.ts"/>

namespace App {
  //

  // ProjectItemClass

  //

  //
  const project = new ProjectInput();
  const activeProjectList = new ProjectList('active');
  const finiseProjectList = new ProjectList('finished');
}
