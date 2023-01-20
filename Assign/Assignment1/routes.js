const HomeHTML = `
    <html>
        <head><title>User App</title></head>
        <body>
            <h1>Welcome to User App</h1>
            <form action="/create-user" method="POST">
                <input type="text" name="username" placeholder="enter your user name" />
                <br />
                <button type="submit">Save</button>
            <form>
        </body>
    <html>
`;

const userHTML = `
    <html>
        <head><title>User App</title></head>
        <body>
            <h1>List of Users</h1>
            <ul>
                <li>yourfriend35</li>
                <li>johndoe</li> 
        </body>
    <html>
`;

const Requests = (req, res) => {
    if(req.url === "/" && req.method == "GET"){
        res.setHeader("content-type", "text/html")
        res.write(HomeHTML)
        return res.end()
    }
    if(req.url === "/users" && req.method =="GET"){
        res.setHeader("content-type", "text/html")
        res.write(userHTML)
        return res.end()
    }
    if(req.url === "/create-user" && req.method == "POST"){
        const reqData = []
        req.on("data", chunks => {
            reqData.push(chunks)
        })
        req.on("end", () => {
            let s = Buffer.concat(reqData).toString();
            let sArrary = s.split("=");
            console.log(`${sArrary[0]} is ${sArrary[1]}`);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        })
    }
}

module.exports = {
    handler: Requests
}