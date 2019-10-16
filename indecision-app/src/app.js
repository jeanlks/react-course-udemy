console.log("is running")

var template = (
    <div>
        <h1>Indecision App</h1>
        <p>This is some info</p>
        <ol>
            <li>Item one</li>
            <li>Item two</li>
        </ol>
    </div>
);
var user = {
    name: 'Jean',
    age: 25,
    location: 'Goiania'
};

var templateTwo = (
    <div>
        <h1>{user.name}</h1>
        <p>{user.age}</p>
    </div>
);
var appRoot = document.getElementById('app');

ReactDOM.render(templateTwo, appRoot);