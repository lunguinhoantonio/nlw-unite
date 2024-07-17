let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

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
  localStorage.setItem('participantes', JSON.stringify(participantes))
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

  localStorage.setItem('participantes', JSON.stringify(participantes))
  refreshList(participantes)
}
