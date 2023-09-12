const file_structure = {
  files: [],
  folders: []
}

function buttonClicked(event, id){
  // console.log('buttonclicked() called for level: ' + level + " and event: ");
  console.log(event.target);
  const btn = event.target;
  if (event.target === 'button'){
    console.log('hey, it\'s me');
  }else{
    console.log('im the problem its me!');
  }

  console.log('id: ' + id);
  //arrow down
  let arrow = document.querySelector('.arrows-'+id);
  arrow.classList.toggle('fa-angle-right');
  arrow.classList.toggle('fa-angle-down');
  const childUl = document.querySelector('#ul'+id);
  childUl.style.marginLeft='1rem';

  //line 27-28 if else not required.

  if(!childUl){
  }else{
    if(arrow.classList.contains('fa-angle-right')){
      childUl.style.display='none';
    }else{
      childUl.style.display='block';
    }
  }
}


function addFile(location, listId){
  const parentUl = (event.target.parentElement.parentElement); //parent li
  const ul = parentUl.querySelector('#ul'+listId);

  const li = document.createElement('li');

  const fileIcon = document.createElement("i");
  fileIcon.classList.add('fa-solid');
  fileIcon.classList.add('fa-file');

  const fileNameForm = document.createElement('form');
  fileNameForm.name='inputForm';
  const textbox = document.createElement('input');
  textbox.type='text';
  const submitFileNameBtn =  document.createElement('input');
  submitFileNameBtn.type='submit';
  submitFileNameBtn.value='Add';
  fileNameForm.appendChild(textbox);
  fileNameForm.appendChild(submitFileNameBtn);
  fileNameForm.style.display='inline';
  li.appendChild(fileIcon);
  li.appendChild(fileNameForm);
  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const inputValue = textbox.value;

    let textnode = document.createTextNode(inputValue);
    li.appendChild(textnode);
    // li.classList.add('level'+(level+1));
    fileNameForm.style.display = 'none';
    location['files'].push(`${inputValue}`);
  });
}


function createArrow(id){
  const arrow = document.createElement('i');
  arrow.classList.add('fa-solid');
  arrow.classList.add('fa-angle-right');
  arrow.classList.add('arrows-'+(id));
  return arrow;
}

function addFolder(location, listId){

  const parentUl = (event.target.parentElement); //parent li
  const ul = parentUl.querySelector('ul'); // update this handling

  const li = document.createElement('li');
  listId = Math.ceil(Math.random()*10000);
  li.setAttribute('id', listId);

  // creating an arrow btn
  const arrowIcon = createArrow(listId);

  // const arrow = document.createElement('i');
  // arrow.classList.add('fa-solid');
  // arrow.classList.add('fa-angle-right');
  // arrow.classList.add('arrows-'+(listId));

  const folderIcon = document.createElement("i");
  folderIcon.classList.add('fa-solid');
  folderIcon.classList.add('fa-folder');

  const fileNameForm = document.createElement('form');
  fileNameForm.name='inputForm';
  const textbox = document.createElement('input');
  textbox.type='text';
  const submitFileNameBtn =  document.createElement('input');
  submitFileNameBtn.type='submit';
  submitFileNameBtn.value='Add';

  fileNameForm.appendChild(textbox);
  fileNameForm.appendChild(submitFileNameBtn);
  fileNameForm.style.display='inline';
  li.appendChild(folderIcon);
  li.appendChild(fileNameForm);



  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const inputValue = textbox.value;

    const folderListBtn = document.createElement('button');

    let textnode = document.createTextNode(inputValue);

    const createFileIcon = document.createElement('i');
    createFileIcon.classList.add('fa-solid');
    createFileIcon.classList.add('fa-file-circle-plus');

    const createFolderIcon = document.createElement('i');
    createFolderIcon.classList.add('fa-solid');
    createFolderIcon.classList.add('fa-folder-plus');

    folderListBtn.appendChild(arrow);
    folderListBtn.appendChild(folderIcon);
    folderListBtn.appendChild(textnode);
    li.appendChild(folderListBtn);
    li.appendChild(createFileIcon);
    li.appendChild(createFolderIcon);
    const childUl = document.createElement('ul');
    childUl.setAttribute('id', 'ul'+listId);

    li.appendChild(childUl);

    folderListBtn.addEventListener('click', function(e){
      buttonClicked(e, listId);
    });

    fileNameForm.style.display = 'none';


    let obj = {[`${inputValue}`] : {
      files:[],
      folders:[]
     }};
    location["folders"].push(obj);

    createFileIcon.addEventListener('click', function(e){
      for(let i = 0; i<location['folders'].length; i++){
        if (location['folders'][i][`${inputValue}`]){
          const loc = location['folders'][i][`${inputValue}`];
          addFile(loc, listId);
          break;
        }
      }
    });

    createFolderIcon.addEventListener('click', function(e){
      for(let i = 0; i<location['folders'].length; i++){
        if (location['folders'][i][`${inputValue}`]){
          const loc = location['folders'][i][`${inputValue}`];
          addFolder(loc, listId);
          break;
        }
      }
    });

  });
}
