import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListComponent, displayRoutes } from './sidenav-list.component';
import { RouterModule } from '@angular/router';

describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavListComponent],
      imports: [
        RouterModule.forRoot([]),
      ]
    });
    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have list item matches route', () => {
    expect(component.routes).toEqual(displayRoutes)
  })
});
