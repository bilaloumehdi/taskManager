const back =document.querySelector('.back-task button') ;
let editBtn =document.getElementById('edit') ;
let idInput =document.getElementById('id') ;
let nameInput =document.getElementById('name') ;
let ceckCompleted =document.getElementById('completed') ;
let  submitMsg = document.getElementById('submit-msg') ;

const queryString = window.location.search
const id = new URLSearchParams(queryString).get('id') ;
// get the single task
let showTask = async (e)=> {
    try{
        
        let {
            data: {task}, 
        } = await axios.get(`/api/v1/tasks/${id}`);
        const {_id:taskID , completed,name} =task ;
        
        idInput.value = taskID
        nameInput.value = name
        if(completed) {
            ceckCompleted.checked =true
        }
    }catch(error){
        console.log(error);
        
    }
}
showTask() ;
// edit the links
editBtn.addEventListener('click',async (e)=> {
    e.preventDefault() ;

    try{ 
        const { 
            data:{task}, 
            } = await axios.patch(`/api/v1/tasks/${id}`,{
                name:nameInput.value ,
                completed:ceckCompleted.checked
            })
            
        const {_id:taskID,completed,name} = task ;
        
        idInput.value = taskID ;
        nameInput.value = name ;
        if(completed){
            ceckCompleted.checked = true ;
        }

        submitMsg.innerHTML='success, Task have been edited ';
        submitMsg.classList.add('succes-text')
        
        
    
    }catch(error){
        console.log(error)
        submitMsg.innerHTML='error, please try again';
    }

    
    setTimeout(()=>{
        submitMsg.innerHTML='';
        submitMsg.classList.remove('succes-text')
        
    },2000)
})


back.addEventListener('click',()=> {
    location.href ='index.html'
})
