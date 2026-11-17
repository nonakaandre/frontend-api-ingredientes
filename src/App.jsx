import { useEffect, useState } from "react";
// para usar a axios no projeto instale a biblioteca com o comando:
// npm install axios
import axios from "axios";
import ListaIngredientes from "./ListaIngredientes";
import CriarIngrediente from "./CriarIngrediente";

function App() {
  const [ingrediente, setIngredientes] = useState([]);
  const [atualizacao, setAtualizacao] = useState(0);
  const [alterando, setAlterando] = useState(false);
  const [idAlterando, setIdAlterando] = useState("");
  const [nomeAlterando, setNomeAlterando] = useState("");
  const [quantidadeAlterando, setQuantidadeAlterando] = useState("");
  const [unidadeAlterando, setUnidadeAlterando] = useState("");
  const [precoAlterando, setPrecoAlterando] = useState("");
  const [disponivelAlterando, setDisponivelAlterando] = useState("");
  const [criadoAlterando, setCriadoAlterando] = useState("");

  useEffect(() => {
    axios.get(`${ import.meta.env.VITE_BACKEND_URL }/ingredientes`).then((resposta) => {
      setIngredientes(resposta.data);
    });
  }, [atualizacao]);

  function excluirIngrediente(id) {
    axios.delete(`${ import.meta.env.VITE_BACKEND_URL }/ingredientes/${ id }`)
         .then((resposta) => {
            if (resposta.status == 200) {
              alert("Ingrediente excluído com sucesso.");
              setAtualizacao((valorAtual) => valorAtual + 1);
            } else {
              alert("Falha na exclusão");
            }
         })
         .catch((erro) => {
            console.log(erro.message);
         });
  }

  function alterarIngrediente(id, novoNome, novaQuantidade, novaUnidade, novoPreco, novoDisponivel, novoCriado) {
    const ingredienteAlterado = {
      nome: novoNome,
      quantidade: novaQuantidade,
      unidade: novaUnidade,
      preco: novoPreco,
      disponivel: novoDisponivel,
      criado: novoCriado
    }
    axios.patch(`${ import.meta.env.VITE_BACKEND_URL }/ingredientes/${ id }`, ingredienteAlterado)
         .then((resposta) => {
            if (resposta.status == 200) {
              alert("Ingrediente alterado com sucesso");
              setAtualizacao((valorAtual) => valorAtual + 1);
              setAlterando(false);
            } else {
              alert("Falha na atualização");
            }
         })
         .catch((erro) => {
            console.log(erro.message);
         });
  }
  
  function cancelarAlteracao() {
  setAlterando(false);
}

  function incluirIngrediente(novoNome, novaQuantidade, novaUnidade, novoPreco, novoDisponivel) {
    const novoIngrediente = {
      nome: novoNome,
      quantidade: novaQuantidade,
      unidade: novaUnidade,
      preco: novoPreco,
      disponivel: novoDisponivel
    };

    axios.post(`${ import.meta.env.VITE_BACKEND_URL }/ingredientes`, novoIngrediente)
         .then((resposta) => {
            if (resposta.status == 201) {
              alert("Ingrediente incluído com sucesso.");
              setAtualizacao((valorAtual) => valorAtual + 1);
            }
         }).catch((erro) => {
            console.log(erro.message);
         });
  }
  
  function iniciarAlteracao(id, nome, quantidade, unidade, preco, disponivel, criado) {
    setAlterando(true);
    setIdAlterando(id);
    setNomeAlterando(nome);
    setQuantidadeAlterando(quantidade);
    setUnidadeAlterando(unidade);
    setPrecoAlterando(preco);
    setDisponivelAlterando(disponivel);
    setCriadoAlterando(criado);
  }

  return (
    <div>
      <CriarIngrediente 
      alterarIngrediente={ alterarIngrediente } 
      incluirIngrediente={ incluirIngrediente } 
      cancelarAlteracao={cancelarAlteracao}
      alterando={ alterando } 
      id={ idAlterando } nomeAlt={ nomeAlterando } quantidadeAlt={ quantidadeAlterando } unidadeAlt={ unidadeAlterando } 
        precoAlt={ precoAlterando } disponivelAlt={ disponivelAlterando } criadoAlt={ criadoAlterando  }/>
      <ListaIngredientes ingrediente={ ingrediente } excluirIngrediente={ excluirIngrediente } 
        iniciarAlteracao={ iniciarAlteracao }/>
    </div>
  );
}

export default App
