import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrarCita } from '../../models/registro/registrar-cita';
import { CitasService } from '../../services/citas.service';
import { RouterModule, Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent implements OnInit {

  newForm: FormGroup;
  cita = new RegistrarCita();
  citas: RegistrarCita[] = [];
  contadorDescuento = 0;
  idNext;
  enviar = false;

  constructor(
      private frmBuilder: FormBuilder,
      private citaService: CitasService,
      private rt: Router
    ) {

    this.createForm();

  }

  ngOnInit(): void {
  }

  getTodasCitas(){
    this.citaService.getCitas().subscribe(resp => { this.citas = resp; });
  }

  get nombreNoValido(): boolean{
    return this.newForm.get('nombre').invalid && this.newForm.get('nombre').touched;
  }

  get duiNoValido(): boolean{
    return this.newForm.get('dui').invalid && this.newForm.get('dui').touched;
  }

  get nombreMascotaNoValido(): boolean{
    return this.newForm.get('nombreMascota').invalid && this.newForm.get('nombreMascota').touched;
  }

  get tratamientoNoValido(): boolean{
    return this.newForm.get('tratamiento').invalid && this.newForm.get('tratamiento').touched;
  }

  get medicamentoNoValido(): boolean{
    return this.newForm.get('medicamento').invalid && this.newForm.get('medicamento').touched;
  }

  get costoNoValido(): boolean{
    return this.newForm.get('costo').invalid && this.newForm.get('costo').touched;
  }

  createForm(): void{
    this.newForm = this.frmBuilder.group({
      nombre: ['', [Validators.required]],
      dui: ['', [Validators.required]],
      nombreMascota: ['', [Validators.required]],
      tratamiento: ['', [Validators.required]],
      medicamento: ['', [Validators.required]],
      costo: ['', [Validators.required]]
    });
  }
  afterSent(){
    this.newForm.reset();
    return this.enviar = false;
  }

  guardar(): void{
    if (this.newForm.invalid){
      return Object.values(this.newForm.controls).forEach(
        control => { control.markAsTouched(); }
      );
    }else{
        this.enviar = true;
        this.getTodasCitas();
        console.log(this.citas);
        this.citas.forEach(key => {
          if (key.dui === this.cita.dui){
            this.contadorDescuento++;
          }
        });
        if (this.contadorDescuento === 2){
            this.cita.costo -= this.cita.costo * 0.05;
            this.cita.descuento = 0.05;
        }
        if (this.contadorDescuento > 5){
          this.cita.costo -= this.cita.costo * 0.08;
          this.cita.descuento = 0.08;
        }

        this.citaService.crearCita(this.cita).subscribe(resp => {
          // this.cita.citaId = resp['name'];
          console.log(resp);
         });
        // this.rt.navigate(['/ticket']);
    }
  }

}
