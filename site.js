function checkAnswer()
   {
    let no1 =  parseInt(document.getElementById("number1").value);
    let no2 =  parseInt(document.getElementById("number2").value);

    let ans =  document.getElementById("answer").value;
    let correct =  parseInt(document.getElementById("correct_answers").textContent);
    let wrong =  parseInt(document.getElementById("wrong_answers").textContent);

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
        var num1 = Math.floor(Math.random() * 10);
        var num2 = Math.floor(Math.random() * 10);
        document.getElementById("number1").value = num1;
        document.getElementById("number2").value = num2;
        document.getElementById("answer").value = "";
    }
  
    var x = setInterval(function() {
    count_down = count_down - 1;
    document.getElementById("timer_label").textContent =  count_down ;
    let correct =  parseInt(document.getElementById("correct_answers").textContent);
    let wrong =  parseInt(document.getElementById("wrong_answers").textContent);
    let skipped =  parseInt(document.getElementById("skipped_answers").textContent);

    // If the count down is finished, reset the numbers
    if (count_down <= 0) {
      setNumbers();
      count_down = 10;
    }
    if( (correct + wrong + skipped) > 19){
        showModal();
        document.getElementById("wrong_answers").textContent = 0;
        document.getElementById("correct_answers").textContent = 0 ;
        document.getElementById("skipped_answers").textContent = 0 ;
    }
    if (count_down <=3){
      document.getElementById("timer_label").className = "badge bg-danger";
    }else{
      document.getElementById("timer_label").className = "badge bg-info";
    }
  }, 1000);