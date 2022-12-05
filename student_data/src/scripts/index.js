

let url="https://test-mfd5.onrender.com/student";
//let url="http://localhost:3000/student";


const getData=async()=>{
    
   let res= await fetch(`${url}`);
    data=await res.json();
    appending(data);
    link=data;
    console.log(data);
}
getData();

//appending(link);


const studentdata=async(event)=>{
     event.preventDefault();
     let form=document.getElementById("form_data");
     let name=form.name;
     let batch=form.batch;
     let section=form.section;
     let eval_score=form.eval_score;
     let image=form.image;

     let students={
        name:name.value,
        batch:batch.value,
        section:section.value,
        eval_score:eval_score.value,
        image:image.value,
     }
     await fetch(url,{
        method:"POST",
        body:JSON.stringify(students),
        headers:{
            "Content-Type":"application/json",
        }
     });
     getData();
     form.reset();
    // appending();
}

const appending=(data)=>{
    let cont=document.getElementById("container");
    cont.innerHTML=null;
     
    data.forEach((el,index)=>{
        let div=document.createElement("div");
        div.setAttribute("class","student");

        let name=document.createElement("p");
        name.innerText=el.name;

        let batch=document.createElement("p");
        batch.innerText=el.batch;

        let sec=document.createElement("p");
        sec.innerText=el.section;

        let score=document.createElement("p");
        score.innerText=el.eval_score;

        let image=document.createElement("img");
        image.src=el.image;

        let remove=document.createElement("button");
        remove.innerText="Remove";
        remove.setAttribute("class","remove_student")
        remove.onclick=()=>{
            removedata(index);
        }

        let update=document.createElement("button");
        update.setAttribute("class","update_score");
        update.innerText="Update";
        update.onclick=()=>{
            updatedata(index);
        }

        div.append(image,name,batch,sec,score,remove,update);
        cont.append(div);
        //console.log(div)

    })
}

const updatedata=async(id)=>{

    let newscore=window.prompt("Enter new Price");
    newscore.setAttribute("class","new_score");
    let data={eval_score: +newscore};

    fetch (`${url}/${id+1}`,{
        method:"PATCH",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
        }
    })
   // window.reload("index.html");

}

const removedata=(id)=>{
 
    fetch(`${url}/${id+1}`,{
        method:"DELETE",
        body:json.stringify()
    })
}

const lowhigh=async()=>{
    //posts?_sort=views&_order=asc

    let res= await fetch(`${url}?_sort=eval_score&_order=asc`);
    data=await res.json();
    appending(data);
    
    console.log(data);
    
}

const highlow=async()=>{


    let res= await fetch(`${url}?_sort=eval_score&_order=desc`);
    data=await res.json();
    appending(data);
    
    console.log(data);
   
}




