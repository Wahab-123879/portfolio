document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      htmlRoot.classList.add('dark');
    } else {
      htmlRoot.classList.remove('dark');
    }
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlRoot.classList.add('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlRoot.classList.toggle('dark');
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Computer Engineering (3rd Sem)',
      'Frontend Web Developer',
      'SEO & Link Building Specialist',
      'C++ Systems Programmer',
      'Video Editor & Cartoon Creator',
      'AI Video & App Builder'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 45;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingDelay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 400;
      }

      setTimeout(type, typingDelay);
    }

    type();
  }

  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.classList.add('animate-fade-in');
        } else {
          card.classList.add('hidden');
          card.classList.remove('animate-fade-in');
        }
      });
    });
  });

  const projectDetails = {
    '1': {
      title: 'School Management System in C++',
      category: 'Computer Engineering / C++ & OOP',
      description: 'An academic management console system developed in C++ applying Object-Oriented Programming (OOP) concepts and persistent file handling to manage student data, enrollments, fee structures, and report cards.',
      highlights: [
        'Built with core OOP concepts: encapsulation, inheritance, polymorphism, and custom class abstractions',
        'Implemented persistent binary & text file handling for permanent student database records',
        'Features automated grade reporting, fee dues calculation, and searchable student profiles'
      ],
      techStack: ['C++', 'Object-Oriented Programming', 'File I/O Handling', 'Data Structures'],
      github: 'https://github.com',
      demo: '#contact'
    },
    '2': {
      title: 'Netflix Web UI Clone',
      category: 'Frontend Development / Web Design',
      description: 'A responsive and visually accurate replica of the Netflix streaming platform interface built from scratch using pure semantic HTML5 and modern CSS3 techniques.',
      highlights: [
        'Fluid multi-device responsiveness using CSS Grid and Flexbox for desktops, tablets, and smartphones',
        'Hero billboard showcase with call-to-action buttons and gradient overlay styling',
        'Horizontal movie thumbnail carousels with smooth CSS transitions and hover elevations'
      ],
      techStack: ['HTML5', 'CSS3', 'Flexbox & CSS Grid', 'Responsive Media Queries'],
      github: 'https://github.com',
      demo: '#contact'
    },
    '3': {
      title: 'Hardware Audio Amplifier (2nd Semester Project)',
      category: 'Electronic Engineering & Hardware Design',
      description: 'A hands-on electronic engineering hardware project designed and built during the 2nd semester. It amplifies low-power acoustic signals from an aux input to cleanly drive audio loudspeakers.',
      highlights: [
        'Engineered multi-stage transistor amplification with biased emitter stages',
        'Integrated passive RC filter networks to eliminate high-frequency noise and humming',
        'Tested using oscilloscopes and signal generators to verify gain fidelity across the audible spectrum (20Hz - 20kHz)'
      ],
      techStack: ['Analog Circuit Design', 'Bipolar Transistors', 'Signal Filtering', 'Hardware Prototyping'],
      github: '#contact',
      demo: '#contact'
    },
    '4': {
      title: 'AI Cartoon Creation & Video Studio',
      category: 'Creative Multimedia & AI Generation',
      description: 'An end-to-end creative workflow utilizing cutting-edge AI video generators, cartoon animation tools, and professional video editing suites to produce compelling visual stories.',
      highlights: [
        'Scriptwriting and character prompt design for consistent cartoon character generation',
        'AI video frame interpolation, lip syncing, and scene transition composition',
        'Color grading, dynamic audio mixing, and multi-track video editing'
      ],
      techStack: ['AI Video Generators', 'Cartoon Animation Tools', 'Video Editing Suites', 'Prompt Engineering'],
      github: '#contact',
      demo: '#contact'
    },
    '5': {
      title: 'Modern AI App Builder',
      category: 'AI Application Prototyping',
      description: 'Building practical, interactive web tools powered by AI logic and APIs. Enables users to generate custom content, summarize data, and automate repetitive workflows.',
      highlights: [
        'Streamlined user interface for prompt inputs, parameter controls, and instant output rendering',
        'Responsive layout designed for rapid prototyping and micro-tool deployment',
        'Explores low-code & custom API integration to bridge AI models with user-friendly web apps'
      ],
      techStack: ['AI App Frameworks', 'Frontend UI', 'Prompt Engineering', 'API Integrations'],
      github: 'https://github.com',
      demo: '#contact'
    },
    '6': {
      title: 'Technical SEO, On-Page & Link Building Campaign',
      category: 'SEO Specialist & Digital Marketing',
      description: 'A comprehensive search engine optimization strategy combining in-depth technical audits, on-page content alignment, and high-impact off-page link building campaigns to drive organic search traffic.',
      highlights: [
        'Conducted thorough technical audits (crawl errors, robots.txt, XML sitemaps, Core Web Vitals)',
        'Executed on-page optimizations: meta architecture, header tags, semantic keyword placement, schema markup',
        'Built organic off-page authority through contextual outreach, high-quality backlink acquisition, and anchor text strategy'
      ],
      techStack: ['On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Link Building', 'Keyword Research'],
      github: '#contact',
      demo: '#contact'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const detailButtons = document.querySelectorAll('.project-details-btn');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalContent) return;

    modalContent.innerHTML = `
      <div class="mb-4">
        <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400">
          ${data.category}
        </span>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-3">${data.title}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">${data.description}</p>
      </div>

      <div class="mb-6">
        <h4 class="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-3">Key Highlights & Implementation</h4>
        <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          ${data.highlights.map(item => `<li class="flex items-start gap-2"><span class="text-brand-500 font-bold">✓</span><span>${item}</span></li>`).join('')}
        </ul>
      </div>

      <div class="mb-8">
        <h4 class="text-xs uppercase font-semibold tracking-wider text-slate-400 mb-3">Technologies & Skills Used</h4>
        <div class="flex flex-wrap gap-2">
          ${data.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
      </div>

      <div class="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <a href="#contact" class="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs sm:text-sm transition-all inline-flex items-center gap-2">
          <i data-lucide="message-square" class="w-4 h-4"></i>
          <span>Discuss This Project</span>
        </a>
        <button onclick="document.getElementById('project-modal').classList.add('hidden'); document.body.classList.remove('overflow-hidden');" class="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span>Close</span>
        </button>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    projectModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeProjectModal() {
    projectModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });

  const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-toast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span><i data-lucide="send" class="w-4 h-4"></i>`;
        }

        formToast.classList.remove('hidden');
        if (window.lucide) {
          window.lucide.createIcons();
        }

        setTimeout(() => {
          formToast.classList.add('hidden');
        }, 5000);
      }, 700);
    });
  }
});
