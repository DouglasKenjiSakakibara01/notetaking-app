export class Evento {
    public Id: number;
    public Titulo: string;
    public DtCriacao: Date;
    public DtEvento: Date;
    public constructor(
        id?: number,
        titulo?: string,
        dtcriacao?: Date,
        dtevento?: Date
    ){
        this.Id = id || 0;
        this.Titulo = titulo || '';
        this.DtCriacao = dtcriacao || new Date();
        this.DtEvento = dtevento || new Date();

    }

}