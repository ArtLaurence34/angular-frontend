import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account';

@Component({
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    templateUrl: 'admin-layout.html'
})
export class AdminLayoutComponent {
    constructor(public accountService: AccountService) {}
}