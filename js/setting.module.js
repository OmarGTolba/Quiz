/// <reference path="../typings/globals/jquery/index.d.ts" />
import { Quiz } from "./quiz.module.js";

export class Setting
{
    constructor()
    {
        this.categoryInput=document.getElementById('category');
        this.difficultyInput=document.getElementsByName('difficulty');
        this.numberOfQuestionsInput=document.getElementById('numberOfQuestions');
        this.startBtn=document.getElementById('startBtn');
        this.startBtn.addEventListener('click',this.startQuiz.bind(this))
        console.log(this.startBtn);
    }
    async startQuiz()
    {
        let category=this.categoryInput.value;
        let numberOfQuestions=this.numberOfQuestionsInput.value;
        let difficulty=Array.from(this.difficultyInput).filter(el=> el.checked)[0].value;
        //[...this.difficultyInput].filter(el=> el.checked)[0].value

        let api=`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
        let response=await this.fetchApi(api);
        if(response.length >0)
        {
            $('#setting').fadeOut(200,function(){
                $('#quiz').fadeIn(200);
            })
        }
        let quiz=new Quiz(response);
        // else if (response.length ==0)
        // {
        //     $('#alert').fadeIn(200);
        // }
        
    }
    async fetchApi(api)
    {
        let response=await fetch(api);
        let result=await response.json();
        // console.log(result.results);
        return result.results;
    }
}

