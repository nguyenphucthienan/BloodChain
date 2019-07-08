import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoleName } from 'src/app/core/constant/role-name';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  readonly adminRoutes = [
    { path: '/admin/users', title: 'sidebar.title.users', icon: 'users' },
    { path: '/admin/blood-camps', title: 'sidebar.title.bloodCamps', icon: 'map' },
    { path: '/admin/blood-test-centers', title: 'sidebar.title.bloodTestCenters', icon: 'vial' },
    { path: '/admin/blood-separation-centers', title: 'sidebar.title.bloodSeparationCenters', icon: 'columns' },
    { path: '/admin/blood-banks', title: 'sidebar.title.bloodBanks', icon: 'university' },
    { path: '/admin/hospitals', title: 'sidebar.title.hospitals', icon: 'hospital' },
    { path: '/admin/blood-packs', title: 'sidebar.title.bloodPacks', icon: 'cube' }
  ];

  readonly bloodCampRoutes = [
    { path: '/manager/users', title: 'sidebar.title.users', icon: 'users' },
    { path: '/manager/blood-packs', title: 'sidebar.title.bloodPacks', icon: 'cube' }
  ];

  @Output() sidebarToggled = new EventEmitter();

  showAdminRoutes = false;
  showBloodCampRoutes = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.decodedToken$
      .subscribe(decodedToken => {
        if (decodedToken) {
          this.resetSidebar();
          const roles = decodedToken.roles as Array<string>;
          roles.forEach(role => {
            switch (role) {
              case RoleName.ADMIN:
                this.showAdminRoutes = true;
                break;
              case RoleName.BLOOD_CAMP:
                this.showBloodCampRoutes = true;
                break;
            }
          });
        }
      });
  }

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  private resetSidebar() {
    this.showAdminRoutes = false;
  }

}
