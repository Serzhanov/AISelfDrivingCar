const carCanvas=document.getElementById("carCanvas")
carCanvas.width=500
const networkCanvas=document.getElementById("networkCanvas")
networkCanvas.width=500



const carContex=carCanvas.getContext("2d")
const networkContex=networkCanvas.getContext("2d")
const road=new Road(carCanvas.width/2,carCanvas.width*0.9)
//const car=new Car(road.getLaneCenter(1),100,30,50,'AI',2);
const cars=generateCars(100)

let bestCar=cars[0];


if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain")
        )
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1)
        }
    }
}
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,'DUMMY',1),
    new Car(road.getLaneCenter(0),-300,30,50,'DUMMY',1),
    new Car(road.getLaneCenter(2),-300,30,50,'DUMMY',1),
    new Car(road.getLaneCenter(3),-500,30,50,'DUMMY',1.5),
    new Car(road.getLaneCenter(1),-250,30,50,'DUMMY',1.5),
    new Car(road.getLaneCenter(4),-150,30,50,'DUMMY',1)
]

animate();

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain))
}

function discard(){
    localStorage.removeItem("bestBrain")
}

function generateCars(N){
    const cars=[]
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,'AI',2))
    }
    console.log("returning",cars)
    return cars
}

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[])
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic)
    }
    //car.update(road.borders,traffic);
    carCanvas.height=window.innerHeight
    networkCanvas.height=window.innerHeight
    
   
    carContex.save()
    carContex.translate(0,-bestCar.y+carCanvas.height*0.7)
    
    road.draw(carContex)

    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carContex,"red")
    }
    carContex.globalAlpha=0.2
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carContex,"green")
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));
    
    //car.draw(carContex,"green")
    carContex.globalAlpha=1
    console.log(bestCar)
    bestCar.draw(carContex,"green",true)
    carContex.restore()
    Visualizer.drawNetwork(networkContex,bestCar.brain)
    requestAnimationFrame(animate)
}