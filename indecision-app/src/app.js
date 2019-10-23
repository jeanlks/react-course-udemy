class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options:  props.options
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(() => ({ options: options }));
            }
        } catch(e) {

        }
       
    }

    handleDeleteOptions() {
        this.setState(() => ({options: []}));
    }

    handleDeleteOption(option) {
        this.setState((prevState) => ({
            options: prevState.options.filter((optionPrev) => {
                return optionPrev !== option;
            })
        }));
    }

    handleAddOption(option) {
        if(!option){
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }
        this.setState((previous) => ({options: previous.options.concat([option])}));
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    render() {
        const subtitle = "Put your life in the hands of a computer";
        return (
            <div>
                <Header  subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} 
                        handlePick={this.handlePick}/>
                <Options handleDeleteOptions={this.handleDeleteOptions}
                         options={this.state.options}
                         handleDeleteOption={this.handleDeleteOption}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}


IndecisionApp.defaultProps = {
    options: []
  };

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision App'
}

const Action = (props) => {
    return (
        <div>
            <button disabled={props.hasOptions} 
                    onClick={props.handlePick}>What should I do? </button>
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            <p>{props.option}</p>
            <button onClick={(e) => {
                props.handleDeleteOption(props.option)
            }}>
                remove
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {
                props.options.map((option) => (
                    <Option key={option}
                            option={option}
                            handleDeleteOption={props.handleDeleteOption}/>
                ))
            }
        </div>
    );
}

class AddOption extends React.Component { 
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);   
        this.setState(() => ({ error }));

        if(!error) {
           e.target.elements.option.value = ''; 
        }
    }

    render() {
        return (
            <div>
                { this.state.error && <p>{this.state.error}</p> }
                <form onSubmit={this.handleAddOption} >
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp/>, document.getElementById("app"))