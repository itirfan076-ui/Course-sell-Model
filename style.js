const moduleList = document.getElementById("moduleList");
const videoFrame = document.getElementById("videoFrame");
const currentTitle = document.getElementById("currentVideoTitle");
const modal = document.getElementById("paymentModal");
const closeBtn = document.querySelector(".close-btn");
const buyBtn = document.querySelector(".buy-btn");
const confirmBtn = document.querySelector(".confirm-btn");
const payOptions = document.querySelectorAll(".pay-option"); // Bkash/Nagad বাটন
let selectedPaymentMethod = null; // কোন মেথড সিলেক্ট করেছে

// ১. নেভিগেশন বারের লিংক সচল করা
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        // যদি লিংকটি '#' হয়, তবে অ্যালার্ট দেখাবে
        if (link.getAttribute("href") === "#") {
            e.preventDefault();
            alert("এই পেজটি তৈরির কাজ চলছে! (Coming Soon)");
        }
    });
});

// ২. Bkash এবং Nagad বাটন সিলেকশন লজিক
payOptions.forEach(option => {
    option.addEventListener("click", function () {
        // ক) সব বাটন থেকে সিলেকশন বর্ডার সরানো
        payOptions.forEach(btn => {
            btn.style.border = "none";
            btn.style.transform = "scale(1)";
        });

        // খ) যেটাতে ক্লিক করা হয়েছে সেটা হাইলাইট করা
        this.style.border = "3px solid #333";
        this.style.transform = "scale(1.05)";

        // গ) সিলেক্ট করা মেথডের নাম সেভ রাখা
        selectedPaymentMethod = this.innerText;
    });
});

// ৩. কোর্স লোড এবং বাটন লজিক
async function loadCourses() {
    try {
        const response = await fetch('http://localhost:5000/courses');
        const courses = await response.json();

        moduleList.innerHTML = "";

        const isPurchased = courses.every(course => course.isLocked === false);

        if (isPurchased) {
            if (buyBtn) buyBtn.style.display = "none";
        } else {
            if (buyBtn) buyBtn.style.display = "block";
        }

        courses.forEach((course, index) => {
            const li = document.createElement("li");
            li.className = "module-item";

            if (index === 0) {
                li.classList.add("active");
                videoFrame.src = course.videoUrl;
                currentTitle.innerText = course.title;
            }

            if (course.isLocked) {
                li.innerText = `🔒 ${course.title} (Premium)`;
                li.style.color = "gray";
            } else {
                li.innerText = `▶ ${course.title}`;
            }

            li.addEventListener("click", () => {
                if (course.isLocked) {
                    modal.style.display = "block";
                } else {
                    document.querySelectorAll(".module-item").forEach(i => i.classList.remove("active"));
                    li.classList.add("active");
                    videoFrame.src = course.videoUrl;
                    currentTitle.innerText = course.title;
                }
            });

            moduleList.appendChild(li);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

loadCourses();

// ৪. মোডাল ইভেন্ট
if (closeBtn) closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target == modal) modal.style.display = "none";
});
if (buyBtn) buyBtn.addEventListener("click", () => modal.style.display = "block");

// ৫. পেমেন্ট কনফার্ম (সব চেক করে)
if (confirmBtn) {
    confirmBtn.addEventListener("click", async () => {
        const phoneInput = document.querySelector(".input-field");

        // ক) মেথড চেক
        if (!selectedPaymentMethod) {
            alert("দয়া করে Bkash অথবা Nagad সিলেক্ট করুন!");
            return;
        }

        // খ) ফোন নম্বর চেক
        if (phoneInput.value.trim() === "") {
            alert("দয়া করে ফোন নম্বর দিন!");
            phoneInput.style.border = "1px solid red";
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/buy-course', { method: 'POST' });

            if (response.ok) {
                alert(`ধন্যবাদ! ${selectedPaymentMethod} পেমেন্ট সফল হয়েছে।`);
                modal.style.display = "none";
                loadCourses();
            }
        } catch (error) {
            alert("সার্ভার এরর!");
        }
    });
}