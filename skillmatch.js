// RF01 - Criar o perfil do candidato

const candidato = {
  nome: "João Silva",
  area: "Front-End",
  habilidades: ["JavaScript", "CSS", "Lógica de Programação", "HTML", "GitHub"],
  experienciaMeses: 7
};

// REF02 - Criar uma lista de vagas (mínimo 3)

const vagas = [
  {
    id: 1,
    empresa: "TechStart",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["JavaScript", "GitHub", "Lógica da Programação", "Kanbam"],
    salario: 3000,
    modalidade: "Home Office"
  },
  {
    id: 2,
    empresa: "CodeLab",
    cargo: "Estágio Front-End",
    requisitos: ["JavaScript", "Kanban", "GitHub", "HTML", "CSS"],
    salario: 1600,
    modalidade: "Híbrido"
  },
  {
    id: 3,
    empresa: "WebSolutions",
    cargo: "Programador JavaScript Júnior",
    requisitos: ["JavaScript", "Arrays", "Objetos", "Funções"],
    salario: 3400,
    modalidade: "Presencial"
  }
];

// RF09 e RF11 - Criar uma classe base e demonstrar uso do this

class Vaga {
  constructor(empresa, cargo, requisitos, salario, modalidade) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // Método que usa o 'this'

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

// RF10 - Usar herança (VagaFrontEnd herda de Vaga)

class VagaFrontEnd extends Vaga {
  constructor(empresa, cargo, requisitos, salario, modalidade, nivel) {
    
    // O super calls o construtor da classe pai (Vaga)

    super(empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel; // Atributo exclusivo da vaga front-end
  }

  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}

// RF13 - Usar closure

function criarContadorAnalises() {
  let total = 0;
  return function() {
    total++;
    return total;
  };
}

const contadorDeAnalises = criarContadorAnalises();

// RF12 - Usar callback

function finalizarAnalise(nomeCandidato, callback) {
  console.log("\n--- Análise finalizada com sucesso ---");
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  console.log(`\n${nome}, revise suas habilidades faltantes e atualize se for necessário.`);
}

// Função que processa e analisa todas as vagas (REMOVIDA A DUPLICAÇÃO)

function analisarVagas(listaDeVagas, perfilCandidato) {
  let melhorVaga = null;
  let maiorCompatibilidade = -1;
  let todasHabilidadesFaltantes = [];

  // RF08 - Usando 'map' para criar uma nova lista com os resultados gerados

  const resultados = listaDeVagas.map(vaga => {

    // RF08 - Usando 'filter' para encontrar quais requisitos da vaga o candidato NÃO tem

    const faltantes = vaga.requisitos.filter(req => !perfilCandidato.habilidades.includes(req));
    
    // Armazena as habilidades faltantes gerais para a recomendação posterior
    todasHabilidadesFaltantes.push(...faltantes);

    // RF03 - Calcular o percentual de compatibilidade

    const totalRequisitos = vaga.requisitos.length;
    const atendidos = totalRequisitos - faltantes.length;
    const percentual = Math.round((atendidos / totalRequisitos) * 100);

    // RF04 - Classificar a compatibilidade usando if-else

    let classificacao = "";
    if (percentual >= 80) {
      classificacao = "Alta compatibilidade";
    } else if (percentual >= 50) {
      classificacao = "Média compatibilidade";
    } else {
      classificacao = "Baixa compatibilidade";
    }

    // Exibe os dados da vaga atual no console (RF03 e RF05)

    console.log(`\nEmpresa: ${vaga.empresa}`);
    console.log(`Cargo: ${vaga.cargo}`);
    console.log(`Compatibilidade: ${percentual}%`);
    console.log(`Classificação: ${classificacao}`);
    console.log(`Habilidades faltantes: ${faltantes.length > 0 ? faltantes.join(", ") : "Nenhuma!"}`);

    // Guarda os dados para saber qual é a melhor vaga (RF06)

    if (percentual > maiorCompatibilidade) {
      maiorCompatibilidade = percentual;
      melhorVaga = vaga;
    }

    return { empresa: vaga.empresa, percentual };
  });

  // RF06 - Mostrar a vaga com maior compatibilidade

  console.log(`\n=================================`);
  console.log(`Vaga mais compatível encontrada:`);
  console.log(`${melhorVaga.empresa} - ${melhorVaga.cargo}`);
  console.log(`Compatibilidade: ${maiorCompatibilidade}%`);
  console.log(`=================================`);

  // RF07 - Gerar recomendação de estudo tirando as duplicadas (usando filter/indexOf)

  const habilidadesUnicasParaEstudar = todasHabilidadesFaltantes.filter((hab, index) => {
    return todasHabilidadesFaltantes.indexOf(hab) === index;
  });

  console.log(`\nRecomendação de estudo:`);
  if (habilidadesUnicasParaEstudar.length > 0) {
    console.log(`Priorize estudar: ${habilidadesUnicasParaEstudar.join(", ")}, pois esses conteúdos aparecem nas vagas analisadas.`);
  } else {
    console.log(`Parabéns! Você cumpre todos os requisitos das vagas analisadas.`);
  }

  // Executa o Closure para contar a análise

  const numeroDaAnalise = contadorDeAnalises();
  console.log(`\nTotal de análises rodadas nesta sessão: ${numeroDaAnalise}`);
} // Fechamento correto da função analisarVagas

// RF14 - Simular o carregamento das vagas usando Promise

function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagas); // Devolve o array de vagas após 1 segundo
    }, 1000);
  });
}

// Função assíncrona que inicia todo o sistema (função async)

async function iniciarSistema() {
  console.log("Carregando vagas do servidor simulado...");
  
  // Aguarda a Promise ser resolvida (função await)

  const vagasCarregadas = await buscarVagasSimuladas();
  console.log("Vagas carregadas com sucesso!\n");

  // Executa o motor de análise passando as vagas carregadas e o nosso candidato

  analisarVagas(vagasCarregadas, candidato);

  // RF12 - Executa o callback final do projeto

  finalizarAnalise(candidato.nome, exibirMensagemFinal);
}

// Executa o sistema completo

iniciarSistema();