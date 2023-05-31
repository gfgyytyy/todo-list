import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  constructor (
    private route: ActivatedRoute,
    public router: Router
  ) {
  }

  get routes () {
    return [
      {
        name: 'Dashboard',
        link: '/'
      },
      {
        name: 'Tasks',
        link: '/tasks',
      },
    ]
  }
}
