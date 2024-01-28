/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AssociateProfileUserComponent } from './associate-profile-user.component';

describe('AssociateProfileUserComponent', () => {
  let component: AssociateProfileUserComponent;
  let fixture: ComponentFixture<AssociateProfileUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateProfileUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateProfileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
