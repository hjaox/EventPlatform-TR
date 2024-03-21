import app from "./app";
import connection from "./mongo/connection";

app.listen(9090, async () => {
    await connection();
    console.log("listening at PORT 9090")
})