document.addEventListener('DOMContentLoaded', function() {
    const addItemButton = document.getElementById('addItemBtn');
    const addLessonButton = document.getElementById('addLessonBtn');

    if (addItemButton) {
        addItemButton.addEventListener('click', function() {
            window.location.href = 'AddItem.html';
        });
    } else {
        console.error("Add Item button not found");
    }

    if (addLessonButton) {
        addLessonButton.addEventListener('click', function() {
            window.location.href = 'AddLesson.html';
        });
    } else {
        console.error("Add Lesson button not found");
    }
});
