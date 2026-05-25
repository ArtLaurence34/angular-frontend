import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: 'register.html'
})
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    success = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService
    ) {
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
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
        this.accountService.register(this.form.value)
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