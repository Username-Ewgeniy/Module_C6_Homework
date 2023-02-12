const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    alert(`Размер экрана: \n${screen.width} x ${screen.height}\n\
Размер окна: \n${document.documentElement.clientWidth} x ${document.documentElement.clientHeight}`);
});