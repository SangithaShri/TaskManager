var disp = document.getElementById("office");
var tasks = [];

function AddTask() {
    var task = document.getElementById("task").value;
    var desc = document.getElementById("desc").value;
    var duration = document.getElementById("durat").value;
    if(task && desc && duration){
    disp.innerHTML += `<tr><td>${task}</td>
    <td>${desc}</td>
    <td>${duration}</td>
    <td class="button-container"><button class="edit" onclick="editTask(this.parentNode.parentNode)">Edit</button><button class="delete" onclick="deleteTask(this.parentNode.parentNode)">Delete</button></td></tr>`;

    var newTask = {
        task: task,
        desc: desc,
        duration: duration
    };
    tasks.push(newTask);
    document.getElementById("desc").value = "";
    reset();
}
else{
    alert("Please enter all the details!");
}
}

function Filtering() {
    disp.innerHTML = "";
    var select = document.getElementById("filter").value;
    if (select === "select") {
        tasks.forEach((ele) => {
            disp.innerHTML += `<tr><td>${ele.task}</td>
            <td>${ele.desc}</td>
            <td>${ele.duration}</td>
            <td class="button-container"><button class="edit" onclick="editTask(this.parentNode.parentNode)">Edit</button><button class="delete" onclick="deleteTask(this.parentNode.parentNode)">Delete</button></td></tr>`;
        })
    }
    else {
        var filteredTasks = tasks.filter((ele) => {
            return ele.task === select;
        });
        filteredTasks.forEach((ele) => {
            var row = document.createElement("tr");
            row.innerHTML = `<td>${ele.task}</td>
                <td>${ele.desc}</td>
                <td>${ele.duration}</td>
                <td class="button-container"><button class="edit" onclick="deleteTask(this.parentNode.parentNode)">Edit</button><button class="delete" onclick="deleteTask(this.parentNode.parentNode)">Delete</button></td></tr>`;
            disp.appendChild(row);
        });
    }
}

function deleteTask(row) {
    var index = Array.prototype.indexOf.call(row.parentNode.children, row);
    tasks.splice(index, 1);
    row.remove();
}

function editTask(row) {
    var task = row.cells[0].textContent;
    var desc = row.cells[1].textContent;
    var duration = row.cells[2].textContent;
    document.getElementById("task").value = task;
    document.getElementById("desc").value = desc;
    document.getElementById("durat").value = duration;
    var index = Array.prototype.indexOf.call(row.parentNode.children, row);
    tasks.splice(index, 1);
    row.remove();
}

let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let running = false;
let totalSeconds = 0;

function startstop() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            totalSeconds++;
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;

            let format = `${hours.toString().padStart('2', 0)}:${minutes.toString().padStart('2', 0)}:${seconds.toString().padStart('2', 0)}`;
            document.getElementById("display").innerText = format;
            document.getElementById("stopwatch").innerText = "Stop";

            // Update the duration input with the elapsed time
            document.getElementById("durat").value = format;
        }, 1000);
    } else {
        document.getElementById("stopwatch").innerText = "Start";
        clearInterval(timer);
        running = false;
    }
}

function reset() {
    clearInterval(timer);
    running = false;
    // seconds = 0;
    // minutes = 0;
    // hours = 0;
    // document.getElementById("display").textContent = "00:00:00";
    // document.getElementById("startBtn").disabled = false;
    totalSeconds = 0; // Reset total seconds to 0
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("stopwatch").innerText = "Start";
    document.getElementById("durat").value = ""; // Reset duration input to 00:00:00
}