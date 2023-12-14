import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserDto} from "../../dto/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/user';

  // Dodali smo Subject za osvežavanje liste korisnika
  private refreshUserListSource = new Subject<void>();
  refreshUserList$ = this.refreshUserListSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/list`);
  }

  addUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/add`, user);
  }

  updateUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/update`, user);
  }

  deleteUser(id: number): Observable<UserDto> {
    return this.http.delete<UserDto>(`${this.apiUrl}/delete/${id}`);
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/get/${id}`);
  }

  // Metoda za obaveštavanje da je lista korisnika promenjena
  notifyUserListRefresh() {
    this.refreshUserListSource.next();
  }
}
