// Select All checkbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const selectAll = document.getElementById("selectAll");
  if (selectAll) {
    selectAll.addEventListener("change", () => {
      const checkboxes = document.querySelectorAll('input[name="checkbox"]');
      checkboxes.forEach((cb) => {
        cb.checked = selectAll.checked;
      });
    });
  }
});
