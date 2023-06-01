import { Component } from '@angular/core';
import { Router } from '@angular/router';

export const displayRoutes = [
  {
    name: 'Dashboard',
    link: '/'
  },
  {
    name: 'Tasks',
    link: '/tasks',
  },
]
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  constructor (
    public router: Router
  ) {
  }

  get routes () {
    return displayRoutes
  }
}
