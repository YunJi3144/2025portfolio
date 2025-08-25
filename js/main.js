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
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".cont_list");

tabs.forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();

    const target = tab.dataset.tab;

    // 탭 활성화 클래스
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // 컨텐츠 전환
    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});
