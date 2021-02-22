'use strict'

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

const home = document.querySelector('#home');
const homeContainer = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

const about = document.querySelector('#about');
const aboutHeight = about.getBoundingClientRect().height;

const skills = document.querySelector('#skills');
const skillsHeight = skills.getBoundingClientRect().height;

const work = document.querySelector('#work');
const workHeight = work.getBoundingClientRect().height;

const testimonial = document.querySelector('#testimonial');
const testimonialHeight = testimonial.getBoundingClientRect().height;

const contact = document.querySelector('#contact');
const contactHeight = contact.getBoundingClientRect().height;


const menuBtns = document.querySelectorAll('.menu ul li');

// // 형변환 parseInt(), 
// var 변수 = parseInt(문자);    //문자를 정수형 숫자로 변환해줌
// var 변수 = parseFloat(문자);     //문자를 실수형 숫자로 변환해줌
// var 변수 = Nu   mber(문자);    //문자를 정수&실수형 숫자로 변환해줌
const sectionPaddingBottom = parseInt(window.getComputedStyle(home, null).getPropertyValue('padding-bottom').slice(0,-2));



document.addEventListener('scroll', () => {
    
    let active = document.querySelector('.menu ul li.active');

// 코드가 길다. 수정이 필요하다.
    if (window.scrollY+sectionPaddingBottom <= about.offsetTop-navbarHeight) {
        active.classList.remove('active')
        menuBtns[0].classList.add('active')
    } else if (window.scrollY+sectionPaddingBottom <= skills.offsetTop-navbarHeight) {
        active.classList.remove('active')
        menuBtns[1].classList.add('active')
    } else if (window.scrollY+sectionPaddingBottom <= work.offsetTop-navbarHeight) {
        active.classList.remove('active')
        menuBtns[2].classList.add('active')
    } else if (window.scrollY+sectionPaddingBottom <= testimonial.offsetTop-navbarHeight) {
        active.classList.remove('active')
        menuBtns[3].classList.add('active')
    } else if (window.scrollY+sectionPaddingBottom <= contact.offsetTop-navbarHeight) {
        active.classList.remove('active')
        menuBtns[4].classList.add('active')
    } else if (window.scrollY+sectionPaddingBottom <= document.body.clientHeight) {
        active.classList.remove('active')
        menuBtns[5].classList.add('active')
    }
})

document.addEventListener('scroll', () => {
    menuBtns.forEach((menuBtn) => {
        menuBorder(menuBtn.dataset.link);
    })
})

function menuBorder (menuName) {
    const menu = document.querySelector(menuName);
    
    // menuBtns에서 menuName을 data로 가진 Btn의 index를 구하고,
    // 거기에 -1한 index 를 찾자.
    let menuBtnIndex=0;
    menuBtns.forEach((a) =>{
        if (a.dataset.link !== menuName) {
            return;
        } else {
            
            for(let i=0; i<menuBtns.length;i++){
                if (a.dataset.link !== menuBtns[i].dataset.link){
                    return;
                } else {
                    menuBtnIndex = i;
                    break;
                }
            }
        }
    })
    let menuMinus1 = 0;
    if (menuBtnIndex === 0) {
        return;
    } else {
        let menuMinus1 = document.querySelector(menuBtns[menuBtnIndex-1].dataset.link);
    }   

    
    // 선택된 메뉴 이전에 있는 것
    
    if (menuMinus1.offsetTop < window.scrollY && window.scrollY < menu.offsetTop) {
        menuBtns.forEach((menuBtn) => {
            if (menuBtn.dataset.link === menuName) {
                menuBtn.classList.add('active');
            } else{
                menuBtn.classList.remove('active');
            }
        } )
    }
}


const arrowBtn = document.querySelector('.arrow-btn');

document.addEventListener('scroll',() => {
    // Make navbar transparent when it is on the top
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    };
    
    // Make home transparent when window is scrolled
    if(window.scrollY > homeHeight) {
        
        // arrowBtn.style.visibility = "visible";
        return;
    } else if (window.scrollY > homeHeight/4) {
        
        homeContainer.style.opacity = (1- (window.scrollY/homeHeight));
        // arrowBtn.style.visibility = "hidden";
    } else {
        homeContainer.style.opacity = 1;
        // arrowBtn.style.visibility = "hidden";
    };

    
});

// Handle click on the "arrow button"
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight-navbarHeight) {
        arrowBtn.classList.add('visible');
    } else {
        arrowBtn.classList.remove('visible')
    }
})

arrowBtn.addEventListener('click',() =>{
    scrollIntoView('#home');
});


// Handle scrolling when tapping on the navbar menu
const navbarmenu = document.querySelector('.menu ul');
navbarmenu.addEventListener('click', (event) => {
    // console.log(event.target);

    const target = event.target;
    const link = target.dataset.link;
    if(link==null) {
        // button말고 빈곳을 클릭했을때, undefined이 나온다.
        // 이때는 함수를 실행시키지 않고, 빠르게 return하는게 효율적이다.
        return;
    } else {
        // const scrollTo = document.querySelector(link);
        // scrollTo.scrollIntoView({behavior:'smooth'});
        scrollIntoView(link);
    }
});

// Handle click on "contact me" button on home
const contactmeBtn = document.querySelector('.home__contact__btn');

contactmeBtn.addEventListener('click', () => {

    scrollIntoView('#contact');
    // const scrollTo = document.querySelector(#contact);
    // scrollTo.scrollIntoView({behavior:'smooth'});
    // 2회 반복해서 쓰이니 함수화하자.

});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
};

// projectBtns[1].addEventListener('click', () =>{
//     filterProject(projectBtn[1].dataset.stack);
// })

// projectBtns[2].addEventListener('click', () =>{
//     filterProject("backEnd");
// })

// projectBtns[3].addEventListener('click', () =>{
//     filterProject("mobile");
// })

// projectBtns[0].addEventListener('click', ()=>{
//     for (let project of projects){
//         project.classList.remove("invisible");
//     };
// })

const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

const workBtnContainer = document.querySelector('.work__categories');
const projectBtns = document.querySelectorAll('.work__categories button');


// 1. 버튼 개수가 아무리 많아져도 코드 수정이 적어야한다.
// 2. stack의 이름이 바뀌어도 코드 수정이 적어야 한다.
// => project와 btn을 array로 받자.

function filterProject(stack) {
    if (stack==null){
        // work__categories 중 빈곳을 택했을 때,
        return;
    } else {if (stack==="All"){
        for (let project of projects) {
            project.classList.remove("invisible");
        }
    } else {
        // projects.forEach((project) => {}) 와 같다.
        for (let project of projects) {
            if (project.dataset.stack != stack) {
                project.classList.add("invisible");
            } else {
                project.classList.remove("invisible");
            }
        }
    }
    }
}

// callback 해오면, 효율적이다.
workBtnContainer.addEventListener('click', (e) => {
    
    projectContainer.classList.add('anim-out');    
    setTimeout(()=>{
        // 비동기적으로 발생하도록.
        // 기존의 것이 anim-out되고, 0.3초 후에 filtering 하게 하자.
        // brower에게 0.3초 후에 실행하도록 부탁하는 API이다.
        projectContainer.classList.remove('anim-out');  
        filterProject(e.target.dataset.stack);  
    },300)

    for (let Btn of projectBtns) {
        if (Btn == e.target) {
            Btn.classList.add("active");
        } else {
            Btn.classList.remove("active");
        }
    }
})





// for (let projectBtn of projectBtns) {
//     clickProject(projectBtn);
// };

// function clickProject (projectBtn) {
//     projectBtn.addEventListener('click', () =>{
//         console.log(projectBtn.dataset.stack);
//         filterProject(projectBtn.dataset.stack);
        
//         for (let Btn of projectBtns) {
//             if (Btn == projectBtn) {
//                 Btn.classList.add("active");
//             } else {
//                 Btn.classList.remove("active");;
//             }
//         }
        
//     })
// };