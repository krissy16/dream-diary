import React from 'react'
import DreamApiService from '../services/dreams-api-service'
import DreamContext from '../DreamContext'

import '../styles/EntryForm.css'

class EntryForm extends React.Component{
    state={
        edit: false,
        title: '',
        date_created: new Date().toISOString().substring(0, 10),
        content: '',
        notes: ''
    }

    static contextType = DreamContext

    handleSubmit = e =>{
        e.preventDefault();
        let data = {
            title: this.state.title,
            date_created: this.state.date_created,
            content: this.state.content,
            notes: this.state.notes
        }
        if(data.title === '' || data.content === '')
            return
        //if we are editing existing post
        if(this.state.edit){
            DreamApiService.editDream(this.props.data.id, data)
            .then( () => {
                this.context.changeDream(data)
                this.setState({ edit: false })
                this.props.toggleEdit()
            })
            .then( () => {
                this.props.history.push('/home')
                window.location.reload();
            })
            .catch(error => console.log(error))
        }
        //if creating a new post
        else {
            DreamApiService.postDream(data)
                .then( () => {
                    console.log('Successfully added') 
                    this.props.history.push('/home')
                    window.location.reload();
                })
                .catch(error => console.log(error.message))
        }
    }

    //redirect if cancelling
    handleCancel = e =>{
        e.preventDefault();
        if(this.state.edit){
            this.setState({ edit: false })
            this.props.toggleEdit()
        }
        else 
            this.props.history.push('/home')
    }

    //to delete existing dream
    handleDelete = e => {
        e.preventDefault();
        
        const deletedDream = {
            title: this.props.title,
            date_created: this.props.date_created,
            content: this.props.content,
            notes: this.props.notes,
            archived: true
        }
        DreamApiService.editDream(this.props.data.id, deletedDream)
            .then( () => {
                this.context.changeDream(deletedDream)
                this.setState({ edit: false })
                this.props.toggleEdit()
                this.props.history.push('/home')
                window.location.reload();
            })
            .catch(error => console.log(error))
    }
    handleChange = e => {
        let newState = {}
        newState[e.target.id] = e.target.value;
        this.setState(newState)
    }
    
    componentDidMount(){
        if(this.props.data){
            this.setState({ edit: true})
            this.setState(this.props.data)
            this.setState({ date_created: this.props.data.date_created.substring(0, 10) })
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
                        <label htmlFor="date_created">Date:</label>
                        <input id="date_created" type="date" value={this.state.date_created} onChange={this.handleChange}/>
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