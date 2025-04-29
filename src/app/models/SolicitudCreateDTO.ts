export class SolicitudCreateDTO{
    constructor(
        public fechallegada: Date = new Date(),
        public fechasalida: Date = new Date(),
        public cantpersonas: number = 0,

        public idArrendador: number | null = null,
        public idFinca: number | null = null,
    ) {}
}
