import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrarCita } from '../models/registro/registrar-cita';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private url = 'https://login-ng-524eb.firebaseio.com';

  constructor(
    private http: HttpClient
   ) { }

   crearCita(cita: RegistrarCita){
      return this.http.post(`${ this.url }/citas.json`, cita);
   }

   getCitas(){
     return this.http.get(`${ this.url }/citas.json`).pipe(map(this.createArray));
   }

   private createArray(citasObj: object){
      const citas: RegistrarCita[] = [];
      if (citasObj === null){
        return [];
      }else{
        Object.keys(citasObj).forEach(key => {
          const cita: RegistrarCita = citasObj[key];
          citas.push(cita);
        });
      }
      console.log(citas);
      return citas;
   }
}
