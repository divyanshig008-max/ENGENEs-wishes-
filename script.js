/* =========================
   BASIC NAVIGATION
========================= */

const screens = {
    home: document.getElementById("home"),
    members: document.getElementById("members"),
    wish: document.getElementById("wishScreen"),
    universe: document.getElementById("universe")
};

function showScreen(screen) {

    Object.values(screens).forEach(s => {
        s.classList.remove("active");
    });

    screen.classList.add("active");
}


/* HOME → MEMBERS */

document.getElementById("enterBtn").addEventListener("click", () => {

    showScreen(screens.members);

});


/* =========================
   MEMBER SELECTION
========================= */

let selectedMember = null;

document.querySelectorAll(".member").forEach(button => {

    button.addEventListener("click", () => {

        selectedMember = button.dataset.member;

        document.getElementById("selectedMember").textContent =
            selectedMember.toUpperCase();

        showScreen(screens.wish);

    });

});


/* CHANGE MEMBER */

document.getElementById("backToMembers").addEventListener("click", () => {

    showScreen(screens.members);

});


/* =========================
   STAR DATA
========================= */

let stars = [];

const memberColours = {

    Jungwon: "#d9f1ff",
    Heeseung: "#fff1c9",
    Jay: "#ffd6e7",
    Jake: "#d6e4ff",
    Sunghoon: "#cfeaff",
    Sunoo: "#ffc9df",
    "Ni-ki": "#ddd0ff",
    OT7: "#ffffff"

};


/* =========================
   SEND WISH
========================= */

document.getElementById("sendWish").addEventListener("click", () => {

    const name =
        document.getElementById("nameInput").value.trim();

    const wish =
        document.getElementById("wishInput").value.trim();

    const duration =
        document.getElementById("duration").value;


    if (!wish) {

        alert("Please write your wish first. ✦");

        return;

    }


    const star = {

        id: Date.now(),

        name: name || "Anonymous ENGENE",

        wish: wish,

        member: selectedMember,

        duration: duration,

        x: Math.random() * 3800 + 100,

        y: Math.random() * 3800 + 100

    };


    stars.push(star);


    createStar(star);


    document.getElementById("nameInput").value = "";

    document.getElementById("wishInput").value = "";


    showScreen(screens.universe);


    const message = document.getElementById("message");

    message.classList.add("show");

    setTimeout(() => {

        message.classList.remove("show");

    }, 3000);

});


/* =========================
   CREATE STAR
========================= */

function createStar(star) {

    const element =
        document.createElement("div");

    element.className = "star";

    element.dataset.member = star.member;

    element.dataset.id = star.id;

    element.style.left = star.x + "px";

    element.style.top = star.y + "px";

    element.style.color =
        memberColours[star.member];


    element.addEventListener("click", event => {

        event.stopPropagation();

        showWish(star);

    });


    document.getElementById("universeStars")
        .appendChild(element);

}


/* =========================
   SHOW WISH
========================= */

function showWish(star) {

    document.getElementById("popupName").textContent =
        star.name;

    document.getElementById("popupWish").textContent =
        star.wish;

    document.getElementById("popupMember").textContent =
        "for " + star.member;


    document.getElementById("wishPopup")
        .classList.add("show");

}


/* CLOSE POPUP */

document.getElementById("closePopup")
    .addEventListener("click", () => {

        document.getElementById("wishPopup")
            .classList.remove("show");

    });


/* =========================
   MEMBER FILTERS
========================= */

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter")
            .forEach(b => b.classList.remove("active"));

        button.classList.add("active");


        const filter = button.dataset.filter;


        document.querySelectorAll(".star")
            .forEach(star => {

                if (
                    filter === "all" ||
                    star.dataset.member === filter
                ) {

                    star.style.display = "block";

                } else {

                    star.style.display = "none";

                }

            });

    });

});
