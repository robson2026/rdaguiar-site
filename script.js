document.addEventListener("DOMContentLoaded", () => {
    const vitrine = document.getElementById('vitrine');
    const campoBusca = document.getElementById('campoBusca');
    const bannerContainer = document.getElementById('banner-container');
    
    let todosProdutos = [];
    let fuse;

    // 1. Carregar Produtos e Inicializar Busca
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            todosProdutos = data;
            renderizarVitrine(data);

            const options = {
                keys: ['nome'],
                threshold: 0.3
            };
            fuse = new Fuse(data, options);
        });

    // 2. Carregar Banners
    fetch('banners.json')
        .then(response => response.json())
        .then(banners => {
            bannerContainer.innerHTML = '';
            banners.forEach(b => {
                const img = document.createElement('img');
                img.src = b.img;
                img.alt = "Banner Promocional";
                bannerContainer.appendChild(img);
            });
        });

    // 3. Lógica de Busca
    campoBusca.addEventListener('input', (e) => {
        const termo = e.target.value;
        if (termo.length === 0) {
            renderizarVitrine(todosProdutos);
            return;
        }
        const resultados = fuse.search(termo);
        const listaFiltrada = resultados.map(r => r.item);
        renderizarVitrine(listaFiltrada);
    });

    function renderizarVitrine(lista) {
        vitrine.innerHTML = '';
        lista.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
                <a href="${produto.link}" target="_blank">Ver Oferta</a>
            `;
            vitrine.appendChild(card);
        });
    }
});
