const textarea = document.querySelector('textarea');
const voicelist = document.querySelector('select');
const speechbtn = document.querySelector('button');

let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        console.log(voice.name)
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value = "${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voicelist.insertAdjacentHTML("beforeend",option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if (voice.name === voicelist.value) {
            utternance.voice = voice;
        }
    }
  
        synth.speak(utternance); // speak the speech
}

speechbtn.addEventListener("click", e=>{
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80 ) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechbtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechbtn.innerText = "Resume Speech";
            }
            setInterval(()=>{
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechbtn.innerText = "Convert To Speech";
                }
            }); 
        }else{
            speechbtn.innerText = "Convert To Speech";
        }
    }
})
