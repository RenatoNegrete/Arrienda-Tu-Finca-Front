export class Solicitud{
    constructor(
        public id: number = 0,
        public fechasolicitud: Date = new Date(),
        public fechallegada: Date = new Date(),
        public fechasalida: Date = new Date(),
        public cantpersonas: number = 0,
        public valor: number = 0,
        public estado: number = 0,

        public idArrendador: number | null = null,
        public idFinca: number | null = null,
        public idPago: number | null = null
    ) {}
}
