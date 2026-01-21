async function send() {
    const input = document.getElementById("input").value;
    const responseDiv = document.getElementById("response");

    responseDiv.innerText = "AI myśli...";

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    console.log(data); // DEBUG

    responseDiv.innerText = data.reply;
}
