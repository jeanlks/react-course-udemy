import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options:  [],
        selectedOption: undefined
    };

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

    handleCloseModal = () => {
        this.setState({selectedOption: undefined});
    }

    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    }

    handleDeleteOption = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((optionPrev) => {
                return optionPrev !== option;
            })
        }));
    }

    handleAddOption = (option) => {
        if(!option){
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }
        this.setState((previous) => ({options: previous.options.concat([option])}));
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ( { selectedOption: option}));
    }

    render() {
        const subtitle = "Put your life in the hands of a computer";
        return (
            <div>
                <Header  subtitle={subtitle}/>
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0} 
                            handlePick={this.handlePick}/>
                   <div className="widget">
                        <Options handleDeleteOptions={this.handleDeleteOptions}
                                    options={this.state.options}
                                    handleDeleteOption={this.handleDeleteOption}/>
                            <AddOption handleAddOption={this.handleAddOption}/>
                   </div>
                    <OptionModal selectedOption={this.state.selectedOption} 
                                handleCloseModal={this.handleCloseModal}/>
                </div>
            </div>
        );
    }
}

