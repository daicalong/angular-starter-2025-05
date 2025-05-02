import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LifecycleChildComponent } from "./components/lifecycle-child/lifecycle-child.component";

@Component({
  selector: 'app-lifecycle-example',
  imports: [LifecycleChildComponent],
  templateUrl: './lifecycle-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecycleExampleComponent {
  inputParent = 'This is the input value from parent';
  showChild = signal(true);
  counter = 1;

  updateInput(): void {
    this.inputParent = `Input value updated ${this.counter++} times`;
  }
}
