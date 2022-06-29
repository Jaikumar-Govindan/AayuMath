function checkAnswer(math=true)
   {
    let ans =  document.getElementById("answer").value;
    let correct =  parseInt(document.getElementById("correct_answers").textContent);
    let wrong =  parseInt(document.getElementById("wrong_answers").textContent);
    if(math)
    {
      let no1 =  parseInt(document.getElementById("number1").value);
      let no2 =  parseInt(document.getElementById("number2").value);

      // alert(no1 + no2);

      if (no1 + no2 == ans)
      {
        correct++;
        document.getElementById("correct_answers").textContent = correct ;
        count_down=0;
      }
      else
      {
        wrong++;
        document.getElementById("wrong_answers").textContent = wrong;
        // document.getElementById("wrong_answers").style="border:1px solid #ff0000";
      }
    }
    else
    {
    
      if( ans.toLowerCase() == word.toLowerCase())
      {
        correct++;
        document.getElementById("correct_answers").textContent = correct ;
        count_down=0;
      }
      else
      {
        wrong++;
        document.getElementById("wrong_answers").textContent = wrong;
      }

    }
    
    return;

   }
   /* Set the width of the side navigation to 250px */
  function openNav()
  {
    document.getElementById("mySidenav").style.width = "250px";
  }
  /* Set the width of the side navigation to 0 */
  function closeNav()
  {
    document.getElementById("mySidenav").style.width = "0";
  }
    // Update the count down every 1 second
    var count_down = 10;
    var myModal = new bootstrap.Modal(document.getElementById("completionModal"), {});
    
    function showModal()
    {
      myModal.show();
    }
  
    function setNumbers()
    {
        if(document.getElementById("number1") != null)
        {
          var num1 = Math.floor(Math.random() * 10);
          document.getElementById("number1").value = num1;  
        }
        if(document.getElementById("number2") != null)
        {
          var num2 = Math.floor(Math.random() * 10);
          document.getElementById("number2").value = num2;  
        }
        document.getElementById("answer").value = "";
    }
  
    var x = setInterval(function() {
    let correct =  parseInt(document.getElementById("correct_answers").textContent);
    let wrong =  parseInt(document.getElementById("wrong_answers").textContent);
    let skipped =  parseInt(document.getElementById("skipped_answers").textContent);
    if( (correct + wrong + skipped) > 19){
      showModal();
      document.getElementById("wrong_answers").textContent = 0;
      document.getElementById("correct_answers").textContent = 0 ;
      document.getElementById("skipped_answers").textContent = 0 ;
  }

  if( document.getElementById("word_audio") != null && ! document.getElementById("word_audio").ended)
  {
    return;
  }
  document.getElementById("timer_label").textContent =  count_down ; 
  count_down = count_down - 1;
  // If the count down is finished, reset the numbers
  if (count_down <= 0) {
    if(document.getElementById("word_audio") == null) 
    {
      setNumbers();
    } 
    else
    {
      getWordSoundFile(1);
    }
    
    count_down = 10;
  }

  if (count_down <=3){
    document.getElementById("timer_label").className = "badge bg-danger";
  }else{
    document.getElementById("timer_label").className = "badge bg-info";
  }
}, 1000);


  /* English */
  let words = {}
  words[1] = ["bake", "bag","all","boy","feet","eat","frog","girl","hug","pig","sleep","tree","side","sand","run","play","pet","nose","lip","late","hand"];
  words[2] = ["animal", "around","away","again","cannot","friend","found","paws","tore","wire","tropical","snail","spinach","bread","clown","airplane","yellow","another","spring","already","surfing"];
  let audio = ""
  let word = ""
  let audioPlayed = false;


function getRandomWordByGrade(grade)
{
  var wordIndex = Math.floor(Math.random() * words[grade].length);
  console.log(words[grade][wordIndex]);
  return words[grade][wordIndex];
}
function getWordSoundFile(grade)
{
  document.getElementById("answer").value = "";
  word = getRandomWordByGrade(grade);
  axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=44971f4e-8263-4c83-a158-5361fef064ab')

  .then(function (response) {
    console.log(response);
    audio = response.data[0].hwi.prs[0].sound.audio;
    let subDirectory = ""
    if(audio.slice(0,3) == "bix")
    {
      subDirectory = "bix"
    }else  if (audio.slice(0,2) == "gg") {
      subDirectory = "gg"
    } else if (audio.slice(0,1) == "_") {
      subDirectory = "number"
    }
    else{
      subDirectory = audio.slice(0,1)
    }
    audioPlayBackURL = "https://media.merriam-webster.com/audio/prons/en/us/mp3/" + subDirectory + "/" +  audio +".mp3";
    document.getElementById("word_audio_src").src = audioPlayBackURL;
    document.getElementById("word_audio").load();
    audioPlayed = false
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

}
