async function buscape (e) {
    const imagens = document.getElementById('images')
    const numero = document.getElementById('number')

    const ligacao = await fetch(`https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=${numero.value}`)
    const cartas = await ligacao.json()

    e.preventDefault()
    const init = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartas)
    }
    const ligaGrito = await fetch(`http://httpbin.org/post`, init)
    console.log(ligaGrito)
    while (imagens.firstChild) {
        imagens.removeChild(imagens.lastChild)
    }
    for(let i = 0; i < cartas.cards.length; i++) {
        let rockandroll = document.createElement('div')
        rockandroll.innerHTML = `
        <h1>${cartas.cards[i].name}<h1/><br/>
        <h3>${cartas.cards[i].value}<h3/><br/>
        <h3>${ligaGrito.type}<h3/><br/>
        <h2>${cartas.cards[i].desc}<h2/><br/>`
        imagens.appendChild(rockandroll)
    }
}
document.getElementById('enter').addEventListener('click', buscape)