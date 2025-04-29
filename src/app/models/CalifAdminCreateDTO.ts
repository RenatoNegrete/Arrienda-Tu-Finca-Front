export class CalifAdminCreateDTO {
    constructor(
        public puntuacion: number = 0,
        public comentario: string = '',

        public idFinca: number | null = null
    ) {}
}
