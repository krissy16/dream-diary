import React from 'react';
import { Link } from 'react-router-dom';
import DreamContext from '../DreamContext';
import DreamApiService from '../services/dreams-api-service';
import Nav from './Nav';
import DiaryEntry from './DiaryEntry';
import TokenService from '../services/token-service'
import '../styles/Home.css';

class Home extends React.Component{
    state={
        currentPage: 0,
        showRight: false,
        showLeft: true,
        foldBook: false
    };
    static contextType = DreamContext;

    flipPage = (direction) =>{
        const { dreams = [] }  = this.context;
        if(direction === 'right'){
            if(this.state.currentPage === 0) return
            else if(this.state.currentPage === 1 || this.state.currentPage === 2){
                if(this.state.foldBook && this.state.currentPage === 2){
                    this.setState({ currentPage: 1, showLeft: true });
                }
                else 
                    this.setState({ currentPage: 0, showRight: false, showLeft: true });
            }
            else{
                if(this.state.foldBook){
                    this.setState({ currentPage: this.state.currentPage - 1, showLeft: true });
                }
                else
                    this.setState({ currentPage: this.state.currentPage - 2, showLeft: true });
            }
        }
        else{
            //if book folded and currently at second to last page flip to last page
            if(this.state.currentPage === dreams.length-2 && this.state.foldBook) {
                this.setState({ currentPage: dreams.length-1, showLeft: false });
            }
            //if currently at third or fourth to last page
            else if(this.state.currentPage === dreams.length-3 || this.state.currentPage === dreams.length-4){ 
                //if book folded and fourth to last page flip to third to last page
                if(this.state.foldBook && this.state.currentPage === dreams.length-4){
                    this.setState({ currentPage: dreams.length-3, showRight: true  });
                }
                //if book folded flip to second to last page
                else if(this.state.foldBook) 
                    this.setState({ currentPage: dreams.length-2, showRight: true });
                //if book isnt folded flip to second to last page for right side
                else    
                    this.setState({ currentPage: dreams.length-2, showLeft: false, showRight: true });
            }
            //if not at last pages
            else{
                //flip one page if book folded
                if(this.state.foldBook){
                    this.setState({ currentPage: this.state.currentPage + 1, showRight: true });
                }
                //flip two pages for open book
                else
                    this.setState({ currentPage: this.state.currentPage + 2, showRight: true });
            }
        }
    }

    componentDidMount(){
        if(!TokenService.hasAuthToken){
            this.props.history.push('/')
        }
        let width = window.innerWidth;
        if (width < 700) {this.setState({ foldBook: true});}
        window.addEventListener('resize', this.updateSize);
        
        DreamApiService.getUserDreams(window.sessionStorage.getItem('userId'))
            .then(this.context.setDreams)
            .then(()=>{
                const { dreams = [] }  = this.context;
                if( dreams.length <= 1 || (dreams.length === 2 && !this.state.foldBook) )
                    this.setState({ showLeft: false }); 
            })
            .catch(error => console.log(error));
        
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateSize);
    }

    updateSize = () => {
        let width = window.innerWidth;
        if (width < 700) {this.setState({ foldBook: true});}
        else {this.setState({ foldBook: false, currentPage: 0, showLeft: true, showRight: false });}
    }
    
    render(){
        const { dreams = [] }  = this.context;
        let rightPageData =  dreams[this.state.currentPage];
        let leftPageData = dreams[this.state.currentPage+1];

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
        );
    }
}

export default Home;