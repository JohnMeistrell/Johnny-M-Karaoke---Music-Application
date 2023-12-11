const bLogOnOff = false;

window.jQuery = jQuery; 

class TodoApp extends React.Component {

  /* ------------------------------------------------------------- */
  constructor(props) {
  /* ------------------------------------------------------------- */
    super(props);
    this.state = { 
        bpm: 85, signature: '4/4', barsPerLine: 4, 
        bpmButtonId: '' , aPastedLyrics: messures.join("\n") ,
        currentLine: 0, mmmL: "18",
        myInterval: null , intervalSecs: 0
 
    };
    this.handleClick              = this.handleClick.bind(this);
    this.handleClickStartOver     = this.handleClickStartOver.bind(this);
    this.handleBLURLyricsPasted   = this.handleBLURLyricsPasted.bind(this);
    this.handleChangebarsPerLine  = this.handleChangebarsPerLine.bind(this);
    this.handleChangeBPM          = this.handleChangeBPM.bind(this);
    this.handleChangeSignature    = this.handleChangeSignature.bind(this);
    this.handleClickInstructions  = this.handleClickInstructions.bind(this);
    this.handleLLLChange          = this.handleLLLChange.bind(this);

    this.handleLyricsFileChange   = this.handleLyricsFileChange.bind(this);

    this.handleBlurBPM            = this.handleBlurBPM.bind(this);

  }

  /* ------------------------------------------------------------- */
  componentWillMount() {                  if (bLogOnOff) { console.log("LOG: componentWillMount()");}                   }
  componentWillReceiveProps() {           if (bLogOnOff) { console.log("LOG: componentWillReceiveProps()");}            }
  static getDerivedStateFromProps() {     if (bLogOnOff) { console.log("LOG: static getDerivedStateFromProps()");}      }
  getSnapshotBeforeUpdate()         {     if (bLogOnOff) { console.log("LOG: getSnapshotBeforeUpdate()");}              }
  static getDerivedStateFromError() {     if (bLogOnOff) { console.log("LOG: static getDerivedStateFromError()");}      }
  componentDidCatch()               {     if (bLogOnOff) { console.log("LOG: componentDidCatch()");}                    } 

  /* ------------------------------------------------------------- */
  componentWillUnmount() {                if (bLogOnOff) { console.log("LOG: componentWillUnmount()");};
  /* ------------------------------------------------------------- */
    clearInterval(this.interval); 
  }

  /* ------------------------------------------------------------- */
  componentDidMount() {                   if (bLogOnOff) { console.log("LOG: componentDidMount()");};
  /* ------------------------------------------------------------- */


/*
var $lyricsfile = $('#lyricsPasted');
$("input[name='lyrics']").on('change', function(e) {
    this.setState(state => (  { aPastedLyrics: "uuuuu"}  )   );
    console.log("hhhhh");
   var target = e.currentTarget;
   var file = target.files[0];
   var reader = new FileReader();
   if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $lyricsfile.val(e.target.result);
        }
        reader.readAsText(file);
    }
});
*/
    var myInterval = this.state.myInterval;
    clearInterval(myInterval);

    var vid = document.getElementById("myAudio");
    vid.currentTime = 1; 

    var timingsMesuresu = this.updateTimingsForPastedLyricsArray(messures);
    this.setState(state => (  { aPastedLyrics: timingsMesuresu.join("\n")}  )   );
    console.log("LLL componentDidMount() update lyrics");

    this.setState(state => (  { currentLine: 1}  )   );
    this.setState(state => (  { myInterval: this.interval}  )   );

    var bpmConstant = ( (this.state.bpm/60)*this.state.barsPerLine );
    this.interval = setInterval(() => this.singThisLine(), ( bpmConstant * 1000) );
  
  }

  /* ------------------------------------------------------------- */
  getSnapshotBeforeUpdate(prevProps, prevState) {     if (bLogOnOff) { console.log("LOG: getSnapshotBeforeUpdate(prevProps, prevState)");};
  /* ------------------------------------------------------------- */

     return "value from snapshot";
  }
 

  /* ------------------------------------------------------------- */
  componentDidUpdate(prevProps, prevState, snapshot) {    if (bLogOnOff) { console.log("LOG: 09 componentDidUpdate(prevProps, prevState, snapshot)");};
  /* ------------------------------------------------------------- */

          console.log("LyricsPrv:" + prevState.aPastedLyrics.substring(0,50));
          console.log("LyricsCur:" + this.state.aPastedLyrics.substring(0,50));

     if (this.state.bpm !== prevState.bpm) {
          console.log("BPM: changed --------------------------------------- ");
          console.log(prevState.bpm);
          console.log(this.state.bpm);
     }

    var eeLyricsID = document.getElementById("lyricsFromFile");
    var bbbPastedLyrics = eeLyricsID.value; 
    var aaaPastedLyrics = eeLyricsID.value.split("\n"); 
    console.log("hhhhh:" + eeLyricsID);
    console.log("hhhhh:" + aaaPastedLyrics);
    if (bbbPastedLyrics.length > 2) {
      var timingsMesuresu = this.updateTimingsForPastedLyricsArray(aaaPastedLyrics);
      this.setState(state => (  { aPastedLyrics: timingsMesuresu.join("\n")}  )   );
    };
    eeLyricsID.value = "";

    /* BPM from file update */
    var eeBPMfromFileID = document.getElementById("bpmFromFile");
    var valBPMfromFileID = eeBPMfromFileID.value; 
    if (valBPMfromFileID.length > 1) {
      this.setState(state => (  { bpm: valBPMfromFileID}  )   );
    };
    eeBPMfromFileID.value = "";

  }

  /* ------------------------------------------------------------- */
  handleLyricsFileChange(e) {    if (bLogOnOff) { console.log("LOG: handleLyricsFileChange(e)");};
  /* ------------------------------------------------------------- */
    e.preventDefault();

   var target = e.currentTarget;
   var file = target.files[0];

   if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var rrrr = e.target.result
            var eLyricsID = document.getElementById("lyricsFromFile");
            eLyricsID.value = rrrr;
            var aaaxxx = ""; 
        }
        reader.readAsText(file);
    };

     /*   
   var target = e.currentTarget;
   var file = target.files[0];
   var reader = new FileReader();

   if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var eLyricsID = document.getElementById("lyricsFromFile");
            var rrrr = e.target.result
            eLyricsID.value = "BBBB");
            console.log("FromFile:" + rrrr); 
        }
        reader.readAsText(file);
    };

    var aaabbb1 = "aaa";
    var recsFile = reader.result;
    console.log("DDDD:" + recsFile);
    var aaabbb2 = "aaa";
    this.setState(state => (  { aPastedLyrics: "AAAA" }  )   );


   
     var ee = this._inputc;
     ee.focus(); 
     this.setState({aPastedLyrics: eLyricsID.target.value});
     */
     var aaabbb = "aaa";

  }





  /* ------------------------------------------------------------- */
  handleClickInstructions(e) {    if (bLogOnOff) { console.log("LOG: handleClickInstructions(e)");};
  /* ------------------------------------------------------------- */
    var dInstructID = document.getElementById("dInstructions");
         e.value = "-";
  }

  /* ------------------------------------------------------------- */
  handleClickStartOver() {     if (bLogOnOff) { console.log("LOG: handleClickStartOver()");};
  /* ------------------------------------------------------------- */

    var myInterval = this.state.myInterval;
    clearInterval(myInterval);

    var vid = document.getElementById("myAudio");
    vid.currentTime = 1; 

    this.setState(state => (  { currentLine: 1}  )   );
    this.setState(state => (  { myInterval: this.interval}  )   );

    var bpmConstant = ( (this.state.bpm/60)*this.state.barsPerLine );
    this.interval = setInterval(() => this.singThisLine(), ( bpmConstant * 1000) ); 
  }

  /* ------------------------------------------------------------- */
  singThisLine() {        if (bLogOnOff) { console.log("LOG: -------------------------------------");  console.log("LOG: 01 singThisLine()");};
  /* ------------------------------------------------------------- */

    var nLine =  this.state.currentLine;
    var nLast =  this.state.mmmL;
    if ( (nLine) > nLast - 1  ) { nLine = 0; }; 
    nLine = nLine + 1;
    this.setState(state => (  { currentLine: nLine}  )   ); 
  }  

  /* ------------------------------------------------------------- */
  updateTimingsForPastedLyricsArray(arrayPastedLyrics) {       if (bLogOnOff) { console.log("LOG: updateTimingsForPastedLyricsArray(arrayPastedLyrics)");};
  /* ------------------------------------------------------------- */

    console.log("LLL updateTimingsForPastedLyricsArray(arrayPastedLyrics) update lyrics");

    timings = []; messures = [];
    timings.push("00:00");

    var secsPerLine = (this.state.bpm/60)*this.state.barsPerLine; 
    var secsCurrentLine = 0;

    var i;
    arrayPastedLyrics.forEach( (element,i) => {

      /* Remove time */
      /* var element = "12:34 There's somethin' special on my mind"; */
      var timeRemoved = function(element) {
         if ( (element.substring(2,3) ) === ":" ) {} else { return (element); };
         var timeNumberPart = element.substring(0,2) + element.substring(3,5); 
         if ( isNaN( timeNumberPart ) === "false" ) { return (element); }
         return ( element.substring((6)) );  
      }
      arrayPastedLyrics[i] = timeRemoved(element);

      /* New time */
      secsCurrentLine = (i + 1) * secsPerLine ;
      var timingsItemUpdate = new Date(secsCurrentLine * 1000).toString().split(" ")[4].slice(-5);;
      timings.push(timingsItemUpdate);

    }); 

    /* New messures  */
    messures =  arrayPastedLyrics;

    /* Update UI with new times and messures  */
    var ii; var timingsMesures = [];  var tempArrayItem = ""; 
    arrayPastedLyrics.forEach( (element,ii) => {
      tempArrayItem = timings[ii] + " " + messures[ii];
      timingsMesures.push(tempArrayItem);
      } 
    )

    return timingsMesures;
  }  

  /* ------------------------------------------------------------- */
  handleLLLChange(e) {     if (bLogOnOff) { console.log("LOG: handleLLLChange(e)");};
  /* ------------------------------------------------------------- */

    e.preventDefault();

    this.setState({aPastedLyrics: e.target.value});

    console.log("LLL handleLLLChange(e) update lyrics");


  }  

  /* ------------------------------------------------------------- */
  handleClick(e) {    if (bLogOnOff) { console.log("LOG: handleClick(e)");};
  /* ------------------------------------------------------------- */

    e.preventDefault();

    const id = e.target.id;
    var bpmClicked = false;
    if (id === 'pluss1') { this.setState({ bpm: Number(this.state.bpm) + 1  }); bpmClicked = true;};
    if (id === 'pluss2') { this.setState({ bpm: Number(this.state.bpm) + 10 }); bpmClicked = true;};
    if (id === 'minus1') { this.setState({ bpm: Number(this.state.bpm) - 1  }); bpmClicked = true;};
    if (id === 'minus2') { this.setState({ bpm: Number(this.state.bpm) - 10 }); bpmClicked = true;};

    if (bpmClicked) { 
      console.log("LLL handleClick(e) update lyrics");
      var aaaPastedLyrics = this.state.aPastedLyrics.split("\n"); /* into an array */
      var timingsMesuresu = this.updateTimingsForPastedLyricsArray(aaaPastedLyrics);
      this.setState(state => (  { aPastedLyrics: timingsMesuresu.join("\n")}  )   );
    };

  }

  /* ------------------------------------------------------------- */
  handleChangeBPM(e) {     if (bLogOnOff) { console.log("LOG: handleChangeBPM(e)");};
  /* ------------------------------------------------------------- */

    e.preventDefault();

    this.setState({ bpm:         e.target.value });  
  }

  /* ------------------------------------------------------------- */
  handleBlurBPM(e) {     if (bLogOnOff) { console.log("LOG: handleBlurBPM(e)");};
  /* ------------------------------------------------------------- */

    e.preventDefault();

    var aaaPastedLyrics = this.state.aPastedLyrics.split("\n"); /* into an array */
    var timingsMesuresu = this.updateTimingsForPastedLyricsArray(aaaPastedLyrics);
    this.setState(state => (  { aPastedLyrics: timingsMesuresu.join("\n")}  )   );
  }


  /* ------------------------------------------------------------- */
  handleChangeSignature(e) {     if (bLogOnOff) { console.log("LOG: handleChangeSignature(e)");};
  /* ------------------------------------------------------------- */

    e.preventDefault();

    this.setState({ signature:   e.target.value });  }

  /* ------------------------------------------------------------- */
  handleChangebarsPerLine(e) {    if (bLogOnOff) { console.log("LOG: handleChangebarsPerLine(e)");};
  /* ------------------------------------------------------------- */

    this.setState({ barsPerLine: e.target.value});   }

  /* ------------------------------------------------------------- */
  handleBLURLyricsPasted(e) {     if (bLogOnOff) { console.log("LOG: handleBLURLyricsPasted(e)");};
  /* ------------------------------------------------------------- */

    console.log("LLL handleBLURLyricsPasted(e) update lyrics");

    var arrayPastedLyrics = e.target.value.split("\n"); 

    var timingsMesuresu = this.updateTimingsForPastedLyricsArray(arrayPastedLyrics);

    this.setState(state => (  { mmmL: messures.length}  )   );

    this.setState(state => (  { currentLine: 0}  )   );

    this.setState(state => (  { aPastedLyrics: timingsMesuresu.join("\n")}  )   );

    console.log("nnnn:" + this.state.mmmL + " " + this.state.currentLine  ); 


  }

  /* ------------------------------------------------------------- */
  render() {       {    if (bLogOnOff) { console.log("LOG: 02 render()");};   }
  /* ------------------------------------------------------------- */

    var msgErr = "";

    const markErr = (field) => {
        var fff = field;
        if (fff === "bpm") {
            if ( this.state.bpm > 300  || this.state.bpm < 10 )
               { msgErr = "Range 10-300"; return true; };
        };    

        if (fff === "signature") {
            if ( this.state.signature === "3/4" || this.state.signature === "4/4" ) { }
            else 
               { msgErr = "3/4 or 4/4";   return true };
        };    

        if (fff === "bars") {
            if   ( this.state.barsPerLine < 2 || this.state.barsPerLine > 4 )
                 { msgErr = "Range 2-4"; return true; };
        };

        return false;
    };

    const markMsg = (field) => {   var fff = field;
        if (fff === "bpm")       { return msgErr;  };    
        if (fff === "signature") { return msgErr; }; 
        if (fff === "bars")      { return msgErr; };
        return ""; };

    /* ------------------------------------------------------------- */
    return (

      <div style={{ width: "400px" }} >

        <h3 style={headerFontSizeStyle} >Johnny M Karaoke</h3>

        { /* -------------------------------------------------- */ }
        { /* -------------------------------------------------- */ }
        <div style={header2FontSizeStyle}>

        <strong>Set BPM. Paste & edit lyrics. Play music anywhere.</strong>
        <br /><strong>Then press</strong>
        <input type="button" value={"Start Over"} onClick={this.handleClickStartOver} 
           className="btn1 btn-default" id="startover" style={buttonBoxStylePlay} />
        <strong>& have fun!</strong> 

        </div> 
 
        { /* -------------------------------------------------- */ }
        { /* 00:00 Twinkle, twinkle little star. (85bpm)        */ }
        { /* -------------------------------------------------- */ }

        <br />
        <div style={header2FontSizeStyle}>   
        Play any music (Youtube, CD, Radio, Pandora) & sing:
        </div> 
        <BoxWithLyrics curLine={this.state.currentLine}  /> {/* Lyrics calls nextMessure */}

        { /* -------------------------------------------------- */ }
        { /* Music MP3:                                    */ } 
        { /* Set BPM. Paste & edit lyrics. Play music. Press [ Start Over ] */ } 
        { /* -------------------------------------------------- */ }
        <div style={{ width: "400px" }} > 
           <audio controls src="./TwinkleStar.mp3" id="myAudio" autoPlay style={{ width: "400px", height: "50px" }} ></audio>
           <br />Music MP3: 
           <input type="file" name="music" multiple id="allthree" style={{ width: "200px", height: "30px" }}></input>
        </div>

        { /* -------------------------------------------------- */ }
        { /* 00:00 Twinkle, twinkle little star. (85bpm)        */ }
        { /* 00:05 How I wonder what you are.                   */ }
        { /* 00:11 Up above the world so high,                  */ }
        { /* -------------------------------------------------- */ }
        <div style={{ width: "400px" }} > <br />Paste & edit lyrics, then press Start Over button: </div>

        <textarea value={this.state.aPastedLyrics} id="lyricsPasted" ref="ref1" onBlur ={this.handleBLURLyricsPasted} onChange = {this.handleLLLChange}
 rows="30" style={{ width: "398px", height: "100px", border: '1px solid black'}} ></textarea>

        <div style={{ width: "400px" }} > 
        Lyrics:<input name="lyrics" type="file" style={{ width: "200px", height: "30px" }} onChange = {this.handleLyricsFileChange} ></input>
 
        <textarea hidden id="lyricsFromFile" rows="30" style={{ margin: '0px 0px 0px 0', width: "20px", height: "20px" }}  ></textarea>
        </div>

        <br />


        { /* -------------------------------------------------- */ }
        { /* BPM for popular modern music genres: (coming soon) */ }
        { /* Beats per minutes (BPM): [-][--][ 85 ][+][++]      */ } 
        { /* Signature beats per measure (4/4 3/4): [ 4/4 ]     */ } 
        { /* Bars for one line of lyrics: [ 4 ]                 */ } 
        { /* -------------------------------------------------- */ }
        <div style={{ display: "inline-block", background: "yellow", width: "400px", border: '1px solid black' }} >

           <small>To apply changes, click or touch Paste/edit Lyrics box above:</small> 

           <br />Beats per minutes (BPM): 
           <input type="button" className="btn1 btn-default" id="minus1" style={buttonBoxBPMStyle} onClick={this.handleClick} value={"-"} /> 
           <input type="button" className="btn1 btn-default" id="minus2" style={buttonBoxBPMStyle} onClick={this.handleClick} value={"--"} />  
           <input type="number" id="bpmPasted2" style={inputBoxBPMStyle} value={this.state.bpm} onChange={this.handleChangeBPM} onBlur={this.handleBlurBPM}
                                                 className={markErr('bpm') ? "error" : ""}  />
           <input type="button" className="btn1 btn-default" id="pluss1" style={buttonBoxBPMStyle} onClick={this.handleClick} value={"+"} /> 
           <input type="button" className="btn1 btn-default" id="pluss2" style={buttonBoxBPMStyle} onClick={this.handleClick} value={"++"} /> 
           <img src={anX} height="10" width="10" className={markErr('bpm') ? "error" : "hide"} />
                                              <b className={markErr('bpm') ? "error" : "hide"}> {markMsg('bpm') } </b> 

           Signature beats per measure (4/4 3/4): 
           <input type="text" style={inputBoxStyle} value={this.state.signature} onChange={this.handleChangeSignature}
                                                 className={markErr('signature') ? "error" : ""} />
           <img src={anX} height="10" width="10" className={markErr('signature') ? "error" : "hide"} />
                                              <b className={markErr('signature') ? "error" : "hide"}>{" "} {markMsg('signature') } </b> 

           <br />Bars for one line of lyrics:
           <input type="number" style={inputBoxStyle} value={this.state.barsPerLine} onChange={this.handleChangebarsPerLine}
                                                 className={markErr('bars') ? "error" : ""} /> 
           <img src={anX} height="10" width="10" className={markErr('bars') ? "error" : "hide"} />
                                              <b className={markErr('bars') ? "error" : "hide"}> {markMsg('bars') } </b> 

        </div>

        <div style={{ width: "400px" }} > 
           BPM: <strong id="bpmPasted" style={{ width: "30px", height: "20px" }} ></strong>
           <input name="bpmbpm" type="file"  style={{ width: "200px", height: "30px" }}></input>
           <textarea hidden id="bpmFromFile" rows="30" style={{ margin: '0px 0px 0px 0', width: "20px", height: "20px" }}  ></textarea>
        </div>

      </div>
    );
  }

}


{ /* -------------------------------------------------- */ }
{ /* 00:00 Twinkle, twinkle little star. (85bpm)        */ }
{ /* -------------------------------------------------- */ }

/* ------------------------------------------------------------- */
const BoxWithLyrics = (props) => {    if (bLogOnOff) { console.log("LOG: 03 const BoxWithLyrics = (props) => ");};
/* ------------------------------------------------------------- */

   var bbb = randColor();
   var c = bbb.substring(1);      // strip #
   var rgb = parseInt(c, 16);   // convert rrggbb to decimal
   var r = (rgb >> 16) & 0xff;  // extract red
   var g = (rgb >>  8) & 0xff;  // extract green
   var b = (rgb >>  0) & 0xff;  // extract blue

   var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

   var ttt = 'black'; if (luma < 40) { ttt = 'yellow'; }

   return <div>  

          <div style={div1Style} > 
          <div style={div2Style} > 
             <Lyrics curLine={props.curLine - 1} />
          </div> 
          </div> 

          <div style={{ border: "1px solid black", display: "inline-block", color: ttt, background: bbb, width: "400px", minHeight: "100px", fontSize: "200%" }} > 
             <Lyrics curLine={props.curLine} />
          </div> 

          <div style={{ border: "1px solid black", display: "inline-block", width: "400px", minHeight: "25px" }} > 
             <Lyrics curLine={props.curLine + 1} />
          </div> 


          </div> 
}

/* ------------------------------------------------------------- */
const Lyrics = (props) => {    if (bLogOnOff) { console.log("LOG: 05 const Lyrics = (props) =>  ");};
/* ------------------------------------------------------------- */

   return <fragtment> {nextMessure(props.curLine)} </fragtment> 
}

/* ------------------------------------------------------------- */
const nextMessure = function(iNextLyricLine) {     if (bLogOnOff) { console.log("LOG: 06 const nextMessure = function(iNextLyricLine)");};
/* ------------------------------------------------------------- */

    var iNexti = Number(iNextLyricLine) - 1;

    if ( iNexti > ( messures.length - 1 ) ) { iNexti = 0; };
    singThis = timings[iNexti] + " " + messures[iNexti];
    if ( singThis === 'undefined undefined' ) { singThis = "" };
    if ( messures[iNexti] === "" ) { singThis = "" };
    return singThis;
}

/* ------------------------------------------------------------- */

var iNextLyricLine = 0;
var bpm = 125;
var singThis = '';

var messures = [
    "Twinkle, twinkle, little star, (85bpm)",
    "How I wonder what you are.",
    "Up above the world so high,",
    "Like a diamond in the sky.",
    "Twinkle, twinkle, little star,",
    "How I wonder what you are!",
    "When the blazing sun is gone,",
    "When there's nothing he shines upon,",
    "Then you show your little light,",
    "Twinkle, twinkle, through the night.",
    "Twinkle, twinkle, little star,",
    "How I wonder what you are!",
    "In the dark blue sky so deep",
    "Through my curtains often peep",
    "For you never close your eyes",
    "Til the morning sun does rise",
    "Twinkle, twinkle, little star",
    "How I wonder what you are"
]; 

var timings = [
    "00:00",
    "00:05",
    "00:11",
    "00:17",
    "00:22",
    "00:28",
    "00:34",
    "00:39",
    "00:45",
    "00:51",
    "00:56",
    "01:02",
    "01:08",
    "01:13",
    "01:19",
    "01:25",
    "01:30",
    "01:36",
    "01:42"
]; 

/* ------------------------------------------------------------- */
const bpmForPopularGenres = {
    "75" : "Slow dub/reggae" ,
    "90" : "Fast dub/reggae" ,
    "96" : "Deep house" ,
    "120" : "Slow house" ,
    "130" : "Electro house" ,
    "135" : "Trance" ,
    "140" : "Dubstep" ,
    "145" : "Hard house" ,
    "160" : "Jungle" ,
    "175" : "Drum&Bass" ,
    "190" : "Gabber" 
};

/* ------------------------------------------------------------- */

/* Margin: TRBL */

var headerFontSizeStyle   = { margin: 12, fontSize: "150%", textAlign: "center" };
var header2FontSizeStyle   = { width: "400px", textAlign: "center" };

var buttonBoxBPMStyle  = { margin: '5px 0px 5px 0', width: "40px",  height: "40px" }; 
var inputBoxBPMStyle   = { margin: '5px 0px 5px 0', width: "40px",  height: "35px", fontSize: "125%", textAlign: "center" };

/* Signature beats per measure (4/4 3/4): */
/* Bars for one line of lyrics: */
var inputBoxStyle      = { margin: '5px 0px 1px 0', width: "50px",  height: "22px", fontSize: "125%", textAlign: "center" };
var buttonBoxStylePlay = { margin: '0px 0px 0px 0', width: "100px", height: "50px" };


var div1Style          = { position: 'relative', perspective: '200px', width: '380px', minHeight: "25px", marginLeft: "10px", marginBottom: "-4px", border: '0px' };
var div2Style          = { transform: 'rotateX(45deg)', padding: '2px', border: '1px solid black', minHeight: "25px" };
var div3Style          = { position: 'relative', perspective: '200px', width: '380px', minHeight: "25px", border: '1px solid black', minHeight: "25px"};


var randColor = function() {
    if (bLogOnOff) {    if (bLogOnOff) { console.log("LOG: 04 var randColor = function()");};   };
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

var anX = "data:image/gif;base64,R0lGODlhBwAHAIAAAP///5KSkiH5BAAAAAAALAAAAAAHAAcAAAIMTICmsGrIXnLxuDMLADs=";

/* ------------------------------------------------------------- */
const ImportFile = () => { if (bLogOnOff) { console.log("LOG: const ImportFile = () =>  ");};
/* ------------------------------------------------------------- */
   let fileReader;

   console.log("cccccc1:" + CurState);

   const hfileRead = (e) => {
       const content = fileReader.result;
       console.log("const ImportFile = () => content:" + content);
   };
   const hFileChosen = (file) => {
      fileReader = new FileReader();
      fileReader.onloadend = hfileRead;
      fileReader.readAsText(file);
   };
   return <div className='upload-expense'>
       <input type='file' className='input-file' accept='.txt'
              onChange={e => { hFileChosen(e.target.files[0],CurState)}   }
       />
   </div>
};      

/* ------------------------------------------------------------- */
const BoxAboutAuthor = () => {    if (bLogOnOff) { console.log("LOG: 08 const BoxAboutAuthor = () =>  ");};
/* ------------------------------------------------------------- */

   return <div style={{ display: "inline-block", background: "yellow", width: "400px", textAlign: "center", border: "1px solid black"}} > 
       <br />
       <strong>Read about the author </strong><a href="https://whojohnnymeistrellis.netlify.com/" target="_blank">Johnny M Karaoke</a>.
       <br />
       <br />
   </div> 
}

/* ------------------------------------------------------------- */
const BoxWithInstructions = () => {    if (bLogOnOff) { console.log("LOG: 07 const BoxWithInstructions = () =>  ");};
/* ------------------------------------------------------------- */

   return <div id="dInstructions" style={{ display: "inline-block", background: "pink", width: "400px", minHeight: "100px" }} > 

      <input type="button" value={"+"} 
          className="btn1 btn-default" id="dInstructionsButton" style={buttonBoxBPMStyle} />
      <strong>Detailed instructions</strong>      

      <br />


      <div style={{ display: "inline-block", background: "pink", width: "400px", minHeight: "100px" }} > 

      <b>HOW to use Johnny M Karaoke:</b> <br />

      <ul>
        <li>Johnny M Karaoke shows the lyrics and timeline for each measure for a song while the music plays from any source or device (Pandora, ITunes, CD, TV, Stereo and more). Lyrics can be changed and saved. Just set BPM, Paste and edit lyrics, press or touch Start Over button to play the music, sing and have fun. The current lyric area will change color for each measure.</li>
      </ul>  

      <b>BPM: Set and adjust Beats Per Minute (BPM):</b>
      <ul>
        <li>BPM determine the lyric timeline for each measure. The timeline for the last measure of lyrics should match the total play time of the music. [--] and [++] buttons change BPM by 10. FIND the BPM of the song buy guessing or visit the links below. <b>Press or touch Start Over button. </b>MUSIC will play with the corresponding lyric and change color for each measure.</li>

      </ul>  

      <b>LYRICS: Type, paste or edit lyrics.</b>
      <ul>
        <li>FIND lyrics with links below and paste them in. Timelines for each measure will be added and adjusted when you leave the box. SAVE lyrics with cut/paste into a text file. Set BPM. <b>Press or touch Start Over button. </b>MUSIC will play with the corresponding lyric and change color for each measure.</li> 
      </ul>  

      <b>MUSIC: Find and play music from any source:</b> 
      <ul>
        <li>ANY WHERE: CD, TV, Radio, Stereo...</li> 
        <li>WEB: Pandora, ITunes, or download (see links below).</li>
        <li>PHONE/LAPTOP: Find MP3 music files on your phone, laptop...</li> 

      </ul>  

      <b>MUSIC MP3 Browse/Choose button (Select all three files):</b>
       <ul>
        <li>MUSIC file:  Twinkle Twinkle Little Star.mp3</li> 
        <li>LYRICS file: Twinkle Twinkle Little Star.<b>lyrics.txt</b></li> 
        <li>BPM file:    Twinkle Twinkle Little Star.<b>bpm.txt</b></li> 

      </ul>

      </div> 

   <br /><b>VISIT this site often:</b> 
      <ul>
        <li>To see cool new features and functionality.</li>
      </ul> 

   </div> 
}


/* ------------------------------------------------------------- */
ReactDOM.render(
  <TodoApp />,
  document.getElementById('example')
);

                                                                       