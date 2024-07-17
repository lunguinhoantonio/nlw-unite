let participantes = [
  {
    nome: "Dennis Costa",
    email: "dennispcosta@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 18, 30),
    dataCheckIn: null
  },
  {
    nome: "Felipe Ribeiro",
    email: "feliperibeiro@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 15, 00),
    dataCheckIn: null
  },
  {
    nome: "Ana Micalares",
    email: "anamicalares@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 10, 15),
    dataCheckIn: new Date(2024, 3, 2, 9, 45)
  },
  {
    nome: "Maria Santos",
    email: "mariasantos@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 14, 20),
    dataCheckIn: new Date(2024, 3, 2, 11, 30)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlosoliveira@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 00, 00),
    dataCheckIn: new Date(2024, 3, 2, 8, 15)
  },
  {
    nome: "Antônio Marcos",
    email: "antoniomarcos@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 16, 45),
    dataCheckIn: null
  },
  {
    nome: "Pedro Almeida",
    email: "pedroalmeida@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 10, 30),
    dataCheckIn: new Date(2024, 3, 2, 9, 10)
  },
  {
    nome: "Mariana Fernandes",
    email: "marianafernandes@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 14, 15),
    dataCheckIn: new Date(2024, 3, 2, 12, 45)
  },
  {
    nome: "Lucas Cardoso",
    email: "lucascardoso@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 8, 20),
    dataCheckIn: new Date(2024, 3, 2, 7, 30)
  },
  {
    nome: "Fernanda Costa",
    email: "fernandacosta@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 13, 10),
    dataCheckIn: new Date(2024, 3, 2, 18, 50)
  }
];

const criarNovoParticipante = (participante) => {
  // mostrar há quanto tempo que cada candidato fez a inscrição e check-in
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button 
      data-email="${participante.email}" 
      onclick="fazerCheckIn(event)">
      Confirmar Check-in
      </button>
    `
  }

  return `
<tr>
    <td>
      <strong>${participante.nome}</strong>
      <br>
      <small>${participante.email}</small>
      </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
`
}

  // atualizando informações do HTML
const refreshList = (participantes) => {
  let output = ""
  // estrutura de repetição / loop
  for(let participante of participantes){
    output += criarNovoParticipante(participante)
  }
  document.querySelector('tbody').innerHTML = output
}
refreshList(participantes)

const addParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  const participanteExiste = participantes.find((p) =>
    p.email == participante.email
  )

  if(participanteExiste){
    alert("E-mail já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  refreshList(participantes)

  event.target.querySelector('[name=nome]').value = ""
  event.target.querySelector('[name=email]').value = ""
}

const fazerCheckIn = (event) => {
  // mensagem de confirmação de check-in
  const msgConfirm = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(msgConfirm) == false){
    return
  }
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  participante.dataCheckIn = new Date()

  refreshList(participantes)
}
