import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout';
import { ListComponent } from './list/list';
import { EditComponent } from './edit/edit';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'edit/:id', component: EditComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AdminLayoutComponent,
        ListComponent,
        EditComponent
    ]
})
export class AdminModule { }