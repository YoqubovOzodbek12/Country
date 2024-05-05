const themeChange = document.querySelector('.theme-changes')

themeChange.addEventListener('click', () => {
    document.body.classList.toggle('dark')

    if (document.body.classList.contains("dark")) localStorage.setItem("mode", "dark")
    else localStorage.setItem("mode", "light")
});

if(localStorage.getItem("mode") === "light" && document.body.classList.contains("dark")) document.body.classList.remove("dark")
else if(localStorage.getItem("mode") === "dark" && !document.body.classList.contains("dark")) document.body.classList.add("dark")

