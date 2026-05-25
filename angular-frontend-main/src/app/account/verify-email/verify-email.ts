import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account';

enum EmailVerificationStatus {
    Verifying,
    Success,
    Failed
}

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: 'verify-email.html'
})
export class VerifyEmailComponent implements OnInit {
    EmailVerificationStatus = EmailVerificationStatus;
    status = EmailVerificationStatus.Verifying;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        const token = this.route.snapshot.queryParams['token'];
        if (!token) {
            this.router.navigate(['/']);
            return;
        }
        this.accountService.verifyEmail(token)
            .subscribe({
                next: () => {
                    this.status = EmailVerificationStatus.Success;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.status = EmailVerificationStatus.Failed;
                    this.cdr.detectChanges();
                }
            });
    }
}