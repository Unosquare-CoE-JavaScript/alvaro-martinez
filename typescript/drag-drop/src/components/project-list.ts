/// <reference path="base.ts"/>
/// <reference path="../decorators/autobind-decorator.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/project-model.ts"/>
/// <reference path="../models/drag-and-drop-interfaces.ts"/>

namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements TargetDrag
  {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.element.id = `${type}-projects`;
      this.configure();
      this.renderContent();
    }

    @autobind
    dragoOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
      }
    }

    @autobind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        projectId,
        this.type === 'active' ? TypeProject.Active : TypeProject.Finished
      );
    }

    @autobind
    dragLeaveHandler(event: DragEvent) {
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
    }

    configure() {
      this.element.addEventListener('dragover', this.dragoOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);
      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((project) => {
          if (this.type === 'active') {
            return project.status === TypeProject.Active;
          }
          return project.status === TypeProject.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
      const itemEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      itemEl.innerHTML = '';
      for (const project of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, project);
      }
    }
  }
}
