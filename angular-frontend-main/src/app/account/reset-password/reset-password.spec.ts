import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account';

@Component({ templateUrl: 'reset-password.html' })
export class ResetPasswordComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    success = false;
    error = '';
    token = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.token = this.route.snapshot.queryParams['token'];
        if (!this.token) {
            this.router.navigate(['/']);
            return;
        }
        this.form = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        if (password?.value !== confirmPassword?.value) {
            confirmPassword?.setErrors({ mustMatch: true });
        } else {
            confirmPassword?.setErrors(null);
        }
        return null;
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.error = '';
        if (this.form.invalid) return;
        this.loading = true;
        this.accountService.resetPassword(this.token, this.f['password'].value, this.f['confirmPassword'].value)
            .subscribe({
                next: () => {
                    this.success = true;
                    this.loading = false;
                },
                error: err => {
                    this.error = err;
                    this.loading = false;
                }
            });
    }
}