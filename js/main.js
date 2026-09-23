document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('is-open')) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) closeMenu();
    });
  }

  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-block')?.querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText);
        const old = button.textContent;
        button.textContent = 'Скопировано';
        setTimeout(() => {
          button.textContent = old;
        }, 1200);
      } catch (error) {
        button.textContent = 'Выделите вручную';
      }
    });
  });

  const quiz = document.querySelector('#xml-quiz');
  if (quiz) {
    const result = quiz.querySelector('.quiz-result');

    quiz.addEventListener('submit', (event) => {
      event.preventDefault();
      let score = 0;
      const answers = { q1: 'b', q2: 'c', q3: 'a' };

      for (const [name, correct] of Object.entries(answers)) {
        const checked = quiz.querySelector(`input[name="${name}"]:checked`);
        if (checked?.value === correct) score += 1;
      }

      result.textContent =
        `Результат: ${score} из 3. ` +
        (score === 3 ? 'Отлично!' : 'Повторите разделы и попробуйте ещё раз.');
    });

    quiz.addEventListener('reset', () => {
      result.textContent = '';
    });
  }
});
