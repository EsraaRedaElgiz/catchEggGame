//egg game
const moveBottomEgg = function (imageObject, left, top) {
  let id = setInterval(() => {
    top += 10;
    left += Math.random() * (window.innerWidth - imageObject.width);
    if (left > window.innerWidth - imageObject.width) {
      left = 0;
    }

    if (top >= window.innerHeight - (imageObject.height + 20)) {
      if (compareBasketAndEgg() == true) {
        imageObject.classList.add("hideImage");
        let scoreNumber = parseInt(document.querySelector("span").innerText);
        document.querySelector("span").innerText = scoreNumber + 1;
      } else {
        imageObject.src = "./images/hit.png";
      }
      clearInterval(id);
      setTimeout(() => {
        setTimeout(() => {
          imageObject.src = "./images/1128remove.png";
          imageObject.classList.remove("hideImage");
          imageObject.style.left = left + "px";
        }, 50);
        moveBottomEgg(imageObject, left, 0);
      }, 300);
    } else {
      imageObject.style.top = top + "px";
    }
  }, 50);
};

const moveBasket = function () {
  const movableBasket = document.getElementById("basket");
  let xMove = 0;
  const moveDistance = 10;

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        xMove > 0 ? (xMove -= moveDistance) : xMove;
        break;
      case "ArrowRight":
        xMove < window.innerWidth - (movableBasket.width + 10)
          ? (xMove += moveDistance)
          : xMove;
        break;
    }

    movableBasket.style.left = xMove + "px";
  });
};

const compareBasketAndEgg = function () {
  const movableBasket = document
    .getElementById("basket")
    .getBoundingClientRect();
  const movingEgg = document.getElementById("egg").getBoundingClientRect();
  return !(
    //will return true if these options dosen't occur
    (
      movableBasket.top > movingEgg.bottom ||
      movableBasket.right < movingEgg.left ||
      movableBasket.bottom < movingEgg.top ||
      movableBasket.left > movingEgg.right
    )
  );
};

