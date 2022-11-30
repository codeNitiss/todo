

let url="http://localhost:3000/todo";


window.onload=()=>{
    getData();
}

let getData=async()=>{
    let res=await fetch(url);
    res=await res.json();
    appending(res);
}



const addTodo=async()=>{

    let task=document.getElementById("todo").value;

    let todos={
        title:task,
        status:false,
        id:Date.now()+task,
    };

    
    let res=await fetch(url,{
        method:"POST",
        body:JSON.stringify(todos),
        headers:{
            "Content-Type":"application/json",
        },
    });
    getData();

}

let el=(tag)=>{
    return document.createElement(tag);
}


const card=(todo)=>{
    let div=document.createElement("div");
    let h3=el("h3");
    let p=el("p");
    let del=el("button");
    let tog=el("button");

    h3.innerText=todo.title;
    p.innerText=todo.status;
    del.innerText="Delete";
    tog.innerText="Toggle";

    tog.onclick=()=>{
        toggle(todo.id);
    }

    del.onclick=()=>{
        deletetodo(todo.id);
    }

    div.append(h3,p,del,tog);

    return div;
}

const appending=(data)=>{
   let cont=document.getElementById("container");
   cont.innerHTML=null;

   data.forEach((el)=>{
    let todo=card(el);
    cont.append(todo);
   });
}

const toggle=async(id)=>{
     let res=await fetch(`${url}/${id}`);
     res=await res.json();

     let data={status:!res.status};
     
     await fetch(`${url}/${id}`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        },
     });
 
     getData();
}


const deletetodo=async(id)=>{

    await fetch(`${url}/${id}`,{
        method:"DELETE",
    });

    getData();
}
