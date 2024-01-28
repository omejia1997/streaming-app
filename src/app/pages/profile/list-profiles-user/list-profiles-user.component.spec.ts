/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListProfilesUserComponent } from './list-profiles-user.component';

describe('ListProfilesUserComponent', () => {
  let component: ListProfilesUserComponent;
  let fixture: ComponentFixture<ListProfilesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfilesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfilesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
