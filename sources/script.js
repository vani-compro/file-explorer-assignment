
const file_structure = {
  files: [],
  folders: []
}

//to set a default setting of all closed folders to file structure
const files_list = document.querySelectorAll("ul");
for (let ind2 of files_list){
  ind2.style.display = "none";
  // ind2.style.visibility = "hidden";
}

function buttonClicked(id){
  console.log(id + ' button clicked,');
  let iEle = document.querySelector('.arrows-' + id);
  iEle.classList.toggle('fa-angle-right');
  iEle.classList.toggle("fa-angle-down");

  let ulEle = document.querySelector('ul');
  if (iEle.classList.contains('fa-angle-right')){
    ulEle.style.display = "none";
  }else{
    ulEle.style.display = "block";
    ulEle.style.visibility = "visible";
  }
}
function addFile(num){
  // const fileId = 'file' + num
  if(num === -1){
    const i = document.createElement("i");
    i.classList.add('fa-solid');
    i.classList.add('fa-file');
    // i.classList.add('arrows');

    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type='text';

    const submitBtn = document.createElement('input');
    submitBtn.type='submit';
    submitBtn.value='Submit';

    form.appendChild(input);
    form.appendChild(submitBtn);

    let inputValue = '';

    // adding files to file structure
    file_structure.files.push(inputValue);

    const node = document.createElement('li');
    let textnode = '';
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      inputValue = input.value;

      textnode = document.createTextNode(inputValue);
      node.appendChild(textnode);
      form.style.display = 'none';
    });
    node.appendChild(i);
    node.appendChild(form);

    document.querySelector('#main-list').appendChild(node);
    console.log(file_structure);
  }else{

  }
}

function addFolder(num){
  const randomNumber = Math.floor(Math.random()*10000)+1;
  if(num === -1){
    const folderId = 'folder' + (num+1) + '-' + randomNumber;

    const iArrow = document.createElement('i');
    iArrow.classList.add('fa-solid');
    iArrow.classList.add('fa-angle-right');

    const iFolder = document.createElement("i");
    iFolder.classList.add('fa-solid');
    iFolder.classList.add('fa-folder');
    // i.classList.add('arrows');

    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type='text';

    const submitBtn = document.createElement('input');
    submitBtn.type='submit';
    submitBtn.value='Submit';

    form.appendChild(input);
    form.appendChild(submitBtn);

    let inputValue = '';

    // const addFileBtn
    const iFile = document.createElement('i');
    const addFileBtn = document.createElement('button');
    addFileBtn.appendChild(iFile);
    iFile.setAttribute('class', 'fa-solid fa-file-circle-plus');

    // <i class="fa-solid fa-file-circle-plus"></i>

    const iFolder2 = document.createElement('i');
    const addFolder2Btn = document.createElement('button');
    addFolder2Btn.appendChild(iFolder2);
    iFolder2.setAttribute('class', 'fa-solid fa-folder-plus');

    addFileBtn.style.position='absolute';
    addFolder2Btn.style.position='absolute';
    addFileBtn.style.right='37rem';
    addFolder2Btn.style.right='35rem';
    const nodeBtn = document.createElement('button');
    nodeBtn.addEventListener('click', buttonClicked);
    const node = document.createElement('li');
    // node.style.display='block';
    let textnode = '';
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      inputValue = input.value;

      console.log(typeof inputValue);
      // inputValue += ': []';
      const inputObject = Object.assign(inputValue, []);
      // inputValue = JSON.parse(inputValue);
      file_structure.folders.push(inputObject);
      console.log(file_structure.folders);

      textnode = document.createTextNode(inputValue);
      nodeBtn.appendChild(textnode);

      nodeBtn.appendChild(addFileBtn);
      nodeBtn.appendChild(addFolder2Btn);
      
      // node.style.display='block';
      form.style.display = 'none';
      // iFile.style.marginLeft='16.2rem';
    });
     // adding files to file structure
    //  inputValue = JSON.parse(inputValue);




    nodeBtn.appendChild(iArrow);
    nodeBtn.appendChild(iFolder);
    nodeBtn.appendChild(form);
    node.appendChild(nodeBtn);
    // nodeBtn.setAttribute('id', )
    // node.style.display='inline-block';

        // node.setAttribute('id', '1-1-btn');
    document.querySelector('#main-list').style.display='block';
    document.querySelector('#main-list').appendChild(node);


    // node.addEventListener('click', folderBtn());
    console.log(file_structure);
  }else{

  }
}

function folderBtn(){
  console.log('folderBtn clicked');

}
