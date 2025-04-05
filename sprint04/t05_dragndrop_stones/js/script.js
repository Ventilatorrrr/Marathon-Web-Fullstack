document.addEventListener("DOMContentLoaded", () => {
    const stones = Array.from(document.querySelectorAll(".stone"));
    let draggedStone = null;

    stones.forEach(stone => {
        stone.addEventListener("mousedown", (event) => {
            if (stone.getAttribute("value") === "off") return;
            draggedStone = stone;
        });

        stone.addEventListener("click", () => {
            let isOn = stone.getAttribute("value") === "on";
            stone.setAttribute("value", isOn ? "off" : "on");
            stone.classList.toggle("locked", !isOn);
        });
    });

    document.addEventListener("mousemove", (event) => {
        if (draggedStone)
        {
            Object.assign(draggedStone.style, {
                left: `${event.clientX - 50}px`,
                top: `${event.clientY - 50}px`
            });
        }
    });

    document.addEventListener("mouseup", () => {
        draggedStone = null;
    });
});

