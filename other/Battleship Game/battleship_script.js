const gridContainer = document.getElementById('gridContainer');
for(let i=0;i<16;i++){
    const gridItem = document.createElement('div');
    gridItem.classList.add('gridItem');
    gridItem.id = i;
    gridContainer.appendChild(gridItem);
}


//on clicking the gridItem an image comes; it can be ship/water;
//add image of water and ship randomly 5 Ships and 11 water to be filled
const ship = "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png";
const water = "https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp";


//numbers from 0 to 16
const numbers = Array.from({ length: 16 }, (_, i) => i);

//randomly pick 5 numbers
function pickRandomFive(arr) {
  // Create a copy to avoid mutating the original array
  const arrCopy = [...arr];
  // Shuffle array using Fisher-Yates algorithm
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  // Return the first 5 elements from the shuffled array
  return arrCopy.slice(0, 5);
}

const randomFive = pickRandomFive(numbers);
randomFive.forEach(id => {
    const img = document.createElement('img');
    img.src=ship;
    img.alt ="ship";
    img.style.display = 'none';
    document.getElementById(id).appendChild(img);
});

//get the numbers not included in the array numbers
const remainingEleven = numbers.filter(
  num => !randomFive.includes(num)
);

remainingEleven.forEach(id => {
    const img = document.createElement('img');
    img.src=water;
    img.alt="water";
    img.style.display = 'none';
    document.getElementById(id).appendChild(img);

})


const gridItemsCollection = document.getElementsByClassName('gridItem');
const gridItems = Array.from(gridItemsCollection);
let clickCount = 0;
gridItems.forEach(gridItem => {
    gridItem.onclick = () => {
        const img = gridItem.querySelector('img');
        img.style.display = 'flex';
        img.dataset.visible = true;
        gridItem.onclick = null;
        clickCount++;

        if(clickCount <8){
            //only when the 5 ships are found display that player has won
            const visibleShips = document.querySelectorAll('img[alt="ship"][data-visible="true"]');
            if(visibleShips.length === 5){
                youWon();
            }
        }
        else if(clickCount == 8)
            youLose();
    }
});

const youWon = () => {
    alert("You Won!");
}
const youLose = () => {
    alert("You Lost!");
}

//reset functionality
const resetButton = document.getElementById('resetButton');
resetButton.onclick = () => {
    location.reload();
}