import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';


import * as Survey from 'survey-angular';



import 'survey-angular/survey.css';

Survey.StylesManager.applyTheme('modern-min');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'survey',
  template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyElement"></div>
  </div>`,
  styleUrls: ['./quiz.component.css']
})
export class SurveyComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  result: any;

  ngOnInit(): void{



    const json = {
      questions: [
        {
          type: 'radiogroup',
          name: 'one',
          title: 'Radiogroup question (green)',
          choices: [ 'Yes', 'No', 'Maybe']
        },
        {
          type: 'checkbox',
          name: 'two',
          title: 'Checkbox question (orange)',
          choices: [ 'One', 'Two' ]
        },
        {
          type: 'radiogroup',
          name: 'three',
          title: 'Required question (red title)',
          isRequired: true,
          choices: [ 'Yes', 'No' ]
        }
      ]
    };
    const survey = new Survey.Model(json);

    // tslint:disable-next-line:only-arrow-functions typedef no-shadowed-variable
    survey.onUpdateQuestionCssClasses.add(function(survey, options) {
      console.log(survey);
      const classes = options.cssClasses;
      classes.root = 'sq-root';
      classes.title = 'sq-title';
      classes.item = 'sq-item';
      classes.label = 'sq-label';

      if (options.question.isRequired) {
        classes.title += ' sq-title-required';
        classes.root += ' sq-root-required';
      }
      if (options.question.getType() === 'checkbox') {
        classes.root += ' sq-root-cb';
      }
    });



    Survey.SurveyNG.render('surveyElement', { model: survey });
  }
}
