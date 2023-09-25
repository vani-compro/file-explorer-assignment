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

function createIcon(classToBeAdded, id=''){
  const icon = document.createElement('i');
  icon.classList.add('fa-solid');
  icon.classList.add(classToBeAdded);
  if (classToBeAdded === 'fa-angle-right'){
    icon.classList.add('arrows-'+id);
  }
  return icon;
}

function checkEmpty(inputValue, what, inputForm){
  if (!inputValue){
    inputForm.classList.add('redForm');
    setTimeout(function(){
      inputForm.classList.remove('redForm');
    }, 1000);
    inputForm.title = 'Please add a name.';
    return false;
  }
  return true;
}

function checkExtension(inputValue, inputForm){
  // let lastFiveChar = inputValue.slice(-5);
  let ext='';
  for(let i = 0; i < inputValue.length; i++){
    if(inputValue[i] === '.'){
      ext = inputValue.slice(i);
      break;
    }
  }
  if (ext==='.html' || ext==='.htm' || ext==='.txt' || ext==='.js' || ext ==='.css'){
    return ext;
  }else{
    inputForm.classList.add('redForm');
    setTimeout(function(){
      inputForm.classList.remove('redForm');
    }, 1000);
    if(ext==='')
      inputForm.title = 'Please add an extension.';
    else
      inputForm.title = 'Please add a valid extension.';
    return false;
  }
}

function checkSpecialCharacters(inputValue, inputForm){
  for (let i = 0 ; i < inputValue.length; i++){
    // console.log(inputValue.charCodeAt(i));
    let letter = inputValue.charCodeAt(i);
    if((letter >= 48 && letter <= 57) || (letter >= 65 && letter <= 90) || (letter >= 97 && letter <= 122) || letter===45 || letter ===95 || letter===46){
    }else{
      inputForm.classList.add('redForm');
      setTimeout(function(){
        inputForm.classList.remove('redForm');
      }, 1000);
      inputForm.title = 'Please enter a valid name.';
      return false;
    }
  }
  return true;
}
function getFileTypeIcon(fileType){
  switch (fileType){
    case '.html':
    case '.htm':
      return "fa-html5";
    case '.css':
      return "fa-css3-alt";
    case '.js':
      return "fa-square-js";
  }
}

function checkSimilarFileName(inputValue, location, inputForm, what){
  let check = false;
  if(what==='files'){
    let ext='';
    for(let i = 0; i < inputValue.length; i++){
      if(inputValue[i] === '.'){
        ext = inputValue.slice(i);
        break;
      }
    }
    if (ext==='.html'){
      let fileName = inputValue.slice(0, -5);
      if (location.files.includes(fileName+'.htm')){
        check = true;
      }
    }else if(ext==='.htm'){
      let fileName = inputValue.slice(0, -4);
      if (location.files.includes(fileName+'.html')){
        check = true;
      }
    }
    if(!check){
      check = location.files.includes(inputValue);
    }
  }else{
    for(let i of location.folders){
      if(inputValue === Object.keys(i)[0]){
        check = true;
        break;
      }
    }
  }
  if(check){
    inputForm.classList.add('redForm');
    setTimeout(function(){
      inputForm.classList.remove('redForm');
    }, 1000);
    inputForm.title = 'Please enter a different name.';
  }
  return check;
}

cancelIconClicked = function(what, event){
  console.log(event);
  const li = event.target.parentElement;
  console.log(li);
  const correspondingUl = li.nextSibling;
  if(what==='folder' && correspondingUl)
    correspondingUl.remove();
  li.remove();
}
function addFile(location, listId){

  checkButtonClicked(listId);

  const ul = document.querySelector('#ul'+listId);

  const li = document.createElement('li');

  const fileIcon = createIcon('fa-file');

  const fileNameForm = document.createElement('form');
  fileNameForm.name='inputForm';
  const textbox = document.createElement('input');
  textbox.type='text';
  textbox.placeholder='file name';
  const submitFileNameBtn =  document.createElement('input');
  submitFileNameBtn.type='submit';
  submitFileNameBtn.value='Add';
  fileNameForm.appendChild(textbox);
  fileNameForm.appendChild(submitFileNameBtn);
  fileNameForm.style.display='inline';
  fileNameForm.classList.add('NotoSans');
  const cancelIcon = createIcon('fa-xmark');
  cancelIcon.classList.add('cancel-icon');
  cancelIcon.addEventListener('click', function(event){
    cancelIconClicked('file', event);
  });

  li.appendChild(fileIcon);
  li.appendChild(fileNameForm);
  li.appendChild(cancelIcon);
  li.classList.add('hov');
  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const inputValue = textbox.value;

    const checkEmptyFile = checkEmpty(inputValue, 'file', textbox);
    const fileType = checkExtension(inputValue, textbox);
    const checkSplCharacters = checkSpecialCharacters(inputValue, textbox);
    const checkSimilarName = checkSimilarFileName(inputValue, location, textbox, 'files');

    if (checkEmptyFile && checkSplCharacters && fileType && !checkSimilarName){
      const fileTypeIcon = getFileTypeIcon(fileType);
      let textnode = document.createTextNode(inputValue);
      let textSpan = document.createElement('span');
      textSpan.appendChild(textnode);
      textSpan.title=inputValue;
      fileIcon.className='';
      if(fileType==='.txt'){
        fileIcon.classList.add('fa-regular', 'fa-file');
      }else{
        fileIcon.classList.add('fa-brands', fileTypeIcon);
      }

      li.removeChild(cancelIcon);
      li.appendChild(textSpan);

      const deleteIcon = createIcon('fa-trash');
      deleteIcon.classList.add('cancel-icon');
      li.appendChild(deleteIcon);
      deleteIcon.addEventListener('click', function(event){
        cancelIconClicked('file', event);
      });
      fileNameForm.style.display = 'none';
      location['files'].push(`${inputValue}`);
    }

  });
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
  textbox.placeholder='folder name';
  const submitFileNameBtn =  document.createElement('input');
  submitFileNameBtn.type='submit';
  submitFileNameBtn.value='Add';
  fileNameForm.classList.add('NotoSans');

  fileNameForm.appendChild(textbox);
  fileNameForm.appendChild(submitFileNameBtn);
  fileNameForm.style.display='inline';

  const cancelIcon = createIcon('fa-xmark');
  cancelIcon.classList.add('cancel-icon');
  cancelIcon.addEventListener('click', function(event){
    cancelIconClicked('folder', event);
  });


  li.appendChild(folderIcon);
  li.appendChild(fileNameForm);
  li.appendChild(cancelIcon);
  li.classList.add('hov');
  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const inputValue = textbox.value;
    const checkEmptyFolder = checkEmpty(inputValue, 'folder', textbox);
    const checkSplCharacters = checkSpecialCharacters(inputValue, textbox);
    const checkSimilarName = checkSimilarFileName(inputValue, location, textbox, 'folders');


    if(checkEmptyFolder && checkSplCharacters && !checkSimilarName){
      const folderListBtn = document.createElement('button');

      let textnode = document.createTextNode(inputValue);
      let textSpan = document.createElement('span');
      textSpan.appendChild(textnode);
      textSpan.title=inputValue;

      const createFileIcon = createIcon('fa-file-circle-plus');

      const createFolderIcon = createIcon('fa-folder-plus');

      folderListBtn.appendChild(arrow);
      folderListBtn.appendChild(folderIcon);
      folderListBtn.appendChild(textSpan);
      folderListBtn.classList.add('NotoSans');
      li.removeChild(cancelIcon);
      li.appendChild(folderListBtn);
      li.appendChild(createFileIcon);
      li.appendChild(createFolderIcon);
      const deleteIcon = createIcon('fa-trash');
      deleteIcon.classList.add('cancel-icon');
      li.appendChild(deleteIcon);
      deleteIcon.addEventListener('click', function(event){
        cancelIconClicked('folder', event);
      });
      const childUl = document.createElement('ul');
      childUl.setAttribute('id', 'ul'+listId);
      ul.appendChild(childUl); // li->doc

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

      console.log(file_structure);
    }
  });
}
