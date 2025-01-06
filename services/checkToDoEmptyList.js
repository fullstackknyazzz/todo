
export function checkToDoEmptyList(todoEmptyList, taskCountElement) {
    if (Number(taskCountElement.textContent) > 0) {
        todoEmptyList.style.display = 'none';
    } else {
        todoEmptyList.style.display = 'flex';
    }
}