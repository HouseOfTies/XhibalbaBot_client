import { IUser } from "@/app/shared/interfaces/IUser";
import { HttpClientService } from "@/app/shared/utils/httpClientService";
import { Observable } from "rxjs";

export class UserService {
  private readonly baseUrl = '/user';
  constructor( private httpClientService: HttpClientService ){}

  createUser(userData: IUser): Observable<any>{
    return this.httpClientService.post(userData, this.baseUrl);
  }

}
