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
    { path: '/admin/test-types', title: 'sidebar.title.testTypes', icon: 'vial' },
    { path: '/admin/blood-product-types', title: 'sidebar.title.bloodProductTypes', icon: 'th-large' },
    { path: '/admin/blood-camps', title: 'sidebar.title.bloodCamps', icon: 'map' },
    { path: '/admin/blood-test-centers', title: 'sidebar.title.bloodTestCenters', icon: 'vials' },
    { path: '/admin/blood-separation-centers', title: 'sidebar.title.bloodSeparationCenters', icon: 'columns' },
    { path: '/admin/blood-banks', title: 'sidebar.title.bloodBanks', icon: 'university' },
    { path: '/admin/hospitals', title: 'sidebar.title.hospitals', icon: 'hospital' },
    { path: '/admin/blood-packs', title: 'sidebar.title.bloodPacks', icon: 'cube' }
  ];

  readonly managerRoutes = [
    { path: '/manager/users', title: 'sidebar.title.users', icon: 'users' },
    { path: '/manager/blood-products', title: 'sidebar.title.bloodProducts', icon: 'cubes' }
  ];

  readonly bloodCampRoutes = [
    { path: '/manager/blood-camp/blood-packs', title: 'sidebar.title.bloodPacks', icon: 'cube' }
  ];

  readonly bloodTestCenterRoutes = [
    { path: '/manager/blood-test-center/blood-packs', title: 'sidebar.title.bloodPacks', icon: 'cube' }
  ];

  readonly bloodSeparationCenterRoutes = [
    { path: '/manager/blood-separation-center/blood-packs', title: 'sidebar.title.bloodPacks', icon: 'cube' }
  ];

  @Output() sidebarToggled = new EventEmitter();

  sectionPermissions = {
    admin: false,
    manager: false,
    bloodCamp: false,
    bloodTestCenter: false,
    bloodSeparationCenter: false,
    bloodBank: false,
    hospital: false
  };

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
                this.sectionPermissions.admin = true;
                this.sectionPermissions.manager = true;
                break;
              case RoleName.BLOOD_CAMP:
                this.sectionPermissions.manager = true;
                this.sectionPermissions.bloodCamp = true;
                break;
              case RoleName.BLOOD_TEST_CENTER:
                this.sectionPermissions.manager = true;
                this.sectionPermissions.bloodTestCenter = true;
                break;
              case RoleName.BLOOD_SEPARATION_CENTER:
                this.sectionPermissions.manager = true;
                this.sectionPermissions.bloodSeparationCenter = true;
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
    for (const key in this.sectionPermissions) {
      if (!this.sectionPermissions.hasOwnProperty(key)) {
        continue;
      }

      this.sectionPermissions[key] = false;
    }
  }

}
