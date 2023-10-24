

// IMPORT: Routes (util)
import routes from "../util/routes.js";

function TestDashboard(props) {

    const listRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "TestLayout") {
                return (
                    <li key={key}><a href={"/test" + prop.path}>{prop.name}</a></li>
                );
            } else {
                return null;
            } 
        });
    };

    return (
        <>
            <h1>Test Dashboard</h1>

            <ul style={{ textAlign: "left" , marginLeft: "200px"}} >
                {listRoutes(routes)}
            </ul>

            <br/>
            <a href="/admin">Back to Admin Dashboard</a>
            <br/>
            <br/>
            <a href="/app">Back to User Homepage</a>
            <br/>

        </>
    );
}

export default TestDashboard;