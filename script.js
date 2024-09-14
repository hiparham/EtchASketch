const color = document.getElementById("clr")
const box = document.querySelector(".box")
const range = document.querySelector(".range")
const buttons = document.querySelectorAll("button")
let cr = { type: "color", color: "#2563eb" }
const highlightButton = (x) => {
  buttons.forEach((b) => {
    b.classList.remove("bg-zinc-500")
    b.classList.remove("text-white")
  })
  x.classList.add("bg-zinc-500")
  x.classList.add("text-white")
}
//
highlightButton(buttons[0])
//
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    highlightButton(e.currentTarget)
    cr = { ...cr, type: e.target.dataset.id || "color" }
  })
})
//
color.addEventListener("input", (e) => {
  cr = { ...cr, color: e.target.value }
})
//
const setGrids = (number) => {
  //
  box.innerHTML = ""
  //
  box.style.gridTemplateColumns = `repeat(${number},1fr)`
  //
  for (let i = 0; i < number * number; i++) {
    const li = document.createElement("li")
    li.className = "sq aspect-square border list-none cursor-pointer"
    box.appendChild(li)
  }
}
//
range.addEventListener("input", (e) => {
  const val = Number(e.target.value)
  setGrids(val)
})
//
setGrids(20)
//
let clicked = false
//
box.addEventListener("mousedown", () => {
  clicked = true
})
box.addEventListener("mouseup", () => {
  clicked = false
})
box.addEventListener("mouseleave", () => {
  clicked = false
})
//
box.addEventListener("mousemove", (e) => {
  if (!clicked || e.target.classList[0] !== "sq") return
  switch (cr.type) {
    case "rainbow":
      {
        e.target.style.backgroundColor = `rgb(${Math.floor(
          Math.random() * 255
        )},${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )})`
      }
      break
    case "color":
      {
        e.target.style.backgroundColor = color.value
      }
      break
    case "eraser":
      {
        e.target.style.backgroundColor = "#fff"
      }
      break
  }
})
