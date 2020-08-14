import React from 'react'
import Nav from './Nav'
import '../styles/NewEntry.css'
import EntryForm from './EntryForm'
import DiaryEntry from './DiaryEntry'
import sampleData from '../sampleData'

class NewEntry extends React.Component{
    state = {
        foldBook: false
    }
    componentDidMount(){
        let width = window.innerWidth;
        if (width < 700) {this.setState({ foldBook: true})}
    }
    render(){
        let data = sampleData[0]
        return(
            <>
                <Nav />
                <main className="open-book">
                    {this.state.foldBook ?  '' : 
                        <div className="left page">
                            <DiaryEntry data={data}  {...this.props}/>
                        </div>}
                    <div className="right page entry">
                        <h2>New Dream Entry</h2>
                        <EntryForm {...this.props}/>
                    </div>
                    </main>
            </>
        )
    }
}

export default NewEntry