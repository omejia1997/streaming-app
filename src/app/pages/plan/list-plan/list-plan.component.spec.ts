/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListPlanComponent } from './list-plan.component';

describe('ListPlanComponent', () => {
  let component: ListPlanComponent;
  let fixture: ComponentFixture<ListPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
