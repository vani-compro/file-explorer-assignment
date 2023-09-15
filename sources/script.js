const file_structure = {
  files: [],
  folders: []
}

function buttonClicked(id){
  //arrow down
  let arrow = document.querySelector('.arrows-'+id);
  arrow.classList.toggle('fa-angle-right');
  arrow.classList.toggle('fa-angle-down');
  const childUl = document.querySelector('#ul'+id);
  childUl.style.marginLeft='1rem';

  if(arrow.classList.contains('fa-angle-right')){
    childUl.style.display='none';
  }else{
    childUl.style.display='block';
  }
}

function checkButtonClicked(id){
  let arrow = document.querySelector('.arrows-'+id);
  if (arrow.classList.contains('fa-angle-right')){
    buttonClicked(id);
  }
}

function addFile(location, listId){

  checkButtonClicked(listId);

  const ul = document.querySelector('#ul'+listId);

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
  fileNameForm.classList.add('NotoSans');

  li.appendChild(fileIcon);
  li.appendChild(fileNameForm);
  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const inputValue = textbox.value;

    let textnode = document.createTextNode(inputValue);
    li.appendChild(textnode);
    fileNameForm.style.display = 'none';
    location['files'].push(`${inputValue}`);
  });
}

function createIcon(classToBeAdded, id=''){
  const icon = document.createElement('i');
  icon.classList.add('fa-solid');
  icon.classList.add(classToBeAdded);
  if (classToBeAdded === 'fa-angle-right'){
    icon.classList.add('arrows-'+id);
  }
  return icon;
}

function addFolder(location, listId){

  checkButtonClicked(listId);

  const ul = document.querySelector('#ul'+listId);
  const li = document.createElement('li');
  listId = Math.ceil(Math.random()*10000);
  li.setAttribute('id', listId);

  // creating an arrow btn
  const arrow = createIcon('fa-angle-right', listId);

  const folderIcon = createIcon('fa-folder');

  const fileNameForm = document.createElement('form');
  fileNameForm.name='inputForm';
  const textbox = document.createElement('input');
  textbox.type='text';
  const submitFileNameBtn =  document.createElement('input');
  submitFileNameBtn.type='submit';
  submitFileNameBtn.value='Add';
  fileNameForm.classList.add('NotoSans');

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

    const createFileIcon = createIcon('fa-file-circle-plus');

    const createFolderIcon = createIcon('fa-folder-plus');

    folderListBtn.appendChild(arrow);
    folderListBtn.appendChild(folderIcon);
    folderListBtn.appendChild(textnode);
    folderListBtn.classList.add('NotoSans');
    li.appendChild(folderListBtn);
    li.appendChild(createFileIcon);
    li.appendChild(createFolderIcon);
    const childUl = document.createElement('ul');
    childUl.setAttribute('id', 'ul'+listId);

    li.appendChild(childUl);

    folderListBtn.addEventListener('click', function(){
      buttonClicked(listId);
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
