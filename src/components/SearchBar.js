import React from 'react'

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            input: ""
        }
    }

    render(){
        return (           
            <form onSubmit={this.handleSubmit} 
                  style={{marginBottom: "2em"}}>
                 <input style={{marginRight: "1.5em", width: "50%"}}
                        value={this.state.term} 
                        onChange={this.handleChange}/>
                <label>Search</label>  
            </form>  
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.input)
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        })
      }
}

export default SearchBar