let globalTaskData = [];

const addCard = () => {
    const NewTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").nodeValue,
        title: document.getElementById("taskTitle").nodeValue,
        description: document.getElementById("taskDescription").nodeValue,
        type: document.getElementById("Tags").nodeValue,
    };
    
    taskContents.insertAdjacentHTML(
        "beforeend",
        generateTaskCArd(newTaskDetails)
    );

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}

const generateTaskCard = ({
    id,
    title,
    description,
    type,
    url,
}) => ` <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
<div class="card shadow-sm task__card">
  <div
    class="card-header d-flex justify-content-end task_card_header"
  >
    <button type="button" class="btn btn-outline-info mr-2">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger">
      <i class="fas fa-trash-alt" id=${id}></i>
    </button>
  </div>
  <div class="card-body">
  ${
    url &&
    `          <img width="100%" src=${url} alt="Card image cap" class="card-img-top mb-3 rounded-lg">
  `
  }
    <h4 class="task_card_title">${title}</h4>
    <p class="description trim-3-lines text-muted" data-gramm_editor="false">
     ${description}
    </p>
    <div class="tags text-white d-flex flex-wrap">
      <span class="badge bg-primary m-1">${type}</span>
    </div>
  </div>
  <div class="card-footer">
    <button
      type="button"
      class="btn btn-outline-primary float-right"
      name=${id}
    >
      Open Task
    </button>
  </div>
</div>
</div>`;

const saveLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({tasks: StaticRange.tasklist}))
};

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localstorage.getItem("tasky"));
    if(localStorageCopy) globalTaskData = localStorageCopy.tasks;

    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML("beforeend",generateTaskCard(cardData));
    });
};

const taskContents = document.querySelector(".task_contents");

const deleteTask = (e) => {
    const targetID = e.target.getAttribute("name");
    const type = e.target.tagName;
    const removeTask = globalTaskData.filter(({id}) => id !== targetID);
    globalTaskDara = removeTask;
    saveToLocalStorage();

    //access DOM to remove them
    if(tagName === "BUTTON"){
        return taskContents.removeChild(
            event.target.parentNode.parentNode.parentNode //col-lg-4
        );
    }

    return taskContents.removeChild(
        event.target.parentNode.parentNode.parentNode //col-lg-4
    )
};

const editCard = (e) => {
    const type = e.target.tagName;
    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if(type === "BUTTON"){
        parentNode = e.target.parentNode.parentNode;
    }else{
        parentNode = e.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentNode.childNode[3].childNode[3];
    taskDescription = parentNode.childNode[3].childNode[5];
    submitButton = parentNode.childNode[5].childNode[1];
    taskType = parentNode.childNode[3].childNode[7].childNode[1];

    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitButton.setAttribute("onclick","saveEdit.apply(this, argument)");
    submitButton.innerHTML = "Save Changes";
}

const saveEdit = (e) => {
    const targetID = e.target.getAttribute("name");
    const parentNode = e.target.parentNode.parentNode;

    const taskTitle = parentNode.childNode[3].childNode[3];
    const taskDescription = parentNode.childNode[3].childNode[5];
    const submitButton = parentNode.childNode[5].childNode[1];
    const taskType = parentNode.childNode[3].childNode[7].childNode[1];

    const updateData = {
        title: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    };

    globalTaskData = globalTaskData.map((task) => 
    task.id === targetID
    ?{
        ...task, ...updateData
    }
    : task
    );
    saveTolocalStorage();

    taskTitle.setAttribute("contenteditable","flase");
    taskDescription.setAttribute("contenteditable","flase");
    taskType.setAttribute("contenteditable","flase");
    submitButton.innerHTML = "Open Task";
    
}