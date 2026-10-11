package evento.Enuns;

public enum Status {
    Ativado(1),
    Desativado(2);
    private final int codigo;
    Status(int codigo){
        this.codigo = codigo;
    }
    public int getCodigo(){
        return codigo;
    }

}
