import { AfterViewInit, ChangeDetectionStrategy, Component, computed, input, OnChanges, OnDestroy, signal, SimpleChanges, type OnInit } from '@angular/core';

@Component({
  selector: 'app-lifecycle-child',
  imports: [],
  templateUrl: './lifecycle-child.component.html',
  styleUrl: './lifecycle-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecycleChildComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  lifecycleArray = signal<string[]>(['static declared value']);
  computedLifecycle = computed(() => this.lifecycleArray().join(', '));
  inputChild = input.required<string>();
  changes = signal<string[]>([]);

  constructor() {
    this.lifecycleArray.update(val => [...val, 'constructor']);
  }

  ngOnInit(): void {
    this.lifecycleArray.update(val => [...val, 'onInit']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lifecycleArray.update(val => [...val, 'onChanges']);
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      this.changes.update(val => [...val, `Previous ${inputName} == ${inputValues.previousValue}`]);
      this.changes.update(val => [...val, `Current ${inputName} == ${inputValues.currentValue}`]);
      this.changes.update(val => [...val, `Is first ${inputName} change == ${inputValues.firstChange}`]);
    }
  }

  ngAfterViewInit(): void {
    this.lifecycleArray.update(val => [...val, 'afterViewInit']);
  }


  triggerOnChanges(): void {
    this.lifecycleArray.update(val => [...val, 'lifecycleArray() value updated']);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
