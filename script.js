document.addEventListener("DOMContentLoaded", () => {
    const vitrine = document.getElementById('vitrine');
    const campoBusca = document.getElementById('campoBusca');
    const bannerContainer = document.querySelector('.banner-container');
    
    let todosProdutos = [];

    // 1. Carregar Produtos
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            todosProdutos = data;
            renderizarVitrine(data);
        });

    // 2. Carregar Banners
    fetch('banners.json')
        .then(response => response.json())
        .then(banners => {
            banners.forEach(b => {
                bannerContainer.innerHTML += `<img src="${b.img}" alt="Banner Promocional" style="width:100%; height:auto;">`;
            });
        });

    // 3. Lógica de Busca
    campoBusca.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const filtrados = todosProdutos.filter(p => 
            p.nome.toLowerCase().includes(termo)
        );
        renderizarVitrine(filtrados);
    });

    // Função que desenha os produtos
    function renderizarVitrine(lista) {
        vitrine.innerHTML = '';
        lista.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" style="width:100%; height:150px; object-fit:cover;">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
                <a href="${produto.link}" target="_blank" style="display:block; padding:10px; background:#1a1a1a; color:white; text-decoration:none; text-align:center;">Ver Oferta</a>
            `;
            vitrine.appendChild(card);
        });
    }
});
