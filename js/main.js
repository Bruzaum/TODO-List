document.querySelector("#btn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
})

const form = document.querySelector("#adicionar-novo-item")
const lista = document.getElementById("lista-itens")
const p = document.querySelector(".item-adicionado")


const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const descricao = evento.target.elements['novo-item']

    const existe = itens.find( elemento => elemento.descricao === descricao.value )

    const itemAtual = {
        "descricao": descricao.value
    }

    if (existe) {
        itemAtual.id = existe.id

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id =  itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    descricao.value = ""
})


function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const descricaoItem = document.createElement("p")
    descricaoItem.setAttribute("contenteditable", "true")
    descricaoItem.classList.add("item-adicionado")
    descricaoItem.innerHTML = item.descricao
    descricaoItem.dataset.id = item.id


    novoItem.appendChild(botaoCheckbox(item.id))
    novoItem.appendChild(descricaoItem)
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function botaoCheckbox(id) {

    const inputCheckbox = document.createElement("INPUT")
    inputCheckbox.setAttribute("type", "checkbox")
    inputCheckbox.classList.add("checkbox")

    inputCheckbox.addEventListener("change", function() {
        if (this.checked) {
            document.querySelector("[data-id='"+id+"']").style.textDecoration = "line-through"
        }else {
            document.querySelector("[data-id='"+id+"']").style.textDecoration = "none"
        }
    })

    return inputCheckbox
}

function botaoDeleta(id) {

    const botaoDeletar = document.createElement("button")
    botaoDeletar.classList.add("botao-deletar")

    const iconeDeletar = document.createElement("span")
    iconeDeletar.classList.add("material-symbols-outlined")
    iconeDeletar.innerHTML = "delete"

    botaoDeletar.appendChild(iconeDeletar)

    botaoDeletar.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return botaoDeletar
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => (elemento.id) === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}

