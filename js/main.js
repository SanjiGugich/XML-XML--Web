document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const pre = button.closest('.code-block')?.querySelector('code');
      if (!pre) return;
      try {
        await navigator.clipboard.writeText(pre.innerText);
        const old = button.textContent;
        button.textContent = 'Скопировано';
        setTimeout(() => button.textContent = old, 1200);
      } catch (e) {
        button.textContent = 'Выделите вручную';
      }
    });
  });

  const quiz = document.querySelector('#xml-quiz');
  if (quiz) {
    quiz.addEventListener('submit', (event) => {
      event.preventDefault();
      let score = 0;
      const answers = { q1: 'b', q2: 'c', q3: 'a' };
      for (const [name, correct] of Object.entries(answers)) {
        const checked = quiz.querySelector(`input[name="${name}"]:checked`);
        if (checked?.value === correct) score += 1;
      }
      const result = quiz.querySelector('.quiz-result');
      result.textContent = `Результат: ${score} из 3. ${score === 3 ? 'Отлично!' : 'Повторите разделы и попробуйте ещё раз.'}`;
    });
  }
});
