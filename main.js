const canvas=document.getElementById("myCanvas")
canvas.width=200

const contex=canvas.getContext("2d")
const car=new Car(100,100,30,50)
car.draw(contex)

animate();

function animate(){
    car.update();
    canvas.height=window.innerHeight
    car.draw(contex)
    requestAnimationFrame(animate)
}