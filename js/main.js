/* 메인 텍스트 스크롤트리거 */ 
gsap.registerPlugin(ScrollTrigger);

const ani1 = gsap.timeline();
ani1
  .to('.sec01 .txt1', {y: '-100%', autoAlpha: 1}, 1)
  .to('.sec01 .txt1', {autoAlpha: 0}, 2)
  .to('.sec01 .txt2', {y: '-100%', autoAlpha: 1}, 2)
  .to('.sec01 .txt2', {autoAlpha: 0}, 3)
  .to('.sec01 .txt3', {y: '-100%', autoAlpha: 1}, 4)

ScrollTrigger.create({
  animation: ani1,
  trigger: '.sec01',
  pin: true,
  scrub: true,
})


/* 탭 메뉴 */
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.cont_list');

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault(); // 링크 이동 방지

    // 모든 탭과 콘텐츠에서 active 제거
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // 클릭한 탭과 대응하는 콘텐츠만 active
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});


/* 포트폴리오 탭 메뉴 */ 
// 탭 클릭
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();
    const targetId = tab.dataset.tab;

    // 모든 탭 비활성화
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    // 선택 탭 활성화
    tab.classList.add("active");
    const content = document.getElementById(targetId);
    content.classList.add("active");

    // 새 탭은 항상 접힌 상태
    const ul = content.querySelector("ul");
    const btn = content.querySelector(".toggle-btn");
    if (ul && btn) {
      ul.classList.remove("expanded");
      btn.classList.remove("active");
      btn.textContent = "▼";
    }
  });
});

// 토글 버튼 클릭
document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const ul = btn.previousElementSibling;
    ul.classList.toggle("expanded");
    btn.classList.toggle("active");
    btn.textContent = ul.classList.contains("expanded") ? "▲" : "▼";
  });
});
