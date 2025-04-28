export class PagoCreateDTO {
    constructor(
        public numCuenta: string = "",
        public idBanco: number | null = null
    ) {}
}
