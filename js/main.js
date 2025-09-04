/* 팝업 열기/닫기 기능 */
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("portfolio-popup");
  const closeBtn = document.getElementById("popup-close");

  // 페이지 로드 시 팝업 보이기
  popup.style.display = "flex";

  // 닫기 버튼 클릭 시 팝업 숨기기
  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });
});


/* 좌측 메뉴바 */
const sideMenu = document.getElementById('sideMenu');
const menuItems = sideMenu.querySelectorAll('li');
const defaultColor = '#1F66FF';
function updateMenu() {
    const scrollPos = window.scrollY + window.innerHeight * 0.5;
    let currentSection = null;

    for (const section of document.querySelectorAll('section')) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
            currentSection = section;
            break;
        }
    }

    if (currentSection && currentSection.id === 'section01') {
        sideMenu.style.display = 'none';
        return;
    }

    sideMenu.style.display = 'block';

    const color = currentSection && currentSection.id === 'section03' ? '#FFFFFF' : defaultColor;
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        link.style.color = color;
        const star = item.querySelector('.star');
        if (star) star.style.color = color;
    });
}

updateMenu();
window.addEventListener('scroll', updateMenu);

menuItems.forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const section = document.getElementById(targetId);
        if (!section) return;

        let topPos;
        if (section.offsetHeight < window.innerHeight) {
            topPos = section.offsetTop - (window.innerHeight - section.offsetHeight) / 2;
        } else {
            topPos = section.offsetTop;
        }

        window.scrollTo({
            top: topPos,
            behavior: 'smooth'
        });
    });
});


/* sec01 메뉴바 */ 
gsap.registerPlugin(ScrollTrigger);

gsap.from('.txt_menu', {
  y: 50,
  autoAlpha: 0,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: '#section01',
    start: "bottom bottom",
    toggleActions: "play none none reverse",
  }
});


/* sec01 txt_menu 클릭 시 스크롤 이동 */
const txtMenuLinks = document.querySelectorAll('.txt_menu a');

txtMenuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    let targetId = link.getAttribute('href').replace('#', '');
    
    if(targetId.match(/section\d$/)) {
      targetId = targetId.replace(/(\d)$/, '0$1');
    }

    const section = document.getElementById(targetId);
    if (!section) return;

    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  });
});


/* 메인 텍스트 스크롤트리거 */ 
gsap.registerPlugin(ScrollTrigger);

const ani1 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sec01',
    pin: true,
    scrub: true,
    start: "top top",
    end: "+=300%",
  }
});

ani1.fromTo('.sec01 .txt1', 
  { y: 50, autoAlpha: 0 }, 
  { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
);

ani1.to('.sec01 .txt1', 
  { autoAlpha: 0, duration: 1, ease: "power2.out" }
);

ani1.to('.sec01 .txt_main',
  { autoAlpha: 1, duration: 1, ease: "power2.out", stagger: 0.3 }
);

ani1.fromTo('.sec01 .txt_menu',
  { y: 50, autoAlpha: 0 },
  { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
  "-=0.5"
);



/* 포트폴리오 탭, 이미지, 토글 */
const tabs = document.querySelectorAll('.tabs .tab');
const tabContents = document.querySelectorAll('.tab-content');
const toggleBtn = document.querySelector('#tab1 .toggle-btn');
const tab1Items = document.querySelectorAll('#tab1 .portfolio_gallery li');
const section03 = document.querySelector('#section03');

tab1Items.forEach((item, index) => {
  if (index < 4) {
    item.classList.add('visible');
  } else {
    item.classList.remove('visible');
  }
});

// 탭 클릭 이벤트
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();

    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    tabContents.forEach(content => content.classList.remove('active'));
    const target = document.querySelector(`#${tab.dataset.tab}`);
    target.classList.add('active');

    if (tab.dataset.tab === 'tab1') {
      toggleBtn.style.display = 'flex';
    } else {
      toggleBtn.style.display = 'none';
    }

    const items = target.querySelectorAll('.portfolio_gallery li');
    items.forEach((item, index) => {
      if (index < 4) {
        item.classList.add('visible');
      } else {
        item.classList.remove('visible');
      }
    });

    toggleBtn.classList.remove('active');
    const ul = target.querySelector('.portfolio_gallery ul');
    if (ul) {
      ul.classList.remove('expanded');
      section03.style.height = '';
    }
  });
});

// 전체 탭 토글 버튼 클릭 이벤트
toggleBtn.addEventListener('click', () => {
  const galleryList = document.querySelector('#tab1 .portfolio_gallery ul');
  galleryList.classList.toggle('expanded');
  toggleBtn.classList.toggle('active');

  tab1Items.forEach((item, index) => {
    if (galleryList.classList.contains('expanded') || index < 4) {
      item.classList.add('visible');
    } else {
      item.classList.remove('visible');
    }
  });

  if (galleryList.classList.contains('expanded')) {
    section03.style.height = 'auto';
  } else {
    section03.style.height = '';
  }
});


