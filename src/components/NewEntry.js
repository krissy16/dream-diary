import React from 'react'
import Nav from './Nav'
import '../styles/NewEntry.css'
import EntryForm from './EntryForm'
import DiaryEntry from './DiaryEntry'
import DreamContext from '../DreamContext'

class NewEntry extends React.Component{
    state = {
        foldBook: false
    }
    static contextType = DreamContext

    componentDidMount(){
        let width = window.innerWidth;
        if (width < 700) {this.setState({ foldBook: true})}
        window.addEventListener('resize', this.updateSize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateSize)
    }

    updateSize = () => {
        let width = window.innerWidth;
        if (width < 700) {this.setState({ foldBook: true})}
        else {this.setState({ foldBook: false })}
    }

    render(){
        let data = this.context.dreams[0]
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