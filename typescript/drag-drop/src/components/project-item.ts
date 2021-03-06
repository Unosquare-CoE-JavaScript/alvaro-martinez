import { autobind } from '../decorators/autobind-decorator';
import { Draggable } from '../models/drag-and-drop-interfaces';
import { Project } from '../models/project-model';
import { Component } from './base';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super(`single-project`, hostId, true, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    console.log(event);
    event.dataTransfer?.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @autobind
  dragEndHandler(event: DragEvent): void {
    console.log('drag start');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent =
      this.persons + ' Persons assigend';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
