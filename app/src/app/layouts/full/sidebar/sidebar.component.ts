import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  OnInit
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MenuItems } from "../../../shared/menu-items/menu-items";
import { Storage } from "../../../shared/service/storage.service";
import { UserToken } from "../../../core/models/user-token.model";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: []
})
export class AppSidebarComponent extends BaseComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  userInfo: UserToken;

  items: MenuItem[];
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public router: Router,
    public menuItems: MenuItems
  ) {
    super(null);
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userInfo = Storage.getUserToken();
  }

  ngOnInit(): void {
    this.innitMenu();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public userInformation() {
    this.router.navigate(["/user-info"]);
  }

  public changePassword() {
    this.router.navigate(["/user-info/change-password"]);
  }

  public logOut() {
    this.router.navigate(["/login"]);
    Storage.clear();
  }
  routerLink: ["/pagename"];
  private innitMenu() {
    // TODO Khai báo các url trên side-sidebar
    this.items = [
      {
        label: "Trang chủ",
        icon: "pi pi-home",
        routerLink: ["/starter"]
      },
      {
        label: "Quản lý người dùng",
        icon: "pi pi-user",
        routerLink: ["/user"]
      },
      // For employee-manager
      {
        label: "Quản lý nhân viên",
        icon: "pi pi-users",
        items: [
          {
            label: "Quản lý phòng ban",
            icon: "pi pi-th-large",
            routerLink: ["/employee-manager/departments"]
          },
          {
            label: "Quản lý nhân viên",
            icon: "pi pi-th-large",
            routerLink: ["/employee-manager/employees"]
          },
          {
            label: "Quản lý chức vụ",
            icon: "pi pi-th-large",
            routerLink: ["/employee-manager/positions"]
          }
        ]
      },
      {
        label: "Quản lý căn hộ",
        icon: "pi pi-inbox",
        items: [
          {
            label: "Căn hộ",
            routerLink: ["/department-manager/department"],
            icon: "pi pi-th-large"
          },
          {
            label: "Cư dân",
            routerLink: ["/department-manager/person"],
            icon: "pi pi-th-large"
          }
        ]
      },
      {
        label: "Quản lý hóa đơn",
        icon: "pi pi-money-bill",

        items: [
          {
            label: "Hóa đơn điện, nước",
            icon: "pi pi-money-bill",
            routerLink: ["/bill/bill-water-electrict"]
          },
          {
            label: "Hóa đơn dịch vụ",
            icon: "pi pi-money-bill",
            routerLink: ["/bill/bill-orther"]
          },
          {
            label: "Loại dịch vụ",
            icon: "pi pi-list",
            routerLink: ["/bill/bill-service-type"]
          }
        ]
      },
      // {
      //   label: "Thống kê",
      //   icon: "pi pi-align-right",

      //   items: [
      //     {
      //       label: "Thống kê hóa đơn",
      //       icon: "pi pi-th-large",
      //       routerLink: ["/statistical/bill-month"]
      //     },
      //     {
      //       label: "Thống kê người dân",
      //       icon: "pi pi-th-large",
      //       routerLink: ["/statistical/person-month"]
      //     }
      //   ]
      // }
    ];
  }
}
