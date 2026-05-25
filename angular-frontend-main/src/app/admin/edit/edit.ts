import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: 'edit.html'
})
export class EditComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitting = false;
    submitted = false;
    error = '';
    id!: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            password: [''],
            confirmPassword: ['']
        });

        this.loading = true;
        this.accountService.getById(this.id)
            .subscribe({
                next: account => {
                    this.form.patchValue(account);
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error: err => {
                    this.error = err;
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) return;
        this.submitting = true;
        this.accountService.update(this.id, this.form.value)
            .subscribe({
                next: () => {
                    this.router.navigate(['/admin']);
                },
                error: err => {
                    this.error = err;
                    this.submitting = false;
                    this.cdr.detectChanges();
                }
            });
    }
}