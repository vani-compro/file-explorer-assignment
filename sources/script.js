const file_structure = {
  files: [],
  folders: []
}

function buttonClicked(event, level, id){
  console.log('buttonclicked() called for level: ' + level + " and event: ");
  console.log(event);
  const btn = event.target;

  const ul = event.target.parentElement.parentElement.parentElement.parentElement;
  console.log('id: ' + id);
  //arrow down
  let arrow = document.querySelector('.arrows-'+id);
  arrow.classList.toggle('fa-angle-right');
  arrow.classList.toggle('fa-angle-down');
  const childUl = ul.querySelector('#ul'+id);
  if(!childUl){
    // console.log('inside button clicked if !childUl for btn: ' + btn);
  }else{
    // console.log('inside button clicked else !childUl for btn: '+btn);
    if(arrow.classList.contains('fa-angle-right')){
      childUl.style.display='none';
    }else{
      childUl.style.display='block';
    }
  }
}

// function createUl(parentUl, level){
//   // console.log('createUl() called on level: ' + level + " and parentUl as: ");
//   // console.log(parentUl);
//   const childUl = document.createElement('ul');
//   parentUl.appendChild(childUl);
//   childUl.setAttribute('id','level'+(level+1));
  // childUl.style.marginLeft='1rem';
//   return childUl;
// }

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>

function addFile(location, level, listId){
  // let ul = null;
  const parentUl = (event.target.parentElement.parentElement);
  const ul = parentUl.querySelector('ul');
  ul.style.marginLeft='1rem';

  // if(!childUl){
  //   // console.log(('working'));
  //   ul = createUl(parentUl, level);
  // }else{
  //   console.log('hi');
  //   ul=childUl;
  // }

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
  submitFileNameBtn.value='Submit';
  fileNameForm.appendChild(textbox);
  fileNameForm.appendChild(submitFileNameBtn);
  fileNameForm.style.display='inline';
  li.appendChild(fileIcon);
  li.appendChild(fileNameForm);
  // let additionToId = Math.ceil(Math.random()*10000);
  // li.setAttribute('id', '0-'+additionToId);
  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const inputValue = textbox.value;
    // console.log(inputValue + ' file created under ul with level: ' + level);

    let textnode = document.createTextNode(inputValue);
    li.appendChild(textnode);
    li.classList.add('level'+(level+1));
    fileNameForm.style.display = 'none';
    // console.log(location);
    location['files'].push(`${inputValue}`);
    // console.log(file_structure);
  });
}

function addFolder(location, level, listId){



  const parentUl = (event.target.parentElement);
  const ul = parentUl.querySelector('ul');
  ul.style.marginLeft='1rem';

  console.log('folder created for level: ' + level);

  const li = document.createElement('li');
  listId = Math.ceil(Math.random()*10000);
  li.setAttribute('id', listId);


  const arrow = document.createElement('i');
  arrow.classList.add('fa-solid');
  arrow.classList.add('fa-angle-right');
  arrow.classList.add('arrows-'+(listId));
  // console.log(arrow.classList);

  const folderIcon = document.createElement("i");
  folderIcon.classList.add('fa-solid');
  folderIcon.classList.add('fa-folder');

  const fileNameForm = document.createElement('form');
  fileNameForm.name='inputForm';
  const textbox = document.createElement('input');
  textbox.type='text';
  const submitFileNameBtn =  document.createElement('input');
  submitFileNameBtn.type='submit';
  submitFileNameBtn.value='Submit';

  fileNameForm.appendChild(textbox);
  fileNameForm.appendChild(submitFileNameBtn);
  fileNameForm.style.display='inline';
  li.appendChild(folderIcon);
  li.appendChild(fileNameForm);



  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const folderIcon2 = document.createElement("i");
    folderIcon2.classList.add('fa-solid');
    folderIcon2.classList.add('fa-folder');

    const inputValue = textbox.value;
    // console.log(inputValue + ' folder created under ul with level: ' + level);

    const folderListBtn = document.createElement('button');
    // folderListBtn.classList.add('level'+(level+1));
    // console.log(folderListBtn.getAttribute('id'));

    let textnode = document.createTextNode(inputValue);

    const createFileIcon = document.createElement('i');
    createFileIcon.classList.add('fa-solid');
    createFileIcon.classList.add('fa-file-circle-plus');

    const createFolderIcon = document.createElement('i');
    createFolderIcon.classList.add('fa-solid');
    createFolderIcon.classList.add('fa-folder-plus');


    folderListBtn.appendChild(arrow);
    folderListBtn.appendChild(folderIcon2);
    folderListBtn.appendChild(textnode);
    li.appendChild(folderListBtn);
    li.appendChild(createFileIcon);
    li.appendChild(createFolderIcon);
    const childUl = document.createElement('ul');
    childUl.setAttribute('id', 'ul'+listId);

    li.appendChild(childUl);

    folderListBtn.addEventListener('click', function(e){
      buttonClicked(e, level+1, listId);
    });

    fileNameForm.style.display = 'none';
    folderIcon.style.display='none';


    let obj = {[`${inputValue}`] : {
      files:[],
      folders:[]
     }};
    location["folders"].push(obj);

    createFileIcon.addEventListener('click', function(e){
      for(let i = 0; i<location['folders'].length; i++){
        if (location['folders'][i][`${inputValue}`]){
          const loc = location['folders'][i][`${inputValue}`];
          addFile(loc, level+1, listId);
          break;
        }
      }
    });

    createFolderIcon.addEventListener('click', function(e){
      for(let i = 0; i<location['folders'].length; i++){
        if (location['folders'][i][`${inputValue}`]){
          const loc = location['folders'][i][`${inputValue}`];
          addFolder(loc, level+1);
          break;
        }
      }
    });

  });
}