// ==========================================================
// JAVASCRIPT (Necessário para RF02, RF07, RF14 e interações)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  // --- RF02 - Lógica do Menu Mobile [cite: 146] ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const sidebar = document.getElementById("sidebar");
  const navLinks = document.querySelectorAll(".sidebar nav a");

  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    // RF02 - Ícone alterna entre Menu e X [cite: 152]
    const icon = hamburgerBtn.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
      hamburgerBtn.setAttribute("aria-label", "Fechar menu");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      hamburgerBtn.setAttribute("aria-label", "Abrir menu");
    }
  });

  // RF02 - Menu fecha ao selecionar seção [cite: 151]
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove("show");
        hamburgerBtn.querySelector("i").classList.remove("fa-times");
        hamburgerBtn.querySelector("i").classList.add("fa-bars");
        hamburgerBtn.setAttribute("aria-label", "Abrir menu");
      }
    });
  });

  // --- RF14 - Lógica do Seletor de Tema [cite: 224] ---
  const themeSwitchers = [
    document.getElementById("theme-switcher-desktop"),
    document.getElementById("theme-switcher-mobile"),
  ];

  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
    // Salva a preferência (opcional, mas boa prática)
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  themeSwitchers.forEach((switcher) => {
    if (switcher) switcher.addEventListener("click", toggleTheme);
  });

  // Verifica preferência salva
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // --- RF01 - Lógica do Indicador de Seção Ativa [cite: 145] ---
  const sections = document.querySelectorAll("section");
  const navLinksMap = new Map();
  document.querySelectorAll("#sidebar-nav .nav-link").forEach((link) => {
    navLinksMap.set(link.getAttribute("href").substring(1), link);
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4, // 40% da seção visível
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll("#sidebar-nav .nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        const activeLink = navLinksMap.get(id);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // --- RF07 - Lógica da Demo Interativa  ---

  // RF07 - 4 documentos de exemplo [cite: 181]
  const mockData = [
    {
      id: 1,
      type: "logs",
      tag: "tag-logs",
      card: "card-logs",
      title: "LOG [production]",
      content:
        "APP-01 | ERROR 500: Failed to connect to database. Timeout exceeded.",
    },
    {
      id: 2,
      type: "produtos",
      tag: "tag-produtos",
      card: "card-produtos",
      title: "Produto #10523",
      content:
        'Notebook Pro 15" M3. Tela Liquid Retina XDR, 16GB RAM, 512GB SSD. Cor: Prata.',
    },
    {
      id: 3,
      type: "seguranca",
      tag: "tag-seguranca",
      card: "card-seguranca",
      title: "Alerta de Segurança",
      content:
        "Múltiplas tentativas de login failed para o usuário admin do IP 192.168.10.5.",
    },
    {
      id: 4,
      type: "documentos",
      tag: "tag-documentos",
      card: "card-documentos",
      title: "Artigo Científico IA",
      content:
        "Um novo estudo sobre redes neurais convolucionais (CNNs) para análise de imagem médica.",
    },
    {
      id: 5,
      type: "logs",
      tag: "tag-logs",
      card: "card-logs",
      title: "LOG [staging]",
      content: "APP-02 | INFO: User admin authenticated successfully.",
    },
    {
      id: 6,
      type: "produtos",
      tag: "tag-produtos",
      card: "card-produtos",
      title: "Produto #20110",
      content:
        'Smartphone X-One. Tela OLED 6.7", 128GB, Câmera Tripla 108MP. Cor: Preto.',
    },
    {
      id: 7,
      type: "documentos",
      tag: "tag-documentos",
      card: "card-documentos",
      title: "Relatório Financeiro Q3",
      content:
        "O relatório trimestral aponta crescimento de 15% em receita. (privado)",
    },
    {
      id: 8,
      type: "seguranca",
      tag: "tag-seguranca",
      card: "card-seguranca",
      title: "Alerta de Firewall",
      content: "Port scan detectado do IP 10.0.5.20 na porta 22 (SSH).",
    },
  ];

  const searchInput = document.getElementById("demo-search-input");
  const resultsList = document.getElementById("demo-results-list");
  const searchCount = document.getElementById("search-count");
  const searchTime = document.getElementById("search-time");
  const searchTips = document.getElementById("search-tips");
  const noResultsMsg = document.getElementById("no-results-message");

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(
      `(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`,
      "gi"
    );
    return text.replace(regex, "<mark>$1</mark>");
  };

  const performSearch = (query) => {
    const startTime = performance.now();
    query = query.toLowerCase().trim();

    if (!query) {
      resultsList.innerHTML = "";
      searchCount.textContent = "0";
      searchTime.textContent = "0.000";
      searchTips.style.display = "block";
      noResultsMsg.style.display = "none";
      return;
    }

    searchTips.style.display = "none";

    const results = mockData.filter(
      (doc) =>
        doc.title.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query)
    );

    const endTime = performance.now();

    // RF07 - Tempo de busca simulado [cite: 182]
    const timeTaken = ((endTime - startTime) / 100).toFixed(3).padStart(5, "0");

    // RF07 - Contador de resultados [cite: 183]
    searchCount.textContent = results.length;
    searchTime.textContent = timeTaken;

    resultsList.innerHTML = "";

    if (results.length === 0) {
      noResultsMsg.style.display = "block"; // RF07 - Mensagem sem resultados [cite: 186]
    } else {
      noResultsMsg.style.display = "none";
      results.forEach((doc) => {
        // RF07 - Cards de resultado [cite: 184]
        const card = document.createElement("div");
        card.className = `card ${doc.card}`; // Classe para a borda colorida

        card.innerHTML = `
                        <div class="card-header">
                            <h3>${highlightMatch(doc.title, query)}</h3>
                            <span class="tag ${doc.tag}">${doc.type}</span>
                        </div>
                        <div class="card-content">
                            <p>${highlightMatch(doc.content, query)}</p>
                        </div>
                    `;
        resultsList.appendChild(card);
      });
    }
  };

  // RF07 - Busca em tempo real ao digitar [cite: 181]
  searchInput.addEventListener("keyup", () => {
    performSearch(searchInput.value);
  });

  // RF07 - Dicas de busca [cite: 187]
  document.querySelectorAll(".tip-tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      const query = tag.dataset.query;
      searchInput.value = query;
      performSearch(query);
      searchInput.focus();
    });
  });
});
