import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, computed, Input, input, OnChanges, OnDestroy, signal, SimpleChanges, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lifecycle-child',
  imports: [],
  templateUrl: './lifecycle-child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecycleChildComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  inputChild = input<string>();
  lifecycleArray = signal<string[]>(['component: Initial declared value']);
  computedLifecycleArray = computed(() => this.lifecycleArray().map(x => {
    const sliceIndex = x.indexOf(':');
    return {
      label: x.slice(0, sliceIndex + 1),
      value: x.slice(sliceIndex + 1, x.length)
    }
  }));
  changes = signal<string[]>([]);
  subscription: Subject<void> = new Subject();
  pollingTimer = signal<number | undefined>(undefined);

  constructor(
    private router: Router,
  ) {
    this.lifecycleArray.update(val => [...val, 'constructor: Standard JavaScript class constructor. Runs when Angular instantiates the component']);
  }

  ngOnInit(): void {
    this.lifecycleArray.update(val => [...val, `ngOnInit:	Runs once after Angular has initialized all the component's inputs & variables`]);
    // console.log(new Person('Emma', 31));
    // this.mockAsyncPolling();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lifecycleArray.update(val => [...val, `ngOnChanges: Runs every time the component's inputs have changed`]);
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      if (inputValues) {
        this.changes.update(val => [...val, `Previous ${inputName} == ${inputValues.previousValue}`]);
        this.changes.update(val => [...val, `Current ${inputName} == ${inputValues.currentValue}`]);
        this.changes.update(val => [...val, `Is first ${inputName} change == ${inputValues.firstChange}`]);
      }
    }
  }

  ngAfterViewInit(): void {
    this.lifecycleArray.update(val => [...val, `ngAfterViewInit: Runs once after the component's view/UI has been initialized`]);
  }

  updateValue(): void {
    this.lifecycleArray.update(val => [...val, '(click): lifecycleArray() value updated']);
  }

  ngOnDestroy(): void {
    // this.subscription.next();
    console.log(`ngOnDestroy: Component destroyed`);
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

/**
 * @param _nameInput name of person
 * @param _age age of person
 */
export class Person {
  constructor(
    private _name?: string,
    private _age?: number,
  ) { }

  name = this._name || 'Nobody';
  age = this._age || 0;
}