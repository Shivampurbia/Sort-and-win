const dragables = document.querySelectorAll('.dragable');
const containers = document.querySelectorAll('.container');

let arr = []




dragables.forEach(dragable=>{
    dragable.addEventListener('dragstart',()=>{
        
        dragable.classList.add('dragging');
        
    })
    dragable.addEventListener('dragend',()=>{
        dragable.classList.remove('dragging');
        var audio = new Audio('card3.mp3');
        audio.play();
        const dragables = document.querySelectorAll('.dragable');
        dragables.forEach(dragable=>{
            
            arr.push(dragable.innerHTML);
            
        })
        if (arr.slice(arr.length-5,arr.length).join() ==='1,2,3,4,5'){
            const result = document.querySelector('.result');
            result.setAttribute("style", "background-color: darkgreen;")
            var audio = new Audio('sorted.mp3');
            audio.play();
            result.innerHTML = 'S o r t e d';
        }else{
            const result = document.querySelector('.result');
            result.setAttribute("style", "background-color: darkred;")
            result.innerHTML = 'U n s o r t e d';
        }

    })
    
})

containers.forEach(container=>{
    container.addEventListener('dragover',(e)=>{
        e.preventDefault(); 
        const afterElement = getDragAfterElement(container, e.clientY)
        const dragable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(dragable)
            
          } else {
            container.insertBefore(dragable, afterElement)
            
           
          }
    })
})

function getDragAfterElement(container,y){
    const draggableElements = [...container.querySelectorAll('.dragable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
