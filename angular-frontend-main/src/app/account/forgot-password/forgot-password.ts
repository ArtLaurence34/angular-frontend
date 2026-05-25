import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: 'forgot-password.html'
})
export class ForgotPasswordComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    success = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.error = '';
        if (this.form.invalid) return;
        this.loading = true;
        this.accountService.forgotPassword(this.f['email'].value)
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