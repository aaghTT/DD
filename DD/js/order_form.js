
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
function scrollToOrder() {
    const orderSection = document.getElementById('order');
    orderSection.scrollIntoView({ behavior: 'smooth' });
}
