export class PagoCreateDTO {
    constructor(
        public numCuenta: string = "",
        public valor: number = 0,

        public idBanco: number | null = null,
        public idSolicitud: number | null = null
    ) {}
}
