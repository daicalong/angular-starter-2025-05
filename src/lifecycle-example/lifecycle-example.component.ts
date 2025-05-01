import { AfterViewInit, ChangeDetectionStrategy, Component, computed, input, OnChanges, signal, SimpleChanges, type OnInit } from '@angular/core';
import { LifecycleChildComponent } from "./components/lifecycle-child/lifecycle-child.component";

@Component({
  selector: 'app-lifecycle-example',
  imports: [LifecycleChildComponent],
  templateUrl: './lifecycle-example.component.html',
  styleUrl: './lifecycle-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecycleExampleComponent {
  inputParent = 'input value from parent';
}
