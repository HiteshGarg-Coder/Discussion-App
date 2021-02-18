let div_right = document.getElementById("right");
let div_left = document.getElementById("leftQuestionData");
let flag = false;
let element_div_collection_response = document.createElement("div");

let localstorage_array = [];

function createQuestionCommentBox(data) {
  console.log(data);
  let div = document.getElementById("right");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  flag = false;

  let element_div_collection_question = document.createElement("div");
  element_div_collection_question.setAttribute("style", "margin-top:40px");

  //question title
  let element_title = document.createElement("h3");
  let element_title_textNode = document.createTextNode("Question");
  element_title.setAttribute("style", "color:#68737F");
  element_title.appendChild(element_title_textNode);

  //textarea for question
  let div_textarea = document.createElement("div");
  div_textarea.setAttribute("style", "width:80%;margin:auto;");
  let div_textarea_inside = document.createElement("div");
  div_textarea_inside.setAttribute("style", "background-color:whitesmoke");
  let h4 = document.createElement("h4");
  h4.appendChild(document.createTextNode(data.subject));
  h4.setAttribute("style", "padding:15px 20px 3px 25px");
  let p = document.createElement("p");
  p.setAttribute("style", "padding:5px 20px 15px 25px");
  p.appendChild(document.createTextNode(data.question));
  let button = document.createElement("button");
  button.appendChild(document.createTextNode("Resolve"));
  button.setAttribute("class", "btn btn-primary");
  button.setAttribute("style", "float:right");

  button.addEventListener("click", (event) => {
    let array_local_storage = JSON.parse(localStorage.getItem("question"));
    console.log(array_local_storage);
    for (let i = 0; i < array_local_storage.length; i++) {
      array_local_storage[i] = JSON.parse(array_local_storage[i]);
      array_local_storage[i].comment = JSON.parse(
        array_local_storage[i].comment
      );
    }
    console.log(array_local_storage);
    let new_arr = [];
    for (let i = 0; i < array_local_storage.length; i++) {
      if (array_local_storage[i].id !== data.id) {
        new_arr.push(array_local_storage[i]);
      }
    }
    console.log(new_arr);
    for (let i = 0; i < new_arr.length; i++) {
      new_arr[i].comment = JSON.stringify(new_arr[i].comment);
      new_arr[i] = JSON.stringify(new_arr[i]);
    }

    localStorage.setItem("question", JSON.stringify(new_arr));
    getData();
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  });

  
  div_textarea_inside.appendChild(h4);
  div_textarea_inside.appendChild(p);
  div_textarea.appendChild(element_title);
  div_textarea.appendChild(div_textarea_inside);
  div_textarea.appendChild(button);

  element_div_collection_question.appendChild(div_textarea);

  element_div_collection_response.setAttribute("style", "margin-top:50px;");
  makeResponseDiv(data);

  let element_add_response = document.createElement("div");
  element_add_response.setAttribute(
    "style",
    "margin-top:50px;margin-bottom:50px"
  );
  let h3_add_response = document.createElement("h3");
  h3_add_response.appendChild(document.createTextNode("Add Response"));
  h3_add_response.setAttribute("style", "color:#68737F;");

  let div_response = document.createElement("div");
  let div_response_inside = document.createElement("div");
  let div_response_outside = document.createElement("div");
  div_response_outside.setAttribute("style", "width:80%;margin:auto");
  let input_response_name = document.createElement("input");
  input_response_name.setAttribute("placeholder", "Enter Name");
  input_response_name.setAttribute("id", "response_input_subject");
  input_response_name.setAttribute(
    "style",
    "outline:0;border:1px solid lightgrey;margin-top:5px;padding:5px 10px"
  );

  let textarea_response = document.createElement("textarea");
  textarea_response.setAttribute("placeholder", "Enter Comment");
  textarea_response.setAttribute(
    "style",
    "outline:0;border:1px solid lightgrey;margin-top:5px;padding:5px 10px;width:100%"
  );
  textarea_response.setAttribute("rows", "5");
  textarea_response.setAttribute("id", "response_textarea_question");

  let button_add_response = document.createElement("button");
  button_add_response.setAttribute("class", "btn btn-primary");
  button_add_response.setAttribute("id", "response_submit");
  button_add_response.setAttribute("style", "float:right");
  button_add_response.appendChild(document.createTextNode("Submit"));

  let blankLine = document.createElement("br");

  div_response_inside.appendChild(input_response_name);
  div_response_inside.appendChild(blankLine);
  div_response_inside.appendChild(textarea_response);

  
  div_response_outside.appendChild(h3_add_response);
  div_response_outside.appendChild(div_response_inside);
  div_response_outside.appendChild(button_add_response);
  
  element_add_response.appendChild(div_response_outside);
  
  div.appendChild(element_div_collection_question);
  div.appendChild(element_div_collection_response);
  div.appendChild(element_add_response);

  button_add_response.addEventListener("click", (event) => {
    let subject = document.getElementById("response_input_subject").value;
    let question = document.getElementById("response_textarea_question").value;
    subject = subject.trim();
    question = question.trim();
    if (subject === "" || question === "") {
      alert("Cannot be empty");
      return;
    }
    const payload = {
      name: subject,
      response: question,
    };
    let data_array_response = JSON.parse(localStorage.getItem("question"));
    for (let i = 0; i < data_array_response.length; i++) {
      data_array_response[i] = JSON.parse(data_array_response[i]);
      data_array_response[i].comment = JSON.parse(
        data_array_response[i].comment
      );
    }
    for (let i = 0; i < data_array_response.length; i++) {
      console.log(data_array_response[i]);
      if (data_array_response[i].id === data.id) {
        data_array_response[i].comment.push(payload);
      }
    }
    for (let i = 0; i < data_array_response.length; i++) {
      data_array_response[i].comment = JSON.stringify(
        data_array_response[i].comment
      );
      data_array_response[i] = JSON.stringify(data_array_response[i]);
    }
    console.log(data_array_response);

    console.log(data_array_response);
    localStorage.setItem("question", JSON.stringify(data_array_response));
    for (let i = 0; i < data_array_response.length; i++) {
      data_array_response[i] = JSON.parse(data_array_response[i]);
    }
    console.log(data_array_response);
    for (let i = 0; i < data_array_response.length; i++) {
      console.log(data_array_response[i]);
      if (data_array_response[i].id === data.id) {
        makeResponseDiv(data_array_response[i]);
      }
    }


    document.getElementById("response_input_subject").value = "";
    document.getElementById("response_textarea_question").value = "";
  });
}

function createDisplayDiv(data) {
  console.log(data);

  let div = document.createElement("div");
  div.setAttribute("id", data.id);
  div.setAttribute("style", "border-bottom:1px solid lightgrey;");
  let element_title = document.createElement("h3");
  element_title.setAttribute(
    "style",
    "padding:15px 20px 3px 20px;color:#47515A"
  );
  let element_title_textNode = document.createTextNode(data.subject);
  element_title.appendChild(element_title_textNode);

  let element_subtitle = document.createElement("h6");
  element_subtitle.setAttribute("style", "padding:0px 20px 15px 20px");
  let element_subtitle_textNode = document.createTextNode(data.question);
  element_subtitle.appendChild(element_subtitle_textNode);

  div.appendChild(element_title);
  div.appendChild(element_subtitle);

  div_left.appendChild(div);

  div.addEventListener("click", function (event) {
    console.log(div.id);
    let data_array_left = JSON.parse(localStorage.getItem("question"));
    for (let i = 0; i < data_array_left.length; i++) {
      data_array_left[i] = JSON.parse(data_array_left[i]);
      console.log(data_array_left[i]);

      if (data_array_left[i].id === div.id) {
        createQuestionCommentBox(data_array_left[i]);
      }
    }
  });
}

function getData() {
  console.log("inside");
  while (div_left.firstChild) {
    div_left.removeChild(div_left.firstChild);
  }
  let data = JSON.parse(localStorage.getItem("question"));
  for (let i = 0; i < data.length; i++) {
    data[i] = JSON.parse(data[i]);
    createDisplayDiv(data[i]);
  }
}
function createNewQuestionForm() {
  console.log("called");
    
    //title
    while (div_right.firstChild) {
      div_right.removeChild(div_right.firstChild);
    }

    let div_newquestion = document.createElement("div");
    div_newquestion.setAttribute("style", "width:80%;margin:auto");
    let div_title = document.createElement("div");
    let element_title = document.createElement("h1");
    let element_title_textNode = document.createTextNode(
      "Welcome to Discussion Portal !"
    );
    element_title.setAttribute("style", "margin-top:50px");
    element_title.appendChild(element_title_textNode);
    div_title.appendChild(element_title);
    
    //sub-title
    let div_subtitle = document.createElement("div");
    let element_subtitle = document.createElement("h6");
    let element_subtitle_textNode = document.createTextNode(
      "Enter a subject and question to get started"
    );
    element_subtitle.setAttribute("style", "");
    element_subtitle.appendChild(element_subtitle_textNode);
    div_subtitle.appendChild(element_subtitle);

    //subject
    let div_subject = document.createElement("div");
    let element_subject = document.createElement("input");
    element_subject.setAttribute(
      "style",
      "margin-top:10px;padding:5px 10px;outline:0;border:1px solid lightgrey;"
    );
    element_subject.setAttribute("placeholder", "Subject");
    element_subject.setAttribute("id", "create_subject");
    div_subject.appendChild(element_subject);

    //Question
    let div_question = document.createElement("div");
    let element_question = document.createElement("textarea");
    element_question.setAttribute(
      "style",
      "margin-top:10px;padding:5px 10px;outline:0;border:1px solid lightgrey;width:100%"
    );
    element_question.setAttribute("rows", "5");
    element_question.setAttribute("placeholder", "Question");
    element_question.setAttribute("id", "create_question");
    div_question.appendChild(element_question);
    let br = document.createElement("br");
    
  
    div_question.appendChild(br);
    
    //submit
    let element_button = document.createElement("button");
    let element_button_textNode = document.createTextNode("Submit");
    element_button.setAttribute("class", "btn btn-primary");
    element_button.setAttribute("style", "margin-left:100px");
    element_button.setAttribute("id", "submit");
    element_button.appendChild(element_button_textNode);
    element_button.setAttribute("style", "float:right");
    div_question.appendChild(element_button);

    div_newquestion.appendChild(div_title);
    div_newquestion.appendChild(div_subtitle);
    div_newquestion.appendChild(div_subject);
    div_newquestion.appendChild(div_question);

    div_right.appendChild(div_newquestion);

    let submit = document.getElementById("submit");

    submit.addEventListener("click", function (event) {
      let subject = document.getElementById("create_subject").value;
      let question = document.getElementById("create_question").value;
      subject = subject.trim();
      question = question.trim();
      if (subject === "" || question === "") {
        alert("cannot be empty");
        return;
      }
      let data = JSON.parse(localStorage.getItem("question"));
      if (data !== null) {
        localstorage_array = data;
      }

      let questionBank = {
        id: Math.random().toString(36).substr(2, 9),
        subject: subject.trim(),
        question: question.trim(),
        comment: JSON.stringify([]),
      };

      localstorage_array.push(JSON.stringify(questionBank));

      localStorage.setItem("question", JSON.stringify(localstorage_array));
      getData();
      while (div_right.firstChild) {
        div_right.removeChild(div_right.firstChild);
      }
    });
}

function search() {
  let search_bar = document.getElementById("search_bar").value;
  console.log(search_bar);
  if (search_bar === "") {
    getData();
    return;
  }

  let local_array = JSON.parse(localStorage.getItem("question"));
  console.log(local_array);

  for (let i = 0; i < local_array.length; i++) {
    local_array[i] = JSON.parse(local_array[i]);
    local_array[i].comment = JSON.parse(local_array[i].comment);
  }
  console.log(local_array);

  let array = [];
  for (let i = 0; i < local_array.length; i++) {
    if (
      local_array[i].subject.includes(search_bar) ||
      local_array[i].question.includes(search_bar)
    ) {
      array.push(local_array[i]);
    }
  }
  makeDivAfterSearch(array);
}

function makeDivAfterSearch(data) {
  console.log(data);
  let div_search = document.createElement("div");
  div_search.setAttribute(
    "style",
    "padding:5px 20px 10px 20px;border-bottom:1px solid lightgrey"
  );

  while (div_left.firstChild) {
    div_left.removeChild(div_left.firstChild);
  }
  console.log(data.length);
  if (data.length === 0) {
    let h3_search_info = document.createElement("h3");
    h3_search_info.appendChild(document.createTextNode("No match found"));
    div_search.appendChild(h3_search_info);
    div_left.appendChild(div_search);
  } else {
    for (let i = 0; i < data.length; i++) {
      createDisplayDiv(data[i]);
    }
  }
}

function makeResponseDiv(data) {
  while (element_div_collection_response.firstChild) {
    element_div_collection_response.removeChild(
      element_div_collection_response.firstChild
    );
  }

  console.log(data);
  let h1_response = document.createElement("h4");
  h1_response.setAttribute("style", "color:#68737F;margin-bottom:30px;");
  h1_response.appendChild(document.createTextNode("Response"));


  let response_div = document.createElement("div");
  response_div.setAttribute("style", "width:80%;margin:auto;");
  response_div.appendChild(h1_response);

  data.comment = JSON.parse(data.comment);
  console.log(data.comment);
  for (let i = 0; i < data.comment.length; i++) {
    console.log(data.comment[i].name);
    let responseDiv = document.createElement("div");
    responseDiv.setAttribute(
      "style",
      "border-bottom:1px solid lightgrey;background-color:whitesmoke;padding:5px 10px"
    );
    let h4_response = document.createElement("h4");
    h4_response.setAttribute("style", "margin-left:10px;margin-top:15px");
    h4_response.appendChild(document.createTextNode(data.comment[i].name));
    let p_response = document.createElement("p");
    p_response.setAttribute("style", "margin-left:10px");
    p_response.appendChild(document.createTextNode(data.comment[i].response));

    responseDiv.appendChild(h4_response);
    responseDiv.appendChild(p_response);
    response_div.appendChild(responseDiv);
  }

  element_div_collection_response.appendChild(response_div);
}