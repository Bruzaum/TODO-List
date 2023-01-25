document.querySelector("#btn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
})

const form = document.querySelector("#adicionar-novo-item")
const lista = document.getElementById("lista-itens")


form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const descricao = evento.target.elements['novo-item']


    criaElemento(descricao.value)

    descricao.value = ""
})


function criaElemento(descricao) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const inputCheckbox = document.createElement("INPUT")
    inputCheckbox.setAttribute("type", "checkbox")
    inputCheckbox.classList.add("checkbox")

    const descricaoItem = document.createElement("p")
    descricaoItem.setAttribute("contenteditable", "true")
    descricaoItem.classList.add("item-adicionado")
    descricaoItem.innerHTML = descricao

    const botaoDeletar = document.createElement("button")
    botaoDeletar.classList.add("botao-deletar")

    const iconeDeletar = document.createElement("span")
    iconeDeletar.classList.add("material-symbols-outlined")
    iconeDeletar.innerHTML = "delete"

    botaoDeletar.appendChild(iconeDeletar)

    novoItem.appendChild(inputCheckbox)
    novoItem.appendChild(descricaoItem)
    novoItem.appendChild(botaoDeletar)

    lista.appendChild(novoItem)
}