const file_structure = {
  files: [],
  folders: []
}

// //to set a default setting of all closed folders to file structure
// const files_list = document.querySelectorAll("ul");
// for (let ind2 of files_list){
//   ind2.style.display = "none";
//   // ind2.style.visibility = "hidden";
// }

// function buttonClicked(id){
//   console.log('button clicked -> '+id + ' button clicked,');
//   let iEle = document.querySelector('.arrows-' + id);
//   iEle.classList.toggle('fa-angle-right');
//   iEle.classList.toggle("fa-angle-down");
// }

// function createUl(num, id){
//   var ul = document.createElement('ul');
//   ul.setAttribute('id', 'list-'+num);
//     document.querySelector('article').appendChild(ul);

//   let ulEle = document.querySelector('ul');
//   let iEle = document.querySelector('.arrows-' + id);
//   if (iEle.classList.contains('fa-angle-right')){
//     ulEle.style.display = "none";
//   }else{
//     ulEle.style.display = "block";
//     ulEle.style.visibility = "visible";
//   }
// }

// function addFile(whereToPush, num, id){
//   if(document.querySelector('#'+'list-'+num) === null){
//     console.log('ul created in addFile ' + num);
//     createUl(num, id);
//   }
//     const i = document.createElement("i");
//     i.classList.add('fa-solid');
//     i.classList.add('fa-file');

//     const form = document.createElement('form');
//     form.style.display='inline-block';

//     const input = document.createElement('input');
//     input.type='text';

//     const submitBtn = document.createElement('input');
//     submitBtn.type='submit';
//     submitBtn.value='Submit';

//     form.appendChild(input);
//     form.appendChild(submitBtn);

    // let inputValue = '';

    // const node = document.createElement('li');
    // let textnode = '';
    // form.addEventListener('submit', function(event) {
    //   event.preventDefault(); // Prevent the default form submission behavior

    //   inputValue = input.value;

    //   textnode = document.createTextNode(inputValue);
    //   node.appendChild(textnode);
    //   form.style.display = 'none';

    //   // adding files to file structure
    //   whereToPush.files.push(inputValue);
    // });
    // node.appendChild(i);
    // node.appendChild(form);

    // document.querySelector('#list-'+num).appendChild(node);
    // console.log('file_structure in file called -> ' + file_structure);
    // }

// function addFolder(whereToPush, num, id){
//   const newFolder = {
//     files : [],
//     folders : []
//   };
//   whereToPush.folders.push(newFolder);

//   console.log('add folder called: ' + num);
//   if(document.querySelector('#'+'list-'+num) === null){
//     console.log('ul created in addFolder ' + num);
//     createUl(num, id);
//   }
//   const randomNumber = Math.floor(Math.random()*10000)+1;
//     const folderId = 'folder' + num + '-' + randomNumber;

//     const iArrow = document.createElement('i');
//     iArrow.classList.add('fa-solid');
//     iArrow.classList.add('fa-angle-right');

//     const iFolder = document.createElement("i");
//     iFolder.classList.add('fa-solid');
//     iFolder.classList.add('fa-folder');

//     const form = document.createElement('form');
//     form.style.display='inline-block';
//     const input = document.createElement('input');
//     input.type='text';

//     const submitBtn = document.createElement('input');
//     submitBtn.type='submit';
//     submitBtn.value='Submit';

//     form.appendChild(input);
//     form.appendChild(submitBtn);

//     let inputValue = '';

//     const iFilebtn = document.createElement('button');
//     const iFile = document.createElement('i');
//     iFile.setAttribute('class', 'fa-solid fa-file-circle-plus');
//     iFilebtn.style.position='absolute';
//     iFilebtn.appendChild(iFile);

//     const iFolder2btn = document.createElement('button');
//     const iFolder2 = document.createElement('i');
//     iFolder2.setAttribute('class', 'fa-solid fa-folder-plus');
//     iFolder2btn.style.position='absolute';
//     iFolder2btn.appendChild(iFolder2);

//     iFilebtn.style.right='37rem';
//     iFolder2btn.style.right='35rem';

//     const node = document.createElement('li');
//     const nodeBtn = document.createElement('button');
//     let textnode = '';
//     form.addEventListener('submit', function(event) {
//       event.preventDefault(); // Prevent the default form submission behavior

//       inputValue = input.value;

//       const inputObject = Object.assign(inputValue, []);
//       newFolder.folders.push(inputObject);
//       whereToPush.folders.push(newFolder);
//       console.log('whereto push\n');
//       console.log(whereToPush);

//       textnode = document.createTextNode(inputValue);
//       nodeBtn.appendChild(textnode);
//       nodeBtn.appendChild(iFilebtn);
//       nodeBtn.appendChild(iFolder2btn);

//       form.style.display = 'none';

//       let id2 =  'btn-' + (num+1);
//       console.log('--------------------------------');
//       console.log('folder submit event\n');
//       console.log(event);
//       iFilebtn.addEventListener('click', addFile.bind(null, newFolder, num+1, id2));
//       iFolder2btn.addEventListener('click', addFolder.bind(null, newFolder, num+1, id2));
//     });


//     nodeBtn.appendChild(iArrow);
//     iArrow.classList.add('arrows-'+'btn-'+(num+1))
//     nodeBtn.appendChild(iFolder);
//     nodeBtn.appendChild(form);
//     nodeBtn.setAttribute('id', 'btn-'+(num+1));
//     nodeBtn.addEventListener('click', function(){
//       buttonClicked('btn-'+(num+1));
//     });
//     node.appendChild(nodeBtn);

//     document.querySelector('#'+'list-'+num).style.display='block';
//     document.querySelector('#'+'list-'+num).appendChild(node);

//     console.log('file structure');
//     console.log(file_structure);
// }

/**------------------------------------------------------**/

function buttonClicked(id, level){
console.log('btn clicked for: ' + id);

  //createUL
  const btn = document.querySelector('#'+id);
  let ul = document.querySelector('#'+id+'-ul');
  if (btn.contains(ul)){
  }else{
    ul = createUl(btn, id);
  }

  for(let i = 0; i <= level; i++){
    ul.style.marginLeft = `${(i+1)}rem`
  }

  //arrow down
  let arrow = document.querySelector('.arrows-'+id);
  arrow.classList.toggle('fa-angle-right');
  arrow.classList.toggle('fa-angle-down');
  if(arrow.classList.contains('fa-angle-right')){
    ul.style.display='none';
  }else{
    ul.style.display='block';
  }
}

function createUl(btn, id){
  const ul = document.createElement('ul');
  // let li = document.createElement('li');
  // const textnode  = document.createTextNode('jjjjjjjj');
  // li.append(textnode);
  // ul.append(li);
  // btn.appendChild(ul);
  const ulId = id+'-ul';
  ul.setAttribute('id', ulId);
  const thisSection = document.querySelector('#btn-0-section');
  thisSection.appendChild(ul);
  return ul;
}

function addFile(location, level, id){
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

  // const folderListBtn = document.createElement('button');
  // folderListBtn.setAttribute('id', 'btn-'+(level+1))

  const arrow = document.createElement('i');
  arrow.classList.add('fa-solid');
  arrow.classList.add('fa-angle-right');
  arrow.classList.add('arrows-btn-'+(level+1));
  console.log(arrow.classList);
  // arrow.setAttribute('id', 'arrows-'+id)

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
  // li.appendChild(arrow);
  li.appendChild(folderIcon);
  li.appendChild(fileNameForm);
  // li.appendChild(folderListBtn);
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
      // const loc = location;

      // addFile(loc, level+1, 'btn-'+(level+1));
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