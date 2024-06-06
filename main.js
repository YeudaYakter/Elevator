
import  {heightFloor,speed,elevaternum,Floor_suspension} from './data.js';




class Floor {
    constructor(floornum, main, height) {
        this.floornum = floornum;
        this.main = main;
        this.height = height;
    }

    onclicka() {
      let closestElevator = elevators[0];

for (let i = 1; i < `${elevaternum}`; i++) {
    if (Math.abs(elevators[i].place - this.height) < Math.abs(closestElevator.place - this.height)) {
        closestElevator = elevators[i];
    }
}

  
        
        closestElevator.Invitation(this);
    }
}

class Elevator {
    constructor(numl, obj) {
        this.numl = numl;
        this.time = 0;
        this.place = 0;
        this.obj = obj;
        this.queue = [];
        this.isMoving = false;
    }

    async Invitation(floor) {
        this.queue.push(floor);
        if (!this.isMoving) {
            await this.processQueue();
        }
    }

    async processQueue() {
        this.isMoving = true;
        while (this.queue.length > 0) {
            let nextFloor = this.queue.shift();
            await this.moveToFloor(nextFloor);
        }
        this.isMoving = false;
    }

    async moveToFloor(floor) {
        let elevatorDiv = this.obj;
        let distance = Math.abs(floor.height - this.place);
        let travelTime = (distance / 117) * `${speed}` * `${Floor_suspension}`/2;

        elevatorDiv.style.transform = `translateY(-${floor.height}px)`;
        elevatorDiv.style.transitionDuration = `${travelTime}ms`;

        let timeDisplay = floor.main.querySelector('.time-display');
        timeDisplay.textContent = `${(travelTime / 1000).toFixed(1)} שניות`;
        await new Promise(resolve => setTimeout(resolve, travelTime));

        this.place = floor.height;


        floor.main.classList.add('arrived');

        setTimeout(() => {
            floor.main.classList.remove('arrived');
            timeDisplay.textContent = '';
        }, `${Floor_suspension}`);
    }
}

const elevators = [];
const elevatorContainer = document.querySelector('#elevator-container');

for (let i = 1; i <= `${elevaternum}`; i++) {
    let elevatordiv = document.createElement('div');
    elevatordiv.classList.add('elevator');
    elevatordiv.style.left = `${i * 60}px`; 
    elevatorContainer.appendChild(elevatordiv);
    
    let elevator = new Elevator(i, elevatordiv);
    elevators.push(elevator);
}

const building = document.querySelector('#building');
const new_list_of_floors = [];

for (let i = 24; i >= 0; i--) {
    let floorDiv = document.createElement('div');
    floorDiv.classList.add('floor');

    let button = document.createElement('button');
    button.classList.add('metal')
    button.textContent = i;
    floorDiv.appendChild(button);

    let timeDisplay = document.createElement('div');
    timeDisplay.classList.add('time-display');
    floorDiv.appendChild(timeDisplay);

    building.appendChild(floorDiv);

    let floor = new Floor(i, floorDiv, i * 117);
    button.onclick = () => floor.onclicka();
    new_list_of_floors.push(floor);
}

console.log(new_list_of_floors)







