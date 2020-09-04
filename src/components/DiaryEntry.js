import React from 'react';
import EntryForm from './EntryForm';
import '../styles/DiaryEntry.css';

class DiaryEntry extends React.Component{
    state={
        edit: false
    };
    toggleEdit = () =>{
        this.setState({edit: !this.state.edit});
    }
    formatDate(date){
        if(typeof date !== 'string') return;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[parseInt(date.substr(5,2)) - 1]} ${date.substr(8,2)}, ${date.substr(0,4)}`;
    }
    render(){
        let date = this.formatDate(this.props.data.date_created);
        let notes = this.props.data.notes ? this.props.data.notes.split(',').map( (note, i) => 
            <li key={i}>{note}</li>) : '';
        return(
            <>
                { this.state.edit ? 
                    <>
                        <h2>Edit Entry</h2><EntryForm data={this.props.data}  toggleEdit={this.toggleEdit} {...this.props}/>
                    </> :
                    this.props.data.title==='' ? 
                        <div className="diary-entry"></div> 
                        :
                        <div className="diary-entry">
                            <img className="edit" src="./images/edit.svg" alt="edit icon" onClick={this.toggleEdit}/>
                            <p className="date">{date}</p>
                            <h2 className="title">{this.props.data.title}</h2>
                            <div>{this.props.data.content}</div>
                            {this.props.data.notes ? 
                                <div>
                                    <h2>Notes</h2>
                                    <ul>
                                        {notes}
                                    </ul>
                                </div> 
                            : ''}
                        </div>
                }
            </>
        );
    }
}

DiaryEntry.defaultProps = {
    data: {
        title: '',
        date: '',
        content: '',
        notes: ''
    }
};

export default DiaryEntry;