import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, computed, input, OnChanges, OnDestroy, signal, SimpleChanges, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lifecycle-child',
  imports: [],
  templateUrl: './lifecycle-child.component.html',
  styleUrl: './lifecycle-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecycleChildComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy {

  lifecycleArray = signal<string[]>(['component: static declared value']);
  computedLifecycleArray = computed(() => this.lifecycleArray().join(', '));
  inputChild = input.required<string>();
  changes = signal<string[]>([]);
  subscription: Subject<void> = new Subject();
  pollingTimer = signal<number | undefined>(undefined);

  constructor(
    private router: Router,
  ) {
    this.lifecycleArray.update(val => [...val, 'constructor: Standard JavaScript class constructor. Runs when Angular instantiates the component']);
  }

  ngOnInit(): void {
    this.lifecycleArray.update(val => [...val, `ngOnInit:	Runs once after Angular has initialized all the component's inputs`]);
    this.mockAsyncPolling();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lifecycleArray.update(val => [...val, `ngOnChanges: Runs every time the component's inputs have changed`]);
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      this.changes.update(val => [...val, `Previous ${inputName} == ${inputValues.previousValue}`]);
      this.changes.update(val => [...val, `Current ${inputName} == ${inputValues.currentValue}`]);
      this.changes.update(val => [...val, `Is first ${inputName} change == ${inputValues.firstChange}`]);
    }
  }

  ngAfterViewInit(): void {
    this.lifecycleArray.update(val => [...val, `ngAfterViewInit: Runs once after the component's view has been initialized`]);
  }

  ngAfterContentInit(): void {
    this.lifecycleArray.update(val => [...val, `ngAfterContentInit:	Runs once after the component's content has been initialized`]);
  }

  updateValue(): void {
    this.lifecycleArray.update(val => [...val, 'lifecycleArray() value updated']);
  }

  ngOnDestroy(): void {
    this.subscription.next();
    alert(`ngOnDestroy: Component destroyed`);
  }

  mockAsyncPolling(): void {
    interval(1000)
      .pipe(takeUntil(this.subscription))
      .subscribe(x => {
        this.pollingTimer.set(x);
        console.log(x);
      });
  }

  unsubscribeTimer(): void {
    this.subscription.next();
  }

  destroy(): void {
    this.router.navigate(['home']);
  }
}
