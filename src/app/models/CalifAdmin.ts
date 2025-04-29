export class CalifAdmin {
    constructor(
        public id: number = 0,
        public puntuacion: number = 0,
        public comentario: string = '',

        public idAdministrador: number | null = null
    ) {}
}
