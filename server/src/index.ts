import app from "./app";
import connection from "./mongo/connection";

const PORT = 9090;

app.listen(PORT, async () => {
    await connection();
    console.log(`listening at PORT ${PORT}`)
})