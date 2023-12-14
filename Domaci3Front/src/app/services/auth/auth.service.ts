import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenRequestDto} from "../../dto/TokenRequestDto";
import {TokenResponseDto} from "../../dto/TokenResponseDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/user';

  constructor(private http: HttpClient) {
  }

  login(tokenRequest: TokenRequestDto): Observable<TokenResponseDto> {
    return this.http.post<TokenResponseDto>(`${this.apiUrl}/login`, tokenRequest);
  }
}
