// FAQ page specific JavaScript
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../index.html';
  }
}

// FAQ data
const faqData = [
  {
    id: 1,
    question: "Сколько времени занимает процедура?",
    answer: "Время нанесения татуировки зависит от размера и сложности дизайна. Небольшие работы занимают 1-2 часа, средние - 3-5 часов, крупные работы могут потребовать несколько сеансов."
  },
  {
    id: 2,
    question: "Больно ли делать татуировку?",
    answer: "Болевые ощущения индивидуальны и зависят от места нанесения, размера татуировки и болевого порога. Современные техники и качественное оборудование помогают минимизировать дискомфорт."
  },
  {
    id: 3,
    question: "Как подготовиться к сеансу?",
    answer: "За день до сеанса хорошо выспитесь, поешьте перед процедурой, избегайте алкоголя за 24 часа. Носите удобную одежду, которая открывает доступ к области татуировки."
  },
  {
    id: 4,
    question: "Сколько стоят работы?",
    answer: "Стоимость рассчитывается индивидуально в зависимости от размера, сложности, детализации и времени работы. Минимальная стоимость - от 3000 рублей. Консультация и эскиз бесплатные."
  },
  {
    id: 5,
    question: "Можно ли исправить старую татуировку?",
    answer: "Да, существует несколько вариантов: перекрытие (cover-up), дополнение элементами или лазерное удаление с последующим нанесением новой работы. Нужна личная консультация для выбора оптимального решения."
  },
  {
    id: 6,
    question: "Как ухаживать за татуировкой?",
    answer: "Первые 2 недели - самые важные. Держите татуировку чистой и увлажненной, избегайте солнца, бани, бассейна. Подробные инструкции по уходу даются после сеанса."
  },
  {
    id: 7,
    question: "Можно ли делать татуировку летом?",
    answer: "Можно, но нужно особенно тщательно защищать свежую татуировку от солнца первые 2-4 недели. Планируйте отпуск с учетом времени заживления."
  },
  {
    id: 8,
    question: "Есть ли противопоказания?",
    answer: "Не рекомендуется при беременности, лактации, диабете, проблемах со свертываемостью крови, острых заболеваниях. При наличии хронических заболеваний - консультация с врачом."
  }
];

function loadFAQ() {
  const list = document.getElementById('faqList');
  
  list.innerHTML = faqData.map(item => `
    <div class="faq-item" data-id="${item.id}">
      <div class="faq-question" onclick="toggleFAQ(${item.id})">
        <h3 class="faq-question-text">${item.question}</h3>
        <span class="faq-toggle">+</span>
      </div>
      <div class="faq-answer">
        <p class="faq-answer-text">${item.answer}</p>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(id) {
  const item = document.querySelector(`[data-id="${id}"]`);
  const isActive = item.classList.contains('active');
  
  // Close all other FAQ items
  document.querySelectorAll('.faq-item').forEach(faq => {
    faq.classList.remove('active');
  });
  
  // Toggle current item
  if (!isActive) {
    item.classList.add('active');
  }
}

// Initialize FAQ on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('FAQ page loaded');
  loadFAQ();
});