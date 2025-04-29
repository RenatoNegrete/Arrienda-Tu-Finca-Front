export class CalifArrendadorCreateDTO {
    constructor(
        public puntuacion: number = 0,
        public comentario: string = '',

        public idArrendador: number | null = null
    ) {}
}
