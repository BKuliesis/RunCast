export function updateTheme() {
    const savedTheme = localStorage.getItem("theme")

    function applyTheme(theme) {
        if (theme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
        } else {
            document.documentElement.setAttribute("data-theme", theme);
        }
    }

    applyTheme(savedTheme);

    // Listen for system theme changes when "system" is selected
    if (savedTheme === "system") {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            applyTheme("system");
        });
    }
}
