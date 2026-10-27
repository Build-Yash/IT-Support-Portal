function showsoftwareissue() {

    document.getElementById("app").innerHTML = `
    
        <h2>What is happening with your software?</h2>

        <p>Select the problem you're experiencing:</p>

        <button>Application won't open</button>
        <button onclick="applicationCrash()">Application crashes</button>
        <button>Application is very slow</button>
        <button>Login problem</button>
        <button>Error message</button>
        <button>Installation / update problem</button>

    `;

}
function applicationCrash() {

    document.getElementById("app").innerHTML = `

        <h2>Application Crash</h2>

        <p>Was the application working normally before?</p>

        <button onclick="crashWorkedBefore()">Yes</button>
        <button onclick="crashDidNotWorkBefore()">No</button>

    `;

}
function crashWorkedBefore() {

    document.getElementById("app").innerHTML = `

        <h2>Application Crash</h2>

        <p>Did the problem start after a recent software update or change?</p>

        <button onclick="recentUpdateYes()">Yes</button>
        <button onclick="recentUpdateNo()">No</button>

    `;

}

function recentUpdateYes() {

    document.getElementById("app").innerHTML = `

        <h2>Recent Software Change</h2>

        <p>Was the application updated or changed recently?</p>

        <button onclick="updateConfirmed()">Yes</button>

        <button onclick="updateNotConfirmed()">No</button>

    `;

}

function restartCompleted() {

    document.getElementById("app").innerHTML = `

        <h2>Did restarting fix the problem?</h2>

        <button onclick="issueResolved()">Yes, it's fixed</button>

        <button onclick="issueNotResolved()">No, still crashing</button>

    `;

}

function recentUpdateNo() {

    document.getElementById("app").innerHTML = `

        <h2>No Recent Update</h2>

        <p>Let's restart the application and check whether the problem continues.</p>

        <button onclick="restartCompleted()">I restarted it</button>

    `;

}

function updateConfirmed() {

    document.getElementById("app").innerHTML = `

        <h2>Recent Update Detected</h2>

        <p>Let's restart the application first.</p>

        <button onclick="restartCompleted()">I restarted it</button>

    `;

}

function updateNotConfirmed() {

    document.getElementById("app").innerHTML = `

        <h2>No Recent Update Confirmed</h2>

        <p>Let's restart the application and check whether the problem continues.</p>

        <button onclick="restartCompleted()">I restarted it</button>

    `;

}

function crashDidNotWorkBefore() {

    document.getElementById("app").innerHTML = `

        <h2>Application Problem</h2>

        <p>Was the application installed recently?</p>

        <button onclick="installationRecentYes()">Yes</button>
        <button onclick="installationRecentNo()">No</button>
        

    `;

}

function installationRecentYes() {
    document.getElementById("app").innerHTML = `
        <h2>Recent Installation</h2>
        <p>Check whether the installation completed successfully.</p>
        <button onclick="restartCompleted()">I checked and restarted</button>
    `;
}

function installationRecentNo() {
    document.getElementById("app").innerHTML = `
        <h2>Application Investigation</h2>
        <p>Does an error message appear when you open the application?</p>
        <button onclick="restartCompleted()">Yes, an error appears</button>
        <button onclick="restartCompleted()">No error appears</button>
    `;
}

function issueResolved() {
    document.getElementById("app").innerHTML = `
        <h2>Issue Resolved!</h2>
        <p>Great! The application is working again.</p>
        <button onclick="location.reload()">Back to Home</button>
    `;
}

function issueNotResolved() {
    document.getElementById("app").innerHTML = `
        <h2>Issue Not Resolved</h2>
        <p>The application is still crashing. Let's create a support ticket.</p>
        <button onclick="createTicket()">Create Support Ticket</button>
        <button onclick="location.reload()">Back to Home</button>
    `;
}

function createTicket() {
    document.getElementById("app").innerHTML = `
        <h2>Create Support Ticket</h2>
        <p>Please provide details about your issue.</p>

        <form onsubmit="submitTicket(event)">

            <label for="fullName">Full Name:</label><br>
            <input type="text" id="fullName" required><br><br>

            <label for="applicationName">Application Name:</label><br>
            <input type="text" id="applicationName" required><br><br>

            <label for="description">Issue Description:</label><br>
            <textarea id="description" rows="4" required></textarea><br><br>

            <label for="priority">Priority:</label><br>
            <select id="priority" required>
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
            </select><br><br>

            <button type="submit">Submit Ticket</button>

        </form>

        <br>
        <button onclick="location.reload()">Back to Home</button>
    `;
}

function submitTicket(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const applicationName = document.getElementById("applicationName").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    const ticketNumber = "TKT-" + Date.now().toString().slice(-6);

    // Create a ticket object
    const ticket = {
        ticketNumber: ticketNumber,
        fullName: fullName,
        applicationName: applicationName,
        description: description,
        priority: priority,
        status: "Open",
        createdAt: new Date().toLocaleString()
    };

    // Get existing tickets from browser storage
    let tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];

    // Add the new ticket
    tickets.push(ticket);

    // Save all tickets in browser storage
    localStorage.setItem("supportTickets", JSON.stringify(tickets));

    // Display confirmation
    document.getElementById("app").innerHTML = `
        <h2>Ticket Created Successfully!</h2>
        <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
        <p><strong>Name:</strong> ${ticket.fullName}</p>
        <p><strong>Application:</strong> ${ticket.applicationName}</p>
        <p><strong>Description:</strong> ${ticket.description}</p>
        <p><strong>Priority:</strong> ${ticket.priority}</p>
        <p><strong>Status:</strong> ${ticket.status}</p>
        <p><strong>Created:</strong> ${ticket.createdAt}</p>
        <button onclick="location.reload()">Back to Home</button>
    `;

    console.log("Saved tickets:", tickets);
}

function showTicketDashboard() {
    const tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];

    document.getElementById("app").innerHTML = `
        <h2>IT Support Ticket Dashboard</h2>
        <p>Total Tickets: ${tickets.length}</p>

        <input
            type="text"
            id="ticketSearch"
            placeholder="Search by ticket number, name, or application..."
            oninput="filterTickets()"
        >

        <br><br>
        <button onclick="location.reload()">Back to Home</button>

        <div id="ticketResults" style="overflow-x:auto; margin-top:25px;"></div>
    `;

    filterTickets();
}

function filterTickets() {
    const tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];

    const searchText = document.getElementById("ticketSearch").value
        .trim()
        .toLowerCase();

    const filteredTickets = tickets.filter(ticket =>
        [
            ticket.ticketNumber,
            ticket.fullName,
            ticket.applicationName,
            ticket.description,
            ticket.priority,
            ticket.status
        ].some(value =>
            String(value || "").toLowerCase().includes(searchText)
        )
    );

    let ticketHTML = "";

    if (filteredTickets.length === 0) {
        ticketHTML = "<p>No matching tickets found.</p>";
    } else {
        ticketHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Ticket Number</th>
                        <th>Name</th>
                        <th>Application</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
        `;

        filteredTickets.forEach(ticket => {
            const priority = String(ticket.priority || "Medium").toLowerCase();

            ticketHTML += `
                <tr>
                    <td>${ticket.ticketNumber}</td>
                    <td>${ticket.fullName}</td>
                    <td>${ticket.applicationName}</td>
                    <td>${ticket.description}</td>
                    <td>
                        <span class="priority-badge priority-${priority}">
                            ${ticket.priority}
                        </span>
                    </td>
                    <td>
    <select onchange="updateTicketStatus('${ticket.ticketNumber}', this.value)">
        <option value="Open" ${ticket.status === "Open" ? "selected" : ""}>Open</option>
        <option value="In Progress" ${ticket.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="Resolved" ${ticket.status === "Resolved" ? "selected" : ""}>Resolved</option>
    </select>
</td>
                    <td>${ticket.createdAt || "N/A"}</td>
                </tr>
            `;
        });

        ticketHTML += "</tbody></table>";
    }

    document.getElementById("ticketResults").innerHTML = ticketHTML;
}

function updateTicketStatus(ticketNumber, newStatus) {
    let tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];

    tickets = tickets.map(ticket => {
        if (ticket.ticketNumber === ticketNumber) {
            ticket.status = newStatus;
        }
        return ticket;
    });

    localStorage.setItem("supportTickets", JSON.stringify(tickets));

    filterTickets();

    alert("Ticket status updated to " + newStatus);
}