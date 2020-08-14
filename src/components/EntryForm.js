import React from 'react'
import '../styles/EntryForm.css'

class EntryForm extends React.Component{
    state={
        edit: false,
        title: '',
        date: '',
        content: '',
        notes: ''
    }
    handleSubmit = e =>{
        e.preventDefault();
        let notes = this.splitNotes(this.state.notes)
        let data = {
            title: this.state.title,
            date: this.state.date,
            content: this.state.content,
            notes: notes
        }
        //add to database
        console.log(data)
        if(this.state.edit){
            this.setState({ edit: false })
            this.props.toggleEdit()
        }
        else 
            this.props.history.push('/home')
    }
    handleCancel = e =>{
        e.preventDefault();
        if(this.state.edit){
            this.setState({ edit: false })
            this.props.toggleEdit()
        }
        else 
            this.props.history.push('/home')
    }
    handleDelete = e => {
        e.preventDefault();
        if(this.state.edit){
            this.setState({ edit: false })
            this.props.toggleEdit()
        }
        else 
            this.props.history.push('/home')
    }
    handleChange = e => {
        let newState = {}
        newState[e.target.id] = e.target.value;
        console.log(newState)
        this.setState(newState)
    }
    splitNotes(notesString){
        if(notesString === '' || notesString.trim() === '') return []
        let notesArray = notesString.split(',').map(note => note.trim())
        return notesArray
    }
    componentDidMount(){
        if(this.props.data){
            this.setState({ edit: true})
            this.setState(this.props.data)
        }
    }
    render(){
        return(
            <div className="diary-entry">
                <form className="entry-form" onSubmit={this.handleSubmit}>
                    <span className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input id="title" type="text" value={this.state.title} onChange={this.handleChange}/>
                    </span>
                    <span className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input id="date" type="date" value={this.state.date} onChange={this.handleChange}/>
                    </span>
                    <span className="form-group">
                        <label htmlFor="content">Dream: </label>
                        <textarea id="content" 
                            placeholder="Describe the dream in detail here..." 
                            value={this.state.content} 
                            onChange={this.handleChange}>
                        </textarea>
                    </span>
                    <span className="form-group">
                        <label htmlFor="notes">Notes:</label>
                        <textarea id="notes" 
                            placeholder="List possible triggers like meals, stresses, or media separated by commas."
                            value={this.state.notes} 
                            onChange={this.handleChange}>
                        </textarea>
                    </span>
                    <button type="submit">Submit</button>
                    <button className="cancel" type="cancel"  onClick={ e => this.handleCancel(e) }>Cancel</button>
                    {this.state.edit ? <button className="delete" type="delete"  onClick={ e => this.handleDelete(e) }>Delete</button> : ""}
                </form>
            </div>
        )
    }
}

export default EntryForm