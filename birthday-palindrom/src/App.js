import './App.css';
import React, { useState } from "react";
import image from "./images/loader.gif";
import calendor from "./images/calendor.jpg"
//theme=[bgColor, color]
const darkMode = ["rgb(36 168 168)", "white"];
const lightMode = ["rgb(7 7 7)", "white"];
let date;
let newoutput="";
const noOfDaysInEachMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

const displayBg=["rgb(36 168 168)","rgb(7 7 7)"];
let setBg=0;
const App = ()=>{
   const [backgroundChange, setBackground] = useState(darkMode); 
   const [bgTheme, setbgTheme] = useState(displayBg[1]); 
   const [finalResult, setfinalResult] = useState("");

  const onFormSubmit = (e) => {
     e.preventDefault();
       if(date){
        setfinalResult(<img style={{marginTop:"1rem",marginLeft:"200px"}} src={image} alt="" width="200px"/>);
        setTimeout(()=>{
            checkingPandromeOrNot();
        }, 3000);
        
       }
        
        else{
            setfinalResult(<p>Please fill date field.</p>)
        }
   }

   const checkingPandromeOrNot =() =>{
       const dateArray= date.split("-");
       const inputYear= dateArray[0];
       const inputMonth=dateArray[1];
       const inputDate=dateArray[2];
       let setFlag = checkAllDateFormat(inputYear,inputMonth,inputDate);
       if(setFlag){
        newoutput= (`Yeeeee Your birthday in format ${setFlag} is palindrome`)
       }

       else{
        let [nextdate, diff]=findNextDate(inputDate,inputMonth,inputYear);
        newoutput = `Ohhhh!!! Your birthday is not palindrome. Nearest palindrome date is ${nextdate} You missed it by ${diff} days.`;
       }
       setfinalResult(<p style={{border:`2px solid ${backgroundChange[0]}`, padding:"1rem"}}>{newoutput}</p>);
      
   }

   const checkAllDateFormat = (yyyy, mm, dd) =>{
       
    //yyyymmdd format string
    const dateFormat1 = yyyy+mm+dd;
    
     //ddmmyyyy format string
     const dateFormat2 = dd+mm+yyyy;

    //mmddyy format string
    const dateFormat3 = mm+dd+yyyy.substring(2);
        
    //mddyyyy format string
    const dateFormat4 = Number(mm)+dd+yyyy;

    if (isPalindrome(dateFormat1)){
        return (`${yyyy}-${mm}-${dd}`);
    }
    else if(isPalindrome(dateFormat2)){
        return (`${dd}-${mm}-${yyyy}`);
    }
    else if(isPalindrome(dateFormat3)){
        return (`${mm}-${dd}-${yyyy.substring(2)}`);
    }
    else if(isPalindrome(dateFormat4)){
        return (`${Number(mm)}-${dd}-${yyyy}`);
    }
    else{
        return null;
    }

   }


   const isPalindrome = (stringCheck) => {
    const max=Math.floor(stringCheck.length/2);
    for(let i=0; i<max; i++){
        if(stringCheck[i]!== stringCheck[stringCheck.length-1-i]){
         return false;   
        }
    }
    return true;
   }
   
   
   const findNextDate = (date, month, year) => {
    let ddNo1= Number(date);
    let mmNo1= Number(month);
    let yyNo1=Number(year);
    let ddNo2= Number(date);
    let mmNo2= Number(month);
    let yyNo2=Number(year);
    
    for(let i=1; i>0; i++){

        //forward check
        ddNo1 = ddNo1+1;
        if(ddNo1 > Number(noOfDaysInEachMonth[mmNo1-1])){
            ddNo1 = 1;
            mmNo1 = mmNo1+1;
            if(mmNo1 > 12){
                mmNo1 = 1;
                yyNo1 = yyNo1+1;
            }
        }
        let yyString = yyNo1.toString();
        let mmString = mmNo1.toString();
        let ddString = ddNo1.toString();
        if(mmString.length===1){
            mmString="0"+mmString;
        }
        if(ddString.length===1){
            ddString="0"+ddString;
        }
        let setFlagNextDate = checkAllDateFormat(yyString, mmString, ddString);
        if(setFlagNextDate){
            return [`${setFlagNextDate}`, i];
        }

        //backward check
        if(yyNo2>1){
            ddNo2 = ddNo2-1;
            if(ddNo2<1){
                mmNo2 = mmNo2-1;
                if(mmNo2 < 1){
                    mmNo2 = 12;
                    yyNo2 = yyNo2-1;
                    if(yyNo2<1){
                        break;
                    }
                    ddNo2 = noOfDaysInEachMonth[mmNo2-1];
                }
            }
            let yyString = yyNo2.toString();
            let mmString = mmNo2.toString();
            let ddString = ddNo2.toString();
            if(mmString.length===1){
                mmString="0"+mmString;
            }
            if(ddString.length===1){
                ddString="0"+ddString;
            }
            let setFlagNextDate = checkAllDateFormat(yyString, mmString, ddString);
            if(setFlagNextDate){
                return [`${setFlagNextDate}`, i];
            }
        }

   }
   
}

  return (
    <div className="container">
      {/* <form onSubmit={onFormSubmit}>
     <input type="date" value={inputDate} onChange={e => setInputDate(e.target.value)} />
     <button type="submit">Submit</button>
     </form>
     {
       isPalindrom && <p>Its palindrom</p>
     }
     {
       isNotPalindrom && <p>Its not palindrom</p>
     } */}
      <div className={"sub-container"} style={{backgroundColor:`${backgroundChange[0]}`, color:`${backgroundChange[1]}`}}>
        <header >
          <div className="navbar">
            <ul>
            <li><label className="switch">
                            <input onChange={()=>{
                                setBg = setBg+1;
                                if(setBg%2===0){
                                  setBackground(darkMode);
                                    setbgTheme(displayBg[1]);}
                                else{ setBackground(lightMode);
                                    setbgTheme(displayBg[0])
                                };
                                
                            }} type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </li>
              <li>
                <span>Night Mode</span>
              </li>
              <li id="git-repo">
                Github Repo
              </li>
            </ul>
          </div>
        </header>
        <hr />
        <section class="main-heading">
          <div id="heading">
            <h1>Check out if your <span>Birthdate</span> is <span>Palidrome</span></h1>
          </div>
          <div id="para">
            <p>A <span  style={{color:`${bgTheme}`}}>Palindrome</span> is a word/number which reads the same backward as forward</p>
          </div>
          <div id="btn-check">
            <button >
              <a href="#main-form">Check</a>
            </button>
          </div>
          <div id="img-heading">
            <img src={calendor} alt="" width="600px" height="500px" />
          </div>
        </section>
        <section id="main-form" class="form-section">
          <form onSubmit={onFormSubmit}>
            <div className="form-header">
              <h2>Enter your birthdate and we will tell you if your Birthdate is a Palindrome</h2>
              <p>This app checks your birthdate in 4 formats <strong>yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy, m-dd-yyyy</strong>
                e.g. if your birthdate is <strong>05 May 1997</strong>, then app will check for 19970505, 05051997, 05051997, 05051997
              </p>
              <div className="input-field">
                <input type="date"  onChange={(e)=> {date = e.target.value; }} />
              </div>
              <div className="btn-field">
                <button type="submit">Check</button>
              </div>
              <div>{finalResult}</div> 
              
            </div>
          </form>


        </section>
        <footer>
          <section id="footer-section" style={{backgroundColor:`${backgroundChange[0]}`, color:`${backgroundChange[1]}`}}>
            <div class="footer">
              <ul class="footer-list">

                <li class="list-item"><a href="https://github.com/Rishi05051997">
                  <i class="fab fa-github" aria-hidden="true"></i>
                </a>
                </li>
                <li class="list-item"><a href="vrushabhdhatrak10@gmail.com" class="footer-links">
                  <i class="fa fa-envelope" aria-hidden="true"></i></a>
                </li>

                <li class="list-item"><a href="https://www.linkedin.com/in/vrushabh-dhatrak-328ab0148/">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                </li>
                <li class="list-item"><a href="https://vrushabhdhatak10-portfolio.netlify.app/">
                  <i class="fas fa-briefcase"></i>
                </a>
                </li>

              </ul>
            </div>
            <hr />
            <div className="copyright">
              <ul>
                <li>@</li> <strong>|</strong>
                <li>2021</li> <strong>|</strong>
                <li>Vrushabh Dhatrak</li>
              </ul>
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
}

export default App;
