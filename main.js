const canvas=document.getElementById("myCanvas")
canvas.width=200

const contex=canvas.getContext("2d")
const road=new Road(canvas.width/2,canvas.width*0.9)
const car=new Car(road.getLaneCenter(1),100,30,50);
car.draw(contex)

animate();

function animate(){
    car.update();
    canvas.height=window.innerHeight

    contex.save()
    contex.translate(0,-car.y+canvas.height*0.7)

    
    road.draw(contex)
    car.draw(contex)

    contex.restore()
    requestAnimationFrame(animate)
}