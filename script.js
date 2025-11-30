
        const startBtn = document.getElementById("startBtn");
        const loading = document.getElementById("loading");
        const percentText = document.getElementById("percent");

        startBtn.addEventListener("click", () => {
            loading.classList.remove("hidden");
            startBtn.style.display = "none";

            let percent = 0;

            let intervalo = setInterval(() => {
                percent++;
                percentText.textContent = percent + "%";

                if (percent >= 100) {
                    clearInterval(intervalo);
                    setTimeout(() => {
                        window.location.href = "game.html";
                    }, 500);
                }
            }, 30);
        });