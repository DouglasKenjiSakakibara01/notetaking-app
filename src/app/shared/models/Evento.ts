export class Evento {
    public Id: number;
    public Titulo: string;
    public Descricao: string;
    public DtCriacao: Date;
    public DtEvento: Date;
    public constructor(
        id?: number,
        titulo?: string,
        descricao?: string,
        dtcriacao?: Date,
        dtevento?: Date
    ){
        this.Id = id || 0;
        this.Titulo = titulo || '';
        this.Descricao = descricao || '';
        this.DtCriacao = dtcriacao || new Date();
        this.DtEvento = dtevento || new Date();

    }

}