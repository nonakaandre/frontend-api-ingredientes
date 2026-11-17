import './Ingrediente.css';

export default function Ingrediente({ id, nome, quantidade, unidade, preco, disponivel, criado, excluirIngrediente, iniciarAlteracao }) {
    return (
        <div className='produto'>
            <h3>{ nome }</h3>
            <p>{ quantidade }</p>
            <p>{ unidade }</p>
            <span>Preço R$ { preco.toFixed(2) }</span>
            <p>Disponível: { disponivel ? "Sim" : "Não" }</p>
            <p>Criado em: { new Date(criado).toLocaleString() }</p>
            <button onClick={ () => {
                excluirIngrediente(id);
            } }>Inativar</button>
            <button onClick={ () => {
                iniciarAlteracao(id, nome, quantidade, unidade, preco, disponivel, criado);
            } }>Alterar</button>
        </div>
    );
}