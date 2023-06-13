export class Quiz {
    constructor(response) {
        this.response = response;
        this.currentIndex = 0;
        this.TotalNoOfQuest = response.length;
        this.nextBtn = document.getElementById('next');
        this.nextBtn.addEventListener('click', this.nextQuest.bind(this));
        this.answerElements=document.getElementsByName('answer');
        this.score=0;
        console.log(response);
        console.log(response.length);
        this.showQuest();
    }
    showQuest() {
        document.getElementById('currentQuestion').innerHTML = this.currentIndex + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.TotalNoOfQuest;
        document.getElementById('question').innerHTML = this.response[this.currentIndex].question;
        let answers = [this.response[this.currentIndex].correct_answer, ...this.response[this.currentIndex].incorrect_answers];

        console.log(answers);
        function shuffle(answers) {
            let currentIndex = answers.length, randomIndex;

            // While there remain elements to shuffle.
            while (currentIndex != 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [answers[currentIndex], answers[randomIndex]] = [
                    answers[randomIndex], answers[currentIndex]];
            }

            return answers;
        }
        let answersArr = shuffle(answers);
        let temp = ``;
        for (let i = 0; i < answersArr.length; i++) {
            temp += `<div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" value="${answersArr[i]}" >
                ${answersArr[i]}
            </label>
           </div>`
        }
        document.getElementById('rowAnswer').innerHTML = temp;
        console.log(answersArr);
    }
    nextQuest() {

        let userAnswer=[...this.answerElements].filter(el=>el.checked);
        if(userAnswer.length >0)
        {
            $('#alert').fadeOut(200);
            this.checkAnswer();
            this.currentIndex++;
            if (this.currentIndex === this.TotalNoOfQuest )
            {
                $('#quiz').fadeOut(200,function(){
                    $('#finish').fadeIn(200);
                })
                document.getElementById('score').innerHTML=this.score;
                document.getElementById('tryBtn').addEventListener('click',function(){
                    $('#finish').fadeOut(200,function(){
                        $('#setting').fadeIn(200);
                    })
                })
                
            }
            else
            {
                this.showQuest();
            }
        }
        else
        {
            $('#alert').fadeIn(200);
        }

       
           
    }
    checkAnswer()
    {
        // console.log();
        let userAnswer=[...this.answerElements].filter(el=>el.checked)[0].value;
        let correct_answer=this.response[this.currentIndex].correct_answer;
        if(userAnswer === correct_answer)
        {
            //correct
            $('#Correct').fadeIn(200,function(){
                $('#Correct').fadeOut(200)
            })
            this.score ++;
        }
        else
        {
            //incorrect
            $('#inCorrect').fadeIn(200,function(){
                $('#inCorrect').fadeOut(200)
            })
        }
        console.log('check answer');
    }

}