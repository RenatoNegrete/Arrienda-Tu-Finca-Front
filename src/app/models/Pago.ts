export class Pago {
    constructor(
        public id: number = 0,
        public numCuenta: string = "",
        public valor: number = 0,

        public idBanco: number | null = null,
        public idSolicitud: number | null = null
    ) {}
}
