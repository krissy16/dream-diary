import React from 'react'
import { Link } from 'react-router-dom';
import Nav from './Nav'
import DiaryEntry from './DiaryEntry'
import sampleData from '../sampleData'

import '../styles/Home.css'

class Home extends React.Component{
    state={
        currentPage: 0,
        showRight: false,
        showLeft: true,
        foldBook: false
    }
    flipPage = (direction) =>{
        if(direction === 'right'){
            if(this.state.currentPage === 0) return
            else if(this.state.currentPage === 1 || this.state.currentPage === 2){
                if(this.state.foldBook && this.state.currentPage === 2){
                    this.setState({ currentPage: 1 })
                }
                else 
                    this.setState({ currentPage: 0, showRight: false })
            }
            else{
                if(this.state.foldBook){
                    this.setState({ currentPage: this.state.currentPage - 1, showLeft: true })
                }
                else
                    this.setState({ currentPage: this.state.currentPage - 2, showLeft: true })
            }
        }
        else{
            if(this.state.currentPage === sampleData.length-2 && this.state.foldBook) {
                this.setState({ currentPage: sampleData.length-1, showLeft: false })
            }
            else if(this.state.currentPage === sampleData.length-3 || this.state.currentPage === sampleData.length-4){ 
                if(this.state.foldBook && this.state.currentPage === sampleData.length-4){
                    this.setState({ currentPage: sampleData.length-3 })
                }
                else if(this.state.foldBook) 
                    this.setState({ currentPage: sampleData.length-2})
                else    
                    this.setState({ currentPage: sampleData.length-2, showLeft: false})
            }
            else{
                if(this.state.foldBook){
                    this.setState({ currentPage: this.state.currentPage + 1, showRight: true })
                }
                else
                    this.setState({ currentPage: this.state.currentPage + 2, showRight: true })
            }
        }
    }
    componentDidMount(){
        let width = window.innerWidth;
        if (width < 700) {this.setState({ foldBook: true})}
    }
    render(){
        let rightPageData =  sampleData[this.state.currentPage]
        let leftPageData = sampleData[this.state.currentPage+1]

        return(
            <>
                <Nav />
                <div className="open-book">
                    {this.state.showLeft ? <img className="left-arrow arrow" id="left" src="./images/left-arrow.svg" alt="left arrow" onClick={() => this.flipPage('left')}/> : ""}
                    {this.state.foldBook ? "" :
                        <div className="left page">
                            <DiaryEntry data={leftPageData} {...this.props}/>
                        </div>}
                    <div className="right page">
                        <DiaryEntry data={rightPageData} {...this.props}/>
                    </div>
                    {this.state.showRight ? <img className="right-arrow arrow" id="right" src="./images/right-arrow.svg" alt="right arrow" onClick={() => this.flipPage('right')}></img> : ""}
                </div>
                <Link className="pen-box" to="/new-entry"><img className="pen" src="./images/pen.png" alt="pen"/> </Link>
            </>
        )
    }
}

export default Home