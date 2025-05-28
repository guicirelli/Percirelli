// Dados dos produtos (repetidos para o script funcionar standalone)
const produtosLisos = [
    {
      id: 1,
      nome: 'Camiseta Lisa Branca',
      preco: 79.90,
      descricao: 'Camiseta básica branca, super confortável e versátil.',
      tamanhos: ['P', 'M', 'G', 'GG'],
      fotos: [
        'https://via.placeholder.com/250x250?text=Lisa+Branca+1',
        'https://via.placeholder.com/250x250?text=Lisa+Branca+2',
        'https://via.placeholder.com/250x250?text=Lisa+Branca+3',
      ],
    },
    {
      id: 2,
      nome: 'Camiseta Lisa Preta',
      preco: 79.90,
      descricao: 'Camiseta lisa preta, corte moderno e tecido macio.',
      tamanhos: ['P', 'M', 'G', 'GG'],
      fotos: [
        'https://via.placeholder.com/250x250?text=Lisa+Preta+1',
        'https://via.placeholder.com/250x250?text=Lisa+Preta+2',
        'https://via.placeholder.com/250x250?text=Lisa+Preta+3',
      ],
    }
  ];
  
  const produtosEstampados = [
    {
      id: 3,
      nome: 'Camiseta Estampada Urban',
      preco: 99.90,
      descricao: 'Estampa urbana exclusiva, tecido leve e confortável.',
      tamanhos: ['P', 'M', 'G', 'GG'],
      fotos: [
        'https://via.placeholder.com/250x250?text=Estampada+Urban+1',
        'https://via.placeholder.com/250x250?text=Estampada+Urban+2',
        'https://via.placeholder.com/250x250?text=Estampada+Urban+3',
      ],
    },
    {
      id: 4,
      nome: 'Camiseta Estampada Floral',
      preco: 99.90,
      descricao: 'Design floral delicado, perfeito para todas as ocasiões.',
      tamanhos: ['P', 'M', 'G', 'GG'],
      fotos: [
        'https://via.placeholder.com/250x250?text=Estampada+Floral+1',
        'https://via.placeholder.com/250x250?text=Estampada+Floral+2',
        'https://via.placeholder.com/250x250?text=Estampada+Floral+3',
      ],
    }
  ];
  
  let carrinho = [];
  
  const produtosContainer = document.getElementById('produtos-container');
  const conteudoPrincipal = document.getElementById('conteudo-principal');
  const carrinhoAside = document.getElementById('carrinho');
  const itensCarrinhoDiv = document.getElementById('itens-carrinho');
  const totalDiv = document.getElementById('total');
  
  // Mostrar produtos na página
  function mostrarProdutos(tipo) {
    conteudoPrincipal.style.display = 'none';
    produtosContainer.style.display = 'block';
  
    let lista = tipo === 'lisas' ? produtosLisos : produtosEstampados;
  
    let html = `<h2>${tipo === 'lisas' ? 'Camisetas Lisas' : 'Camisetas Estampadas'}</h2><div class="produtos-lista">`;
  
    lista.forEach(prod => {
      html += `
        <div class="produto" data-id="${prod.id}">
          <img src="${prod.fotos[0]}" alt="${prod.nome}" />
          <h3>${prod.nome}</h3>
          <p class="preco">R$ ${prod.preco.toFixed(2)}</p>
          <p>${prod.descricao}</p>
          <div class="tamanhos">${prod.tamanhos.map(t => `<span>${t}</span>`).join('')}</div>
          <button class="comprar" onclick="adicionarAoCarrinho(${prod.id})">Comprar</button>
        </div>
      `;
    });
  
    html += '</div>';
    produtosContainer.innerHTML = html;
  }
  
  // Adicionar produto ao carrinho
  function adicionarAoCarrinho(id) {
    // Busca o produto pelo id nas duas listas
    let produto = produtosLisos.find(p => p.id === id) || produtosEstampados.find(p => p.id === id);
    if (!produto) return;
  
    let itemNoCarrinho = carrinho.find(item => item.produto.id === id);
  
    if (itemNoCarrinho) {
      itemNoCarrinho.quantidade++;
    } else {
      carrinho.push({ produto, quantidade: 1 });
    }
  
    alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
    atualizarCarrinho();
    mostrarCarrinho();
  }
  
  // Atualiza o conteúdo do carrinho na tela
  function atualizarCarrinho() {
    if (carrinho.length === 0) {
      itensCarrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
      totalDiv.textContent = '';
      return;
    }
  
    let html = '';
    let total = 0;
  
    carrinho.forEach((item, index) => {
      total += item.produto.preco * item.quantidade;
      html += `
        <div class="item-carrinho">
          <span>${item.produto.nome} (x${item.quantidade})</span>
          <div>
            <button onclick="removerDoCarrinho(${index})">×</button>
          </div>
        </div>
      `;
    });
  
    itensCarrinhoDiv.innerHTML = html;
    totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
  }
  
  // Remove item do carrinho
  function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
  }
  
  // Mostra o carrinho na tela
  function mostrarCarrinho() {
    carrinhoAside.style.display = 'flex';
  }
  
  // Esconde o carrinho
  function fecharCarrinho() {
    carrinhoAside.style.display = 'none';
  }
  
  // Eventos dos botões do menu
  document.getElementById('btn-lisas').addEventListener('click', () => mostrarProdutos('lisas'));
  document.getElementById('btn-estampadas').addEventListener('click', () => mostrarProdutos('estampadas'));
  document.getElementById('home-link').addEventListener('click', e => {
    e.preventDefault();
    produtosContainer.style.display = 'none';
    conteudoPrincipal.style.display = 'block';
  });
  document.getElementById('btn-ver-carrinho').addEventListener('click', () => {
    mostrarCarrinho();
  });
  document.getElementById('btn-fechar-carrinho').addEventListener('click', () => fecharCarrinho());
  
  // Início: mostra home
  produtosContainer.style.display = 'none';
  conteudoPrincipal.style.display = 'block';
  