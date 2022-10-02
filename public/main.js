let tasksContainer = document.querySelector('.tasks-container') ;
let submitBtn = document.querySelector('#submit-btn')
let  taskInput=document.getElementById('task-input') ;
let  submitMsg = document.getElementById('submit-msg') ;


// load the tasks
const showTasks = async() => {
    try {
    const {
        data:{tasks} ,
        } = await axios.get('/api/v1/tasks') 
    
    if(tasks.length < 1 ){
        return tasksContainer.innerHTML = `
        
        <h5> No tasks yet <i class="fa-regular fa-face-smile"></i>...</h5>` ;
    }
    const allTasks = tasks.map((task)=> {
        const {completed,_id:taskID,name} = task ;
        return `<div class="task"> 
        <div style ="display:flex ; align-items:center ; gap:5px">
            <input type="checkbox" class="completed-checkbox checked-${completed}" data-id="${taskID}" ${completed ? "checked":""}>
            <span class="completed-${completed}">${name} </span>
        </div>
        
        <div class="task-links">
            
                <a href="task.html?id=${taskID}" class="edit-link">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 576 512">
                    <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                        <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
                    </svg>
                </a>
            

                <!-- delete btn  -->

                <button type="button" class="delete-btn" data-id="${taskID}">
                    <svg class="delete-btn" data-id="${taskID}" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512">
                    <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
                    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
                </svg>
                </button>
            
        </div>   
    </div> `
    }).join('') 
    tasksContainer.innerHTML = allTasks ;
        

    }catch(error) { 
        tasksContainer.innerHTML =  '<h5 style="font-size:1.3rem ; color:#FF6347 ;"> there is an error please try later... </h5>' ;
    }
    

} 

showTasks() ;

// delete Task from api/v1/tasks/:id

tasksContainer.addEventListener('click', async (e) => {
    
    const el =e.target
    if(el.parentElement.classList.contains('delete-btn')){
        const id= el.parentElement.dataset.id ;

        try{
            await axios.delete(`/api/v1/tasks/${id}`) ;
            showTasks()

        }catch(error){
            console.log(error)
        }
    }
    
})

// form 
submitBtn.addEventListener('click',async (e) => {
    e.preventDefault();
    const name = taskInput.value 
    try {
    if(name === "") {
        submitMsg.innerHTML= 'please enter a task';
        taskInput.focus()
        
    }else {
        await axios.post('api/v1/tasks',{name})
        showTasks()
        taskInput.value ="" ;
        submitMsg.innerHTML='success, task added';
        submitMsg.classList.add('succes-text')
    }
    }catch(error) {
        submitMsg.innerHTML= 'error, please try again';
        taskInput.value="" ;
    }
    setTimeout(()=>{
        submitMsg.innerHTML =''
        submitMsg.classList.remove('success-text')

    },2000)
})


// edit a task using checkbox


tasksContainer.addEventListener('click',async (e)=> {
    // checking the check box
    let el = e.target 
    if(el.classList.contains('completed-checkbox')){
            
        const id = el.dataset.id ;
        const completed = el.checked 
        try {
            await axios.patch(`/api/v1/tasks/${id}`,{completed})       
            showTasks()
            
        } catch (error) {
            console.log({status:"error" , msg:error })
        }
            
    }
    
})
