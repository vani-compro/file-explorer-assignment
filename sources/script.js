const file_structure = {
  files: [],
  folders: []
}

function buttonClicked(id, level){
  console.log('btn clicked for: ' + id);

  //createUL
  const btn = event.target;
  // console.log(event.target.children.contains(ul));
  let ul = document.querySelector('#'+id+'-ul');
  if (btn.contains(ul)){
  }else{
    ul = createUl(btn, id);
  }

  for(let i = 1; i <= level+1; i++){
    ul.style.marginLeft = `${(i+1)}rem`
  }
  //arrow down
  let arrow = document.querySelector('.arrows-'+id);
  arrow.classList.toggle('fa-angle-right');
  arrow.classList.toggle('fa-angle-down');
  if(arrow.classList.contains('fa-angle-right')){
    ul.style.display='none';
    ul.style.visibility='hidden';
  }else{
    ul.style.display='block';
  }
}

function createUl(btn, id){
  const ul = document.createElement('ul');
  const ulId = id+'-ul';
  ul.setAttribute('id', ulId);
  const thisSection = document.querySelector('#btn-0-section');
  thisSection.appendChild(ul);
  return ul;
}

function addFile(location, level, id){
  console.log(event);
  event;
  const ul = document.querySelector('#'+id+'-ul');
  const li = document.createElement('li');

  const fileIcon = document.createElement("i");
  fileIcon.classList.add('fa-solid');
  fileIcon.classList.add('fa-file');

  const fileNameForm = document.createElement('form');
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
  ul.appendChild(li);

  //on submit
  fileNameForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const inputValue = textbox.value;
    console.log(inputValue + ' file created under ul with id: ' + id);

    let textnode = document.createTextNode(inputValue);
    li.appendChild(textnode);
    li.classList.add('level'+(level+1));
    fileNameForm.style.display = 'none';

    location.files.push(inputValue);
    console.log(file_structure);
  });
}

function addFolder(location, level, id){
  const ul = document.querySelector('#'+id+'-ul');
  const li = document.createElement('li');

  const arrow = document.createElement('i');
  arrow.classList.add('fa-solid');
  arrow.classList.add('fa-angle-right');
  arrow.classList.add('arrows-btn-'+(level+1));
  console.log(arrow.classList);

  const folderIcon = document.createElement("i");
  folderIcon.classList.add('fa-solid');
  folderIcon.classList.add('fa-folder');

  const fileNameForm = document.createElement('form');
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
    console.log(inputValue + ' folder created under ul with id: ' + id);

    const folderListBtn = document.createElement('button');
    const newBtnId = 'btn-'+(level+1);
    folderListBtn.setAttribute('id', newBtnId);
    folderListBtn.classList.add('level'+(level+1));
    console.log(folderListBtn.getAttribute('id'));

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

    folderListBtn.addEventListener('click', buttonClicked.bind(null, newBtnId, level+1));

    fileNameForm.style.display = 'none';
    folderIcon.style.display='none';


    let obj = {[`${inputValue}`] : {
      'files':[],
      'folders':[]
     }};
    location["folders"].push(obj);

    createFileIcon.addEventListener('click', function(){
      const loc = location['files'];
      console.log(loc);
      addFile(loc, level+1, 'btn-'+(level+1));
    });

    createFolderIcon.addEventListener('click', function(){
      for(let i = 0; i<=10000; i++){
        if (location['folders'][i][`${inputValue}`]){
          const loc = location['folders'][i][`${inputValue}`];
          console.log(loc);
          addFolder(loc, level+1, 'btn-'+(level+1));
          break;
        }
      }
    });

    console.log(file_structure);
    console.log(file_structure['folders'][0][1]);
  });
}