document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('.experience li');

    listItems.forEach(item => {
        item.addEventListener('click', function () {
            const dropdown = this.querySelector('.dropdown-content');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});