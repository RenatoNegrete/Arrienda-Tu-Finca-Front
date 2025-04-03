export class Pago {
    constructor(
        public id: number = 0,
        public numCuenta: string = "",
        public idBanco: number | null = null
    ) {}
}
