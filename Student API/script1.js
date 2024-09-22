const table = document.querySelector('table');
const url = 'https://gsmktg.azurewebsites.net/api/v1/techlabs/test/students';


async function getData(url){
    let response=await fetch(url);
    if(!response.ok)
    {
        throw new Error(`HTTP error! Status : ${response.status}`);
    }
    let data=await response.json();
    return data;

    
};
getData(url).then((data)=>{
    console.log(data); 
    console.log(data.length);
    document.querySelector('.total').innerHTML=`Total Records Found ${data.length}`;
    
    data.sort((a, b) => a.rollNo - b.rollNo);
    data.map(
        function(student) {
            let tr = document.createElement('tr');
            tr.setAttribute('data-rollno', student.rollNo);
            let td1 = document.createElement('td');
            td1.classList.add("studrollno");
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let editbutton=document.createElement('button');
            editbutton.textContent="edit";
            editbutton.classList.add("btn","btn-success");
            editbutton.style.marginRight="3px";
            let deletebutton=document.createElement('button');
            deletebutton.textContent="delete";
            deletebutton.classList.add("btn","btn-danger");
            deletebutton.onclick = () => deleteStudent(student.rollNo);

            td1.innerHTML = `${student.rollNo}`;
            td2.innerHTML = `${student.name}`;
            td3.innerHTML = `${student.age}`;
            td4.innerHTML = `${student.email}`;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(editbutton);
            editbutton.onclick = () => editStudent(student);
            tr.appendChild(deletebutton);
            table.appendChild(tr);
        })
}).catch((err)=>{
    console.log("Caught in outer catch : "+err);
});




async function deleteStudent(rollNo) {
    try {
        const response = fetch(`${url}/${rollNo}`, {
            method: "DELETE"
        });        
        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.status}`);
        }
 
        removeUserFromTable(rollNo);               
        alert("User deleted successfully");
 
        console.log(`User with ID ${rollNo} deleted successfully`);
    } catch (error) {
        console.error("Delete error: ", error);
    }
  };

  const removeUserFromTable = (rollNo) => {
    const rowToDelete = document.querySelector(`tr[data-rollno="${rollNo}"]`);
    console.log(rowToDelete);
    
    if (rowToDelete) {
     // console.log(rollNo);

        rowToDelete.remove();
    }
};




let form=document.getElementById('form');  
form.addEventListener('submit', function(e){  
    e.preventDefault()  
    let name = document.getElementById('name').value  
    let age = document.getElementById('age').value  
    let email = document.getElementById('email').value 
    let rollNo = document.getElementById('rollNo').value 
        fetch(url, {  
            method: 'POST', 
            body: JSON.stringify({  
                rollNo:rollNo,
                name: name,  
                age: age,  
                email:email,
            }),  
            headers: {  
                'Content-type': 'application/json; charset=UTF-8',  
            }  
        })  
        .then(function(response)
        {   
            return response.json()
        })  
        .then(function(datas)  
        {  
            console.log(datas)
            alert("Data Saved Successfully!!");  
            getData(url);
            document.getElementById('name').value  
            document.getElementById('age').value  
            document.getElementById('email').value 
            document.getElementById('rollNo').value 
        })
        .catch(error => console.error('SEE Error:', error));   
}); 


function editStudent(student) {
    document.getElementById('rollNo').value = student.rollNo;
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('email').value = student.email;
  }

    document.querySelector('#Save').onclick = async () => {
        const rollNo = document.getElementById('rollNo').value;
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value, 10);
        const email = document.getElementById('email').value;
    
        try {
          const response = await fetch(`${url}/${rollNo}`, {
            method: 'PUT',
            headers: {  
                'Content-type': 'application/json; charset=UTF-8',  
            } ,
            body: JSON.stringify({ 
                rollNo:rollNo,
                name: name,  
                age: age,  
                email:email,
            })
          });
          console.log('Response status:', response.status);
    
          if (!response.ok) {
            throw new Error(`Failed to update user: ${response.status}`);
          }
    
          const row = document.querySelector(`tr[data-rollno="${rollNo}"]`);
          row.children[1].textContent = name;
          row.children[2].textContent = age;
          row.children[3].textContent = email;
    
          alert("Data Updated Successfully!");
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };
  



         