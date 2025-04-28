export class FotoCreateDTO {
    constructor(
        public imagenUrl: string = "",

        public ifFinca: number | null = null
    ) {}
}