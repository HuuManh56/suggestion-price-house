import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { Storage } from "../../../shared/service/storage.service";
import { UserService } from "../../../core/services/user.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: string;
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if(Storage.getUserToken() != null) {
      this.router.navigate(["starter"]);
      return;
    }
    window.sessionStorage.removeItem("token");
    this.buildForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.actionRequestToken(this.loginForm.value).subscribe(
      data => {
        if (data) {
          window.sessionStorage.setItem("token", data);
          this.authService.getCurrentUserInfo().subscribe(res => {
            const user = this.authService.extractTokenData(res);
            Storage.clear();
            Storage.setUserToken(user);
            this.router.navigate(["starter"]);
          });
        } else {
          this.error = "Invalid username or password";
        }
      },
      error => {
        this.error = "Invalid username or password";
      }
    );
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
}
