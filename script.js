/* ==========================================================================
   20/10 VIETNAMESE WOMEN'S DAY - SCRIPT LOGIC
   Combining Mail-truck motion & 8-3 Envelope Opening
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. RECIPIENT MESSAGES DATA (20/10 WISHES)
    // -------------------------------------------------------------
    const wishesData = {
        lover: {
            title: "Gửi Em - Người Anh Thương Nhất! 💖",
            content: `Nhân ngày Phụ nữ Việt Nam 20/10, anh chúc em luôn xinh đẹp, rạng ngời và ngập tràn niềm vui! 🌸

Cảm ơn em đã bước vào cuộc sống của anh, mang lại những ấm áp, nụ cười và vô vàn điều tuyệt vời. Với anh, nụ cười của em là điều đẹp đẽ nhất.

Chúc em luôn hạnh phúc, may mắn và mãi là cô gái ngọt ngào của anh nhé! Thương em rất nhiều! 💕✨`
        },
        mom: {
            title: "Kính Gửi Mẹ Yêu Của Con! ❤️",
            content: `Nhân ngày Phụ nữ Việt Nam 20/10, con xin gửi lời chúc tốt đẹp nhất tới Mẹ! 💐

Con chúc Mẹ luôn dồi dào sức khỏe, luôn vui tươi, bình an và hạnh phúc bên gia đình. Cảm ơn Mẹ vì những hy sinh thầm lặng, sự quan tâm và tình yêu thương vô bờ bến đã dành cho con.

Mẹ luôn là người phụ nữ tuyệt vời nhất trong trái tim con! Con yêu Mẹ thật nhiều! 🌹💖`
        },
        teacher: {
            title: "Kính Gửi Cô Giáo Kính Yêu! 🌸",
            content: `Hôm nay là ngày 20/10 - ngày tôn vinh những người phụ nữ Việt Nam, em xin gửi tới Cô lời chúc mừng chân thành và sâu sắc nhất! 📖✨

Kính chúc Cô luôn dồi dào sức khỏe, ngập tràn niềm vui, công tác tốt và luôn giữ trọn ngọn lửa nhiệt huyết để dẫn dắt các thế hệ học trò cập bến bờ tri thức.

Cảm ơn Cô vì những bài học quý giá và tấm lòng tận tụy với chúng em! 🌹🌷`
        },
        sister: {
            title: "Gửi Chị / Em Gái Yêu Quý! 🌷",
            content: `Chúc mừng ngày 20/10! Chúc chị/em luôn xinh xắn như hoa, lúc nào cũng nở nụ cười rạng rỡ trên môi! 🎀

Chúc cho mọi ước mơ, kế hoạch trong học tập và công việc của chị/em đều thành công rực rỡ. Hãy luôn tự tin, yêu đời và nhận được thật nhiều quà cùng lời chúc ngọt ngào hôm nay nhé! 🎁💖`
        },
        general: {
            title: "Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10! ✨",
            content: `Xin gửi những lời chúc ấm áp và chân thành nhất tới một nửa tuyệt vời của thế giới! 🌸

Chúc bạn có một ngày 20/10 ngập tràn niềm vui, hạnh phúc, được yêu thương và chiều chuộng thật nhiều. Chúc bạn luôn xinh đẹp, tự tin, rực rỡ như những đóa hoa và gặt hái thật nhiều thành công trong cuộc sống! 💐💖`
        }
    };

    let currentRecipient = "lover";

    // -------------------------------------------------------------
    // 2. BACKGROUND MUSIC MANAGEMENT
    // -------------------------------------------------------------
    const bgMusic = document.getElementById("bgMusic");
    const musicToggleBtn = document.getElementById("musicToggleBtn");
    let isMusicPlaying = false;

    function playMusic() {
        if (!bgMusic) return;
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggleBtn.classList.add("playing");
        }).catch(err => {
            console.log("Audio autoplay was prevented:", err);
        });
    }

    function toggleMusic() {
        if (!bgMusic) return;
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            musicToggleBtn.classList.remove("playing");
        } else {
            playMusic();
        }
    }

    musicToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMusic();
    });

    // Auto-attempt to play on first user interaction anywhere
    const startAudioOnFirstInteract = () => {
        if (!isMusicPlaying) {
            playMusic();
        }
        document.removeEventListener("click", startAudioOnFirstInteract);
        document.removeEventListener("touchstart", startAudioOnFirstInteract);
    };
    document.addEventListener("click", startAudioOnFirstInteract, { once: true });
    document.addEventListener("touchstart", startAudioOnFirstInteract, { once: true });


    // -------------------------------------------------------------
    // 3. SCENE SWITCHING: MAIL TRUCK -> ENVELOPE
    // -------------------------------------------------------------
    const truckScene = document.getElementById("truckScene");
    const envelopeScene = document.getElementById("envelopeScene");
    const parcelAlert = document.getElementById("parcelAlert");
    const skipTruckBtn = document.getElementById("skipTruckBtn");
    const replayTruckBtn = document.getElementById("replayTruckBtn");
    const truckMotionBox = document.getElementById("truckMotionBox");

    let truckTimer1, truckTimer2;

    function startTruckScene() {
        truckScene.classList.add("active");
        envelopeScene.classList.remove("active");
        skipTruckBtn.style.display = "inline-flex";
        replayTruckBtn.style.display = "none";
        parcelAlert.classList.remove("show");

        // Reset truck animation
        truckMotionBox.style.animation = "none";
        truckMotionBox.offsetHeight; // trigger reflow
        truckMotionBox.style.animation = "e13 9.5s forwards";

        // Show parcel delivered alert at 4 seconds
        clearTimeout(truckTimer1);
        clearTimeout(truckTimer2);

        truckTimer1 = setTimeout(() => {
            parcelAlert.classList.add("show");
            // Fire small confetti celebration
            if (typeof confetti === "function") {
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.6 }
                });
            }
        }, 4000);

        // Transition to envelope scene at 7 seconds
        truckTimer2 = setTimeout(() => {
            switchToEnvelopeScene();
        }, 7200);
    }

    function switchToEnvelopeScene() {
        clearTimeout(truckTimer1);
        clearTimeout(truckTimer2);
        truckScene.classList.remove("active");
        envelopeScene.classList.add("active");
        skipTruckBtn.style.display = "none";
        replayTruckBtn.style.display = "inline-flex";

        // Trigger SVG Heart path drawing animation
        initSvgHeartAnimation();
    }

    skipTruckBtn.addEventListener("click", switchToEnvelopeScene);
    replayTruckBtn.addEventListener("click", startTruckScene);

    // Initial start of truck scene
    startTruckScene();


    // -------------------------------------------------------------
    // 4. SVG HEART BÉZIER CURVE ANIMATION (From 8-3-main)
    // -------------------------------------------------------------
    let svgAnimStarted = false;

    function initSvgHeartAnimation() {
        const shape = document.getElementById("shape");
        const partialPath = document.getElementById("partialPath");
        if (!shape || !partialPath) return;

        let rid = null;
        const SVG_NS = "http://www.w3.org/2000/svg";
        const pathlength = shape.getTotalLength();
        let t = 0;
        let d = shape.getAttribute("d");

        // Helper Bezier math from 8-3-main
        let pos = 0;
        let nMatches = d.match(/C/gi);
        let n = nMatches ? nMatches.length : 0;

        class SubPath {
            constructor(dString) {
                this.d = dString;
                this.pointsRy = [];
                let temp = this.d.split(/[A-Z,a-z\s,]/).filter(v => v);
                temp.forEach(item => this.pointsRy.push(parseFloat(item)));
                this.previous = subpaths.length > 0 ? subpaths[subpaths.length - 1] : null;

                let p = document.createElementNS(SVG_NS, "path");
                p.setAttributeNS(null, "d", this.d);
                this.pathLength = p.getTotalLength();

                if (this.previous) {
                    let prevPoints = this.previous.pointsRy;
                    let l = prevPoints.length;
                    this.M_point = [prevPoints[l - 2], prevPoints[l - 1]];
                } else {
                    this.M_point = [this.pointsRy[0], this.pointsRy[1]];
                }

                let lastIndexOfC = this.d.lastIndexOf("C");
                let cTemp = this.d.substring(lastIndexOfC + 1).split(/[\s,]/).filter(v => v);
                let _temp = [];
                cTemp.forEach(item => _temp.push(parseFloat(item)));
                this.lastCubicBezier = [this.M_point];
                for (let i = 0; i < _temp.length; i += 2) {
                    this.lastCubicBezier.push(_temp.slice(i, i + 2));
                }
            }
        }

        let subpaths = [];
        for (let i = 0; i < n; i++) {
            let newpos = d.indexOf("C", pos + 1);
            if (i > 0) {
                subpaths.push(new SubPath(d.substring(0, newpos)));
            }
            pos = newpos;
        }
        subpaths.push(new SubPath(d));

        function get_T(tVal, idx) {
            let lengthAtT = pathlength * tVal;
            if (idx > 0) {
                return (lengthAtT - subpaths[idx].previous.pathLength) /
                       (subpaths[idx].pathLength - subpaths[idx].previous.pathLength);
            } else {
                return lengthAtT / subpaths[idx].pathLength;
            }
        }

        function lerp(A, B, tVal) {
            return [(B[0] - A[0]) * tVal + A[0], (B[1] - A[1]) * tVal + A[1]];
        }

        function getBezierPoints(tVal, points) {
            let helperPoints = [];
            for (let i = 1; i < 4; i++) {
                helperPoints.push(lerp(points[i - 1], points[i], tVal));
            }
            helperPoints.push(lerp(helperPoints[0], helperPoints[1], tVal));
            helperPoints.push(lerp(helperPoints[1], helperPoints[2], tVal));
            helperPoints.push(lerp(helperPoints[3], helperPoints[4], tVal));

            return [points[0], helperPoints[0], helperPoints[3], helperPoints[5]];
        }

        function drawCBezier(points, pathElem, idx) {
            let pathD = idx > 0 ? subpaths[idx].previous.d : `M${points[0][0]},${points[0][1]} C`;
            for (let i = 1; i < 4; i++) {
                pathD += ` ${points[i][0]},${points[i][1]} `;
            }
            pathElem.setAttributeNS(null, "d", pathD);
        }

        function stepAnimation() {
            rid = window.requestAnimationFrame(stepAnimation);
            if (t >= 1) {
                window.cancelAnimationFrame(rid);
                rid = null;
                return;
            }
            t += 0.0035;

            let lengthAtT = pathlength * t;
            let index = 0;
            for (index = 0; index < subpaths.length; index++) {
                if (subpaths[index].pathLength >= lengthAtT) {
                    break;
                }
            }
            let T = get_T(t, index);
            if (subpaths[index] && subpaths[index].lastCubicBezier) {
                let newPoints = getBezierPoints(T, subpaths[index].lastCubicBezier);
                drawCBezier(newPoints, partialPath, index);
            }
        }

        stepAnimation();
    }


    // -------------------------------------------------------------
    // 5. ENVELOPE OPENING & LETTER MODAL (From 8-3-main)
    // -------------------------------------------------------------
    const envelopeTrigger = document.getElementById("envelopeTrigger");
    const clickHint = document.getElementById("clickHint");
    const wrapperLetterForm = document.getElementById("wrapperLetterForm");
    const closeLetterBtn = document.getElementById("closeLetterBtn");
    const typedTitle = document.getElementById("typedTitle");
    const typedContent = document.getElementById("typedContent");
    const sendLoveBtn = document.getElementById("sendLoveBtn");
    const pills = document.querySelectorAll(".recipient-pills .pill");

    let titleInterval = null;
    let contentInterval = null;

    function openLetterModal() {
        wrapperLetterForm.classList.add("show");

        // Fire celebratory confetti!
        if (typeof confetti === "function") {
            confetti({
                particleCount: 90,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#ff4d6d', '#ff758f', '#ff85a1', '#f72585', '#7209b7', '#ffd166']
            });
        }

        // Trigger typewriter effect
        startTypewriter(currentRecipient);
    }

    function closeLetterModal() {
        wrapperLetterForm.classList.remove("show");
        clearInterval(titleInterval);
        clearInterval(contentInterval);
    }

    envelopeTrigger.addEventListener("click", openLetterModal);
    clickHint.addEventListener("click", openLetterModal);
    closeLetterBtn.addEventListener("click", closeLetterModal);

    // Close when clicking outside formLetter
    wrapperLetterForm.addEventListener("click", (e) => {
        if (e.target === wrapperLetterForm || e.target.classList.contains("boxLetter")) {
            closeLetterModal();
        }
    });

    // -------------------------------------------------------------
    // 6. TYPEWRITER EFFECT
    // -------------------------------------------------------------
    function startTypewriter(recipientKey) {
        clearInterval(titleInterval);
        clearInterval(contentInterval);

        const data = wishesData[recipientKey] || wishesData.lover;
        typedTitle.textContent = "";
        typedContent.textContent = "";

        let titleIndex = 0;
        let contentIndex = 0;

        // Type Title first
        titleInterval = setInterval(() => {
            if (titleIndex < data.title.length) {
                typedTitle.textContent += data.title[titleIndex];
                titleIndex++;
            } else {
                clearInterval(titleInterval);
                // After title completes, type content
                setTimeout(typeContent, 350);
            }
        }, 50);

        function typeContent() {
            contentInterval = setInterval(() => {
                if (contentIndex < data.content.length) {
                    typedContent.textContent += data.content[contentIndex];
                    contentIndex++;
                } else {
                    clearInterval(contentInterval);
                }
            }, 30);
        }
    }

    // Recipient Pills Click Handlers
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentRecipient = pill.getAttribute("data-type");
            startTypewriter(currentRecipient);

            if (typeof confetti === "function") {
                confetti({
                    particleCount: 25,
                    spread: 45,
                    origin: { y: 0.7 }
                });
            }
        });
    });

    // Send Love Heart Button
    sendLoveBtn.addEventListener("click", () => {
        if (typeof confetti === "function") {
            // Heart-shaped or romantic multi-shot confetti
            const end = Date.now() + 1000;
            const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'];

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    });


    // -------------------------------------------------------------
    // 7. BACKGROUND FALLING PETALS / SPARKLES CANVAS
    // -------------------------------------------------------------
    const canvas = document.getElementById("petalsCanvas");
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numPetals = 35;
    const petals = [];

    class Petal {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = Math.random() * 1.2 - 0.6;
            this.rotation = Math.random() * 360;
            this.rotSpeed = Math.random() * 2 - 1;
            this.color = Math.random() > 0.4 ? "rgba(255, 149, 175, 0.65)" : "rgba(255, 182, 193, 0.65)";
            this.isHeart = Math.random() > 0.6;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotSpeed;

            if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
                this.reset();
                this.y = -20;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;

            if (this.isHeart) {
                // Draw small heart
                const s = this.size * 0.7;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-s, -s, -s * 1.5, s * 0.5, 0, s * 1.5);
                ctx.bezierCurveTo(s * 1.5, s * 0.5, s, -s, 0, 0);
                ctx.fill();
            } else {
                // Draw petal oval
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < numPetals; i++) {
        petals.push(new Petal());
    }

    function animatePetals() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animatePetals);
    }
    animatePetals();
});
