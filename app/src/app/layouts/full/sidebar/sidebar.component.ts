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
        label: "Quản lý nhà đất",
        icon: "pi pi-user",
        routerLink: ["/house"]
      },
      {
        label: "Gợi ý giá nhà đất",
        icon: "pi pi-user",
        routerLink: ["/house/suggestion"]
      },
    ];
  }
}
