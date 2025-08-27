/* 메뉴바 */
const sideMenu = document.getElementById('sideMenu');
const menuItems = sideMenu.querySelectorAll('li');
const defaultColor = '#1F66FF'; // 기본 블루

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

    // 색상 적용: 섹션3이면 하얀색, 아니면 기본 블루
    const color = currentSection && currentSection.id === 'section03' ? '#FFFFFF' : defaultColor;
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        link.style.color = color;
        item.querySelector('.star').style.color = color;
    });
}

updateMenu();
window.addEventListener('scroll', updateMenu);

// 메뉴 클릭 시 스크롤 이동
menuItems.forEach(item => {
    const link = item.querySelector('a');
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const section = document.getElementById(targetId);
        if (!section) return;
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    });
});


/* sec01 메뉴바 */ 
gsap.registerPlugin(ScrollTrigger);

gsap.from('.txt_menu', {
  y: 50,           // 아래에서 올라오기
  autoAlpha: 0,    // 처음 숨김
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: '#section01',  // 언제 나타나게 할지
    start: "bottom bottom", // sec01 하단에 오면
    toggleActions: "play none none reverse", // 다시 위로 올리면 사라짐
  }
});


/* sec01 txt_menu 클릭 시 스크롤 이동 */
// txt_menu 클릭 시 스크롤 이동
const txtMenuLinks = document.querySelectorAll('.txt_menu a');

txtMenuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // 기본 a 링크 이동 막기

    // href에서 # 제거 후 실제 섹션 id와 맞게 변환
    let targetId = link.getAttribute('href').replace('#', '');
    
    // 숫자 자릿수 맞추기 (section2 -> section02)
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

// 1. h2 등장
ani1.fromTo('.sec01 .txt1', 
  { y: 50, autoAlpha: 0 }, 
  { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }
);

// 2. h2 사라짐
ani1.to('.sec01 .txt1', 
  { autoAlpha: 0, duration: 1, ease: "power2.out" }
);

// 3. txt_main 등장
ani1.to('.sec01 .txt_main',
  { autoAlpha: 1, duration: 1, ease: "power2.out", stagger: 0.3 }
);

// 4. txt_menu 등장 (y값 적용해서 아래에서 올라오기)
ani1.fromTo('.sec01 .txt_menu',
  { y: 50, autoAlpha: 0 },
  { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
  "-=0.5" // txt_main과 살짝 겹치도록
);


/* 포트폴리오 이미지 */
