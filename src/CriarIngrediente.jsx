import { useEffect, useState } from "react";
import "./CriarIngrediente.css";

export default function CriarIngrediente({ 
    alterarIngrediente,
    incluirIngrediente, 
    alterando,
    cancelarAlteracao,
    id, nomeAlt, quantidadeAlt, unidadeAlt, precoAlt, disponivelAlt}) {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [unidade, setUnidade] = useState("");
    const [preco, setPreco] = useState("");
    const [disponivel, setDisponivel] = useState(null);
    

    useEffect(() => {
        if (alterando) {
            setNome(nomeAlt);
            setQuantidade(quantidadeAlt);
            setUnidade(unidadeAlt);
            setPreco(precoAlt);
            setDisponivel(disponivelAlt === true || disponivelAlt === "true");
            
        };
    }, [alterando]);
    
    function processarEnvio(evento) {
        evento.preventDefault();
        if (nome !=  "" && quantidade != "" && unidade != "" && preco != "" && disponivel != null) {
            if (alterando) {
                alterarIngrediente(id, nome, quantidade, unidade, preco, disponivel);
            } else {
                incluirIngrediente(nome, quantidade, unidade, preco, disponivel);
            }
            setNome("");
            setQuantidade("");
            setUnidade("");
            setPreco("");
            setDisponivel(null);
        } else {
            alert("Preencha todos os campos");
        }
    }

    return (
        <>
            <h2>{ alterando ? "Alterar" : "Criar" } Ingrediente</h2>
            <form onSubmit={ processarEnvio }>
                <div>
                    <label htmlFor="nome">Nome do Ingrediente:</label>
                    <input type="text" id="nome" name="nome" 
                           value={ nome } onChange={ (evento) => setNome(evento.target.value) } />
                </div>

                <div>
                    <label htmlFor="quantidade">Quantidade da embalagem:</label>
                    <input type="number" id="quantidade" name="quantidade" step="any"
                           value={ quantidade } onChange={ (evento) => setQuantidade(evento.target.value) } />
                </div>
                <div>
                    <label htmlFor="unidade">Unidade de medida:</label>
                    <select name="unidade" id="unidade" value={unidade} onChange={(evento) => setUnidade(evento.target.value)}>
                        <option value=""></option>
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                        <option value="unid">unid</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="preco">Preço: R$</label>
                    <input type="number" id="preco" name="preco" step="any" 
                              value={ preco } onChange={ (evento) => setPreco(evento.target.value) } />
                </div>

                <div>
                    <label htmlFor="disponivel-sim">Disponível:</label>
                    <input type="radio" id="disponivel" name="disponivel" value="true"
                           checked={ disponivel === true } onChange={ () => setDisponivel(true) } />
                    <label htmlFor="disponivel-nao">Sim</label>
                    <input type="radio" id="disponivel" name="disponivel" value="false"
                           checked={ disponivel === false } onChange={ () => setDisponivel(false) } />
                    <label htmlFor="disponivel">Não</label>
                </div>
                <button >Enviar</button>
                { 
                alterando 
                    ? 
                    <button onClick={ (evento) => {
                        evento.preventDefault();
                        setNome("");
                        setQuantidade("");
                        setUnidade("");
                        setPreco("");
                        setDisponivel(null);
                        cancelarAlteracao();
                    }}>Cancelar</button> 
                    : 
                    "" 
                }
            </form>
        </>
    );
}