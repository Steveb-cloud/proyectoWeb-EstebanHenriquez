import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>{
        const valor = <string>control.value;
        if(valor.length === 0){return null}
        const primerLetra = valor[0];
        if(primerLetra !== primerLetra.toUpperCase()){
            return {
                primeraLetraMayuscula:{
                    mensaje: 'La primera letra debe ser mayúscula'
                }
            }
        }else{
            return null;
        }
    }
}

export function fechaNoPuedeSerFutura(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>{
        const fechaEscogidaPorElUsuario = new Date(control.value);
        const hoy = new Date();

        if(fechaEscogidaPorElUsuario  > hoy){
            return {
                futuro:{
                    mensaje: 'La Fecha no puede ser del futuro'
                }
            }
        }else{
            return null;
        }
    }
}