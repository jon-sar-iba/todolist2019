export interface CustomAlert {
    title?: string;
    body: string;
    cancelButton?: boolean;//esta propiedad es para indicar si va a existir el boton de cancelar
    cancelButtonText?: string;//definir el texto que va a tener el boton
    accptButtonText?: string;//definir el boton de aceptar
    type?: 'success' | 'error';
}