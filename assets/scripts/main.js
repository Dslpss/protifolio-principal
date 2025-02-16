// Este arquivo contém o código JavaScript que adiciona interatividade ao portfólio, como manipulação de eventos e funcionalidades dinâmicas.

// Efeito Matrix
function createMatrixEffect() {
  const canvas = document.createElement("canvas");
  canvas.classList.add("matrix-bg");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "0123456789ABCDEF";
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = "rgba(10, 25, 47, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00f3ff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
        drops[i] = 0;

      drops[i]++;
    }
  }

  setInterval(draw, 33);
}

// Efeito de digitação atualizado com loop infinito
function typeWriter(element) {
  const text = element.getAttribute("data-text") || element.textContent;
  element.setAttribute("data-text", text);
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent = text.substring(0, i + 1);
      i++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000); // Espera 2 segundos antes de apagar
    }
  }

  function erase() {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(erase, 50);
    } else {
      setTimeout(() => {
        i = 0;
        type(); // Reinicia a digitação
      }, 1000); // Espera 1 segundo antes de recomeçar
    }
  }

  element.textContent = "";
  type();
}

// Função para atualizar o ano
function updateYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  createMatrixEffect();
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    typeWriter(typingText);
  }
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Animação do botão
      const button = this.querySelector("button");
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      // Simular envio (substitua por sua lógica de envio real)
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
        button.style.background = "var(--cyber-green)";

        // Reset após 3 segundos
        setTimeout(() => {
          button.innerHTML =
            '<span>Enviar Mensagem</span><i class="fas fa-paper-plane"></i>';
          button.style.background = "";
          contactForm.reset();
        }, 3000);
      }, 2000);
    });
  }

  const contactItems = document.querySelectorAll(".contact-item");

  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const text = this.querySelector("span").textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Feedback visual
        const originalBackground = this.style.background;
        this.style.background = "rgba(0, 255, 157, 0.3)";
        setTimeout(() => {
          this.style.background = originalBackground;
        }, 200);
      });
    });
  });

  const techItems = document.querySelectorAll(".tech-item");

  techItems.forEach((item) => {
    // Efeito de flutuação aleatória
    const randomDelay = Math.random() * 2;
    item.style.animation = `float 3s ease-in-out ${randomDelay}s infinite`;

    // Efeito ao passar o mouse
    item.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-10px) scale(1.1)";
    });

    item.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  updateYear(); // Atualiza o ano quando a página carrega

  // Verificar a mudança de ano a cada minuto
  setInterval(() => {
    updateYear();
  }, 60000); // Checa a cada minuto
});

// Menu mobile simplificado
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.cyber-nav');

    if (menuToggle && nav) {
        // Toggle menu
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Fecha menu ao clicar em um link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });

        // Fecha menu ao rolar
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
            lastScroll = currentScroll;
        });
    }
});

// Adicionar keyframes para animação de flutuação
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);
