import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OwnersPageModel } from '../_models/owners-page.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  url = environment.BaseURL + 'owner/';

  constructor(private httpCleint: HttpClient) { }

  getOwners(ownersPage: Object) {
    return this.httpCleint.post<OwnersPageModel>(`${this.url}GetAllOwners`, ownersPage);
  }
}
