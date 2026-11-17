import Ingrediente from "./Ingredientes";
export default function ListaIngredientes({ ingrediente = [], excluirIngrediente, iniciarAlteracao }) {
    return (
        <div>
            <h2>Ingredientes</h2>
            { ingrediente.map((ingrediente) => (
                <Ingrediente key={ ingrediente._id }
                    id={ ingrediente._id }
                    nome={ ingrediente.nome }
                    quantidade={ ingrediente.quantidade }
                    unidade={ ingrediente.unidade }
                    preco={ ingrediente.preco }
                    disponivel={ ingrediente.disponivel }
                    criado={ ingrediente.criado }
                    excluirIngrediente= { excluirIngrediente }
                    iniciarAlteracao= { iniciarAlteracao }
                />
            ))}
        </div>
    );
}